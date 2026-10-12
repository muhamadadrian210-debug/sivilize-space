import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { LayoutConfig } from '@/types/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { store_id, layout_config } = body;

    if (!store_id || !layout_config) {
      return NextResponse.json(
        { error: 'ID Toko dan konfigurasi layout wajib diisi.' },
        { status: 400 }
      );
    }

    // Update layout_config in stores table
    const { data: updatedStore, error } = await supabaseAdmin
      .from('stores')
      .update({
        layout_config: layout_config as LayoutConfig,
        updated_at: new Date().toISOString(),
      })
      .eq('id', store_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating store layout:', error);
      return NextResponse.json(
        { error: 'Gagal menyimpan tata letak toko.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '✓ Tata letak & grid toko berhasil diperbarui!',
      store: updatedStore,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
