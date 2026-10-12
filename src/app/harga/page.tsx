'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OnboardingModal } from '@/components/landing/OnboardingModal';
import { CommissionCalculator } from '@/components/landing/CommissionCalculator';
import { CheckCircle2, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import type { PlanTier } from '@/types/database';

export default function HargaPage() {
  const [billingCycle, setBillingCycle] = useState<'bulanan' | 'tahunan'>('tahunan');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('pro');

  const handleSelectPlan = (plan: PlanTier) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar onOpenOnboarding={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 border-b border-neutral-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
              Struktur Harga Transparan
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-4 leading-tight">
              Sewa Website Mandiri Tanpa Biaya Tersembunyi.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Tidak ada tagihan server perpanjangan siluman jutaan rupiah di tahun kedua.
              Seluruh biaya server Anycast Edge, SSL, dan pembaruan sistem sudah 100% termasuk di dalam sewa.
            </p>

            {/* Toggle Billing Cycle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200">
              <button
                type="button"
                onClick={() => setBillingCycle('bulanan')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'bulanan'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Sewa Bulanan
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('tahunan')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'tahunan'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <span>Sewa Tahunan</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-extrabold">
                  Hemat 2 Bulan + Free Domain
                </span>
              </button>
            </div>

            {/* Dua Opsi: Sewa Template vs Rakit Custom Sendiri */}
            <div className="mt-8 max-w-2xl mx-auto p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  BUTUH KEBEBASAN DESAIN 100%?
                </span>
                <h4 className="text-sm font-extrabold text-neutral-950 mt-0.5">
                  Rakit Website Custom Sendiri (Mulai Rp 449.000/thn)
                </h4>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Pilih font, kolom grid, tata letak navbar, efek keburaman, & modul pembayaran sendiri seperti rakit PC.
                </p>
              </div>
              <Link
                href="/rakit"
                className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold shrink-0 transition-transform active:scale-[0.98]"
              >
                Buka Studio Rakit →
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Mikro */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Paket Mikro
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold">
                    1 Halaman Ringkas
                  </span>
                </div>
                <h3 className="text-xl font-black text-neutral-950 mb-2">Kedai & Warung Ringkas</h3>
                <p className="text-xs text-neutral-600 mb-6">
                  Cocok untuk kedai kopi, laundry kiloan, gerai jus, atau jualan 1–5 produk unggulan.
                </p>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-950 font-mono">
                    {billingCycle === 'bulanan' ? 'Rp 39.000' : 'Rp 349.000'}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {billingCycle === 'bulanan' ? ' / bulan' : ' / tahun'}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-neutral-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Subdomain resmi: <strong>namabisnis.sivilizecorp.my.id</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kapasitas 5–10 Menu / Produk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pemesanan & Pembayaran Mandiri di Web</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Akses Portal Dashboard di HP</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlan('mikro')}
                className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs text-center transition-colors cursor-pointer"
              >
                Pilih Paket Mikro
              </button>
            </div>

            {/* Card 2: Pro (Paling Populer) */}
            <div className="p-8 rounded-3xl bg-white border-2 border-neutral-950 shadow-lg flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-950 text-white text-[10px] font-black uppercase tracking-wider">
                Paling Laris UMKM
              </div>

              <div>
                <div className="flex items-center justify-between mb-3 mt-1">
                  <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider">
                    Paket Pro
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-900 text-white font-semibold">
                    2–3 Halaman Lengkap
                  </span>
                </div>
                <h3 className="text-xl font-black text-neutral-950 mb-2">Cafe, Distro & Retail</h3>
                <p className="text-xs text-neutral-600 mb-6">
                  Etalase katalog foto produk rapi untuk dipajang di bio Instagram & TikTok bisnis Anda.
                </p>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-950 font-mono">
                    {billingCycle === 'bulanan' ? 'Rp 69.000' : 'Rp 599.000'}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {billingCycle === 'bulanan' ? ' / bulan' : ' / tahun'}
                  </span>
                </div>

                <div className="mb-6 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                  {billingCycle === 'tahunan' ? (
                    <div className="flex items-center gap-2 text-neutral-900 font-bold">
                      <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>GRATIS DOMAIN PRIBADI: .my.id / .biz.id (1 Tahun)</span>
                    </div>
                  ) : (
                    <span className="text-neutral-500">
                      Subdomain resmi (Bawa domain sendiri: +Rp 0)
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-xs text-neutral-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Layout: Beranda + Menu Lengkap + Lokasi/Promo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kapasitas 15–30 Menu / Produk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pilihan 5 Tema Desain Estetik</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Auto-Compress Foto Kamera HP (WebP)</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlan('pro')}
                className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs text-center transition-all cursor-pointer shadow-md"
              >
                Pilih Paket Pro
              </button>
            </div>

            {/* Card 3: Bisnis */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Paket Bisnis
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold">
                    4–5 Halaman Lengkap
                  </span>
                </div>
                <h3 className="text-xl font-black text-neutral-950 mb-2">Klinik & Perusahaan</h3>
                <p className="text-xs text-neutral-600 mb-6">
                  Company profile, klinik, yayasan, atau ritel dengan banyak cabang & produk tanpa batas.
                </p>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-950 font-mono">
                    {billingCycle === 'bulanan' ? 'Rp 99.000' : 'Rp 899.000'}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {billingCycle === 'bulanan' ? ' / bulan' : ' / tahun'}
                  </span>
                </div>

                <div className="mb-6 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                  {billingCycle === 'tahunan' ? (
                    <div className="flex items-center gap-2 text-neutral-900 font-bold">
                      <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>GRATIS DOMAIN INTERNASIONAL: .COM (1 Tahun)</span>
                    </div>
                  ) : (
                    <span className="text-neutral-500">
                      Subdomain resmi (Bawa domain sendiri: +Rp 0)
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-xs text-neutral-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited Produk / Menu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Form Reservasi & Booking Kustom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Galeri Sorotan & Multi-Cabang</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dukungan Prioritas SLA 1 Jam</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlan('bisnis')}
                className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs text-center transition-colors cursor-pointer"
              >
                Pilih Paket Bisnis
              </button>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="mt-20">
            <CommissionCalculator onStartNow={() => setModalOpen(true)} />
          </div>
        </section>
      </main>

      <Footer />

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlan={selectedPlan}
      />
    </div>
  );
}
