'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  ShoppingBag,
  Wrench,
  Shirt,
  Scissors,
  Pill,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Monitor,
  Smartphone,
  Layers,
  ShieldCheck,
  Zap,
  QrCode,
  Receipt,
  RotateCcw,
} from 'lucide-react';
import type { PlanTier } from '@/types/database';

export interface IndustryBundleData {
  id: string;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  badge: string;
  colorScheme: {
    accent: string;
    bgAccent: string;
    borderAccent: string;
    textAccent: string;
    pillBg: string;
  };
  includesDineLite: boolean;
  includedApps: {
    name: string;
    tag: string;
    desc: string;
    highlight: string;
  }[];
  industryFeatures: string[];
  workflowSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  licenseExample: string;
  recommendedPlan: PlanTier;
  monthlyPrice: string;
  annualPrice: string;
  annualSavings: string;
  slugSuggestion: string;
  defaultCategoryName: string;
}

const INDUSTRY_BUNDLES: IndustryBundleData[] = [
  {
    id: 'fnb',
    name: 'Kuliner, Resto, Cafe & FnB',
    shortName: '🍽️ Kuliner & Cafe',
    icon: UtensilsCrossed,
    tagline: 'Ekosistem Lengkap Dine-In, Kasir POS & Website Menu Mandiri',
    badge: '3-in-1 Triple Ecosystem (Inc. Dine Lite)',
    colorScheme: {
      accent: 'amber-500',
      bgAccent: 'bg-amber-500/10',
      borderAccent: 'border-amber-500/30',
      textAccent: 'text-amber-500',
      pillBg: 'bg-amber-50 text-amber-900 border-amber-300',
    },
    includesDineLite: true,
    includedApps: [
      {
        name: 'Website Menu & Storefront Anycast',
        tag: 'Website Resmi',
        desc: 'Website katalog menu berkecepatan tinggi dengan foto makanan, promo, info resto, dan alamat rute Google Maps.',
        highlight: 'Domain Resmi + 0% Potongan Komisi',
      },
      {
        name: 'SiKasir POS Modern (Online/Offline)',
        tag: 'Aplikasi Kasir Kasir',
        desc: 'Sistem kasir cerdas dengan Kitchen Display System (KDS), cetak struk termal dapur/bar, dan resep bahan baku otomatis.',
        highlight: 'Kitchen Display (KDS) + Resep Bahan',
      },
      {
        name: 'Sivilize Dine Lite (Self-Order Meja QR)',
        tag: 'Self-Order QR Meja',
        desc: 'Pelanggan tinggal scan barcode QR di meja, langsung pesan dari HP sendiri tanpa perlu tunggu pelayan bolak-balik.',
        highlight: 'Scan QR Meja + Live Stok 2-Arah',
      },
    ],
    industryFeatures: [
      'Sinkronisasi Stok 2-Arah Seketika: Stok di kasir menipis langsung tampil habis di QR Meja pelanggan.',
      'Cek Meja & Gabung Tagihan: Kasir tinggal klik nomor meja untuk cetak bon & terima pembayaran QRIS.',
      'Kitchen Display System (KDS): Koki langsung melihat pesanan baru masuk secara real-time tanpa kertas nota hilang.',
      '1 Kode Aktivasi Ekosistem (SIV-FNB-365D): Mengaktifkan ketiga aplikasi sekaligus secara instan.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Scan QR di Meja',
        desc: 'Tamu duduk dan memindai QR code di meja mereka via Sivilize Dine Lite tanpa perlu install aplikasi apapun.',
      },
      {
        step: '02',
        title: 'Pesanan Masuk Otomatis',
        desc: 'Pesanan otomatis muncul di SiKasir POS kasir dan layar Kitchen Display (KDS) koki dapur secara bersamaan.',
      },
      {
        step: '03',
        title: 'Stok Terpotong & Bayar',
        desc: 'Stok bahan langsung terpotong, tamu bayar di kasir sesuai nomor meja via QRIS atau tunai dengan struk resmi.',
      },
    ],
    licenseExample: 'SIV-FNB-365D',
    recommendedPlan: 'pro',
    monthlyPrice: 'Rp 69.000',
    annualPrice: 'Rp 599.000',
    annualSavings: 'Hemat Rp 229.000 + Gratis Domain .my.id',
    slugSuggestion: 'kedai-senja-resto',
    defaultCategoryName: 'Kuliner, Kafe & FnB',
  },
  {
    id: 'retail',
    name: 'Retail, Minimarket & Fashion Distro',
    shortName: '🛒 Retail & Minimarket',
    icon: ShoppingBag,
    tagline: 'Website Etalase Online & POS Kasir Barcode Scanner',
    badge: '2-in-1 POS & E-Commerce Suite',
    colorScheme: {
      accent: 'emerald-500',
      bgAccent: 'bg-emerald-500/10',
      borderAccent: 'border-emerald-500/30',
      textAccent: 'text-emerald-500',
      pillBg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    },
    includesDineLite: false,
    includedApps: [
      {
        name: 'Website Katalog & Olshop Mandiri',
        tag: 'Storefront Olshop',
        desc: 'Etalase produk dengan varian warna/ukuran, checkout mandiri dengan QRIS otomatis langsung ke rekening Anda.',
        highlight: '0% Potongan Komisi Penjualan',
      },
      {
        name: 'SiKasir POS Retail & Grosir',
        tag: 'Aplikasi Kasir Barcode',
        desc: 'Mendukung barcode scanner USB/Bluetooth, harga eceran vs grosir, cetak label barcode, dan peringatan batas stok tipis.',
        highlight: 'Barcode Scanner + Harga Bertingkat',
      },
    ],
    industryFeatures: [
      'Manajemen Stok Multi-Varian (Warna, Ukuran S/M/L/XL, Brand).',
      'Pencarian Cepat dengan Barcode Scanner fisik maupun kamera handphone.',
      'Laporan Laba/Rugi Harian & Arus Kas Kasir Terverifikasi otomatis.',
      'Kode Lisensi Instan (SIV-RETAIL-365D) untuk aktivasi SiKasir tanpa setup rumit.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Input / Scan Barcode',
        desc: 'Kasir scan barcode barang pembeli dalam hitungan detik dengan kalkulasi diskon member otomatis.',
      },
      {
        step: '02',
        title: 'Sinkronisasi Etalase Web',
        desc: 'Stok toko fisik dan website langsung tersinkronisasi sehingga Anda terhindar dari overselling.',
      },
      {
        step: '03',
        title: 'Laporan Penjualan Rapi',
        desc: 'Semua omset dan margin profit terekap detail di dashboard admin toko Anda.',
      },
    ],
    licenseExample: 'SIV-RETAIL-365D',
    recommendedPlan: 'pro',
    monthlyPrice: 'Rp 69.000',
    annualPrice: 'Rp 599.000',
    annualSavings: 'Hemat Rp 229.000 + Gratis Domain Pribadi',
    slugSuggestion: 'tokoberkah-jaya',
    defaultCategoryName: 'Retail & Toko Kelontong',
  },
  {
    id: 'workshop',
    name: 'Bengkel, Servis & Sparepart Otomotif',
    shortName: '🔧 Bengkel & Servis',
    icon: Wrench,
    tagline: 'Website Booking Servis & Kasir Nopol Kendaraan + Mekanik',
    badge: 'Spesialis Bengkel Motor / Mobil',
    colorScheme: {
      accent: 'blue-500',
      bgAccent: 'bg-blue-500/10',
      borderAccent: 'border-blue-500/30',
      textAccent: 'text-blue-500',
      pillBg: 'bg-blue-50 text-blue-900 border-blue-300',
    },
    includesDineLite: false,
    includedApps: [
      {
        name: 'Website Bengkel & Booking Online',
        tag: 'Website Bengkel',
        desc: 'Pricelist jasa servis, ganti oli, sparepart asli, dan form reservasi jadwal antrean servis dari pelanggan.',
        highlight: 'Jadwal Antrean Servis Mandiri',
      },
      {
        name: 'SiKasir POS Modul Bengkel',
        tag: 'Kasir Bengkel',
        desc: 'Input nomor polisi (nopol), catatan odometer (KM), pilih montir/mekanik yang mengerjakan, dan hitung komisi jasa servis.',
        highlight: 'Tracking Nopol + Komisi Montir',
      },
    ],
    industryFeatures: [
      'Pencatatan Nopol Kendaraan & Riwayat Servis Pelanggan di setiap transaksi.',
      'Pemisahan Transaksi: Sparepart (Barang) vs Ongkos Pasang (Jasa Murni).',
      'Perhitungan otomatis bagi hasil / komisi mekanik per pengerjaan unit.',
      'Kode Lisensi Instan (SIV-BENGKEL-365D) siap digunakan langsung di kasir ruko.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Daftar Servis & Nopol',
        desc: 'Pelanggan datang atau booking via web, kasir input Nopol, KM terakhir, dan keluhan mesin.',
      },
      {
        step: '02',
        title: 'Mekanik Menangani',
        desc: 'Mekanik ditugaskan, suku cadang diambil dari stok, dan biaya jasa terakumulasi rapi di sistem.',
      },
      {
        step: '03',
        title: 'Struk Detail & Garansi',
        desc: 'Cetak faktur servis transparan dengan tanggal servis berikutnya agar pelanggan kembali lagi.',
      },
    ],
    licenseExample: 'SIV-BENGKEL-365D',
    recommendedPlan: 'pro',
    monthlyPrice: 'Rp 69.000',
    annualPrice: 'Rp 599.000',
    annualSavings: 'Hemat Rp 229.000 + Bebas Ribet',
    slugSuggestion: 'motocare-workshop',
    defaultCategoryName: 'Jasa & Servis',
  },
  {
    id: 'laundry',
    name: 'Laundry, Dry Clean & Cuci Sepatu',
    shortName: '🧺 Laundry & Cuci',
    icon: Shirt,
    tagline: 'Website Layanan Antar-Jemput & Kasir Nomor Rak Laundry',
    badge: 'Spesialis Kiloan & Satuan',
    colorScheme: {
      accent: 'cyan-500',
      bgAccent: 'bg-cyan-500/10',
      borderAccent: 'border-cyan-500/30',
      textAccent: 'text-cyan-500',
      pillBg: 'bg-cyan-50 text-cyan-900 border-cyan-300',
    },
    includesDineLite: false,
    includedApps: [
      {
        name: 'Website Profil Laundry & Pickup Order',
        tag: 'Website Laundry',
        desc: 'Paket cuci express, cuci kiloan, karpet, sepatu, serta form permintaan antar-jemput cucian ke rumah pelanggan.',
        highlight: 'Form Antar-Jemput Praktis',
      },
      {
        name: 'SiKasir POS Modul Laundry',
        tag: 'Kasir Laundry',
        desc: 'Penomoran rak penyimpanan baju selesai, status cuci (Diterima, Dicuci, Disetrika, Selesai), dan timbangan kiloan desimal.',
        highlight: 'Nomor Rak + Status Cucian',
      },
    ],
    industryFeatures: [
      'Pemberian Nomor Rak Otomatis agar pakaian pelanggan tidak pernah tertukar atau hilang.',
      'Dukungan Timbangan Desimal (misal 3.4 kg cuci setrika) terhitung akurat.',
      'Kirim notifikasi otomatis saat cucian siap diambil oleh pemiliknya.',
      'Kode Lisensi Instan (SIV-LAUNDRY-365D) langsung aktif di aplikasi kasir.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Timbang & Input Rak',
        desc: 'Cucian ditimbang, kasir pilih paket (kiloan/satuan), dan sistem menetapkan nomor rak simpan.',
      },
      {
        step: '02',
        title: 'Proses Pengerjaan',
        desc: 'Staf update status (Cuci -> Kering -> Setrika -> Selesai di Rak) terpantau di kasir.',
      },
      {
        step: '03',
        title: 'Pengambilan & Struk',
        desc: 'Pelanggan mengambil baju dengan membawa nomor nota atau bayar saat diantar ke rumah.',
      },
    ],
    licenseExample: 'SIV-LAUNDRY-365D',
    recommendedPlan: 'pro',
    monthlyPrice: 'Rp 69.000',
    annualPrice: 'Rp 599.000',
    annualSavings: 'Hemat Rp 229.000 + Termasuk Web',
    slugSuggestion: 'freshwash-laundry',
    defaultCategoryName: 'Jasa & Laundry',
  },
  {
    id: 'barber',
    name: 'Barbershop, Pangkas Rambut & Salon Kecantikan',
    shortName: '✂️ Barbershop & Salon',
    icon: Scissors,
    tagline: 'Website Reservasi Stylist & Kasir Komisi Kapster',
    badge: 'Spesialis Grooming & Salon',
    colorScheme: {
      accent: 'purple-500',
      bgAccent: 'bg-purple-500/10',
      borderAccent: 'border-purple-500/30',
      textAccent: 'text-purple-500',
      pillBg: 'bg-purple-50 text-purple-900 border-purple-300',
    },
    includesDineLite: false,
    includedApps: [
      {
        name: 'Website Katalog Gaya & Reservasi',
        tag: 'Website Salon',
        desc: 'Katalog tren potongan rambut, perawatan wajah, pewarnaan, dan jadwal booking stylist favorit pelanggan.',
        highlight: 'Katalog Model Rambut & Portofolio',
      },
      {
        name: 'SiKasir POS Modul Barbershop',
        tag: 'Kasir Salon',
        desc: 'Pilihan kapster/stylist per layanan, penjualan pomade/vitamin rambut, dan perhitungan komisi bagi hasil kapster harian.',
        highlight: 'Pilihan Kapster + Komisi Harian',
      },
    ],
    industryFeatures: [
      'Pencatatan Kapster/Therapist yang melayani pelanggan secara transparan.',
      'Kombinasi Jasa Potong Rambut + Penjualan Produk Retail Grooming.',
      'Laporan omset harian per kursi pangkas rambut untuk evaluasi performa staf.',
      'Kode Lisensi Instan (SIV-BARBER-365D) siap digunakan di tablet atau kasir salon.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Pilih Layanan & Kapster',
        desc: 'Pelanggan memilih paket haircut / perawatan dan menentukan kapster favorit yang bertugas.',
      },
      {
        step: '02',
        title: 'Add-on Produk Retail',
        desc: 'Kasir dapat menambahkan produk pomade atau hair tonic tambahan ke dalam satu struk transaksi.',
      },
      {
        step: '03',
        title: 'Komisi Terhitung Otomatis',
        desc: 'Komisi kapster langsung tercatat di laporan harian tanpa perlu hitung kalkulator manual.',
      },
    ],
    licenseExample: 'SIV-BARBER-365D',
    recommendedPlan: 'pro',
    monthlyPrice: 'Rp 69.000',
    annualPrice: 'Rp 599.000',
    annualSavings: 'Hemat Rp 229.000 + Siap Pakai',
    slugSuggestion: 'gentleman-barber',
    defaultCategoryName: 'Jasa & Servis',
  },
  {
    id: 'pharmacy',
    name: 'Apotek, Toko Obat Herbal & Klinik',
    shortName: '💊 Apotek & Klinik',
    icon: Pill,
    tagline: 'Website Katalog Obat & Kasir Nomor Resep Dokter',
    badge: 'Spesialis Farmasi & Herbal',
    colorScheme: {
      accent: 'rose-500',
      bgAccent: 'bg-rose-500/10',
      borderAccent: 'border-rose-500/30',
      textAccent: 'text-rose-500',
      pillBg: 'bg-rose-50 text-rose-900 border-rose-300',
    },
    includesDineLite: false,
    includedApps: [
      {
        name: 'Website Katalog Obat Bebas & Info Klinik',
        tag: 'Website Apotek',
        desc: 'Katalog suplemen, vitamin, jamu herbal berizin resmi, jam operasional apoteker, dan informasi konsultasi kesehatan.',
        highlight: 'Profil Resmi Apoteker & Klinik',
      },
      {
        name: 'SiKasir POS Modul Apotek',
        tag: 'Kasir Apotek',
        desc: 'Input nomor resep dokter, nama dokter perujuk, peringatan kedaluwarsa (ED), dan nomor batch obat untuk kepatuhan regulasi.',
        highlight: 'Nomor Resep Dokter + Nomor Batch',
      },
    ],
    industryFeatures: [
      'Input Nomor Resep Dokter & Nama Dokter pada transaksi obat keras terdaftar.',
      'Peringatan tanggal kadaluwarsa (Expired Date) obat agar stok lama terdeteksi dini.',
      'Cetak label aturan pakai obat (3x1 sesudah makan) langsung dari kasir.',
      'Kode Lisensi Instan (SIV-APOTEK-365D) untuk operasional apotek yang patuh aturan.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Terima Resep / Pembelian Bebas',
        desc: 'Apoteker memasukkan nama obat, nomor resep dokter, dan mengecek ketersediaan stok.',
      },
      {
        step: '02',
        title: 'Verifikasi Batch & Aturan Pakai',
        desc: 'Sistem memastikan obat belum kadaluwarsa dan mencatat nomor batch secara rapi.',
      },
      {
        step: '03',
        title: 'Struk & Pembayaran Resmi',
        desc: 'Pasien membayar via QRIS/Tunai dan menerima struk lengkap beserta rincian nama obat.',
      },
    ],
    licenseExample: 'SIV-APOTEK-365D',
    recommendedPlan: 'pro',
    monthlyPrice: 'Rp 69.000',
    annualPrice: 'Rp 599.000',
    annualSavings: 'Hemat Rp 229.000 + Standar Farmasi',
    slugSuggestion: 'apotek-sehat-prima',
    defaultCategoryName: 'Jasa & Servis',
  },
];

