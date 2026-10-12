import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sivilize Space — Platform Sewa Website & Toko Instan Mandiri';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#090D16',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Top Header / Brand Entity */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Architectural S Logo Mark */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              }}
            >
              <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
                <path
                  d="M72 26H38C30.268 26 24 32.268 24 40V42C24 45.3137 26.6863 48 30 48H62C67.5228 48 72 52.4772 72 58V60C72 61.1046 71.1046 62 70 62H48"
                  stroke="#090D16"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M28 74H62C69.732 74 76 67.732 76 60V58C76 54.6863 73.3137 52 70 52H38C32.4772 52 28 47.5228 28 42V40C28 38.8954 28.8954 38 30 38H52"
                  stroke="#090D16"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="50" cy="50" r="5" fill="#10B981" />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '30px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                  SIVILIZE
                </span>
                <span style={{ fontSize: '30px', fontWeight: 400, color: '#94A3B8' }}>
                  SPACE
                </span>
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#10B981',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                PT SIVILIZE CORP INDONESIA • NIB: 0207260103661
              </span>
            </div>
          </div>

          {/* Badge SLA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '999px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              fontSize: '15px',
              fontWeight: 800,
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '999px',
                backgroundColor: '#34D399',
              }}
            />
            <span>SLA 99.8% ANYCAST EDGE</span>
          </div>
        </div>

        {/* Center Main Punchy Text: SEWA WEBSITE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#94A3B8',
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            <span>PLATFORM SEWA WEBSITE TOKO NO. 1 DI INDONESIA</span>
          </div>

          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              margin: 0,
              color: '#FFFFFF',
            }}
          >
            Sewa Website Siap Pakai & Toko Instan Mandiri.
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: '#CBD5E1',
              lineHeight: 1.45,
              margin: 0,
              maxWidth: '960px',
            }}
          >
            Aktif dalam 60 detik. Bebas komisi pihak ketiga, transaksi QRIS otomatis di web,
            infrastruktur Anycast Edge ultra-cepat & panel admin mandiri.
          </p>
        </div>

        {/* Bottom Feature Badges Grid */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: '#E2E8F0', fontWeight: 700 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: '#10B981' }} />
              <span>0% Biaya Komisi Penjualan</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: '#E2E8F0', fontWeight: 700 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: '#10B981' }} />
              <span>QRIS Dinamis & Subdomain Gratis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: '#E2E8F0', fontWeight: 700 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: '#10B981' }} />
              <span>Nota Pembayaran Resmi Sah (NIB)</span>
            </div>
          </div>

          <div
            style={{
              fontSize: '15px',
              color: '#94A3B8',
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            sivilizecorp.my.id
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
