import { NextRequest } from 'next/server';
import { triggerDecoyTrap } from '@/lib/decoy-handler';

/**
 * 🍯 HONEYPOT 18: Fake Cloud Credentials Canary File (FW 18)
 * Menangkap penyerang / bot yang mencari file backup kredensial sensitif.
 */
export async function GET(req: NextRequest) {
  return triggerDecoyTrap(req, 'Decoy Backup Credentials File (/sivilize_master_credentials.txt.bak)', 18);
}
