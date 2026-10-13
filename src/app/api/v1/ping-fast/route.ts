import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

/**
 * 🍯 HONEYPOT 05: Tarpit Delay Trap (FW 05)
 * Menahan respons bot selama 10 detik untuk menghabiskan memory scanner hacker.
 */
export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'Tarpit Fast Ping Bot Lure', 5, {
    delayMs: 10000,
    customMessage: 'Tarpit delay engaged. Rate limit exhaustion triggered for malicious scanner.',
  });
}

export async function POST(req: NextRequest) {
  return triggerDecoyTrap(req, 'Tarpit Fast Ping Bot Lure', 5, {
    delayMs: 10000,
    customMessage: 'Tarpit delay engaged. Rate limit exhaustion triggered for malicious scanner.',
  });
}
