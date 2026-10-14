import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { productSchema, checkProhibitedContent } from '@/lib/security';
import { authenticateTenantRequest } from '@/lib/session';
import type { Product, Store } from '@/types/database';

export async function GET(req: NextRequest) {
  const storeId = req.nextUrl.searchParams.get('store_id');
  const barcodeQuery = req.nextUrl.searchParams.get('barcode');

  if (!storeId) {
    return NextResponse.json({ error: 'Parameter store_id wajib diisi.' }, { status: 400 });
  }

  // 1. Fetch products from Supabase
  let query = supabaseAdmin
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .order('display_order', { ascending: true });

  const { data: rawProducts, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 2. Fetch product_meta from store layout_config for zero-downtime stock & barcode metadata
  const { data: storeData } = await supabaseAdmin
    .from('stores')
    .select('layout_config')
    .eq('id', storeId)
    .maybeSingle();

  const productMeta = (storeData?.layout_config as any)?.product_meta || {};

  // 3. Merge metadata (stock, barcode, sku)
  const enrichedProducts = (rawProducts || []).map((p: any) => {
    const meta = productMeta[p.id] || {};
    const stock = p.stock !== undefined && p.stock !== null ? Number(p.stock) : (meta.stock !== undefined ? Number(meta.stock) : 10);
    const barcode = p.barcode || meta.barcode || null;
    const sku = p.sku || meta.sku || null;
    const isAvailable = stock <= 0 ? false : (p.is_available ?? true);

    return {
      ...p,
      stock,
      barcode,
      sku,
      is_available: isAvailable,
    } as Product;
  });

  // Filter by barcode if requested (for quick POS scanner lookup)
  if (barcodeQuery) {
    const filtered = enrichedProducts.filter((p) => p.barcode && p.barcode.toLowerCase() === barcodeQuery.trim().toLowerCase());
    return NextResponse.json({ products: filtered });
  }

  return NextResponse.json({ products: enrichedProducts });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Validasi Zod Skema
    const parsed = productSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi data gagal.', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 🛡️ FW 12: Autentikasi Tenant & Proteksi IDOR/BOLA
    const auth = authenticateTenantRequest(req, data.store_id);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 403 });
    }

    // 2. 🛡️ FW 19: Scanner Teks Anti-Judol
    const judolCheck = checkProhibitedContent(`${data.name} ${data.description || ''}`);
    if (judolCheck.isViolating) {
      return NextResponse.json(
        { error: `Item mengandung kata terlarang (${judolCheck.matchedWord}).` },
        { status: 403 }
      );
    }

    const stock = data.stock ?? 10;
    const barcode = data.barcode?.trim() || null;
    const sku = data.sku?.trim() || null;
    const isAvailable = stock <= 0 ? false : data.is_available;

    // 3. Insert ke Supabase dengan Graceful Fallback
    let insertedProduct: any = null;

    // Coba insert lengkap dengan stock, barcode, sku
    const { data: fullInsert, error: fullError } = await supabaseAdmin
      .from('products')
      .insert([
        {
          store_id: data.store_id,
          name: data.name,
          description: data.description,
          price: data.price,
          category_tag: data.category_tag,
          image_url: data.image_url || null,
          is_available: isAvailable,
          display_order: data.display_order,
          stock,
          barcode,
          sku,
        },
      ])
      .select()
      .single();

    if (!fullError && fullInsert) {
      insertedProduct = fullInsert;
    } else {
      // Fallback jika database belum ada kolom stock/barcode/sku
      const { data: fallbackInsert, error: fallbackError } = await supabaseAdmin
        .from('products')
        .insert([
          {
            store_id: data.store_id,
            name: data.name,
            description: data.description,
            price: data.price,
            category_tag: data.category_tag,
            image_url: data.image_url || null,
            is_available: isAvailable,
            display_order: data.display_order,
          },
        ])
        .select()
        .single();

      if (fallbackError) {
        return NextResponse.json({ error: fallbackError.message }, { status: 500 });
      }

      insertedProduct = fallbackInsert;

      // Simpan stock, barcode, sku di layout_config.product_meta
      try {
        const { data: store } = await supabaseAdmin
          .from('stores')
          .select('layout_config')
          .eq('id', data.store_id)
          .single();

        const config = (store?.layout_config as any) || {};
        const meta = config.product_meta || {};
        meta[insertedProduct.id] = { stock, barcode, sku };

        await supabaseAdmin
          .from('stores')
          .update({
            layout_config: {
              ...config,
              product_meta: meta,
            },
          })
          .eq('id', data.store_id);
      } catch {
        // Non-blocking
      }
    }

    return NextResponse.json({
      success: true,
      product: {
        ...insertedProduct,
        stock,
        barcode,
        sku,
        is_available: isAvailable,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan internal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const { id, store_id, stock, barcode, sku, ...updates } = rawBody;

    if (!id || !store_id) {
      return NextResponse.json({ error: 'ID produk dan store_id wajib diisi.' }, { status: 400 });
    }

    // 🛡️ FW 12: Autentikasi Tenant & Proteksi IDOR/BOLA
    const auth = authenticateTenantRequest(req, store_id);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 403 });
    }

    const cleanStock = stock !== undefined ? Number(stock) : undefined;
    const cleanBarcode = barcode !== undefined ? (barcode ? String(barcode).trim() : null) : undefined;
    const cleanSku = sku !== undefined ? (sku ? String(sku).trim() : null) : undefined;

    // Atur is_available jika stock di-update
    let isAvailable = updates.is_available;
    if (cleanStock !== undefined) {
      if (cleanStock <= 0) {
        isAvailable = false;
      }
    }

    // 1. Coba update kolom langsung
    const updatePayload: any = {
      ...updates,
      updated_at: new Date().toISOString(),
    };
    if (isAvailable !== undefined) updatePayload.is_available = isAvailable;
    if (cleanStock !== undefined) updatePayload.stock = cleanStock;
    if (cleanBarcode !== undefined) updatePayload.barcode = cleanBarcode;
    if (cleanSku !== undefined) updatePayload.sku = cleanSku;

    const { data: updatedProduct, error: updateError } = await supabaseAdmin
      .from('products')
      .update(updatePayload)
      .eq('id', id)
      .eq('store_id', store_id)
      .select()
      .single();

    if (updateError) {
      // Fallback jika kolom stock/barcode belum ada
      const fallbackPayload: any = {
        ...updates,
        updated_at: new Date().toISOString(),
      };
      if (isAvailable !== undefined) fallbackPayload.is_available = isAvailable;

      const { data: fallbackProduct, error: fallbackErr } = await supabaseAdmin
        .from('products')
        .update(fallbackPayload)
        .eq('id', id)
        .eq('store_id', store_id)
        .select()
        .single();

      if (fallbackErr) {
        return NextResponse.json({ error: fallbackErr.message }, { status: 500 });
      }

      // Simpan di layout_config.product_meta
      try {
        const { data: store } = await supabaseAdmin
          .from('stores')
          .select('layout_config')
          .eq('id', store_id)
          .single();

        const config = (store?.layout_config as any) || {};
        const meta = config.product_meta || {};
        const existing = meta[id] || {};

        meta[id] = {
          stock: cleanStock !== undefined ? cleanStock : existing.stock,
          barcode: cleanBarcode !== undefined ? cleanBarcode : existing.barcode,
          sku: cleanSku !== undefined ? cleanSku : existing.sku,
        };

        await supabaseAdmin
          .from('stores')
          .update({
            layout_config: {
              ...config,
              product_meta: meta,
            },
          })
          .eq('id', store_id);
      } catch {
        // Non-blocking
      }

      return NextResponse.json({
        success: true,
        product: {
          ...fallbackProduct,
          stock: cleanStock,
          barcode: cleanBarcode,
          sku: cleanSku,
        },
      });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan internal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, store_id } = await req.json();

    if (!id || !store_id) {
      return NextResponse.json({ error: 'ID produk dan store_id wajib diisi.' }, { status: 400 });
    }

    // 🛡️ FW 12: Autentikasi Tenant & Proteksi IDOR/BOLA
    const auth = authenticateTenantRequest(req, store_id);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 403 });
    }

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id)
      .eq('store_id', store_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Hapus dari layout_config.product_meta jika ada
    try {
      const { data: store } = await supabaseAdmin
        .from('stores')
        .select('layout_config')
        .eq('id', store_id)
        .single();

      const config = (store?.layout_config as any) || {};
      if (config.product_meta && config.product_meta[id]) {
        delete config.product_meta[id];
        await supabaseAdmin
          .from('stores')
          .update({ layout_config: config })
          .eq('id', store_id);
      }
    } catch {
      // Non-blocking
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan internal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
