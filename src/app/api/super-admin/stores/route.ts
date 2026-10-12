import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Store } from '@/types/database';

export async function GET(req: NextRequest) {
  try {
    // 1. Ambil seluruh data toko
    const { data: stores, error: storesError } = await supabaseAdmin
      .from('stores')
      .select('*')
      .order('created_at', { ascending: false });

    if (storesError) {
      return NextResponse.json({ error: storesError.message }, { status: 500 });
    }

    // 2. Ambil total produk
    const { count: productCount } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true });

    // 3. Ambil log security blacklist
    const { data: blacklistLogs } = await supabaseAdmin
      .from('security_blacklist')
      .select('*')
      .order('banned_at', { ascending: false })
      .limit(20);

    // 4. Hitung statistik
    const allStores = (stores || []) as Store[];
    const activeStores = allStores.filter((s) => s.is_active);
    const suspendedStores = allStores.filter((s) => !s.is_active);

    return NextResponse.json({
      stores: allStores,
      stats: {
        total_stores: allStores.length,
        active_stores: activeStores.length,
        suspended_stores: suspendedStores.length,
        total_products: productCount || 0,
        security_alerts: blacklistLogs?.length || 0,
      },
      blacklist_logs: blacklistLogs || [],
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Kesalahan server.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, store_id, days_to_add } = body;

    if (!store_id) {
      return NextResponse.json({ error: 'Store ID wajib disertakan.' }, { status: 400 });
    }

    // Aksi 1: Emergency Kill-Switch (1-Detik Takedown Toko Pelanggar)
    if (action === 'toggle_kill_switch') {
      const { data: currentStore } = await supabaseAdmin
        .from('stores')
        .select('id, is_active, store_name')
        .eq('id', store_id)
        .single();

      if (!currentStore) {
        return NextResponse.json({ error: 'Toko tidak ditemukan.' }, { status: 404 });
      }

      const nextStatus = !currentStore.is_active;

      const { data: updated, error } = await supabaseAdmin
        .from('stores')
        .update({ is_active: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', store_id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: nextStatus
          ? `Website "${currentStore.store_name}" berhasil DIAKTIFKAN kembali.`
          : `EMERGENCY KILL-SWITCH: Website "${currentStore.store_name}" dinonaktifkan (SUSPENDED).`,
        store: updated,
      });
    }

    // Aksi 2: Perpanjang Masa Aktif Sewa Website Manual (CEO Approval)
    if (action === 'extend_subscription') {
      const days = days_to_add || 30;
      const { data: currentStore } = await supabaseAdmin
        .from('stores')
        .select('id, expired_at, store_name')
        .eq('id', store_id)
        .single();

      if (!currentStore) {
        return NextResponse.json({ error: 'Website tidak ditemukan.' }, { status: 404 });
      }

      const currentExpiry = currentStore.expired_at ? new Date(currentStore.expired_at) : new Date();
      const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
      const newExpiry = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

      const { data: updated, error } = await supabaseAdmin
        .from('stores')
        .update({
          expired_at: newExpiry,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', store_id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Masa sewa "${currentStore.store_name}" berhasil diperpanjang +${days} hari (hingga ${new Date(newExpiry).toLocaleDateString('id-ID')}).`,
        store: updated,
      });
    }

    // Aksi 3: Hapus Permanen Website (Clean Up)
    if (action === 'delete_store') {
      const { error } = await supabaseAdmin.from('stores').delete().eq('id', store_id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Website berhasil dihapus permanen.' });
    }

    return NextResponse.json({ error: 'Aksi tidak dikenali.' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Kesalahan server.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
