import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

/**
 * 🍯 HONEYPOT 12: Predictable Zero-UUID IDOR Trap (FW 12)
 * Menangkap penyerang yang mencoba eksploitasi BOLA / IDOR dengan UUID statis.
 */
export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'Predictable Zero-UUID IDOR Trap', 12);
}

export async function POST(req: NextRequest) {
  return triggerDecoyTrap(req, 'Predictable Zero-UUID IDOR Trap', 12);
}

export async function PUT(req: NextRequest) {
  return triggerDecoyTrap(req, 'Predictable Zero-UUID IDOR Trap', 12);
}

export async function DELETE(req: NextRequest) {
  return triggerDecoyTrap(req, 'Predictable Zero-UUID IDOR Trap', 12);
}
