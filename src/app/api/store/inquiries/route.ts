import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Store, LayoutConfig } from '@/types/database';

export const dynamic = 'force-dynamic';

export interface StoreInquiry {
  id: string;
  reference_id: string;
  type: 'order' | 'consultation' | 'booking';
  customer_name: string;
  customer_phone: string;
  details: string;
  total_amount?: number;
  notes?: string;
  status: 'unread' | 'read' | 'completed';
  created_at: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get('store_id');
    const slug = searchParams.get('slug');

    if (!storeId && !slug) {
      return NextResponse.json({ error: 'store_id atau slug wajib disertakan.' }, { status: 400 });
    }

    let query = supabaseAdmin.from('stores').select('id, layout_config');
    if (storeId) {
      query = query.eq('id', storeId);
    } else if (slug) {
      query = query.eq('slug', slug);
    }

    const { data: store, error } = await query.maybeSingle();

    if (error || !store) {
      return NextResponse.json({ error: 'Toko tidak ditemukan.' }, { status: 404 });
    }

    const layout = (store.layout_config as Record<string, any>) || {};
    const inquiries: StoreInquiry[] = Array.isArray(layout.inquiries) ? layout.inquiries : [];

    return NextResponse.json({
      success: true,
      inquiries: inquiries.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan server.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      store_id,
      slug,
      type = 'consultation',
      customer_name,
      customer_phone,
      details,
      total_amount = 0,
      notes = '',
    } = body;

    if (!customer_name || !customer_phone) {
      return NextResponse.json(
        { error: 'Nama dan nomor kontak WhatsApp pemesan wajib diisi.' },
        { status: 400 }
      );
    }

    let query = supabaseAdmin.from('stores').select('id, store_name, layout_config');
    if (store_id) {
      query = query.eq('id', store_id);
    } else if (slug) {
      query = query.eq('slug', slug);
    } else {
      return NextResponse.json({ error: 'store_id atau slug wajib disertakan.' }, { status: 400 });
    }

    const { data: store, error } = await query.maybeSingle();

    if (error || !store) {
      return NextResponse.json({ error: 'Toko tujuan tidak ditemukan.' }, { status: 404 });
    }

    const layout = (store.layout_config as Record<string, any>) || {};
    const existingInquiries: StoreInquiry[] = Array.isArray(layout.inquiries) ? layout.inquiries : [];

    const prefix = type === 'booking' ? 'RSV' : type === 'order' ? 'ORD' : 'KNS';
    const reference_id = `#${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newInquiry: StoreInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      reference_id,
      type: type as 'order' | 'consultation' | 'booking',
      customer_name: String(customer_name).trim(),
      customer_phone: String(customer_phone).trim(),
      details: String(details || '').trim(),
      total_amount: Number(total_amount) || 0,
      notes: String(notes || '').trim(),
      status: 'unread',
      created_at: new Date().toISOString(),
    };

    // Maksimal simpan 100 pesanan/inquiry terbaru
    const updatedInquiries = [newInquiry, ...existingInquiries].slice(0, 100);

    const { error: updateError } = await supabaseAdmin
      .from('stores')
      .update({
        layout_config: {
          ...layout,
          inquiries: updatedInquiries,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', store.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Gagal mencatat pesan di sistem toko.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reference_id,
      inquiry: newInquiry,
      message: `Pesan berhasil dikirim langsung ke sistem ${store.store_name}.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan server.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
