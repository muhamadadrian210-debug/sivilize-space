import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sivilizespace.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/super-admin/',
          '/wp-admin/',
          '/phpmyadmin/',
        ],
      },
      {
        userAgent: ['Googlebot', 'bingbot', 'Twitterbot', 'facebookexternalhit', 'WhatsApp'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