interface IndustryBundleSectionProps {
  onSelectBundle: (bundle: IndustryBundleData) => void;
}

export function IndustryBundleSection({ onSelectBundle }: IndustryBundleSectionProps) {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('fnb');

  const currentBundle =
    INDUSTRY_BUNDLES.find((b) => b.id === selectedIndustryId) || INDUSTRY_BUNDLES[0];

  const IconComponent = currentBundle.icon;

  return (
    <section className="py-20 bg-neutral-950 text-neutral-100 border-b border-neutral-800 relative overflow-hidden">
      {/* Glow background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-semibold text-emerald-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLUSI SPESIFIK BERDASARKAN BIDANG USAHA ANDA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Satu Sewa Website, Langsung Dapat Ekosistem Kasir Terlengkap
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Tidak perlu bayar banyak software terpisah! Setiap paket sewa website di Sivilize Space sudah
            <span className="text-white font-bold"> otomatis meng-include aplikasi kasir SiKasir POS</span> dan
            <span className="text-amber-400 font-bold"> Sivilize Dine Lite (khusus F&B)</span> dengan sinkronisasi stok 2-arah seketika.
          </p>
        </div>

        {/* PILL BAR SWITCHER (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {INDUSTRY_BUNDLES.map((bundle) => {
            const isSelected = bundle.id === selectedIndustryId;
            return (
              <button
                key={bundle.id}
                type="button"
                onClick={() => setSelectedIndustryId(bundle.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 border ${
                  isSelected
                    ? 'bg-white text-neutral-950 border-white shadow-lg shadow-white/10 scale-105'
                    : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{bundle.shortName}</span>
                {bundle.includesDineLite && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold">
                    +Dine Lite
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE INDUSTRY SHOWCASE CARD */}
        <div className="mt-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          {/* Top Banner Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-neutral-800 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 shadow-inner">
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-neutral-800 text-neutral-300 border border-neutral-700 uppercase">
                    {currentBundle.badge}
                  </span>
                  {currentBundle.includesDineLite && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      ★ Self-Order QR Meja Aktif
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentBundle.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  {currentBundle.tagline}
                </p>
              </div>
            </div>

            {/* Quick Price & CTA Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 shrink-0">
              <div>
                <div className="text-[11px] text-neutral-400 uppercase font-mono">Biaya Sewa Terpadu:</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-white font-mono">{currentBundle.annualPrice}</span>
                  <span className="text-xs text-neutral-400 font-mono">/ tahun</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">{currentBundle.annualSavings}</div>
              </div>

              <button
                type="button"
                onClick={() => onSelectBundle(currentBundle)}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs sm:text-sm tracking-tight transition-transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                <span>Sewa Paket {currentBundle.shortName.split(' ')[1] || 'Ini'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* INCLUDED APPLICATIONS GRID (WHAT YOU GET) */}
          <div className="py-8 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  APLIKASI YANG SUDAH TERMASUK (100% INCLUDED)
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  Semua Terhubung Langsung Tanpa Perlu Koding
                </h4>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1 Kode Lisensi Ekosistem: <strong className="text-white">{currentBundle.licenseExample}</strong></span>
              </div>
            </div>

            <div className={`grid grid-cols-1 ${currentBundle.includesDineLite ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
              {currentBundle.includedApps.map((app, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 flex flex-col justify-between relative group hover:border-neutral-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300">
                        {app.tag}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>SUDAH TERMASUK</span>
                      </span>
                    </div>
                    <h5 className="text-base font-bold text-white mb-2">{app.name}</h5>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">{app.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{app.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TWO COLUMN DETAILS: INDUSTRY ADVANTAGES & WORKFLOW SIMULATION */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Spesifikasi Khusus Usaha Ini */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                FITUR UNGGULAN SPESIFIK INDUSTRI
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                {currentBundle.industryFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 space-y-1 mt-4">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Sinkronisasi Stok 2-Arah Tanpa Delay</span>
                </div>
                <p>
                  Ketika stok di kasir fisik terjual, katalog di website dan QR Meja Dine Lite langsung terbarui secara otomatis detik itu juga. Tidak ada komplain menu habis dari pelanggan.
                </p>
              </div>
            </div>

            {/* Right: Alur Kerja Nyata di Toko Anda */}
            <div className="space-y-4 bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                SIMULASI ALUR OPERASIONAL NYATA
              </span>

              <div className="space-y-4">
                {currentBundle.workflowSteps.map((wf, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-800 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {wf.step}
                    </div>
                    <div>
                      <h6 className="text-xs sm:text-sm font-bold text-white">{wf.title}</h6>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{wf.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA Inside Box */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-mono">Status Pembayaran:</div>
                  <div className="text-xs font-bold text-emerald-400">Dashboard Otomatis Aktif Seketika</div>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectBundle(currentBundle)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <span>Mulai Sewa Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
