import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'WP-Admin Exploit Trap', 3);
}

export async function POST(req: NextRequest) {
  return triggerDecoyTrap(req, 'WP-Admin Exploit Trap', 3);
}
