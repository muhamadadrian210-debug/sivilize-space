import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

/**
 * 🍯 HONEYPOT 10: Decoy Master Override Route (FW 10)
 * Menangkap hacker yang mencoba membobol auth via master key override palsu.
 */
export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'Decoy Master Override Auth Trap', 10);
}

export async function POST(req: NextRequest) {
  return triggerDecoyTrap(req, 'Decoy Master Override Auth Trap', 10);
}
