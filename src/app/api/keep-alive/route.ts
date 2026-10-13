import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * -----------------------------------------------------------------------------
 * SUPABASE & VERCEL ANTI-SLEEP KEEP-ALIVE BOT (BAB XIV & MICRO-SPEC 3)
 * PT SIVILIZE CORP INDONESIA — AUTOMATED ZERO-SLEEP ENGINE
 * -----------------------------------------------------------------------------
 * Dipanggil secara otomatis oleh:
 * 1. Vercel Cron (setiap 12 jam via vercel.json)
 * 2. GitHub Actions Bot (setiap 6 jam via .github/workflows/keep-alive.yml)
 * 3. Health Monitor Eksternal
 *
 * Mencegah Supabase PostgreSQL Free Tier tertidur (inactivity pause setelah 7 hari)
 * dan memanaskan Vercel Serverless Function agar tidak terkena cold-start lambat.
 */
export async function GET() {
  const startTime = Date.now();

  try {
    // 1. Eksekusi query nyata ke tabel stores untuk menjaga aktivitas I/O Supabase
    const { count, error } = await supabaseAdmin
      .from('stores')
      .select('*', { count: 'exact', head: true });

    const latencyMs = Date.now() - startTime;

    if (error) {
      return NextResponse.json(
        {
          status: 'degraded',
          database: 'error',
          error: error.message,
          latencyMs,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'alive',
      database: 'connected',
      supabase_region: 'Singapore (ap-southeast-1)',
      supabase_latency_ms: latencyMs,
      total_active_stores: count || 0,
      timestamp: new Date().toISOString(),
      server: 'Vercel Anycast Edge Serverless',
      keep_alive_bot: 'PT Sivilize Corp Indonesia Automated Keep-Alive Engine',
      message: 'Supabase PostgreSQL dan Vercel Serverless berhasil dipanaskan. Status aktif 100%.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kegagalan keep-alive.';
    return NextResponse.json(
      {
        status: 'error',
        message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
