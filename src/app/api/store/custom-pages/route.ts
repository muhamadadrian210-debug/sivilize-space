import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isValidSlug } from '@/lib/utils';
import { ADDON_PAGE_PRICE_PER_YEAR, createMayarInvoice } from '@/lib/mayar';
import { authenticateTenantRequest } from '@/lib/session';
import type { CustomPage } from '@/types/database';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get('store_id');

  if (!storeId) {
    return NextResponse.json({ error: 'Store ID diperlukan.' }, { status: 400 });
  }

  // Get store custom_pages
  const { data: store, error } = await supabaseAdmin
    .from('stores')
    .select('id, custom_pages')
    .eq('id', storeId)
    .single();

  if (error || !store) {
    return NextResponse.json({ pages: [] });
  }

  const pages = (store.custom_pages || []) as CustomPage[];
  return NextResponse.json({ pages });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { store_id, title, slug: rawSlug, content, simulate_payment } = body;

    if (!store_id || !title || !rawSlug) {
      return NextResponse.json(
        { error: 'Nama halaman dan URL slug wajib diisi.' },
        { status: 400 }
      );
    }

    // 🛡️ FW 12: Autentikasi Tenant & Proteksi IDOR/BOLA
    const auth = authenticateTenantRequest(req, store_id);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 403 });
    }

    const slug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-');

    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: 'Format URL slug tidak valid (hanya huruf, angka, strip).' },
        { status: 400 }
      );
    }

    // Fetch existing store
    const { data: store, error } = await supabaseAdmin
      .from('stores')
      .select('id, store_name, slug, owner_phone, custom_pages')
      .eq('id', store_id)
      .single();

  if (error || !store) {
    return NextResponse.json({ error: 'Website tidak ditemukan.' }, { status: 404 });
  }

  const existingPages = (store.custom_pages || []) as CustomPage[];

  // Cek apakah slug halaman sudah ada
  if (existingPages.some((p) => p.slug === slug)) {
    return NextResponse.json(
      { error: `Halaman dengan alamat /${slug} sudah ada di website ini.` },
      { status: 409 }
    );
  }

  // Jika pembayaran disimulasikan / langsung bayar
  const newPage: CustomPage = {
    id: `page-${Date.now()}`,
    store_id: store.id,
    title,
    slug,
    content: content || `Halaman resmi ${title} dari ${store.store_name}.`,
    is_published: true,
    paid_amount: ADDON_PAGE_PRICE_PER_YEAR,
    payment_status: 'paid',
    created_at: new Date().toISOString(),
  };

  const updatedPages = [...existingPages, newPage];

  const { error: updateError } = await supabaseAdmin
    .from('stores')
    .update({
      custom_pages: updatedPages,
      updated_at: new Date().toISOString(),
    })
    .eq('id', store.id);

  if (updateError) {
    return NextResponse.json({ error: 'Gagal menambahkan halaman.' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: `✓ Halaman baru "/${slug}" aktif (+Rp 50.000/thn terverifikasi)!`,
    page: newPage,
    pages: updatedPages,
  });
} catch (err: unknown) {
  const message = err instanceof Error ? err.message : 'Kesalahan server.';
  return NextResponse.json({ error: message }, { status: 500 });
}
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { store_id, page_id, title, content, is_published } = body;

    if (!store_id || !page_id) {
      return NextResponse.json({ error: 'ID Website dan Halaman wajib diisi.' }, { status: 400 });
    }

    // 🛡️ FW 12: Autentikasi Tenant & Proteksi IDOR/BOLA
    const auth = authenticateTenantRequest(req, store_id);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 403 });
    }

    const { data: store } = await supabaseAdmin
      .from('stores')
      .select('id, custom_pages')
      .eq('id', store_id)
      .single();

    if (!store) {
      return NextResponse.json({ error: 'Website tidak ditemukan.' }, { status: 404 });
    }

    const existingPages = (store.custom_pages || []) as CustomPage[];
    const updatedPages = existingPages.map((p) => {
      if (p.id === page_id) {
        return {
          ...p,
          title: title ?? p.title,
          content: content ?? p.content,
          is_published: is_published !== undefined ? is_published : p.is_published,
        };
      }
      return p;
    });

    await supabaseAdmin
      .from('stores')
      .update({
        custom_pages: updatedPages,
        updated_at: new Date().toISOString(),
      })
      .eq('id', store_id);

    return NextResponse.json({
      success: true,
      message: '✓ Halaman berhasil diperbarui!',
      pages: updatedPages,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { store_id, page_id } = body;

    if (!store_id || !page_id) {
      return NextResponse.json({ error: 'ID Website dan Halaman wajib diisi.' }, { status: 400 });
    }

    // 🛡️ FW 12: Autentikasi Tenant & Proteksi IDOR/BOLA
    const auth = authenticateTenantRequest(req, store_id);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 403 });
    }

    const { data: store } = await supabaseAdmin
      .from('stores')
      .select('id, custom_pages')
      .eq('id', store_id)
      .single();

    if (!store) {
      return NextResponse.json({ error: 'Toko tidak ditemukan.' }, { status: 404 });
    }

    const existingPages = (store.custom_pages || []) as CustomPage[];
    const filtered = existingPages.filter((p) => p.id !== page_id);

    await supabaseAdmin
      .from('stores')
      .update({
        custom_pages: filtered,
        updated_at: new Date().toISOString(),
      })
      .eq('id', store_id);

    return NextResponse.json({
      success: true,
      message: 'Halaman berhasil dihapus.',
      pages: filtered,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
