import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { parseLicenseMetadata } from '@/lib/ecosystem-license';
import type { Store, Product } from '@/types/database';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return handleVerify(req);
}

export async function POST(req: NextRequest) {
  return handleVerify(req);
}

async function handleVerify(req: NextRequest) {
  try {
    let key = req.nextUrl.searchParams.get('key') || '';
    let app = req.nextUrl.searchParams.get('app') || ''; // 'sikasir_pos' | 'sivilize_dine_lite'

    if (req.method === 'POST') {
      try {
        const body = await req.json();
        if (body.key) key = body.key;
        if (body.app) app = body.app;
      } catch {
        // Ignore JSON parse failure, fallback to query param
      }
    }

    if (!key || key.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: 'Kunci Lisensi Ekosistem wajib disertakan.',
        },
        { status: 400 }
      );
    }

    const cleanKey = key.trim().toUpperCase();

    // 1. Cari website yang memiliki kode lisensi ini di database Supabase
    // Cek kolom ecosystem_license_code atau di dalam JSON layout_config
    const { data: storeData, error } = await supabaseAdmin
      .from('stores')
      .select('*')
      .or(`ecosystem_license_code.eq.${cleanKey},layout_config->>ecosystem_license_code.eq.${cleanKey}`)
      .maybeSingle();

    let store = storeData as Store | null;

    // Fallback jika format legacy: cari berdasarkan kecocokan slug/kategori
    if (!store) {
      const { data: allStores } = await supabaseAdmin
        .from('stores')
        .select('*')
        .eq('is_active', true)
        .limit(20);

      store = (allStores as Store[] || []).find((s) => {
        const sCode = s.ecosystem_license_code || (s.layout_config as Record<string, any>)?.ecosystem_license_code;
        return sCode && sCode.toUpperCase() === cleanKey;
      }) || null;
    }

    if (error || !store) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: 'Kunci lisensi tidak ditemukan atau belum terdaftar. Pastikan Anda menyalin kode lisensi dari Invoice Resmi Sivilize Space Anda.',
        },
        { status: 404 }
      );
    }

    // 2. Cek masa aktif sewa website
    if (!store.is_active) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: `Masa aktif sewa website "${store.store_name}" telah habis atau sedang dalam masa penangguhan. Silakan perpanjang sewa website di Sivilize Space.`,
        },
        { status: 403 }
      );
    }

    const metadata = parseLicenseMetadata(cleanKey, store.category);

    // 3. Validasi Hak Akses: Usaha Non-Makanan Dilarang Masuk ke Sivilize Dine Lite
    if (app === 'sivilize_dine_lite' && !metadata.isFoodBusiness) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: `Lisensi Anda terdaftar untuk bidang usaha Non-Makanan (${store.category}). Aplikasi Sivilize Dine Lite (QR Meja Restoran) hanya diperuntukkan untuk usaha Kuliner/F&B. Silakan gunakan lisensi ini pada aplikasi SiKasir POS.`,
          allowed_apps: metadata.allowedApps,
        },
        { status: 403 }
      );
    }

    // 4. Ambil katalog menu/layanan agar SiKasir POS & Dine Lite otomatis terisi 100%
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('store_id', store.id)
      .eq('is_available', true)
      .order('display_order', { ascending: true });

    return NextResponse.json({
      success: true,
      valid: true,
      license_key: cleanKey,
      store_id: store.id,
      business_name: store.store_name,
      slug: store.slug,
      category: store.category,
      is_food_business: metadata.isFoodBusiness,
      industry_preset: metadata.industryPreset,
      allowed_apps: metadata.allowedApps,
      owner_phone: store.owner_phone,
      address: store.address || null,
      opening_hours: store.opening_hours || null,
      expired_at: store.expired_at || null,
      website_url: `https://${store.slug}.${process.env.NEXT_PUBLIC_BASE_DOMAIN || 'sivilizecorp.my.id'}`,
      catalog_items: (products as Product[] || []).map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category_tag,
        image_url: p.image_url,
      })),
      message: metadata.isFoodBusiness
        ? 'Aktivasi Berhasil: Hak akses SiKasir POS dan Sivilize Dine Lite QR aktif 100%.'
        : 'Aktivasi Berhasil: Hak akses SiKasir POS aktif 100% (Preset Non-Makanan).',
    });
  } catch (err) {
    console.error('License verify error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan sistem saat memverifikasi lisensi.',
      },
      { status: 500 }
    );
  }
}
