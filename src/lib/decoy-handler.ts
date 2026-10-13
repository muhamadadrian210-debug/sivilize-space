import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * -----------------------------------------------------------------------------
 * ENTERPRISE DECOY HONEYPOT DISPATCHER (BAB VIII)
 * PT SIVILIZE CORP INDONESIA — 20-LAYER ZERO TRUST HONEYPOT MESH
 * -----------------------------------------------------------------------------
 */
export async function triggerDecoyTrap(
  req: NextRequest,
  decoyName: string,
  layer: number,
  options: { delayMs?: number; customMessage?: string; status?: number } = {}
) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  try {
    await supabaseAdmin.from('security_blacklist').insert([
      {
        ip_address: ip,
        violation_type: `honeypot_trap_layer_${layer}`,
        triggered_firewall_layer: layer,
        honeypot_name: decoyName,
        evidence_payload: JSON.stringify({
          url: req.url,
          method: req.method,
          userAgent,
          headers: Object.fromEntries(req.headers.entries()),
        }),
      },
    ]);
  } catch {
    // Fail safe
  }

  // HP 05 Tarpit Delay: Tahan koneksi bot untuk menghabiskan memory scanner
  if (options.delayMs && options.delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, options.delayMs));
  }

  const status = options.status || 418;
  const message =
    options.customMessage ||
    `[SIVILIZE CYBER SIEM] Access Denied. Layer ${layer} Honeypot "${decoyName}" triggered. IP logged to Bareskrim Siber Polri sync queue.`;

  return new NextResponse(
    `<html><body style="background:#090d16;color:#22c55e;font-family:monospace;padding:40px;line-height:1.6">` +
      `<h2 style="color:#ef4444">[PT SIVILIZE CORP INDONESIA — CYBER SECURITY SHIELD]</h2>` +
      `<p><strong>STATUS ${status} — HONEYPOT TRAP ACTIVATED</strong></p>` +
      `<p>${message}</p>` +
      `<p style="color:#64748b">Incident Reference: ${Date.now()}-${layer} | Evidence Captured.</p>` +
      `</body></html>`,
    {
      status,
      headers: { 'Content-Type': 'text/html' },
    }
  );
}
