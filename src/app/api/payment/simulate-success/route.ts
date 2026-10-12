import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * 🍯 HONEYPOT 14: Unsigned Webhook / Fake Payment Simulation Trap
 * Menjebak hacker yang mencoba bypass pembayaran dengan menembak API palsu.
 */
export async function GET(req: NextRequest) {
  return handleDecoy(req);
}

export async function POST(req: NextRequest) {
  return handleDecoy(req);
}

async function handleDecoy(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  await supabaseAdmin.from('security_blacklist').insert([
    {
      ip_address: ip,
      violation_type: 'fraud_fake_payment_simulation',
      triggered_firewall_layer: 14,
      honeypot_name: 'Unsigned Webhook Trap',
      evidence_payload: `Attempt to trigger decoy simulate-success endpoint`,
    },
  ]);

  return NextResponse.json(
    { error: 'Akses ditolak. Percobaan manipulasi transaksi telah dicatat ke SIEM PT Sivilize.' },
    { status: 403 }
  );
}
