import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { normalizeWhatsAppPhone, isValidSlug } from '@/lib/utils';
import { checkProhibitedContent } from '@/lib/security';
import { hashPin, createTenantToken } from '@/lib/session';
import { storeRegisterLimiter } from '@/lib/rate-limiter';
import { checkIsBanned, createBannedResponse } from '@/lib/blacklist';
import type { StoreSectionKey } from '@/types/database';
import { z } from 'zod';

const registerStoreSchema = z.object({
  store_name: z.string().min(2, 'Nama website minimal 2 karakter').max(80),
  slug: z.string().min(3).max(30),
  category: z.string().min(2).max(50),
  template_type: z.enum(['katalog', 'layanan', 'profil']).default('katalog'),
  theme_id: z.enum([
    'warm-cafe',
    'midnight-distro',
    'fresh-herbal',
    'pastel-beauty',
    'corporate-clean',
  ]).default('warm-cafe'),
  owner_phone: z.string().min(8, 'Nomor HP tidak valid').max(20),
  pin: z.string().min(6, 'PIN harus 6 digit angka').max(6),
  plan_tier: z.enum(['mikro', 'pro', 'bisnis']).default('pro'),
  billing_cycle: z.enum(['bulanan', 'tahunan']).default('tahunan'),
  tax_id: z.string().optional(), // Honeypot trap
  device_fingerprint: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // 🛡️ MULTI-LAYER BLACKLIST CHECK (IP, Device, Country)
  const initialBanCheck = await checkIsBanned(req);
  if (initialBanCheck.isBanned) {
    return createBannedResponse(initialBanCheck);
  }

  // 🛡️ RATE LIMITER SHIELD (Maksimal 5 pendaftaran per 10 menit per IP)
  const rateLimitResult = storeRegisterLimiter.check(req);
  if (!rateLimitResult.success) {
    return storeRegisterLimiter.toResponse(
      rateLimitResult,
      'Terlalu banyak percobaan pendaftaran toko dari perangkat ini. Mohon tunggu 10 menit sebelum mencoba lagi.'
    );
  }

  try {
    const body = await req.json();

    // Cek kembali dengan phone dan device_fingerprint dari body
    const detailedBanCheck = await checkIsBanned(req, {
      phone: body.owner_phone,
      deviceFp: body.device_fingerprint,
    });
    if (detailedBanCheck.isBanned) {
      return createBannedResponse(detailedBanCheck);
    }


    // 🍯 HONEYPOT TRAP (HP 04)
    if (body.tax_id) {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      await supabaseAdmin.from('security_blacklist').insert([
        {
          ip_address: ip,
          violation_type: 'bot_honeypot_trap',
          triggered_firewall_layer: 4,
          honeypot_name: 'Register Form Trap',
          evidence_payload: JSON.stringify(body),
        },
      ]);
      return NextResponse.json({ error: 'Akses ditolak.' }, { status: 403 });
    }

    const parsed = registerStoreSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Input data tidak valid.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const {
      store_name,
      slug: rawSlug,
      category,
      template_type,
      theme_id,
      owner_phone,
      pin,
      plan_tier,
      billing_cycle,
    } = parsed.data;

    const slug = rawSlug.toLowerCase().trim();

    // 1. Validasi format slug
    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: 'Slug hanya boleh huruf kecil, angka, dan strip (3-30 karakter).' },
        { status: 400 }
      );
    }

    // 2. Anti-Judol & Anti-Pinjol check
    const judolCheck = checkProhibitedContent(store_name);
    if (judolCheck.isViolating) {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      await supabaseAdmin.from('security_blacklist').insert([
        {
          ip_address: ip,
          violating_slug: slug,
          violation_type: 'anti_judol_prohibited_content',
          triggered_firewall_layer: 19,
          evidence_payload: JSON.stringify({ store_name, matched: judolCheck.matchedWord }),
        },
      ]);
      return NextResponse.json(
        { error: 'Nama website melanggar UU ITE (terdeteksi indikasi konten terlarang).' },
        { status: 400 }
      );
    }

    // 3. Cek keunikan slug
    const { data: existingSlug } = await supabaseAdmin
      .from('stores')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existingSlug) {
      return NextResponse.json(
        { error: `Subdomain "${slug}" sudah dipakai. Silakan pilih nama lain.` },
        { status: 409 }
      );
    }

    // 4. Normalisasi WhatsApp Phone
    const cleanPhone = normalizeWhatsAppPhone(owner_phone);

    // Cek apakah nomor sudah punya toko
    const { data: existingPhone } = await supabaseAdmin
      .from('stores')
      .select('id, slug')
      .eq('owner_phone', cleanPhone)
      .maybeSingle();

    if (existingPhone) {
      return NextResponse.json(
        {
          error: `Nomor WhatsApp ${cleanPhone} sudah memiliki website aktif (${existingPhone.slug}). Silakan login di dashboard.`,
        },
        { status: 409 }
      );
    }

    // 5. Perhitungan Masa Aktif Sewa & Auto-Provisioning Lisensi Ekosistem
    const isPaid = Boolean(body.is_paid);
    const durationDays = isPaid
      ? (billing_cycle === 'bulanan' ? 30 : 365)
      : 7;
    const expirationDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    const getEcosystemLicense = (cat: string, cycle: string) => {
      const c = cat.toLowerCase();
      const suffix = cycle === 'bulanan' ? '30D' : '365D';
      if (c.includes('kuliner') || c.includes('fnb') || c.includes('kafe') || c.includes('kopi') || c.includes('resto') || c.includes('makan') || c.includes('minum')) {
        return `SIV-FNB-${suffix}`;
      }
      if (c.includes('retail') || c.includes('kelontong') || c.includes('distro') || c.includes('fashion') || c.includes('minimarket') || c.includes('toko')) {
        return `SIV-RETAIL-${suffix}`;
      }
      if (c.includes('bengkel') || c.includes('servis') || c.includes('otomotif') || c.includes('motor') || c.includes('mobil')) {
        return `SIV-BENGKEL-${suffix}`;
      }
      if (c.includes('laundry') || c.includes('cuci')) {
        return `SIV-LAUNDRY-${suffix}`;
      }
      if (c.includes('barber') || c.includes('salon') || c.includes('pangkas') || c.includes('rambut')) {
        return `SIV-BARBER-${suffix}`;
      }
      if (c.includes('apotek') || c.includes('obat') || c.includes('klinik') || c.includes('farmasi')) {
        return `SIV-APOTEK-${suffix}`;
      }
      return `SIV-PRO-${suffix}`;
    };

    const ecosystemLicenseCode = body.ecosystem_license_code || getEcosystemLicense(category, billing_cycle);

    const initialLayoutConfig = {
      grid_columns_desktop: (body.grid_columns_desktop as 2 | 3 | 4 | 'list') || 3,
      grid_columns_mobile: 1 as const,
      spacing: 'normal' as const,
      card_style: 'border' as const,
      text_alignment: (body.text_alignment as 'left' | 'center' | 'right') || 'left',
      heading_size: (body.heading_size as 'small' | 'normal' | 'large' | 'huge') || 'normal',
      button_style: (body.button_style as 'rounded' | 'pill' | 'sharp' | 'block') || 'rounded',
      badge_position: (body.badge_position as 'top_left' | 'top_right' | 'inline') || 'top_left',
      background_image: body.background_image || null,
      section_order: (body.section_order as StoreSectionKey[]) || ['hero', 'categories', 'catalog', 'about', 'contact'],
      visible_sections: {
        hero: true,
        categories: true,
        catalog: true,
        about: true,
        contact: true,
      },
      ecosystem_license_code: ecosystemLicenseCode,
    };

    // 6. Insert website baru
    const { data: newStore, error: insertError } = await supabaseAdmin
      .from('stores')
      .insert([
        {
          slug,
          store_name,
          category,
          template_type,
          theme_id,
          owner_phone: cleanPhone,
          pin_hash: hashPin(pin),
          layout_config: initialLayoutConfig,
          is_active: true,
          expired_at: expirationDate,
          description: `Selamat datang di ${store_name}! Silakan pilih produk/layanan kami dan pesan langsung di web.`,
        },
      ])
      .select()
      .single();

    if (insertError || !newStore) {
      console.error('Error insert store:', insertError);
      return NextResponse.json(
        { error: 'Gagal membuat website di database. Hubungi admin.' },
        { status: 500 }
      );
    }

    // 7. Insert starter products agar website langsung terisi rapi
    await supabaseAdmin.from('products').insert([
      {
        store_id: newStore.id,
        name: 'Produk Unggulan Spesial',
        description: 'Menu favorit pilihan pelanggan dengan kualitas terbaik.',
        price: 35000,
        category_tag: 'Unggulan',
        is_available: true,
        display_order: 1,
      },
      {
        store_id: newStore.id,
        name: 'Paket Hemat Signature',
        description: 'Pilihan hemat lengkap untuk kebutuhan harian Anda.',
        price: 25000,
        category_tag: 'Paket Hemat',
        is_available: true,
        display_order: 2,
      },
    ]);

    // 8. Set signed session cookie & return auto-login data
    const storeWithLicense = {
      ...newStore,
      ecosystem_license_code: ecosystemLicenseCode,
      is_paid: isPaid,
      billing_cycle,
    };

    const response = NextResponse.json({
      success: true,
      store: storeWithLicense,
      redirectUrl: `/dashboard?onboarding=success&slug=${newStore.slug}`,
    });

    const signedToken = createTenantToken(newStore.id);
    response.cookies.set('sivilize_session_store_id', signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Kesalahan server tidak terduga.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
