import { NextRequest, NextResponse } from 'next/server';

/**
 * -----------------------------------------------------------------------------
 * SIVILIZESPACE MULTI-TENANT EDGE MIDDLEWARE (BAB X.1 & 12 MICRO-SPECS)
 * PT SIVILIZE CORP INDONESIA — ZERO CLOUDFLARE ANYCAST EDGE ENGINE
 * -----------------------------------------------------------------------------
 * 1. Micro-Spec 2: Bypass file statis agar tidak membuang kuota Vercel Edge.
 * 2. FW 06 & Micro-Spec 8: Blacklist reserved slug subdomain sistem / perbankan.
 * 3. Rewrites otomatis subdomain *.sivilizecorp.my.id -> /toko/[slug].
 * 4. Rewrites otomatis custom domain klien -> /toko-domain/[currentHost].
 */

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/ (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

// Reserved Slugs Blacklist (FW 06 & Micro-Spec 8)
const RESERVED_SUBDOMAINS = new Set([
  'admin',
  'administrator',
  'api',
  'app',
  'auth',
  'billing',
  'dashboard',
  'bca',
  'mandiri',
  'bri',
  'bni',
  'dana',
  'gopay',
  'ovo',
  'shopeepay',
  'sivilize',
  'sivilizecorp',
  'sivilizespace',
  'system',
  'root',
  'mail',
  'webmail',
  'ftp',
  'cpanel',
  'login',
  'portal',
  'status',
  'support',
  'www',
]);

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // 1. Normalisasi Hostname (Hapus Port dan Huruf Kecilkan)
  const currentHost = hostname.replace(/:\d+$/, '').toLowerCase();

  // 2. Daftar Base Domain Portal Utama Platform
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'sivilizecorp.my.id';
  const baseAppDomains = [
    'sivilizespace.vercel.app',
    baseDomain,
    `www.${baseDomain}`,
    'localhost',
    '127.0.0.1',
  ];

  // 3. Lewatkan akses jika sedang membuka Portal Utama SivilizeSpace
  if (baseAppDomains.includes(currentHost)) {
    return NextResponse.next();
  }

  // 4. Deteksi Subdomain Resmi (*.sivilizecorp.my.id atau *.localhost untuk development)
  const isSubdomainOfBase = currentHost.endsWith(`.${baseDomain}`);
  const isLocalSubdomain = currentHost.endsWith('.localhost');

  if (isSubdomainOfBase || isLocalSubdomain) {
    const subdomain = isSubdomainOfBase
      ? currentHost.replace(`.${baseDomain}`, '')
      : currentHost.replace('.localhost', '');

    // Cegah subdomain reserved / phishing
    if (RESERVED_SUBDOMAINS.has(subdomain)) {
      return NextResponse.next();
    }

    // Rewrite internal URL ke /toko/[slug] dengan query param & path asli
    const rewriteUrl = new URL(
      `/toko/${subdomain}${url.pathname === '/' ? '' : url.pathname}${url.search}`,
      req.url
    );

    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set('x-tenant-slug', subdomain);
    return response;
  }

  // 5. Kasus Custom Domain Pribadi Klien (Paket Pro/Bisnis Tahunan)
  // Contoh: kopisenjakupang.my.id atau tokoanda.com
  const customDomainRewriteUrl = new URL(
    `/toko-domain/${currentHost}${url.pathname === '/' ? '' : url.pathname}${url.search}`,
    req.url
  );

  const response = NextResponse.rewrite(customDomainRewriteUrl);
  response.headers.set('x-custom-domain', currentHost);
  return response;
}
