import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

/**
 * 🍯 HONEYPOT 11: Fake Admin Portal Lure (FW 11)
 * Memancing automated scanner yang mencari URL login admin umum.
 */
export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'Fake Admin Console Lure (/admin-console)', 11, {
    delayMs: 3000,
  });
}

export async function POST(req: NextRequest) {
  return triggerDecoyTrap(req, 'Fake Admin Console Lure (/admin-console)', 11, {
    delayMs: 3000,
  });
}
