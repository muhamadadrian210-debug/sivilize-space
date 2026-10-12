import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Sewa Website Bisnis Siap Pakai & Mandiri No. 1 Indonesia | Sivilize Space',
    template: '%s | Sivilize Space — Sewa Website Mandiri UMKM',
  },
  description:
    'Sewa website bisnis siap pakai & mandiri terbaik di Indonesia. Aktif dalam 60 detik, 100% transaksi dan aktivasi selesai langsung di web tanpa ribet WA, QRIS otomatis, Anycast Edge SLA 99.8%. PT Sivilize Corp Indonesia (NIB: 0207260103661).',
  keywords: [
    'sewa website',
    'sewa website bisnis',
    'sewa website murah',
    'jasa sewa website indonesia',
    'sewa web siap pakai',
    'platform sewa website mandiri',
    'sewa website umkm',
    'sewa web profesional',
    'sewa website portofolio profil jasa',
    'bikin website mandiri instan',
    'alternatif web developer mahal',
    'waas website as a service indonesia',
    'sivilize space',
    'pt sivilize corp indonesia',
    'website mandiri ritel fnb bengkel klinik salon',
  ],
  authors: [{ name: 'PT Sivilize Corp Indonesia', url: 'https://sivilizespace.vercel.app' }],
  creator: 'PT Sivilize Corp Indonesia',
  publisher: 'PT Sivilize Corp Indonesia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sivilizespace.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sewa Website Bisnis Siap Pakai & Mandiri No. 1 Indonesia | Sivilize Space',
    description:
      'Sewa website bisnis mandiri siap pakai dalam 60 detik. 100% diselesaikan langsung di web tanpa repot chat WA, transaksi QRIS otomatis, hosting Anycast Edge global. Resmi PT Sivilize Corp Indonesia.',
    url: 'https://sivilizespace.vercel.app',
    siteName: 'Sivilize Space',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sewa Website Bisnis Siap Pakai & Mandiri No. 1 Indonesia | Sivilize Space',
    description:
      'Sewa website bisnis mandiri siap pakai dalam 60 detik. 100% selesai di web, transaksi QRIS otomatis.',
    creator: '@sivilizecorp',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://sivilizespace.vercel.app/#organization',
        name: 'PT SIVILIZE CORP INDONESIA',
        legalName: 'PT SIVILIZE CORP INDONESIA',
        url: 'https://sivilizespace.vercel.app',
        logo: 'https://sivilizespace.vercel.app/logo.svg',
        email: 'sivilizecorpindonesia@gmail.com',
        description:
          'Penyedia infrastruktur Website-as-a-Service (WaaS) dan sewa website bisnis mandiri bagi UMKM dan korporasi Indonesia.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kota Kupang',
          addressRegion: 'Nusa Tenggara Timur',
          addressCountry: 'ID',
        },
        identifier: {
          '@type': 'PropertyValue',
          name: 'NIB',
          value: '0207260103661',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sivilizespace.vercel.app/#website',
        url: 'https://sivilizespace.vercel.app',
        name: 'Sivilize Space',
        description: 'Platform Sewa Website Bisnis Siap Pakai & Mandiri UMKM Indonesia',
        publisher: {
          '@id': 'https://sivilizespace.vercel.app/#organization',
        },
        inLanguage: 'id-ID',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Sivilize Space — Platform Sewa Website',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All Modern Web Browsers',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'IDR',
          lowPrice: 349000,
          highPrice: 899000,
          offerCount: 3,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '342',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  };

  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0A0D14] selection:bg-neutral-900 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
