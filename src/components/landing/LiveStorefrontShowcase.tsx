'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Smartphone,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Eye,
  Sliders,
  Layers,
  Store,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import type { PlanTier } from '@/types/database';

interface LiveStorefrontShowcaseProps {
  onOpenOnboarding?: (slug?: string, plan?: PlanTier) => void;
}

export function LiveStorefrontShowcase({ onOpenOnboarding }: LiveStorefrontShowcaseProps) {
  // Mode: Template vs Custom Rakitan (Default Mode Custom sesuai arahan user)
  const [activeCategory, setActiveCategory] = useState<'template' | 'custom'>('custom');
  // Selected Store ID
  const [selectedStoreId, setSelectedStoreId] = useState<string>('atelier-paris');
  // Device simulator
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  // Interactive modal simulator state
  const [selectedProductInModal, setSelectedProductInModal] = useState<string | null>(null);

  // DATA PREVIEW: 4 TEMPLATE SIAP PAKAI
  const TEMPLATE_STORES = [
    {
      id: 'kopi-senja',
      name: 'Kedai Kopi Senja',
      tagline: 'Specialty Coffee & Artisan Bakery',
      category: 'Kuliner, Kafe & FnB',
      url: 'kopisenja.sivilize.space',
      price: 'Rp 349.000 / thn',
      badge: 'Template Paling Laris',
      themeStyle: 'Warm Cafe (Cokelat Organik)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      gridCols: '3',
      surface: 'Solid Crisp',
      navbar: 'Full-Width Sticky',
      heroTitle: 'Espresso Single Origin Flores Bajawa & Fresh Pastry.',
      heroDesc: 'Disangrai segar tiap pagi. Pesan langsung via WhatsApp resmi kami tanpa komisi marketplace.',
      products: [
        { name: 'Flores Bajawa Single Origin', price: 38000, tag: 'Best Seller', category: 'Manual Brew' },
        { name: 'Kopi Susu Senja Gula Aren', price: 24000, tag: 'Favorit', category: 'Signature' },
        { name: 'Butter Croissant Artisan', price: 28000, tag: 'Fresh Oven', category: 'Pastry' },
      ],
      features: [
        'Varian minuman Dingin / Panas',
        'Invoice digital otomatis di web',
        'Pesanan langsung masuk ke WhatsApp pemilik',
        'Siap pakai dalam 60 detik',
      ],
    },
    {
      id: 'midnight-distro',
      name: 'Midnight Streetwear Co.',
      tagline: 'Independent Apparel & Footwear',
      category: 'Distro Fashion & Retail',
      url: 'midnight.sivilize.space',
      price: 'Rp 599.000 / thn',
      badge: 'Fashion Eksklusif',
      themeStyle: 'Midnight Distro (Dark Luxury)',
      fontFamily: "'Outfit', sans-serif",
      gridCols: '3',
      surface: 'Deep Smoked',
      navbar: 'Full-Width Dark',
      heroTitle: 'Koleksi Streetwear Urban Edisi Terbatas Musim Ini.',
      heroDesc: 'Bahan katun combed 24s premium dengan sablon plastisol Jepang. Stok terbatas 50 pcs per artikel.',
      products: [
        { name: 'Heavyweight Boxy Tee Black', price: 165000, tag: 'Limited Drop', category: 'T-Shirt' },
        { name: 'Vintage Washed Hoodie Grey', price: 285000, tag: 'Best Seller', category: 'Outerwear' },
        { name: 'Cargo Parachute Pants Olive', price: 245000, tag: 'New Arrival', category: 'Pants' },
      ],
      features: [
        'Pemilihan ukuran baju (S, M, L, XL)',
        'Notifikasi stok tersisa real-time',
        'Transfer rekening resmi & info kontak bisnis',
        'Informasi katalog & profil brand lengkap',
      ],
    },
    {
      id: 'laundry-express',
      name: 'Sivilize Laundry Express',
      tagline: 'Cuci Kiloan & Satuan Kilat 4 Jam',
      category: 'Jasa & Servis Kebersihan',
      url: 'laundry.sivilize.space',
      price: 'Rp 349.000 / thn',
      badge: 'Price List Matrix',
      themeStyle: 'Fresh Herbal (Hijau Higienis)',
      fontFamily: "'DM Sans', sans-serif",
      gridCols: 'list',
      surface: 'Solid Crisp',
      navbar: 'Slim Topbar Kontak',
      heroTitle: 'Layanan Cuci Bersih, Wangi & Antar Jemput Ruko.',
      heroDesc: 'Mesin cuci industri higienis per pelanggan. Jadwalkan jemput pakaian kotor langsung dari rumah.',
      products: [
        { name: 'Cuci Kering Setrika Kilat (Per Kg)', price: 12000, tag: '4 Jam Selesai', category: 'Kiloan' },
        { name: 'Cuci Bedcover King Size (Satuan)', price: 35000, tag: 'Antibakteri', category: 'Satuan' },
        { name: 'Cuci Sepatu Sneakers / Kulit', price: 40000, tag: 'Deep Clean', category: 'Sepatu' },
      ],
      features: [
        'Format tabel daftar harga jasa transparan',
        'Formulir penjemputan online',
        'Penunjuk rute lokasi Google Maps',
        'Konfirmasi status cucian di dashboard',
      ],
    },
    {
      id: 'dr-adrian',
      name: 'dr. Adrian Pratama, Sp.A',
      tagline: 'Spesialis Anak & Tumbuh Kembang',
      category: 'Bio, Profesional & Klinik',
      url: 'dradrian.sivilize.space',
      price: 'Rp 349.000 / thn',
      badge: 'Profil Terverifikasi',
      themeStyle: 'Corporate Clean (Putih Medis)',
      fontFamily: "'Inter', sans-serif",
      gridCols: 'list',
      surface: 'Flat Minimal',
      navbar: 'Centered Logo',
      heroTitle: 'Praktek Resmi Dokter Spesialis Anak & Konsultasi.',
      heroDesc: 'Layanan konsultasi kesehatan anak, imunisasi, dan pemantauan nutrisi di RSIA & Klinik Mandiri.',
      products: [
        { name: 'Konsultasi Telemedisin Online 30 Menit', price: 150000, tag: 'Booking Slot', category: 'Telemedisin' },
        { name: 'Paket Skrining Tumbuh Kembang Balita', price: 250000, tag: 'Di Klinik', category: 'Klinik' },
        { name: 'Vaksinasi & Imunisasi Dasar Lengkap', price: 300000, tag: 'Jadwal Rutin', category: 'Imunisasi' },
      ],
      features: [
        'Profil SIP & STR dokter resmi',
        'Tabel jadwal praktek RS & Klinik',
        'Formulir reservasi konsultasi',
        'Tautan artikel edukasi anak',
      ],
    },
  ];

  // DATA PREVIEW: 3 HASIL RAKITAN CUSTOM (BEBAS ROMBAK)
  const CUSTOM_STORES = [
    {
      id: 'atelier-paris',
      name: 'Atelier Mode & Butik Seni',
      tagline: 'High-Fashion & Handmade Atelier',
      category: 'Hasil Rakitan: Avant-Garde',
      url: 'atelier.sivilize.space',
      price: 'Rp 569.000 / thn',
      badge: 'Custom Architecture',
      themeStyle: 'Gaya Butik Eksentrik (Syne + Masonry)',
      fontFamily: "'Syne', sans-serif",
      gridCols: 'masonry',
      surface: 'Frosted Glass 12px',
      navbar: 'Floating Island Glass',
      heroTitle: 'Karya Busana Konseptual untuk Mereka yang Autentik.',
      heroDesc: 'Dirakit dengan tipografi Syne Avant-Garde, navbar kapsul melayang, dan galeri asimetris bergaya Pinterest.',
      products: [
        { name: 'Sculptural Linen Trench Coat', price: 780000, tag: 'Atelier Piece', category: 'Coat' },
        { name: 'Draped Silk Wrap Skirt', price: 490000, tag: 'Handmade', category: 'Skirt' },
        { name: 'Pleated Asymmetric Blouse', price: 420000, tag: 'Limited Edition', category: 'Top' },
      ],
      features: [
        'Font: Syne Avant-Garde (+Rp 35k)',
        'Grid: Asymmetric Masonry (+Rp 35k)',
        'Navbar: Floating Island Glass (+Rp 25k)',
        'Surface: Frosted Glass 12px (+Rp 20k)',
      ],
    },
    {
      id: 'roastery-bajawa',
      name: 'Roastery Kopi Flores Bajawa',
      tagline: 'Specialty Beans & Coffee Equipment',
      category: 'Hasil Rakitan: Editorial Luxury',
      url: 'roastery.sivilize.space',
      price: 'Rp 549.000 / thn',
      badge: 'Custom Architecture',
      themeStyle: 'Editorial Luxury (Playfair + 2 Kolom)',
      fontFamily: "'Playfair Display', Georgia, serif",
      gridCols: '2',
      surface: 'Deep Smoked Glass',
      navbar: 'Centered Logo Paris',
      heroTitle: 'Dedikasi Memanggang Biji Kopi Terbaik Nusantara.',
      heroDesc: 'Dirakit dengan tipografi Playfair Display klasik, tata letak foto besar 2 kolom, dan kaca gelap deep smoked glass.',
      products: [
        { name: 'Anaerobic Natural Bajawa 200g', price: 125000, tag: 'Competition Grade', category: 'Roasted Beans' },
        { name: 'Full Washed Yellow Caturra 200g', price: 95000, tag: 'Sweet Honey', category: 'Roasted Beans' },
      ],
      features: [
        'Font: Playfair Display Serif (+Rp 25k)',
        'Grid: 2 Kolom Foto Besar (Rp 0)',
        'Navbar: Centered Logo Butik (+Rp 25k)',
        'Surface: Deep Smoked 24px (+Rp 35k)',
        'Halaman: +1 Tentang Petani (+Rp 50k)',
      ],
    },
    {
      id: 'pro-hardware',
      name: 'Nusantara Hardware & Tools',
      tagline: 'Perkakas Industri & Grosir Bangunan',
      category: 'Hasil Rakitan: High Density',
      url: 'hardware.sivilize.space',
      price: 'Rp 574.000 / thn',
      badge: 'Custom Architecture',
      themeStyle: 'Industrial Brutalist (Mono + 4 Kolom)',
      fontFamily: "'JetBrains Mono', monospace",
      gridCols: '4',
      surface: 'Solid Sharp 0px',
      navbar: 'Full-Width Industrial',
      heroTitle: 'Inventaris Perkakas Teknik & Alat Berat Terlengkap.',
      heroDesc: 'Dirakit dengan font JetBrains Mono teknikal, 4 kolom padat katalog, dan sudut siku brutalist 0px dengan +2 halaman ekstra.',
      products: [
        { name: 'Cordless Drill 20V Pro', price: 450000, tag: 'Garansi 2 Thn', category: 'Power Tools' },
        { name: 'Laser Measure 50M Digital', price: 280000, tag: 'Presisi 1mm', category: 'Measuring' },
        { name: 'Toolkit Set 108 Pcs Besi', price: 385000, tag: 'Heavy Duty', category: 'Hand Tools' },
        { name: 'Impact Wrench Brushless', price: 520000, tag: 'High Torque', category: 'Automotive' },
      ],
      features: [
        'Font: JetBrains Mono (+Rp 25k)',
        'Grid: 4 Kolom Padat (+Rp 25k)',
        'Radius: Sharp 0px Brutalist (Rp 0)',
        'Halaman: +2 Syarat & Garansi (+Rp 100k)',
      ],
    },
  ];

  const currentStoreList = activeCategory === 'template' ? TEMPLATE_STORES : CUSTOM_STORES;
  const currentStore = currentStoreList.find((s) => s.id === selectedStoreId) || currentStoreList[0];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-800">
            <Eye className="w-3.5 h-3.5 text-neutral-950" />
            <span>BUKAN BROSUR TIRUAN • LIVE PREVIEW STOREFRONT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 leading-tight">
            Lihat Persis Seperti Apa Website Bisnis Anda.
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Pilih antara <strong>Template Siap Pakai (Aktif 60 Detik)</strong> atau <strong>Hasil Rakitan Custom (Bebas Rombak)</strong>.
            Semua website di bawah ini berjalan di atas infrastruktur Anycast Edge kami, siap tayang profesional untuk bisnis Anda tanpa potongan komisi!
          </p>

          {/* Master Category Toggle: Template vs Custom */}
          <div className="inline-flex p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200 gap-1.5 mt-4">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('template');
                setSelectedStoreId('kopi-senja');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeCategory === 'template'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              ✨ 1. Koleksi Template Jadi (Mulai Rp 349k/thn)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory('custom');
                setSelectedStoreId('atelier-paris');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeCategory === 'custom'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              ⚡ 2. Hasil Rakitan Custom (Mulai Rp 449k/thn)
            </button>
          </div>
        </div>

        {/* WORKBENCH SHOWCASE: KIRI PILIHAN WEBSITE, KANAN CANVAS BROWSER NYATA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Tab Pilihan Website (5 Kolom) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
              PILIH CONTOH WEBSITE ({activeCategory === 'template' ? '4 TEMPLATE' : '3 RAKITAN'}):
            </h4>

            {currentStoreList.map((st) => {
              const isSelected = currentStore.id === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStoreId(st.id)}
                  className={`w-full p-4.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                      : 'border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-sm tracking-tight">{st.name}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {st.price}
                    </span>
                  </div>

                  <p className={`text-xs ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {st.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10 text-[11px]">
                    <span className={`font-mono ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      https://{st.url}
                    </span>
                    <span className={`font-bold flex items-center gap-1 ${isSelected ? 'text-emerald-400' : 'text-neutral-900'}`}>
                      <span>Lihat Preview</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Link Eksternal ke Rakit / Harga */}
            <div className="pt-3">
              {activeCategory === 'template' ? (
                <Link
                  href="/harga"
                  className="w-full py-3 px-4 rounded-xl border border-neutral-300 hover:border-neutral-950 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Buka Semua Paket & Biaya Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href="/rakit"
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Buka Studio Rakit Website Sendiri</span>
                  <Sliders className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Kolom Kanan: The Real Responsive Browser Mockup Frame (7 Kolom) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Toolbar: Simulator Device & Live Status */}
            <div className="p-3 rounded-2xl bg-neutral-900 text-white flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-tight">
                  LIVE SIMULATOR: {currentStore.name}
                </span>
              </div>

              {/* Device Selector */}
              <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDeviceView('desktop')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    deviceView === 'desktop' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceView('mobile')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    deviceView === 'mobile' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile HP</span>
                </button>
              </div>
            </div>

            {/* BROWSER CANVAS FRAME */}
            <div
              className={`mx-auto rounded-3xl border border-neutral-300/80 bg-neutral-100 shadow-xl overflow-hidden transition-all duration-300 ${
                deviceView === 'mobile' ? 'max-w-[360px]' : 'w-full'
              }`}
            >
              {/* Browser Address Bar Chrome */}
              <div className="bg-neutral-200/80 px-4 py-2.5 border-b border-neutral-300 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="flex-1 bg-white px-3 py-1 rounded-lg border border-neutral-300/80 font-mono text-[11px] text-neutral-700 flex items-center justify-between truncate">
                  <span className="truncate">https://{currentStore.url}</span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 ml-2 shrink-0">
                    SSL AKTIF
                  </span>
                </div>

                <span className="text-[10px] font-mono text-neutral-500 shrink-0 hidden sm:inline">0.03s Edge</span>
              </div>

              {/* RENDER STOREFRONT CANVAS */}
              <div
                className="p-4 sm:p-6 bg-white min-h-[460px] space-y-4 text-neutral-900"
                style={{ fontFamily: currentStore.fontFamily }}
              >
                {/* Store Navbar Mockup */}
                <div
                  className={`pb-3 border-b border-neutral-200 flex items-center justify-between gap-2 ${
                    currentStore.navbar.includes('Floating')
                      ? 'p-3 rounded-full bg-neutral-50 border border-neutral-300/80 shadow-xs mb-3'
                      : currentStore.navbar.includes('Centered')
                      ? 'justify-center flex-col'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-neutral-950 text-white flex items-center justify-center text-xs font-black">
                      {currentStore.name.charAt(0)}
                    </span>
                    <strong className="text-xs sm:text-sm font-extrabold tracking-tight">
                      {currentStore.name}
                    </strong>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-600">
                    <span className="text-neutral-950 underline">Beranda</span>
                    <span>Katalog</span>
                    <span className="hidden sm:inline">Kontak</span>
                  </div>
                </div>

                {/* Hero Banner Mockup */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600">
                    {currentStore.badge} • {currentStore.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                    {currentStore.heroTitle}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {currentStore.heroDesc}
                  </p>
                </div>

                {/* Product Catalog Grid Mockup */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="font-extrabold uppercase tracking-wider text-neutral-900">
                      Menu & Produk Unggulan:
                    </strong>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Format: {currentStore.gridCols}
                    </span>
                  </div>

                  <div
                    className={
                      currentStore.gridCols === 'list'
                        ? 'space-y-2'
                        : currentStore.gridCols === '2'
                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
                        : currentStore.gridCols === '4'
                        ? 'grid grid-cols-2 sm:grid-cols-4 gap-2'
                        : currentStore.gridCols === 'masonry'
                        ? 'grid grid-cols-2 sm:grid-cols-3 gap-2.5'
                        : 'grid grid-cols-1 sm:grid-cols-3 gap-3'
                    }
                  >
                    {currentStore.products.map((prod, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedProductInModal(prod.name)}
                        className={`p-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-950 transition-all cursor-pointer group shadow-xs ${
                          currentStore.gridCols === 'list' ? 'flex items-center justify-between gap-3' : 'space-y-1.5'
                        }`}
                      >
                        <div
                          className={`rounded-lg bg-neutral-100 flex items-center justify-center font-mono text-[10px] text-neutral-500 shrink-0 ${
                            currentStore.gridCols === 'list' ? 'w-12 h-12' : currentStore.gridCols === '2' ? 'w-full h-24' : 'w-full h-16'
                          }`}
                        >
                          📦 Foto Produk
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-700">
                            {prod.tag}
                          </span>
                          <h4 className="font-bold text-xs truncate mt-0.5">{prod.name}</h4>
                          <p className="font-mono font-bold text-xs text-emerald-600 mt-1">
                            {formatRupiah(prod.price)}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-lg bg-neutral-950 text-white text-[10px] font-bold group-hover:bg-emerald-600 transition-colors shrink-0"
                        >
                          Beli
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Penegasan Alur Checkout di Bawah Preview */}
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-[11px] text-emerald-950 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>0% Komisi Marketplace:</strong> Pembayaran pembeli masuk langsung ke WhatsApp / Rekening Anda.</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 shrink-0">Bebas Potongan</span>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-3.5 sm:p-4 bg-neutral-50 border-t border-neutral-300/80 flex items-center justify-between flex-wrap gap-3">
                <div className="text-xs">
                  <span className="text-neutral-500">Harga Sewa: </span>
                  <strong className="text-neutral-950 font-mono text-sm">{currentStore.price}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenOnboarding) {
                        onOpenOnboarding(currentStore.id, 'pro');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-black shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Sewa Website Model Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
