import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getClientIp } from '@/lib/rate-limiter';

/**
 * -----------------------------------------------------------------------------
 * ENTERPRISE MULTI-LAYER BLACKLIST & BAN ENGINE (BAB XIV & FW 11)
 * PT SIVILIZE CORP INDONESIA — ZERO TRUST SHIELD
 * -----------------------------------------------------------------------------
 * Memeriksa reputasi akses berdasarkan:
 * 1. IP Address
 * 2. Device Fingerprint (Hardware Hash)
 * 3. Nomor WhatsApp Terdaftar
 * 4. Kode Negara / GeoIP (Blokir negara bot ekstrim jika diaktifkan)
 */

export interface BanCheckResult {
  isBanned: boolean;
  reason?: string;
  matchedEntity?: string;
  banLayer?: number;
}

// In-Memory Fast Cache untuk akses instan (<1ms) tanpa selalu hit Supabase
const MEMORY_BANNED_IPS = new Set<string>();
const MEMORY_BANNED_DEVICES = new Set<string>();
const MEMORY_BANNED_PHONES = new Set<string>();

// Daftar negara dengan tingkat serangan bot tinggi yang diblokir pendaftaran/transaksinya
// (Trafik Indonesia 'ID' dan crawler search engine selalu diizinkan)
const STRICT_GEO_BLOCKED_COUNTRIES = new Set<string>([
  'RU', // Russia (High scanner rate)
  'KP', // North Korea
  'NG', // Nigeria (Financial scams)
  'IR', // Iran
]);

export function getClientCountry(req: NextRequest): string {
  const cfCountry = req.headers.get('cf-ipcountry');
  if (cfCountry) return cfCountry.toUpperCase().trim();

  const vercelCountry = req.headers.get('x-vercel-ip-country');
  if (vercelCountry) return vercelCountry.toUpperCase().trim();

  return 'ID'; // Default lokal
}

export function getDeviceFingerprintFromReq(req: NextRequest): string | null {
  const headerFp = req.headers.get('x-device-fingerprint');
  if (headerFp && headerFp.trim()) return headerFp.trim();
  return null;
}

/**
 * Periksa apakah pengunjung masuk dalam daftar hitam (Blacklist).
 */
export async function checkIsBanned(
  req: NextRequest,
  options: { phone?: string; deviceFp?: string } = {}
): Promise<BanCheckResult> {
  const ip = getClientIp(req);
  const country = getClientCountry(req);
  const deviceFp = options.deviceFp || getDeviceFingerprintFromReq(req);
  const phone = options.phone ? options.phone.replace(/[^0-9]/g, '') : undefined;

  // 1. Cek Geo-blocking Negara Ekstrim
  if (STRICT_GEO_BLOCKED_COUNTRIES.has(country)) {
    return {
      isBanned: true,
      reason: `Akses dari wilayah negara (${country}) dibatasi demi keamanan platform.`,
      matchedEntity: `country:${country}`,
      banLayer: 1,
    };
  }

  // 2. Cek Fast In-Memory Cache
  if (MEMORY_BANNED_IPS.has(ip)) {
    return {
      isBanned: true,
      reason: 'Alamat IP Anda telah diblokir secara permanen oleh sistem keamanan.',
      matchedEntity: `ip:${ip}`,
      banLayer: 2,
    };
  }

  if (deviceFp && MEMORY_BANNED_DEVICES.has(deviceFp)) {
    return {
      isBanned: true,
      reason: 'Perangkat ini telah diblokir karena terindikasi melakukan pelanggaran atau spam.',
      matchedEntity: `device:${deviceFp}`,
      banLayer: 3,
    };
  }

  if (phone && MEMORY_BANNED_PHONES.has(phone)) {
    return {
      isBanned: true,
      reason: 'Nomor WhatsApp ini masuk dalam daftar hitam sistem kami.',
      matchedEntity: `phone:${phone}`,
      banLayer: 4,
    };
  }

  // 3. Cek Database Supabase (Tabel security_blacklist)
  try {
    const checks: string[] = [`ip_address.eq.${ip}`];
    if (deviceFp) checks.push(`honeypot_name.eq.${deviceFp}`);

    const { data: bannedRecords, error } = await supabaseAdmin
      .from('security_blacklist')
      .select('ip_address, violation_type, triggered_firewall_layer, honeypot_name')
      .or(checks.join(','))
      .limit(1);

    if (!error && bannedRecords && bannedRecords.length > 0) {
      const rec = bannedRecords[0];

      // Simpan ke memory cache agar query berikutnya instan
      if (rec.ip_address) MEMORY_BANNED_IPS.add(rec.ip_address);
      if (deviceFp && rec.honeypot_name === deviceFp) MEMORY_BANNED_DEVICES.add(deviceFp);

      return {
        isBanned: true,
        reason: 'Akses ditolak: Aktivitas perangkat Anda terdeteksi melanggar kebijakan keamanan.',
        matchedEntity: rec.ip_address === ip ? `ip:${ip}` : `device:${deviceFp}`,
        banLayer: rec.triggered_firewall_layer || 2,
      };
    }
  } catch {
    // Fail-open jika database disconnect sementara agar tidak memutus merchant legal
  }

  return { isBanned: false };
}

/**
 * Daftarkan IP atau Device ke daftar hitam sistem
 */
export async function banEntity(params: {
  ip?: string;
  deviceFp?: string;
  phone?: string;
  reason: string;
  layer?: number;
}) {
  const { ip, deviceFp, phone, reason, layer = 3 } = params;

  if (ip) MEMORY_BANNED_IPS.add(ip);
  if (deviceFp) MEMORY_BANNED_DEVICES.add(deviceFp);
  if (phone) MEMORY_BANNED_PHONES.add(phone.replace(/[^0-9]/g, ''));

  try {
    await supabaseAdmin.from('security_blacklist').insert([
      {
        ip_address: ip || 'unknown',
        violation_type: reason,
        triggered_firewall_layer: layer,
        honeypot_name: deviceFp || (phone ? `phone:${phone}` : 'manual_ban'),
        evidence_payload: JSON.stringify(params),
      },
    ]);
  } catch {
    // Fail safe
  }
}

/**
 * Buat respons HTTP 403 seragam untuk entitas yang diban
 */
export function createBannedResponse(result: BanCheckResult): NextResponse {
  return NextResponse.json(
    {
      error: result.reason || 'Akses ke platform Sivilize Space ditolak oleh sistem keamanan.',
      code: 'FORBIDDEN_ENTITY_BANNED',
      securityLayer: result.banLayer || 2,
    },
    { status: 403 }
  );
}
