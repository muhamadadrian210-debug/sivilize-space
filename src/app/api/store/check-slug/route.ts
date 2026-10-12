import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isValidSlug } from '@/lib/utils';

const RESERVED_SLUGS = new Set([
  'admin',
  'dashboard',
  'api',
  'auth',
  'login',
  'register',
  'store',
  'toko',
  'static',
  'assets',
  'favicon',
  'robots',
  'sitemap',
  'terms',
  'privacy',
  'checkout',
  'cart',
  'help',
  'support',
]);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawSlug = searchParams.get('slug')?.toLowerCase().trim() || '';

    if (!rawSlug) {
      return NextResponse.json(
        { available: false, reason: 'Slug tidak boleh kosong' },
        { status: 400 }
      );
    }

    if (!isValidSlug(rawSlug)) {
      return NextResponse.json({
        available: false,
        reason: 'Hanya huruf kecil, angka, dan strip (-) (3–30 karakter)',
      });
    }

    if (RESERVED_SLUGS.has(rawSlug)) {
      return NextResponse.json({
        available: false,
        reason: 'Nama domain ini dicadangkan untuk sistem internal',
        suggestions: [`${rawSlug}-id`, `${rawSlug}-shop`, `${rawSlug}-official`],
      });
    }

    const { data: existing, error } = await supabaseAdmin
      .from('stores')
      .select('id, slug')
      .eq('slug', rawSlug)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { available: false, reason: 'Gagal mengecek ketersediaan database' },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json({
        available: false,
        reason: 'Nama domain ini sudah terdaftar oleh toko lain',
        suggestions: [
          `${rawSlug}id`,
          `${rawSlug}-store`,
          `${rawSlug}-official`,
          `toko-${rawSlug}`,
        ],
      });
    }

    return NextResponse.json({
      available: true,
      slug: rawSlug,
      fullDomain: `${rawSlug}.sivilizecorp.my.id`,
      message: 'Tersedia! Anda bisa menggunakan nama domain ini.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return NextResponse.json({ available: false, reason: message }, { status: 500 });
  }
}
