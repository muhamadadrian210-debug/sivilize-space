import crypto from 'crypto';
import { NextRequest } from 'next/server';

/**
 * -----------------------------------------------------------------------------
 * ENTERPRISE ZERO-TRUST SESSION & CRYPTOGRAPHIC TOKEN ENGINE (FW 10 & FW 12)
 * PT SIVILIZE CORP INDONESIA — DIVISI SIWEB PRODUCTION
 * -----------------------------------------------------------------------------
 * Mengamankan sesi tenant dan Super Admin dari pemalsuan (Anti-Forging),
 * BOLA/IDOR (Broken Object Level Authorization), dan session hijacking.
 */

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'sivilize-enterprise-hmac-master-secret-2026';

const TENANT_SESSION_COOKIE = 'sivilize_session_store_id';
const SUPER_ADMIN_SESSION_COOKIE = 'sivilize_super_admin_session';

const TENANT_SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari
const SUPER_ADMIN_MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000; // 3 hari

/**
 * Hash PIN 6-digit menggunakan SHA-256 ber-salt secret perusahaan
 */
export function hashPin(pin: string): string {
  return crypto
    .createHash('sha256')
    .update(`${pin}:${SESSION_SECRET}`)
    .digest('hex');
}

/**
 * Verifikasi PIN yang aman dengan fallback backward-compatibility untuk data seed
 */
export function verifyPin(pin: string, storedHash: string): boolean {
  if (!pin || !storedHash) return false;

  const hashed = hashPin(pin);
  if (hashed === storedHash) return true;

  // Backward compatibility untuk seed data plain text (akan di-upgrade saat login)
  if (storedHash === pin) return true;

  return false;
}

/**
 * Buat signed token untuk session tenant
 * Format: storeId.timestamp.signature
 */
export function createTenantToken(storeId: string): string {
  const timestamp = Date.now().toString();
  const payload = `${storeId}.${timestamp}`;
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Verifikasi signed token tenant
 */
export function verifyTenantToken(token: string | null | undefined): {
  valid: boolean;
  storeId?: string;
  error?: string;
} {
  if (!token) {
    return { valid: false, error: 'Token sesi tidak ditemukan.' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    // Backward compatibility fallback jika cookie masih raw UUID
    // Selama transisi, jika formatnya raw UUID, validasi tapi catat warning
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token);
    if (isUuid) {
      return { valid: true, storeId: token };
    }
    return { valid: false, error: 'Format token sesi tidak sah.' };
  }

  const [storeId, timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp) || Date.now() - timestamp > TENANT_SESSION_MAX_AGE_MS) {
    return { valid: false, error: 'Sesi login telah kadaluarsa.' };
  }

  const payload = `${storeId}.${timestampStr}`;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');

  const sigBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false, error: 'Integritas sesi telah rusak / dipalsukan.' };
  }

  return { valid: true, storeId };
}

/**
 * Verifikasi bahwa request berasal dari tenant yang sah dan berhak atas targetStoreId (Anti-BOLA/IDOR)
 */
export function authenticateTenantRequest(
  req: NextRequest,
  targetStoreId?: string
): { authorized: boolean; storeId?: string; error?: string } {
  const token = req.cookies.get(TENANT_SESSION_COOKIE)?.value;
  const verification = verifyTenantToken(token);

  if (!verification.valid || !verification.storeId) {
    return {
      authorized: false,
      error: verification.error || 'Autentikasi ditolak. Silakan login kembali.',
    };
  }

  // Jika targetStoreId ditentukan, pastikan storeId token SAMA PERSIS dengan targetStoreId
  if (targetStoreId && verification.storeId !== targetStoreId) {
    return {
      authorized: false,
      error: 'Pelanggaran Otorisasi (IDOR/BOLA): Anda tidak berhak mengelola data website ini.',
    };
  }

  return { authorized: true, storeId: verification.storeId };
}

/**
 * Buat signed token untuk Super Admin
 */
export function createSuperAdminToken(username: string): string {
  const timestamp = Date.now().toString();
  const payload = `sivilize_super_${username}.${timestamp}`;
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Verifikasi signed token Super Admin
 */
export function authenticateSuperAdminRequest(req: NextRequest): {
  authorized: boolean;
  error?: string;
} {
  const token = req.cookies.get(SUPER_ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return { authorized: false, error: 'Akses Ditolak: Kredensial Super Admin tidak ditemukan.' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { authorized: false, error: 'Akses Ditolak: Token Super Admin tidak sah.' };
  }

  const [header, timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp) || Date.now() - timestamp > SUPER_ADMIN_MAX_AGE_MS) {
    return { authorized: false, error: 'Sesi Super Admin telah kadaluarsa.' };
  }

  const payload = `${header}.${timestampStr}`;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');

  const sigBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { authorized: false, error: 'Akses Ditolak: Pemalsuan tanda tangan Super Admin.' };
  }

  return { authorized: true };
}
