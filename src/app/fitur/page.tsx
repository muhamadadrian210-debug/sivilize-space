'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Globe,
  Layers,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Smartphone,
  CheckCircle2,
  Lock,
  RotateCcw,
} from 'lucide-react';

export default function FiturPage() {
  const features = [
    {
      icon: <Globe className="w-6 h-6 text-neutral-900" />,
      title: 'Sistem Sewa Website Instan (WaaS)',
      desc: 'Sewa website profesional tanpa biaya pembuatan di muka yang mencekik. Website langsung aktif dalam hitungan menit di subdomain resmi atau custom domain bisnis Anda sendiri.',
      tag: 'Core WaaS',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-neutral-900" />,
      title: 'Katalog & Transaksi Langsung di Web',
      desc: 'Pelanggan memilih produk, menentukan varian, memasukkan ke keranjang belanja, dan menyelesaikan checkout langsung di website toko Anda. Tanpa perlu chat manual bolak-balik.',
      tag: 'Web Storefront',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-neutral-900" />,
      title: 'Pembayaran QRIS & Bank Terpadu',
      desc: 'Integrasi pembayaran QRIS Dinamis dan Virtual Account otomatis. Uang penjualan langsung masuk 100% ke rekening Anda dengan 0% potongan komisi penjualan pihak ketiga.',
      tag: '0% Komisi',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-neutral-900" />,
      title: 'Pusat Kendali Merchant di SaaS',
      desc: 'Seluruh operasional dikendalikan dari satu dashboard browser di ponsel atau laptop. Ubah harga dalam 5 detik, aktifkan tombol stok habis, dan upload foto WebP terkompresi otomatis.',
      tag: 'Cloud Dashboard',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-neutral-900" />,
      title: 'Invoice Digital Otomatis',
      desc: 'Setiap transaksi yang lunas langsung menerbitkan invoice digital resmi dengan nomor referensi unik, mencatat rincian belanja dan waktu pembayaran secara akurat di database.',
      tag: 'Automated Record',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-neutral-900" />,
      title: 'Keamanan Microsoft-Grade & SLA 99.8%',
      desc: 'Dilindungi arsitektur 20-layer firewall, anti-brute force, decoy honeypots, dan filter semantic anti-konten terlarang berstandar UU ITE No. 1/2024 dari PT Sivilize Corp Indonesia.',
      tag: 'Zero Trust Security',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 border-b border-neutral-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
              Arsitektur & Kemampuan Sistem
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-4 leading-tight">
              Seluruh Operasional Toko Berjalan di Dalam SaaS SivilizeSpace.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Bukan sekadar bio-link atau etalase gambar mati. SivilizeSpace adalah platform
              Website-as-a-Service (WaaS) lengkap di mana Anda menyewa website, mengelola stok,
              menerima transaksi pelanggan, dan mencatat invoice secara mandiri di web.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      {feat.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-950 mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Section */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Alur Kerja Nyata
              </span>
              <h2 className="text-2xl sm:text-4xl font-black">
                Bagaimana Sistem WaaS Menggantikan Cara Manual yang Melelahkan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <span className="text-2xl font-black text-neutral-400 font-mono">01</span>
                <h4 className="font-bold text-base text-white">Sewa & Aktifkan Toko</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Pilih paket dan nama subdomain. Sistem Anycast Edge langsung memvalidasi dan mengaktifkan website toko Anda dalam 60 detik.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <span className="text-2xl font-black text-neutral-400 font-mono">02</span>
                <h4 className="font-bold text-base text-white">Kelola di SaaS Portal</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Login lewat ponsel Anda untuk menambah menu makanan, stok baju, atau pricelist layanan lengkap dengan foto beresolusi tinggi.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <span className="text-2xl font-black text-neutral-400 font-mono">03</span>
                <h4 className="font-bold text-base text-white">Transaksi & Invoice Web</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Pelanggan memesan mandiri di web, membayar via QRIS, dan menerima invoice resmi otomatis tanpa menyita waktu admin toko Anda.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/harga"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-neutral-950 font-bold text-xs sm:text-sm hover:bg-neutral-100 transition-all shadow-md"
              >
                <span>Lihat Struktur Biaya Sewa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
