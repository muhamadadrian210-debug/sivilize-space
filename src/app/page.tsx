'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SaaSOperatingSystemShowcase } from '@/components/landing/SaaSOperatingSystemShowcase';
import { IndustryBundleSection, type IndustryBundleData } from '@/components/landing/IndustryBundleSection';
import { LiveStorefrontShowcase } from '@/components/landing/LiveStorefrontShowcase';
import { LiveSlugChecker } from '@/components/landing/LiveSlugChecker';
import { OnboardingModal } from '@/components/landing/OnboardingModal';
import {
  Globe,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Layers,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import type { PlanTier } from '@/types/database';

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('pro');
  const [selectedCategory, setSelectedCategory] = useState<string>('Kuliner & Minuman');
  const [billingCycle, setBillingCycle] = useState<'bulanan' | 'tahunan'>('tahunan');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleOpenClaim = (slug?: string, plan?: PlanTier, category?: string) => {
    if (slug) setSelectedSlug(slug);
    if (plan) setSelectedPlan(plan);
    if (category) setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleSelectIndustryBundle = (bundle: IndustryBundleData) => {
    handleOpenClaim(bundle.slugSuggestion, bundle.recommendedPlan, bundle.defaultCategoryName);
  };

  const faqs = [
    {
      q: 'Apa maksudnya Website-as-a-Service (WaaS)? Mengapa sistem sewa lebih menguntungkan?',
      a: 'WaaS berarti Anda tidak perlu mengeluarkan modal jutaan rupiah di muka untuk membeli website dari agensi (yang sering ditinggal kabur atau minta bayaran hosting siluman tiap tahun). Dengan SivilizeSpace, Anda menyewa website siap pakai dengan biaya flat terjangkau. Seluruh server Anycast Edge berkecepatan tinggi, sertifikat keamanan SSL, dan pembaruan sistem sudah 100% ditanggung oleh PT Sivilize Corp Indonesia.',
    },
    {
      q: 'Apakah semua transaksi dan operasional benar-benar terjadi di dalam website tanpa chat manual?',
      a: 'Tepat sekali! Seluruh proses sewa website, aktivasi subdomain, pembayaran QRIS otomatis, hingga penerbitan invoice sah diselesaikan 100% mandiri di dalam website Sivilize Space tanpa perlu chat manual WhatsApp. Email perusahaan kami (sivilizecorpindonesia@gmail.com) secara resmi hanya difungsikan untuk saluran pelaporan kendala teknis atau bug.',
    },
    {
      q: 'Bagaimana uang penjualan atau reservasi sampai ke tangan saya?',
      a: '100% uang pembayaran pengunjung langsung masuk ke rekening bank atau QRIS milik Anda sendiri. SivilizeSpace tidak memotong komisi sepeserpun (0% potongan komisi).',
    },
    {
      q: 'Apakah saya membutuhkan keahlian koding atau laptop untuk mengelola website?',
      a: 'Tidak sama sekali. Seluruh pengelolaan katalog produk, layanan, pengubahan info kontak, hingga pergantian tema tampilan dilakukan lewat browser di ponsel Anda melalui Client Dashboard SivilizeSpace.',
    },
    {
      q: 'Bisakah saya menggunakan domain pribadi seperti www.bisnissaya.com?',
      a: 'Bisa banget! Untuk sewa tahunan pada Paket Pro dan Bisnis, Anda mendapatkan domain pribadi gratis (.my.id, .biz.id, atau .COM). Jika Anda sudah memiliki domain sendiri sebelumnya, tim teknis kami akan menyambungkannya secara gratis ke sistem Anycast Edge kami.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar onOpenOnboarding={() => handleOpenClaim()} />

      <main className="flex-1">
        {/* 2. Hero Section (Shopify x Vercel x BMW Clean Precision) */}
        <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-neutral-200/80 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-800 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Platform Sewa Website Mandiri No. 1 Indonesia • WaaS Only (Bukan Marketplace)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 leading-[1.08] max-w-4xl mx-auto">
              Sewa Website Bisnis Siap Pakai & Mandiri untuk Usaha Anda.
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Layanan sewa website mandiri (WaaS Only) siap pakai untuk brand dan UMKM Indonesia. 100% website milik Anda sendiri tanpa potongan komisi penjualan (Bukan Marketplace bersama). Aktif instan mulai Rp 349.000/tahun dengan hosting Anycast Edge global SLA 99.8% dan include aplikasi kasir SiKasir POS & Dine Lite.
            </p>

            {/* Direct Action Group */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenClaim()}
                className="px-7 py-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm tracking-tight shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                <span>Mulai Sewa Website Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/demo"
                className="px-6 py-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm transition-colors border border-neutral-200 flex items-center gap-2"
              >
                <span>Jelajahi Demo Website Live</span>
                <ExternalLink className="w-4 h-4 text-neutral-500" />
              </Link>
            </div>

            {/* Live Subdomain Search Box */}
            <div className="mt-12 max-w-xl mx-auto">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-neutral-50 border border-neutral-300/80 shadow-xs">
                <LiveSlugChecker onClaimSlug={(slug) => handleOpenClaim(slug, 'pro')} />
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div className="mt-14 pt-8 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <p className="text-2xl font-black text-neutral-950 font-mono">0%</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">Komisi Penjualan</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <p className="text-2xl font-black text-neutral-950 font-mono">Web</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">Transaksi & Invoice Mandiri</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <p className="text-2xl font-black text-neutral-950 font-mono">SaaS</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">Pusat Kendali Merchant</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <p className="text-2xl font-black text-neutral-950 font-mono">99.8%</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">SLA Anycast Edge Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Flagship Interactive Visual: The SivilizeSpace Unified WaaS Operating System */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
              PUSAT KENDALI OPERASIONAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 mt-2">
              Satu Platform SaaS untuk Seluruh Kebutuhan Website Bisnis Anda
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Bukan sekadar form chat. Dari manajemen katalog layanan di dashboard hingga transaksi
              dan invoice digital di web penyewa — semua diselesaikan 100% mandiri di dalam sistem.
            </p>
          </div>

          <SaaSOperatingSystemShowcase />
        </section>

        {/* 3.5. Industry Specific Solution Bundles (Inc. SiKasir POS & Sivilize Dine Lite) */}
        <IndustryBundleSection onSelectBundle={handleSelectIndustryBundle} />

        {/* 4. Live Storefront Showcase: Preview Website Template & Custom Rakitan */}
        <LiveStorefrontShowcase onOpenOnboarding={(slug, plan) => handleOpenClaim(slug, plan)} />

        {/* 5. Three Pillars of WaaS Section */}
        <section className="py-20 border-t border-neutral-200/80 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                FILOSOFI WAAS MANDIRI
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 mt-2">
                Kenapa Bisnis Cerdas Beralih ke Website-as-a-Service?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-base mb-6">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950 mb-3">Sewa, Bukan Beli Putus</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Tidak ada biaya pembuatan jutaan rupiah di muka atau tagihan server siluman di tahun kedua.
                    Anda menyewa sistem siap pakai dengan biaya flat yang sudah mencakup server, domain, dan pemeliharaan teknis penuh.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bebas Pusing Urusan Hosting & Server</span>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-base mb-6">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950 mb-3">Transaksi Mandiri di Web</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Pelanggan memilih produk, mengisi formulir pemesanan, dan membayar langsung di website via QRIS Dinamis atau Transfer Bank.
                    Invoice resmi terbit otomatis di sistem tanpa perlu melayani chat manual satu per satu.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Invoice Digital & Order Terpusat</span>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-base mb-6">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950 mb-3">Pusat Kendali di SaaS</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Seluruh penyesuaian operasional dikendalikan lewat browser di ponsel atau laptop Anda:
                    ubah harga dalam 5 detik, tandai produk habis, pantau transaksi masuk, dan ganti tema tampilan secara mandiri.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Update Cepat Tanpa Sentuh Koding</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Live Working Stores Showcase */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                SHOWCASE WEBSITE NYATA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 mt-2">
                Lihat Contoh Website yang Sedang Mengudara
              </h2>
            </div>
            <Link
              href="/demo"
              className="text-xs font-bold text-neutral-900 hover:text-neutral-600 flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua Demo Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  Kuliner & Cafe
                </span>
                <h3 className="text-lg font-bold text-neutral-950 mt-3 mb-1">Kedai Kopi Senja</h3>
                <p className="text-xs text-neutral-600 mb-4 line-clamp-2">
                  Katalog single origin Flores Bajawa & pastry dengan sistem pemesanan menu mandiri di web.
                </p>
                <p className="font-mono text-xs text-neutral-400 mb-4">kopisenja.sivilizecorp.my.id</p>
              </div>
              <a
                href="/toko/kopisenja"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Buka Website Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  Jasa & Laundry
                </span>
                <h3 className="text-lg font-bold text-neutral-950 mt-3 mb-1">Sivilize Laundry Express</h3>
                <p className="text-xs text-neutral-600 mb-4 line-clamp-2">
                  Pricelist cuci kiloan/satuan, form reservasi antar-jemput, dan integrasi Google Maps rute ruko.
                </p>
                <p className="font-mono text-xs text-neutral-400 mb-4">sivilizelaundry.sivilizecorp.my.id</p>
              </div>
              <a
                href="/toko/sivilizelaundry"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Buka Website Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  Dokter & Pakar
                </span>
                <h3 className="text-lg font-bold text-neutral-950 mt-3 mb-1">dr. Adrian Pratama, Sp.A</h3>
                <p className="text-xs text-neutral-600 mb-4 line-clamp-2">
                  Profil dokter spesialis anak terverifikasi, jadwal praktek klinik, dan reservasi telemedisin.
                </p>
                <p className="font-mono text-xs text-neutral-400 mb-4">dr-adrian.sivilizecorp.my.id</p>
              </div>
              <a
                href="/toko/dr-adrian"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Buka Website Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* 5.5. Competitor Comparison Section (SEO Dominance) */}
        <section className="py-20 bg-neutral-900 text-white border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                ANALISIS KOMPARASI SEWA WEBSITE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">
                Mengapa Sewa Website di Sivilize Space Menggeser Kompetitor Lain?
              </h2>
              <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                Bandingkan langsung efisiensi biaya, kemandirian transaksi, dan kecepatan tayang antara model sewa website modern WaaS dengan solusi konvensional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch text-xs">
              {/* Card 1: Sivilize Space (Winner) */}
              <div className="p-6 rounded-3xl bg-neutral-950 border-2 border-emerald-500/50 shadow-2xl relative flex flex-col justify-between">
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-emerald-500 text-neutral-950 font-black text-[10px] tracking-wider uppercase">
                  Paling Hemat & Mandiri
                </div>
                <div>
                  <h3 className="text-lg font-black text-white mt-1">Sivilize Space</h3>
                  <p className="text-[11px] text-emerald-400 font-mono mt-0.5">Sewa Website WaaS Mandiri</p>
                  
                  <div className="my-5 py-4 border-y border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Biaya Investasi:</span>
                    <p className="text-2xl font-black text-white font-mono">Rp 349.000<span className="text-xs text-neutral-400 font-normal"> / thn</span></p>
                  </div>

                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span><strong>0% Komisi Penjualan:</strong> 100% omset langsung ke rekening Anda.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span><strong>Langsung Aktif:</strong> Siap tayang dalam 60 detik tanpa koding.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span><strong>QRIS Dinamis Otomatis:</strong> Pembeli bayar langsung di web.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span><strong>Infrastruktur Edge:</strong> Bebas pusing urus server & SSL (SLA 99.8%).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span><strong>Legalitas Sah:</strong> NIB 0207260103661 & nota pembayaran resmi.</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenClaim()}
                  className="mt-6 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs transition-colors cursor-pointer"
                >
                  Sewa Website Sekarang
                </button>
              </div>

              {/* Card 2: Beli Web Konvensional */}
              <div className="p-6 rounded-3xl bg-neutral-950/60 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-200">Beli Web Konvensional</h3>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Jasa Pembuatan Web Putus</p>
                  
                  <div className="my-5 py-4 border-y border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Biaya Investasi:</span>
                    <p className="text-xl font-bold text-neutral-300 font-mono">Rp 3jt – 10jt<span className="text-xs text-neutral-500 font-normal"> di muka</span></p>
                  </div>

                  <ul className="space-y-3 text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Biaya tahunan tersembunyi (hosting & perpanjangan domain mahal).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Waktu pengerjaan lama (2–4 minggu dan sering molor).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Harus bayar biaya tambahan setiap ingin ubah menu atau harga.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Risiko tinggi ditinggal kabur programmer freelance.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 p-2.5 rounded-xl bg-neutral-900 text-center text-neutral-500 text-[10px]">
                  Modal awal terlalu boros
                </div>
              </div>

              {/* Card 3: Shopify / Platform Asing */}
              <div className="p-6 rounded-3xl bg-neutral-950/60 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-200">Shopify / Platform Global</h3>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">SaaS E-Commerce Luar Negeri</p>
                  
                  <div className="my-5 py-4 border-y border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Biaya Investasi:</span>
                    <p className="text-xl font-bold text-neutral-300 font-mono">~Rp 450.000<span className="text-xs text-neutral-500 font-normal"> / bulan</span></p>
                  </div>

                  <ul className="space-y-3 text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Tagihan USD membengkak (mencapai Rp 5.400.000 per tahun).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Fee kartu kredit & potongan plugin bulanan yang rumit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Kurang optimal untuk metode bayar lokal QRIS & WhatsApp Indonesia.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Pengaturan rumit berbahasa Inggris membingungkan staf.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 p-2.5 rounded-xl bg-neutral-900 text-center text-neutral-500 text-[10px]">
                  Kurang bersahabat untuk UMKM lokal
                </div>
              </div>

              {/* Card 4: Marketplace / Ojek Online */}
              <div className="p-6 rounded-3xl bg-neutral-950/60 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-200">Marketplace / App Ojol</h3>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Kanal Penjualan Pihak Ketiga</p>
                  
                  <div className="my-5 py-4 border-y border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Biaya Investasi:</span>
                    <p className="text-xl font-bold text-rose-400 font-mono">Potong 15%–25%<span className="text-xs text-neutral-500 font-normal"> per transaksi</span></p>
                  </div>

                  <ul className="space-y-3 text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Margin profit tergerus habis oleh potongan komisi raksasa.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Perang harga brutal dengan kompetitor di halaman yang sama.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Data pembeli disembunyikan pihak platform (bukan aset Anda).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✗</span>
                      <span>Akun jualan rentan dibanned sepihak tanpa kejelasan.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 p-2.5 rounded-xl bg-neutral-900 text-center text-neutral-500 text-[10px]">
                  Ketergantungan dan komisi mencekik
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Transparent Pricing Overview Section */}
        <section className="py-20 border-t border-neutral-200/80 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                PILIHAN PAKET SEWA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 mt-2">
                Biaya Sewa Transparan Tanpa Biaya Tersembunyi
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                Bebas berhenti sewa kapan saja. Pilihan sewa tahunan sudah termasuk gratis domain pribadi.
              </p>

              {/* Billing Toggle */}
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
                    Hemat 2 Bln + Free Domain
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Paket Mikro
                  </span>
                  <h3 className="text-xl font-black text-neutral-950 mt-1 mb-2">Kedai & Warung Ringkas</h3>
                  <p className="text-xs text-neutral-600 mb-6">
                    Kapasitas 5–10 produk unggulan dengan subdomain resmi dan akses dashboard di ponsel.
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-neutral-950 font-mono">
                      {billingCycle === 'bulanan' ? 'Rp 39.000' : 'Rp 349.000'}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {billingCycle === 'bulanan' ? ' / bulan' : ' / tahun'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenClaim(undefined, 'mikro')}
                  className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Pilih Paket Mikro
                </button>
              </div>

              <div className="p-8 rounded-3xl bg-white border-2 border-neutral-950 shadow-lg flex flex-col justify-between relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-950 text-white text-[10px] font-black uppercase tracking-wider">
                  Paling Laris UMKM
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider">
                    Paket Pro
                  </span>
                  <h3 className="text-xl font-black text-neutral-950 mt-1 mb-2">Cafe, Distro & Retail</h3>
                  <p className="text-xs text-neutral-600 mb-6">
                    2–3 halaman lengkap, katalog 15–30 item, gratis domain pribadi (.my.id/.biz.id) khusus tahunan.
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-neutral-950 font-mono">
                      {billingCycle === 'bulanan' ? 'Rp 69.000' : 'Rp 599.000'}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {billingCycle === 'bulanan' ? ' / bulan' : ' / tahun'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenClaim(undefined, 'pro')}
                  className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
                >
                  Pilih Paket Pro
                </button>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Paket Bisnis
                  </span>
                  <h3 className="text-xl font-black text-neutral-950 mt-1 mb-2">Klinik & Perusahaan</h3>
                  <p className="text-xs text-neutral-600 mb-6">
                    Multi-cabang, unlimited produk, form booking kustom, gratis domain internasional .COM tahunan.
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-neutral-950 font-mono">
                      {billingCycle === 'bulanan' ? 'Rp 99.000' : 'Rp 899.000'}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {billingCycle === 'bulanan' ? ' / bulan' : ' / tahun'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenClaim(undefined, 'bisnis')}
                  className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Pilih Paket Bisnis
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/harga"
                className="text-xs font-bold text-neutral-900 hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat tabel komparasi lengkap & kalkulator hemat komisi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
              PERTANYAAN UMUM
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 mt-1">
              Jawaban untuk Keraguan Anda
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-neutral-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 transition-transform ${
                        isOpen ? 'rotate-180 text-neutral-950' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 8. Enterprise Footer */}
      <Footer />

      {/* 9. Onboarding Modal Wizard */}
      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSlug={selectedSlug}
        initialPlan={selectedPlan}
        initialCategory={selectedCategory}
      />
    </div>
  );
}
