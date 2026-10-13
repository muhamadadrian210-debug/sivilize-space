/**
 * -----------------------------------------------------------------------------
 * LOCAL / VPS KEEP-ALIVE DAEMON BOT (BAB XIV)
 * PT SIVILIZE CORP INDONESIA — 24/7 ZERO-DOWNTIME PULSE
 * -----------------------------------------------------------------------------
 * Script ini bisa dijalankan via Node.js atau PM2 untuk menembak Supabase dan
 * Vercel secara berkala (misal setiap 1 jam atau sekali jalan).
 *
 * Jalankan: node scripts/keep-alive-daemon.mjs
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://keloadmjbnhjiplfarvs.supabase.co';
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_XQng0L6FrVdXPSO9Smae9Q_DuVEg957';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://sivilizecorp.my.id';

async function pulse() {
  console.log(`[${new Date().toISOString()}] 💓 Mengirimkan denyut nadi keep-alive...`);

  // 1. Tembak Supabase REST API Langsung
  try {
    const t0 = Date.now();
    const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/stores?select=count&limit=1`, {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
    });
    const supaLatency = Date.now() - t0;
    console.log(`  ⚡ Supabase DB Pulse: HTTP ${supaRes.status} (${supaLatency}ms) - Terjaga & Aktif`);
  } catch (err) {
    console.warn(`  ⚠️ Supabase Pulse Gagal:`, err.message);
  }

  // 2. Tembak Endpoint Vercel Serverless
  try {
    const t1 = Date.now();
    const vercelRes = await fetch(`${APP_URL}/api/keep-alive`);
    const vercelLatency = Date.now() - t1;
    console.log(`  🚀 Vercel Serverless Pulse: HTTP ${vercelRes.status} (${vercelLatency}ms) - Hangat`);
  } catch (err) {
    console.warn(`  ℹ️ Vercel Ping note:`, err.message);
  }
}

pulse();
