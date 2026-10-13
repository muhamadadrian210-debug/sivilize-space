import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

/**
 * 🍯 HONEYPOT 15: Unsafe Mutation GET Request Trap (FW 15)
 * Menangkap web crawler / penyerang yang mencoba memicu mutasi hapus via HTTP GET.
 */
export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'Unsafe Mutation GET Route Trap (/api/store/delete)', 15);
}

export async function POST(req: NextRequest) {
  return triggerDecoyTrap(req, 'Unsafe Mutation Trap (/api/store/delete)', 15);
}
