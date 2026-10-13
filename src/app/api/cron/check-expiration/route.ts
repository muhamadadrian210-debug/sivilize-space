import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * -----------------------------------------------------------------------------
 * SIVILIZESPACE AUTOMATED EXPIRATION & LIFECYCLE CRON
 * PT SIVILIZE CORP INDONESIA — AUTONOMOUS BILLING AUDIT ENGINE
 * -----------------------------------------------------------------------------
 * Dijadwalkan berjalan setiap hari pukul 00:01 WITA (via Vercel Cron).
 * Tugas Utama:
 * 1. Otomatis nonaktifkan (is_active = false) website yang masa sewanya telah habis.
 * 2. Mengidentifikasi akun yang mendekati masa kedaluwarsa (H-7 & H-3) untuk antrean notifikasi.
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Proteksi Cron Secret (Vercel Cron Authorization Bearer)
    if (process.env.NODE_ENV === 'production' && cronSecret) {
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Akses Cron ditolak.' }, { status: 401 });
      }
    }

    const now = new Date();
    const nowIso = now.toISOString();

    // 1. NONAKTIFKAN TOKO YANG SUDAH EXPIRED
    const { data: expiredStores, error: fetchExpiredError } = await supabaseAdmin
      .from('stores')
      .select('id, slug, store_name, owner_phone, expired_at')
      .eq('is_active', true)
      .not('expired_at', 'is', null)
      .lt('expired_at', nowIso);

    if (fetchExpiredError) {
      return NextResponse.json({ error: fetchExpiredError.message }, { status: 500 });
    }

    let deactivatedCount = 0;
    if (expiredStores && expiredStores.length > 0) {
      const expiredIds = expiredStores.map((s) => s.id);
      const { error: updateError } = await supabaseAdmin
        .from('stores')
        .update({
          is_active: false,
          updated_at: nowIso,
        })
        .in('id', expiredIds);

      if (!updateError) {
        deactivatedCount = expiredIds.length;
      }
    }

    // 2. DETEKSI TOKO YANG AKAN EXPIRED (H-7 dan H-3)
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();

    const { data: upcomingExpiredStores } = await supabaseAdmin
      .from('stores')
      .select('id, slug, store_name, owner_phone, expired_at')
      .eq('is_active', true)
      .gte('expired_at', nowIso)
      .lte('expired_at', sevenDaysFromNow);

    const expiringIn3Days = (upcomingExpiredStores || []).filter(
      (s) => s.expired_at && s.expired_at <= threeDaysFromNow
    );

    return NextResponse.json({
      success: true,
      timestamp: nowIso,
      action_summary: {
        deactivated_expired_stores: deactivatedCount,
        stores_expiring_within_7_days: upcomingExpiredStores?.length || 0,
        stores_expiring_within_3_days: expiringIn3Days.length,
      },
      expired_stores_list: expiredStores?.map((s) => ({
        slug: s.slug,
        expired_at: s.expired_at,
        owner_phone: s.owner_phone,
      })),
      urgency_renewal_queue: expiringIn3Days.map((s) => ({
        slug: s.slug,
        store_name: s.store_name,
        owner_phone: s.owner_phone,
        expired_at: s.expired_at,
      })),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan sistem cron.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
