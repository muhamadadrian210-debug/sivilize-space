'use client';

import React from 'react';
import Link from 'next/link';
import type { Store, Product } from '@/types/database';
import { formatRupiah, normalizeWhatsAppPhone } from '@/lib/utils';
import {
  UserCheck,
  Award,
  MessageCircle,
  MapPin,
  ExternalLink,
  Briefcase,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface ProfileTemplateProps {
  store: Store;
  products: Product[];
}

export function ProfileTemplate({ store, products }: ProfileTemplateProps) {
  const phone = normalizeWhatsAppPhone(store.owner_phone);

  const handleContactWhatsApp = (serviceName?: string) => {
    let text = `Halo *${store.store_name}*, saya tertarik untuk konsultasi / menggunakan jasa Anda`;
    if (serviceName) {
      text += ` untuk layanan *${serviceName}*`;
    }
    text += `. Boleh tahu info jadwal atau ketersediaan waktu luang Anda? Terima kasih!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      data-theme={store.theme_id || 'corporate-clean'}
      className="min-h-screen mobile-dvh bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col font-sans"
    >
      <div className="max-w-2xl w-full mx-auto px-4 py-10 sm:px-6 flex-1 flex flex-col items-center">
        {/* 1. Avatar & Verified Badge */}
        <div className="relative mb-4">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[var(--theme-card)] shadow-xl bg-[var(--theme-card)]">
            {store.logo_url ? (
              <img
                src={store.logo_url}
                alt={store.store_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--theme-accent)] text-white text-3xl font-black">
                {store.store_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-[var(--theme-bg)]">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        {/* 2. Nama, Gelar & Legalitas */}
        <h1 className="text-2xl sm:text-3xl font-black text-center tracking-tight">
          {store.store_name}
        </h1>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 mt-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Praktisi Resmi & Berlisensi</span>
        </div>

        {store.description && (
          <p className="mt-3 text-xs sm:text-sm opacity-80 text-center max-w-md leading-relaxed">
            {store.description}
          </p>
        )}

        {/* 3. Tombol Utama Hubungi Sekarang */}
        <div className="w-full mt-6">
          <button
            onClick={() => handleContactWhatsApp()}
            className="w-full py-3.5 rounded-2xl bg-[var(--theme-accent)] hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[var(--theme-accent)]/25 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Jadwalkan Konsultasi via WhatsApp</span>
          </button>
        </div>

        {/* 4. Layanan & Sorotan Portofolio */}
        <div className="w-full mt-8">
          <h2 className="text-xs font-extrabold uppercase tracking-wider opacity-75 mb-3 text-left">
            Layanan & Keahlian Khusus
          </h2>

          <div className="space-y-3">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() => handleContactWhatsApp(item.name)}
                className="p-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm group-hover:text-[var(--theme-accent)] transition-colors truncate">
                      {item.name}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-xs opacity-75 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  )}
                  <p className="text-xs font-black text-[var(--theme-accent)] mt-1">
                    {formatRupiah(item.price)}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-center shrink-0 group-hover:bg-[var(--theme-accent)] group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Alamat & Titik Praktik */}
        {store.address && (
          <div className="w-full mt-6 p-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] text-center text-xs opacity-85">
            <div className="flex items-center justify-center gap-1.5 font-bold mb-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Lokasi Kantor / Praktik Fisik</span>
            </div>
            <p className="leading-relaxed">{store.address}</p>
          </div>
        )}
      </div>

      {/* 6. Footer Legal */}
      <footer className="py-6 border-t border-[var(--theme-border)] bg-[var(--theme-card)]/50 text-center text-xs opacity-75">
        <p>
          Didukung oleh{' '}
          <Link
            href="/"
            className="font-bold text-[var(--theme-accent)] hover:underline"
          >
            SivilizeSpace
          </Link>{' '}
          — Divisi SiWeb Production, PT Sivilize Corp Indonesia
        </p>
      </footer>
    </div>
  );
}
