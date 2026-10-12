import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function triggerDecoyTrap(req: NextRequest, decoyName: string, layer: number) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  try {
    await supabaseAdmin.from('security_blacklist').insert([
      {
        ip_address: ip,
        violation_type: 'bot_scanner_decoy_hit',
        triggered_firewall_layer: layer,
        honeypot_name: decoyName,
        evidence_payload: JSON.stringify({
          url: req.url,
          method: req.method,
          userAgent,
        }),
      },
    ]);
  } catch {
    // Fail safe
  }

  // Respon HTTP 418 I'm a Teapot
  return new NextResponse(
    "<html><body style='background:#000;color:#0f0;font-family:monospace;padding:40px'><h1>[SIVILIZE CYBER SIEM] 418 I'm a Teapot</h1><p>Probe scanning detected. IP address logged and banned permanently.</p></body></html>",
    {
      status: 418,
      headers: { 'Content-Type': 'text/html' },
    }
  );
}
