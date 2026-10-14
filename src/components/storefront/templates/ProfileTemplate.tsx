'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Store, Product } from '@/types/database';
import { formatRupiah } from '@/lib/utils';
import {
  UserCheck,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  X,
  Send,
  Loader2,
  Copy,
  Sparkles,
  Phone,
  User,
  Clock,
} from 'lucide-react';

interface ProfileTemplateProps {
  store: Store;
  products: Product[];
}

export function ProfileTemplate({ store, products }: ProfileTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [consultDate, setConsultDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpenConsultation = (serviceName?: string) => {
    setSelectedService(serviceName || 'Konsultasi Umum');
    setErrorMsg('');
    setSuccessTicket(null);
    setIsModalOpen(true);
  };

  const handleSubmitConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
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
          type: 'consultation',
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          details: `Layanan: ${selectedService}${consultDate ? ` • Tanggal: ${consultDate}` : ''}`,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Gagal mengirim pesan.');
        setIsSubmitting(false);
        return;
      }

      setSuccessTicket(data.reference_id || `#KNS-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch {
      setErrorMsg('Terjadi gangguan jaringan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (!successTicket) return;
    const text = `BUKTI JADWAL KONSULTASI MANDIRI
No. Tiket: ${successTicket}
Praktisi / Bisnis: ${store.store_name}
Nama Klien: ${customerName}
Nomor Kontak: ${customerPhone}
Layanan: ${selectedService}
Jadwal Permintaan: ${consultDate || 'Segera / Konfirmasi via Sistem'}
Catatan Kebutuhan: ${notes || '-'}
Status: Terdaftar Resmi di Sistem Web
Simpan nomor tiket ini untuk bukti konsultasi Anda.`;

    navigator.clipboard.writeText(text);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (successTicket) {
      setCustomerName('');
      setCustomerPhone('');
      setConsultDate('');
      setNotes('');
      setSuccessTicket(null);
    }
  };

  return (
    <div
      data-theme={store.theme_id || 'corporate-clean'}
      className="min-h-screen mobile-dvh bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col font-sans selection:bg-[var(--theme-accent)] selection:text-white"
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
          <span>Praktisi Resmi & Terverifikasi</span>
        </div>

        {store.description && (
          <p className="mt-3 text-xs sm:text-sm opacity-80 text-center max-w-md leading-relaxed">
            {store.description}
          </p>
        )}

        {/* 3. Tombol Utama Hubungi Sekarang (Self-Serve Web Form) */}
        <div className="w-full mt-6">
          <button
            type="button"
            onClick={() => handleOpenConsultation()}
            className="w-full py-3.5 rounded-2xl bg-[var(--theme-accent)] hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[var(--theme-accent)]/25 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Jadwalkan Konsultasi / Buat Janji Temu</span>
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
                onClick={() => handleOpenConsultation(item.name)}
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

      {/* MODAL FORM KONSULTASI MANDIRI DI WEB */}
      {isModalOpen && (
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
                    PERMINTAAN TERCATAT RESMI
                  </span>
                  <h3 className="text-2xl font-black mt-1 font-mono">{successTicket}</h3>
                  <p className="text-xs opacity-75 mt-1 max-w-xs mx-auto leading-relaxed">
                    Terima kasih! Jadwal janji temu Anda telah berhasil diteruskan langsung ke portal admin {store.store_name}.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="opacity-60">Nama Klien:</span>
                    <span className="font-bold">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Layanan:</span>
                    <span className="font-bold">{selectedService}</span>
                  </div>
                  {consultDate && (
                    <div className="flex justify-between">
                      <span className="opacity-60">Tanggal:</span>
                      <span className="font-bold">{consultDate}</span>
                    </div>
                  )}
                  {notes && (
                    <div className="pt-2 border-t border-[var(--theme-border)] text-[11px] opacity-75">
                      Catatan: &ldquo;{notes}&rdquo;
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
                    <span>{copiedTicket ? '✓ Tersalin!' : 'Salin Bukti Jadwal'}</span>
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
                    <h3 className="text-base font-extrabold">Formulir Janji Temu</h3>
                    <p className="text-[11px] opacity-70">
                      Terkoneksi langsung ke admin {store.store_name}
                    </p>
                  </div>
                </div>

                {errorMsg && (
                  <div className="mb-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmitConsultation} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Topik / Layanan:</label>
                    <input
                      type="text"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Nama Lengkap Anda:</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Nomor Kontak WhatsApp / HP:</label>
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
                    <label className="block font-semibold mb-1 opacity-80">Rencana Tanggal / Waktu:</label>
                    <input
                      type="date"
                      value={consultDate}
                      onChange={(e) => setConsultDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-xs outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Kebutuhan / Catatan Tambahan:</label>
                    <textarea
                      rows={2}
                      placeholder="Jelaskan kebutuhan spesifik Anda..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
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
                        <span>Mendaftarkan Jadwal...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Konfirmasi Jadwal Konsultasi</span>
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
