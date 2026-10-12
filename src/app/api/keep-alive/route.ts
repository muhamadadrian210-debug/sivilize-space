import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * -----------------------------------------------------------------------------
 * SUPABASE ANTI-SLEEP KEEP-ALIVE CRON BOT (MICRO-SPEC 3)
 * PT SIVILIZE CORP INDONESIA — AUTOMATED HIGH AVAILABILITY ENGINE
 * -----------------------------------------------------------------------------
 * Dipanggil secara berkala (misal tiap 24 jam via Vercel Cron) untuk mencegah
 * project PostgreSQL gratisan tertidur setelah 7 hari idle.
 */
export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from('stores')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json(
        { status: 'error', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'alive',
      total_active_stores: count || 0,
      timestamp: new Date().toISOString(),
      engine: 'Supabase PostgreSQL Cloud (Singapore ap-southeast-1)',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kegagalan keep-alive.';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}
