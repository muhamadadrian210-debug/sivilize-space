import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'Perimeter Blackhole Sinkhole Route', 1);
}

export async function POST(req: NextRequest) {
  return triggerDecoyTrap(req, 'Perimeter Blackhole Sinkhole Route', 1);
}
