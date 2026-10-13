import { NextRequest, NextResponse } from 'next/server';

/**
 * -----------------------------------------------------------------------------
 * ENTERPRISE SLIDING-WINDOW API RATE LIMITER (BAB XIV & FW SECURITY ENGINE)
 * PT SIVILIZE CORP INDONESIA — ZERO-DOWNTIME DEFENSE MESH
 * -----------------------------------------------------------------------------
 * Melindungi endpoint publik dari abuse, spam bot, dan pengurasan kuota API.
 * Berjalan in-memory tanpa dependensi eksternal, hemat memori, dan auto-cleanup.
 */

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // Unix timestamp in ms
  retryAfterSec: number;
}

export function getClientIp(req: NextRequest): string {
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return '127.0.0.1';
}

export class SlidingWindowRateLimiter {
  private hits: Map<string, number[]> = new Map();
  private windowMs: number;
  private max: number;
  private name: string;
  private lastPrune: number = Date.now();

  constructor(options: { windowMs: number; max: number; name: string }) {
    this.windowMs = options.windowMs;
    this.max = options.max;
    this.name = options.name;
  }

  /**
   * Bersihkan data usang setiap 60 detik untuk mencegah memory leak
   */
  private pruneOldRecords(now: number) {
    if (now - this.lastPrune < 60_000) return;
    this.lastPrune = now;

    const threshold = now - this.windowMs;
    for (const [key, timestamps] of this.hits.entries()) {
      const valid = timestamps.filter((t) => t > threshold);
      if (valid.length === 0) {
        this.hits.delete(key);
      } else {
        this.hits.set(key, valid);
      }
    }
  }

  public check(req: NextRequest, customKeyPrefix?: string): RateLimitResult {
    const ip = getClientIp(req);
    const key = customKeyPrefix ? `${this.name}:${customKeyPrefix}:${ip}` : `${this.name}:${ip}`;
    const now = Date.now();

    this.pruneOldRecords(now);

    const windowStart = now - this.windowMs;
    const currentTimestamps = this.hits.get(key) || [];
    const validTimestamps = currentTimestamps.filter((t) => t > windowStart);

    if (validTimestamps.length >= this.max) {
      const oldestValid = validTimestamps[0] || windowStart;
      const resetTime = oldestValid + this.windowMs;
      const retryAfterSec = Math.max(1, Math.ceil((resetTime - now) / 1000));

      return {
        success: false,
        limit: this.max,
        remaining: 0,
        resetTime,
        retryAfterSec,
      };
    }

    validTimestamps.push(now);
    this.hits.set(key, validTimestamps);

    const resetTime = now + this.windowMs;
    return {
      success: true,
      limit: this.max,
      remaining: Math.max(0, this.max - validTimestamps.length),
      resetTime,
      retryAfterSec: 0,
    };
  }

  public toResponse(
    result: RateLimitResult,
    customErrorMessage?: string
  ): NextResponse {
    const defaultMsg = `Terlalu banyak permintaan (${this.name}). Mohon tunggu ${result.retryAfterSec} detik lagi.`;
    const response = NextResponse.json(
      {
        error: customErrorMessage || defaultMsg,
        retryAfter: result.retryAfterSec,
      },
      { status: 429 }
    );

    response.headers.set('Retry-After', String(result.retryAfterSec));
    response.headers.set('X-RateLimit-Limit', String(result.limit));
    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
    response.headers.set('X-RateLimit-Reset', String(result.resetTime));

    return response;
  }
}

// 🛡️ PRESET RATE LIMITERS UNTUK SELURUH PLATFORM SIVILIZE SPACE:

// 1. Chatbot AI: Max 12 request per menit per IP (mencegah Gemini free tier RPM jebol)
export const aiChatLimiter = new SlidingWindowRateLimiter({
  windowMs: 60 * 1000,
  max: 12,
  name: 'ai-chat',
});

// 2. Pendaftaran Toko: Max 5 pendaftaran per 10 menit per IP (mencegah spam database Supabase)
export const storeRegisterLimiter = new SlidingWindowRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  name: 'store-register',
});

// 3. Login Toko: Max 10 percobaan per menit per IP (lapisan awal sebelum lock akun 5x salah PIN)
export const authLoginLimiter = new SlidingWindowRateLimiter({
  windowMs: 60 * 1000,
  max: 10,
  name: 'auth-login',
});

// 4. File Upload (Logo, Banner, Produk): Max 15 upload per menit per IP
export const uploadLimiter = new SlidingWindowRateLimiter({
  windowMs: 60 * 1000,
  max: 15,
  name: 'upload',
});

// 5. Umum / Public Catalog API: Max 60 request per menit per IP
export const generalApiLimiter = new SlidingWindowRateLimiter({
  windowMs: 60 * 1000,
  max: 60,
  name: 'general-api',
});
