import crypto from 'crypto';
import type { PlanTier, BillingCycle } from '@/types/database';

/**
 * -----------------------------------------------------------------------------
 * MIDTRANS PAYMENT ENGINE & KRIPTOGRAFI SHA512 (BAB III & MICRO-SPEC 6)
 * PT SIVILIZE CORP INDONESIA — AKUN MERCHANT INDIVIDU (SIVILIZE CORP)
 * -----------------------------------------------------------------------------
 */

export const PRICING_PLANS = {
  mikro: {
    name: 'Paket Mikro (1 Halaman)',
    bulanan: { amount: 39000, hasFreeDomain: false, domainType: 'subdomain' },
    tahunan: { amount: 349000, hasFreeDomain: false, domainType: 'subdomain' },
  },
  pro: {
    name: 'Paket Pro (2-3 Halaman)',
    bulanan: { amount: 69000, hasFreeDomain: false, domainType: 'subdomain' },
    tahunan: { amount: 599000, hasFreeDomain: true, domainType: '.my.id / .biz.id' },
  },
  bisnis: {
    name: 'Paket Bisnis (4-5 Halaman)',
    bulanan: { amount: 99000, hasFreeDomain: false, domainType: 'subdomain' },
    tahunan: { amount: 899000, hasFreeDomain: true, domainType: '.COM' },
  },
};

/**
 * Verifikasi Hash SHA512 Webhook Midtrans (Micro-Spec 6 & FW 14)
 * Signature formula: SHA512(order_id + status_code + gross_amount + ServerKey)
 */
export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string,
  serverKey: string
): boolean {
  if (!serverKey || !signatureKey) return false;

  const payload = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const computedHash = crypto.createHash('sha512').update(payload).digest('hex');

  return computedHash.toLowerCase() === signatureKey.toLowerCase();
}

/**
 * Hitung masa aktif langganan berdasarkan billing cycle + 3 Hari Grace Period (Micro-Spec 12)
 */
export function calculateExpirationDate(
  currentExpiredAt: string | null,
  billingCycle: BillingCycle
): string {
  const baseDate = currentExpiredAt && new Date(currentExpiredAt) > new Date()
    ? new Date(currentExpiredAt)
    : new Date();

  const daysToAdd = billingCycle === 'tahunan' ? 365 + 3 : 30 + 3; // +3 hari toleransi WITA
  baseDate.setDate(baseDate.getDate() + daysToAdd);

  return baseDate.toISOString();
}
