'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Store, Product } from '@/types/database';
import { formatRupiah } from '@/lib/utils';
import {
  Sparkles,
  Clock,
  MapPin,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Navigation,
  X,
  Send,
  Loader2,
  Copy,
  User,
  Phone,
} from 'lucide-react';

interface ServiceTemplateProps {
  store: Store;
  products: Product[];
}

export function ServiceTemplate({ store, products }: ServiceTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpenBooking = (service: Product) => {
    setSelectedService(service);
    setErrorMsg('');
    setSuccessTicket(null);
    setIsModalOpen(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !selectedService) {
      setErrorMsg('Nama dan nomor kontak WhatsApp wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/store/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_id: store.id,
          slug: store.slug,
          type: 'booking',
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          details: `Layanan: ${selectedService.name} (${formatRupiah(selectedService.price)})${
            bookingDate ? ` • Tanggal: ${bookingDate}` : ''
          }${customerAddress ? ` • Lokasi: ${customerAddress}` : ''}`,
          total_amount: selectedService.price,
          notes: customerNotes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Gagal memproses booking.');
        setIsSubmitting(false);
        return;
      }

      setSuccessTicket(data.reference_id || `#RSV-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch {
      setErrorMsg('Terjadi gangguan jaringan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (!successTicket || !selectedService) return;
    const text = `BUKTI RESERVASI LAYANAN MANDIRI
No. Tiket Booking: ${successTicket}
Tempat / Mitra: ${store.store_name}
Nama Pemesan: ${customerName}
Nomor Kontak: ${customerPhone}
Paket Layanan: ${selectedService.name} (${formatRupiah(selectedService.price)})
Tanggal Rencana: ${bookingDate || 'Segera / Konfirmasi via Sistem'}
Alamat / Titik: ${customerAddress || 'Datang ke Lokasi'}
Catatan: ${customerNotes || '-'}
Status: Terverifikasi di Website Resmi
Simpan nomor bukti reservasi ini saat datang ke lokasi.`;

    navigator.clipboard.writeText(text);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (successTicket) {
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setBookingDate('');
      setCustomerNotes('');
      setSuccessTicket(null);
    }
  };

  return (
    <div
      data-theme={store.theme_id || 'fresh-herbal'}
      className="min-h-screen mobile-dvh bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col font-sans selection:bg-[var(--theme-accent)] selection:text-white"
    >
      {/* 1. Hero & Service Credibility Header */}
      <header className="relative w-full border-b border-[var(--theme-border)] bg-[var(--theme-card)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Layanan Profesional & Terverifikasi</span>
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
        <span>Siap Melayani Booking Mandiri Langsung Lewat Website Hari Ini!</span>
      </div>

      {/* 3. Daftar Paket Layanan (Service Price List Matrix) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Pilihan Paket Layanan & Tarif
          </h2>
          <p className="text-xs sm:text-sm opacity-75 mt-1">
            Transparan, tanpa biaya terselubung. Booking langsung secara mandiri di website.
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
                  <p className="text-[11px] opacity-70">Tarif Layanan</p>
                  <p className="font-black text-base sm:text-xl text-[var(--theme-accent)]">
                    {formatRupiah(service.price)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(service)}
                  className="px-5 py-2.5 rounded-xl bg-[var(--theme-accent)] hover:opacity-95 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[var(--theme-accent)]/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Booking Sekarang</span>
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

      {/* MODAL FORM RESERVASI MANDIRI DI WEB */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-3xl p-6 shadow-2xl relative text-[var(--theme-text)]">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {successTicket ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    BOOKING BERHASIL DITERIMA
                  </span>
                  <h3 className="text-2xl font-black mt-1 font-mono">{successTicket}</h3>
                  <p className="text-xs opacity-75 mt-1 max-w-xs mx-auto leading-relaxed">
                    Reservasi Anda telah tercatat langsung di sistem dashboard {store.store_name}.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="opacity-60">Nama Pelanggan:</span>
                    <span className="font-bold">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Paket:</span>
                    <span className="font-bold">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Biaya:</span>
                    <span className="font-bold font-mono text-[var(--theme-accent)]">
                      {formatRupiah(selectedService.price)}
                    </span>
                  </div>
                  {bookingDate && (
                    <div className="flex justify-between">
                      <span className="opacity-60">Rencana Jadwal:</span>
                      <span className="font-bold">{bookingDate}</span>
                    </div>
                  )}
                  {customerAddress && (
                    <div className="flex justify-between">
                      <span className="opacity-60">Lokasi/Alamat:</span>
                      <span className="font-bold truncate max-w-[180px]">{customerAddress}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopyTicket}
                    className="flex-1 py-2.5 rounded-xl border border-[var(--theme-border)] hover:bg-[var(--theme-bg)] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedTicket ? '✓ Tersalin!' : 'Salin Bukti Booking'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-2.5 rounded-xl bg-[var(--theme-accent)] text-white font-bold text-xs transition-opacity cursor-pointer hover:opacity-90"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">Formulir Booking Layanan</h3>
                    <p className="text-[11px] opacity-70">
                      Terkoneksi langsung ke sistem {store.store_name}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] mb-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] opacity-60 uppercase font-semibold block">Paket Dipilih:</span>
                    <strong className="font-bold">{selectedService.name}</strong>
                  </div>
                  <span className="font-bold font-mono text-[var(--theme-accent)]">
                    {formatRupiah(selectedService.price)}
                  </span>
                </div>

                {errorMsg && (
                  <div className="mb-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmitBooking} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Nama Pemesan:</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Pratama"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Nomor WhatsApp / Kontak:</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Rencana Tanggal Booking:</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Alamat Jemput / Kunjungan (Opsional):</label>
                    <input
                      type="text"
                      placeholder="Contoh: Perum Graha Indah Blok C No. 5"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Catatan Khusus:</label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Antar jemput jam 10 pagi..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 rounded-xl bg-[var(--theme-accent)] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Memproses Reservasi...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Konfirmasi Booking Mandiri</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
