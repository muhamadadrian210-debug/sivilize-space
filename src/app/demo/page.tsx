'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LiveStorefrontShowcase } from '@/components/landing/LiveStorefrontShowcase';
import { OnboardingModal } from '@/components/landing/OnboardingModal';
import {
  ExternalLink,
  ArrowRight,
  Store,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Sliders,
  Eye,
} from 'lucide-react';
import type { PlanTier } from '@/types/database';

export default function DemoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState('kopisenja');
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('pro');

  const handleOpenOnboarding = (slug?: string, plan?: PlanTier) => {
    if (slug) setSelectedSlug(slug);
    if (plan) setSelectedPlan(plan);
    setModalOpen(true);
  };

  const directDemoLinks = [
    {
      slug: 'kopisenja',
      name: 'Kedai Kopi Senja',
      category: 'Kuliner, Kafe & FnB',
      desc: 'Etalase menu artisan coffee Flores Bajawa & pastry. Coba langsung rincian pemesanan mandiri di web.',
      theme: 'Warm Cafe (Cokelat Hangat)',
      badge: 'Template Jadi (Rp 349k/thn)',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      slug: 'sivilizelaundry',
      name: 'Sivilize Laundry Express',
      category: 'Jasa & Servis Kebersihan',
      desc: 'Matrix harga cuci kiloan kilat 4 jam, satuan bedcover, dan formulir booking antar-jemput.',
      theme: 'Fresh Herbal (Hijau Higienis)',
      badge: 'Template Jadi (Rp 349k/thn)',
      badgeColor: 'bg-emerald-100 text-emerald-900',
    },
    {
      slug: 'dr-adrian',
      name: 'dr. Adrian Pratama, Sp.A',
      category: 'Bio, Profesional & Klinik',
      desc: 'Representasi profesional dokter spesialis anak, profil SIP resmi, jadwal praktek RS & telemedisin.',
      theme: 'Corporate Clean (Putih Medis)',
      badge: 'Template Jadi (Rp 349k/thn)',
      badgeColor: 'bg-blue-100 text-blue-900',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar onOpenOnboarding={() => handleOpenOnboarding()} />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-14 sm:py-20 border-b border-neutral-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-800">
              <Eye className="w-3.5 h-3.5 text-neutral-950" />
              <span>SHOWCASE WEBSITE AKTIF • MULTI-TENANT WAAS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 leading-tight">
              Bukan Gambar Tiruan. Ini Tampilan Website Asli yang Siap Anda Sewa.
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Jelajahi perbandingan antara <strong>Template Siap Pakai</strong> dan <strong>Hasil Rakitan Custom</strong>.
              Uji coba responsivitas desktop vs smartphone serta alur checkout langsung ke WhatsApp dan rekening bank tanpa komisi marketplace.
            </p>
          </div>
        </section>

        {/* 1. THE INTERACTIVE LIVE STOREFRONT SHOWCASE BENCH */}
        <LiveStorefrontShowcase hideHeader onOpenOnboarding={(slug, plan) => handleOpenOnboarding(slug, plan)} />

        {/* 2. DIRECT TEST-DRIVE CARDS: BUKA DI TAB BARU */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-200">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
              UJI COBA WEBSITE AKTIF SECARA LANGSUNG
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-950">
              Buka Website Bisnis Asli di Tab Baru
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600">
              Setiap website di bawah ini live di sub-domain independen dengan profil usaha dan alur transaksi mandiri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {directDemoLinks.map((store) => (
              <div
                key={store.slug}
                className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md ${store.badgeColor}`}>
                      {store.badge}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {store.theme.split(' ')[0]}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-neutral-950">{store.name}</h4>
                    <p className="text-xs font-semibold text-neutral-500">{store.category}</p>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {store.desc}
                  </p>

                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 font-mono text-xs text-neutral-700 truncate">
                    https://{store.slug}.sivilize.space
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
                  <a
                    href={`/toko/${store.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Buka Website Asli (Tab Baru)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding(store.slug, 'pro')}
                    className="w-full py-2 px-3 rounded-xl border border-neutral-300 hover:border-neutral-950 text-neutral-800 font-semibold text-xs text-center transition-colors cursor-pointer"
                  >
                    Sewa Model Ini (Rp 349k/thn)
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Ajakan Rakit Custom */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-neutral-800 text-emerald-400 font-mono text-xs font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>OPSI RAKIT CUSTOM SENDIRI</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black tracking-tight">
                Mau Desain yang 100% Berbeda dari Template?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Rakit website Anda sendiri di Studio Rakit: tentukan jenis font, struktur 2/3/4 kolom atau list baris, efek kaca frosted glass, dan tambah halaman ekstra dengan kalkulasi harga transparan.
              </p>
            </div>

            <Link
              href="/rakit"
              className="px-6 py-3.5 rounded-2xl bg-white text-neutral-950 font-black text-xs sm:text-sm hover:bg-neutral-100 transition-transform active:scale-[0.98] shrink-0 flex items-center gap-2 shadow-lg"
            >
              <span>Buka Studio Rakit Web</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Onboarding Modal Wizard */}
      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSlug={selectedSlug}
        initialPlan={selectedPlan}
      />
    </div>
  );
}
