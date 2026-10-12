import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { productSchema, checkProhibitedContent } from '@/lib/security';

export async function GET(req: NextRequest) {
  const storeId = req.nextUrl.searchParams.get('store_id');
  if (!storeId) {
    return NextResponse.json({ error: 'Parameter store_id wajib diisi.' }, { status: 400 });
  }

  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .order('display_order', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: products || [] });
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

    // 2. 🛡️ FW 19: Scanner Teks Anti-Judol
    const judolCheck = checkProhibitedContent(`${data.name} ${data.description || ''}`);
    if (judolCheck.isViolating) {
      return NextResponse.json(
        { error: `Item mengandung kata terlarang (${judolCheck.matchedWord}).` },
        { status: 403 }
      );
    }

    // 3. Insert ke Supabase
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          store_id: data.store_id,
          name: data.name,
          description: data.description,
          price: data.price,
          category_tag: data.category_tag,
          image_url: data.image_url || null,
          is_available: data.is_available,
          display_order: data.display_order,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan internal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const { id, store_id, ...updates } = rawBody;

    if (!id || !store_id) {
      return NextResponse.json({ error: 'ID produk dan store_id wajib diisi.' }, { status: 400 });
    }

    // Update produk di Supabase
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('store_id', store_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product });
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

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id)
      .eq('store_id', store_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan internal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
