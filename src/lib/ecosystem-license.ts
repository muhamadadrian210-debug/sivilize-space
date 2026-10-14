/**
 * ============================================================================
 * SIVILIZE ECOSYSTEM SMART ACTIVATION ENGINE
 * PT SIVILIZE CORP INDONESIA — NIB: 0207260103661
 * ============================================================================
 * Mengatur hak akses dan pembuatan lisensi otomatis untuk:
 * 1. SiKasir POS (Kasir offline, scan barcode, stok fisik - Semua Usaha)
 * 2. Sivilize Dine Lite (Sistem Scan QR Meja - Khusus F&B / Makanan)
 * ============================================================================
 */

export interface EcosystemMetadata {
  licenseKey: string;
  isFoodBusiness: boolean;
  industryPreset: 'fnb' | 'retail' | 'workshop' | 'laundry' | 'barber' | 'pharmacy' | 'services';
  allowedApps: {
    sikasir_pos: boolean;
    sivilize_dine_lite: boolean;
  };
  durationDays: number;
}

export function detectIsFoodCategory(category: string): boolean {
  if (!category) return false;
  const c = category.toLowerCase();
  const foodKeywords = [
    'kuliner',
    'fnb',
    'f&b',
    'kafe',
    'cafe',
    'kopi',
    'coffee',
    'resto',
    'restoran',
    'makan',
    'minum',
    'warung',
    'bakso',
    'mie',
    'catering',
    'katering',
    'cake',
    'bakery',
    'roti',
    'snack',
    'jus',
    'boba',
  ];
  return foodKeywords.some((kw) => c.includes(kw));
}

export function detectIndustryPreset(category: string): EcosystemMetadata['industryPreset'] {
  const c = (category || '').toLowerCase();
  if (detectIsFoodCategory(c)) return 'fnb';
  if (c.includes('bengkel') || c.includes('servis') || c.includes('motor') || c.includes('mobil') || c.includes('otomotif')) {
    return 'workshop';
  }
  if (c.includes('laundry') || c.includes('cuci')) {
    return 'laundry';
  }
  if (c.includes('barber') || c.includes('salon') || c.includes('pangkas') || c.includes('rambut')) {
    return 'barber';
  }
  if (c.includes('apotek') || c.includes('obat') || c.includes('klinik') || c.includes('farmasi')) {
    return 'pharmacy';
  }
  if (c.includes('retail') || c.includes('minimarket') || c.includes('kelontong') || c.includes('distro') || c.includes('sembako') || c.includes('toserba')) {
    return 'retail';
  }
  return 'services';
}

/**
 * Generate Smart License Key yang unik dan membawa informasi paket
 */
export function generateSmartLicenseKey(category: string, billingCycle: 'bulanan' | 'tahunan' = 'tahunan'): string {
  const isFood = detectIsFoodCategory(category);
  const preset = detectIndustryPreset(category);
  const daysSuffix = billingCycle === 'bulanan' ? '30D' : '365D';
  const randomCode = Math.floor(10000 + Math.random() * 90000);

  const prefix = isFood ? 'SIV-FNB' : `SIV-${preset.toUpperCase()}`;
  return `${prefix}-${randomCode}-${daysSuffix}`;
}

/**
 * Resolve metadata lengkap dari sebuah license key
 */
export function parseLicenseMetadata(licenseKey: string, categoryFallback?: string): EcosystemMetadata {
  const key = (licenseKey || '').toUpperCase().trim();
  const isFood = key.includes('FNB') || (categoryFallback ? detectIsFoodCategory(categoryFallback) : false);
  const isMonthly = key.endsWith('30D');
  const durationDays = isMonthly ? 30 : 365;

  let industryPreset: EcosystemMetadata['industryPreset'] = 'services';
  if (isFood || key.includes('FNB')) industryPreset = 'fnb';
  else if (key.includes('WORKSHOP') || key.includes('BENGKEL')) industryPreset = 'workshop';
  else if (key.includes('LAUNDRY')) industryPreset = 'laundry';
  else if (key.includes('BARBER')) industryPreset = 'barber';
  else if (key.includes('PHARMACY') || key.includes('APOTEK')) industryPreset = 'pharmacy';
  else if (key.includes('RETAIL')) industryPreset = 'retail';
  else if (categoryFallback) industryPreset = detectIndustryPreset(categoryFallback);

  return {
    licenseKey: key,
    isFoodBusiness: isFood,
    industryPreset,
    allowedApps: {
      sikasir_pos: true, // Semua kategori usaha berhak mendapatkan SiKasir POS
      sivilize_dine_lite: isFood, // Khusus Makanan/FnB yang mendapatkan Dine Lite QR Meja
    },
    durationDays,
  };
}
