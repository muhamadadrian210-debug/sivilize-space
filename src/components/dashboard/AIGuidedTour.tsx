'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  LayoutGrid,
  Zap,
  Globe,
  Store,
} from 'lucide-react';

export interface TourStep {
  title: string;
  description: string;
  tabKey?: 'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem';
  badge: string;
  tips: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Selamat Datang di Pusat Kendali Toko Anda!',
    description:
      'Dashboard ini adalah pusat operasional website bisnis Anda. Dari sini Anda bisa mengatur menu, tata letak tampilan web di ponsel & PC, hingga menghubungkan aplikasi kasir dan meja QR.',
    badge: 'Langkah 1/5 • Pengenalan',
    tips: 'Website Anda sudah langsung aktif di server Anycast Edge berkecepatan tinggi.',
  },
  {
    title: 'Katalog Produk & Sinkronisasi Kasir',
    description:
      'Di tab "Katalog & Menu", Anda bisa menambah produk, mengganti harga dalam hitungan detik, atau menekan tombol "Tarik Produk dari SiKasir" agar produk di kasir otomatis masuk ke web.',
    tabKey: 'katalog',
    badge: 'Langkah 2/5 • Manajemen Menu',
    tips: 'Setiap perubahan harga langsung tayang di website detik itu juga tanpa perlu restart.',
  },
  {
    title: 'Kustomisasi Tata Letak & Grid Tampilan',
    description:
      'Di tab "Tata Letak & Grid", Anda bebas mengatur jumlah kolom produk (2, 3, atau 4 kolom), perataan teks, tombol beli, dan urutan seksi website agar sesuai selera estetika brand Anda.',
    tabKey: 'tata-letak',
    badge: 'Langkah 3/5 • Desain Web',
    tips: 'Gunakan simulator tampilan ponsel & desktop di sebelah kanan untuk melihat hasil seketika.',
  },
  {
    title: 'Lisensi Ekosistem SiKasir POS & Dine Lite',
    description:
      'Di tab "Ekosistem Lisensi", Anda mendapatkan Kode Aktivasi Resmi (contoh: SIV-FNB-365D). Masukkan kode ini saat pertama kali membuka SiKasir POS atau Dine Lite agar semua data tersambung 2-arah.',
    tabKey: 'ekosistem',
    badge: 'Langkah 4/5 • Integrasi Kasir',
    tips: 'Stok berkurang di kasir fisik langsung otomatis update di QR Meja dan website publik.',
  },
  {
    title: 'Profil Bisnis, Jam Buka & Custom Domain',
    description:
      'Lengkapi nama brand, slogan, jam buka ruko, alamat Maps, atau gunakan domain pribadi Anda (misal www.bisnisanda.com) melalui panduan Vercel Anycast DNS kami.',
    tabKey: 'profil',
    badge: 'Langkah 5/5 • Identitas Brand',
    tips: 'Jika butuh bantuan kapan saja, klik tombol AI Copilot di pojok kanan bawah layar Anda!',
  },
];

interface AIGuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchTab?: (tab: 'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem') => void;
}

export function AIGuidedTour({ isOpen, onClose, onSwitchTab }: AIGuidedTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = TOUR_STEPS[currentStepIndex];

  useEffect(() => {
    if (isOpen && step.tabKey && onSwitchTab) {
      onSwitchTab(step.tabKey);
    }
  }, [isOpen, currentStepIndex, step.tabKey, onSwitchTab]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-neutral-950 border border-neutral-800 text-white p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-neutral-950 flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                SIVILIZE AI TOUR GUIDE
              </span>
              <h3 className="text-sm font-bold text-white">Panduan Interaktif Pengguna</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Tutup panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Badge & Progress Indicators */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono font-bold text-neutral-300">
            {step.badge}
          </span>

          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'w-6 bg-emerald-500'
                    : idx < currentStepIndex
                    ? 'w-2 bg-emerald-700/60'
                    : 'w-2 bg-neutral-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="space-y-4 mb-6">
          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
            {step.title}
          </h4>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {step.description}
          </p>

          {/* AI Pro Tip Box */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 text-xs text-neutral-300 flex items-start gap-2.5">
            <span className="text-base shrink-0">💡</span>
            <div>
              <strong className="text-white block font-bold text-[11px] uppercase font-mono">
                Tips Penting AI:
              </strong>
              <span className="text-[11px] text-neutral-400 mt-0.5 block leading-relaxed">
                {step.tips}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800 gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-neutral-800 hover:bg-neutral-900 disabled:opacity-30 disabled:pointer-events-none text-neutral-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer transition-transform active:scale-[0.98]"
          >
            <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Selesai & Mulai Kelola' : 'Langkah Berikutnya'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
