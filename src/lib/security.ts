import { z } from 'zod';

/**
 * -----------------------------------------------------------------------------
 * SEMANTIC ANTI-JUDOL & ANTI-PINJOL CONTENT FILTER (FW 19 & BAB XIV.2)
 * PT SIVILIZE CORP INDONESIA — ZERO TOLERANCE SECURITY ENGINE
 * -----------------------------------------------------------------------------
 * Memindai input form untuk mendeteksi sindikat judi online dan pinjol ilegal.
 */

const BANNED_KEYWORDS = [
  'slot',
  'gacor',
  'maxwin',
  'zeus',
  'olympus',
  'pragmatic',
  'togel',
  'toto',
  'depo',
  'deposit pulsa',
  'withdraw kilat',
  'judol',
  'judi online',
  'taruhan bola',
  'sbobet',
  'poker online',
  'pinjol ilegal',
  'dana talangan',
  'pinjaman kilat tanpa ktp',
  'bunga 0% tanpa syarat',
];

export function checkProhibitedContent(text: string): { isViolating: boolean; matchedWord?: string } {
  if (!text) return { isViolating: false };
  const lower = text.toLowerCase();

  for (const word of BANNED_KEYWORDS) {
    // Regex boundary check untuk mendeteksi kata terlarang utuh
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lower)) {
      return { isViolating: true, matchedWord: word };
    }
  }

  return { isViolating: false };
}

// Zod Schema untuk Update Profil Website Bisnis (FW 09: Strip Unknown Keys)
export const updateStoreSchema = z.object({
  id: z.string().uuid(),
  store_name: z.string().min(2).max(100),
  description: z.string().max(500).optional().nullable(),
  category: z.string().max(50),
  template_type: z.enum(['katalog', 'layanan', 'profil']),
  theme_id: z.enum([
    'warm-cafe',
    'midnight-distro',
    'fresh-herbal',
    'pastel-beauty',
    'corporate-clean',
  ]),
  opening_hours: z.string().max(100).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  google_maps_url: z.string().max(500).optional().nullable(),
  banner_url: z.string().url().optional().nullable().or(z.literal('')),
  logo_url: z.string().url().optional().nullable().or(z.literal('')),
  custom_domain: z
    .string()
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i, 'Format domain tidak valid (contoh: bisnisanda.com)')
    .optional()
    .nullable()
    .or(z.literal('')),
});

// Zod Schema untuk Tambah/Edit Produk
export const productSchema = z.object({
  store_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(300).optional().nullable(),
  price: z.number().min(0, 'Harga dilarang minus'),
  category_tag: z.string().max(50).default('Umum'),
  image_url: z.string().optional().nullable(),
  is_available: z.boolean().default(true),
  display_order: z.number().int().default(0),
  stock: z.number().int().min(0).default(0).optional(),
  barcode: z.string().max(64).optional().nullable(),
  sku: z.string().max(64).optional().nullable(),
});
