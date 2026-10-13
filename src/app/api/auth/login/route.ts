import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { normalizeWhatsAppPhone } from '@/lib/utils';
import { verifyPin, hashPin, createTenantToken } from '@/lib/session';
import { authLoginLimiter } from '@/lib/rate-limiter';
import { checkIsBanned, createBannedResponse } from '@/lib/blacklist';
import type { Store } from '@/types/database';

export async function POST(req: NextRequest) {
  // 🛡️ MULTI-LAYER BLACKLIST CHECK (IP, Device Fingerprint, Phone, Country)
  const initialBanCheck = await checkIsBanned(req);
  if (initialBanCheck.isBanned) {
    return createBannedResponse(initialBanCheck);
  }

  // 🛡️ RATE LIMITER SHIELD (Maksimal 10 percobaan per menit per IP)
  const rateLimitResult = authLoginLimiter.check(req);
  if (!rateLimitResult.success) {
    return authLoginLimiter.toResponse(
      rateLimitResult,
      'Terlalu banyak percobaan login dari perangkat ini. Silakan tunggu 1 menit sebelum mencoba kembali.'
    );
  }

  try {
    const body = await req.json();
    const { phone, pin, tax_id, user_website_url, device_fingerprint } = body;

    // Cek kembali jika ada device_fingerprint atau phone spesifik dalam body
    const detailedBanCheck = await checkIsBanned(req, { phone, deviceFp: device_fingerprint });
    if (detailedBanCheck.isBanned) {
      return createBannedResponse(detailedBanCheck);
    }

    // 🍯 HONEYPOT 04 (Zero-Opacity Bot Trap)
    // Jika bot mengisi kolom tersembunyi ini, log ke security_blacklist & tolak seketika!
    if (tax_id || user_website_url) {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      await supabaseAdmin.from('security_blacklist').insert([
        {
          ip_address: ip,
          violation_type: 'bot_honeypot_trap',
          triggered_firewall_layer: 4,
          honeypot_name: 'Zero-Opacity Form Trap',
          evidence_payload: JSON.stringify({ tax_id, user_website_url }),
        },
      ]);

      return NextResponse.json(
        { error: 'Akses ditolak.' },
        { status: 403 }
      );
    }

    if (!phone || !pin) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp dan PIN wajib diisi.' },
        { status: 400 }
      );
    }

    const cleanPhone = normalizeWhatsAppPhone(phone);

    // Cari toko berdasarkan slug (jika ada) atau owner_phone
    let query = supabaseAdmin.from('stores').select('*');
    if (body.slug) {
      query = query.eq('slug', body.slug);
    } else {
      query = query.eq('owner_phone', cleanPhone);
    }

    const { data: storesList, error } = await query.order('created_at', { ascending: false });
    const store = (storesList && storesList.length > 0 ? storesList[0] : null) as Store | null;

    if (error || !store) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp atau toko belum terdaftar sebagai pemilik toko.' },
        { status: 404 }
      );
    }

    // 🛡️ FW 11: Proteksi Anti-Brute Force & Lockout Check
    if (store.lockout_until) {
      const lockoutDate = new Date(store.lockout_until);
      if (lockoutDate > new Date()) {
        const remainingMinutes = Math.ceil(
          (lockoutDate.getTime() - Date.now()) / (1000 * 60)
        );
        return NextResponse.json(
          {
            error: `Akun terkunci sementara karena salah PIN 5 kali. Coba lagi dalam ${remainingMinutes} menit.`,
          },
          { status: 429 }
        );
      }
    }

    // 🛡️ FW 10: Verifikasi Kriptografi PIN (Zero-Trust, Anti-Backdoor)
    const isPinValid = verifyPin(pin, store.pin_hash);

    if (!isPinValid) {
      const attempts = (store.failed_login_attempts || 0) + 1;
      const updates: { failed_login_attempts: number; lockout_until?: string } = {
        failed_login_attempts: attempts,
      };

      if (attempts >= 5) {
        // Kunci akun selama 15 menit
        const lockoutTime = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        updates.lockout_until = lockoutTime;
      }

      await supabaseAdmin
        .from('stores')
        .update(updates)
        .eq('id', store.id);

      return NextResponse.json(
        {
          error:
            attempts >= 5
              ? 'PIN salah 5 kali! Akun Anda dikunci selama 15 menit demi keamanan.'
              : `PIN tidak cocok. Percobaan ${attempts} dari 5.`,
        },
        { status: 401 }
      );
    }

    // Login Sukses: Reset failed attempts & upgrade pin hash jika masih plain text
    const updateData: Record<string, unknown> = {
      failed_login_attempts: 0,
      lockout_until: null,
    };
    if (store.pin_hash === pin) {
      updateData.pin_hash = hashPin(pin);
    }

    await supabaseAdmin
      .from('stores')
      .update(updateData)
      .eq('id', store.id);

    // Kirim respons sukses & set cryptographically signed session cookie
    const signedToken = createTenantToken(store.id);
    const response = NextResponse.json({
      success: true,
      store: {
        id: store.id,
        slug: store.slug,
        store_name: store.store_name,
        category: store.category,
        template_type: store.template_type,
        theme_id: store.theme_id,
        owner_phone: store.owner_phone,
        is_active: store.is_active,
        expired_at: store.expired_at,
      },
    });

    response.cookies.set('sivilize_session_store_id', signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/',
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan internal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
