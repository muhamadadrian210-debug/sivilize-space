'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Store, Product } from '@/types/database';
import { formatRupiah, normalizeWhatsAppPhone } from '@/lib/utils';
import {
  Sparkles,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Navigation,
  Car,
  Scissors,
} from 'lucide-react';

interface ServiceTemplateProps {
  store: Store;
  products: Product[];
}

export function ServiceTemplate({ store, products }: ServiceTemplateProps) {
  const [selectedService, setSelectedService] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  const handleBookingWhatsApp = (product: Product) => {
    const phone = normalizeWhatsAppPhone(store.owner_phone);
    let text = `Halo *${store.store_name}*, saya ingin booking / pesan layanan:\n\n`;
    text += `📌 *Layanan:* ${product.name}\n`;
    text += `💰 *Tarif:* ${formatRupiah(product.price)}\n`;
    if (customerName.trim()) text += `👤 *Nama:* ${customerName.trim()}\n`;
    if (customerAddress.trim()) text += `📍 *Alamat Jemput/Lokasi:* ${customerAddress.trim()}\n`;
    if (bookingDate) text += `📅 *Rencana Jadwal:* ${bookingDate}\n`;
    text += `\nMohon info ketersediaan slotnya ya kak, terima kasih!`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      data-theme={store.theme_id || 'fresh-herbal'}
      className="min-h-screen mobile-dvh bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col font-sans"
    >
      {/* 1. Hero & Service Credibility Header */}
      <header className="relative w-full border-b border-[var(--theme-border)] bg-[var(--theme-card)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Layanan Profesional & Terpercaya</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {store.store_name}
          </h1>

          {store.description && (
            <p className="mt-2 text-sm sm:text-base opacity-80 max-w-2xl leading-relaxed">
              {store.description}
            </p>
          )}

          {/* Quick Credibility Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            {store.opening_hours && (
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-xs">
                <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="font-semibold">{store.opening_hours}</span>
              </div>
            )}
            {store.address && (
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-xs">
                <MapPin className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="font-semibold max-w-[250px] truncate">{store.address}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Garansi Kualitas 100%</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Promo Announcement Ribbon */}
      <div className="bg-[var(--theme-accent)] text-white py-2.5 px-4 text-center text-xs font-extrabold flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span>Siap Melayani Booking & Antar-Jemput Langsung Hari Ini!</span>
      </div>

      {/* 3. Daftar Paket Layanan (Service Price List Matrix) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Pilihan Paket Layanan & Tarif
          </h2>
          <p className="text-xs sm:text-sm opacity-75 mt-1">
            Transparan, tanpa biaya tambahan terselubung. Klik untuk booking via WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          {products.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-extrabold text-base sm:text-lg">
                    {service.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--theme-bg)] border border-[var(--theme-border)] uppercase tracking-wider">
                    {service.category_tag || 'Layanan'}
                  </span>
                </div>
                {service.description && (
                  <p className="text-xs sm:text-sm opacity-75 max-w-xl leading-relaxed">
                    {service.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--theme-border)]">
                <div className="text-left sm:text-right">
                  <p className="text-[11px] opacity-70">Mulai dari</p>
                  <p className="font-black text-base sm:text-xl text-[var(--theme-accent)]">
                    {formatRupiah(service.price)}
                  </p>
                </div>

                <button
                  onClick={() => handleBookingWhatsApp(service)}
                  className="px-5 py-2.5 rounded-xl bg-[var(--theme-accent)] hover:opacity-95 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[var(--theme-accent)]/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Booking WA</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Lokasi Fisik & Google Maps Section */}
        {store.address && (
          <div className="mt-10 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <MapPin className="w-5 h-5 text-[var(--theme-accent)]" />
              <h3 className="font-extrabold text-base sm:text-lg">
                Lokasi Gerai & Kunjungan Fisik
              </h3>
            </div>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed mb-4">
              {store.address}
            </p>
            {store.google_maps_url && (
              <a
                href={store.google_maps_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs font-bold hover:bg-[var(--theme-accent)] hover:text-white transition-all shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Buka Petunjuk Arah di Google Maps</span>
              </a>
            )}
          </div>
        )}
      </main>

      {/* 5. Footer Legal */}
      <footer className="mt-auto py-6 border-t border-[var(--theme-border)] bg-[var(--theme-card)]/50 text-center text-xs opacity-75">
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
