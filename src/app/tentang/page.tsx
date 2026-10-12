'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Building2, MapPin, Scale, Layers, CheckCircle2 } from 'lucide-react';

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 border-b border-neutral-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
              Profil Perusahaan & Payung Hukum
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-4 leading-tight">
              PT SIVILIZE CORP INDONESIA
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Didirikan untuk mengembalikan kedaulatan bisnis digital ke tangan pemilik usaha.
              Kami membangun infrastruktur perangkat lunak mandiri yang bebas dari pemerasan komisi pihak ketiga.
            </p>
          </div>
        </section>

        {/* Corporate Legal Card */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-8">
            <div>
              <h3 className="text-xl font-bold text-neutral-950 mb-2">Legalitas & Identitas Korporat</h3>
              <p className="text-xs sm:text-sm text-neutral-600">
                SivilizeSpace adalah platform WaaS yang beroperasi penuh di bawah naungan badan hukum perseroan terbatas resmi Republik Indonesia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[11px] font-mono text-neutral-500 uppercase">Nama Entitas Resmi</span>
                <p className="font-extrabold text-sm text-neutral-950">PT SIVILIZE CORP INDONESIA</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[11px] font-mono text-neutral-500 uppercase">Nomor Induk Berusaha (NIB)</span>
                <p className="font-extrabold text-sm text-neutral-950 font-mono">0207260103661</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[11px] font-mono text-neutral-500 uppercase">Klasifikasi Baku Lapangan Usaha (KBLI)</span>
                <p className="font-extrabold text-sm text-neutral-950">62199 — Aktivitas Pemrograman Komputer Lainnya</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[11px] font-mono text-neutral-500 uppercase">Domisili Kantor Pusat</span>
                <p className="font-extrabold text-sm text-neutral-950">Kota Kupang, Nusa Tenggara Timur (NTT)</p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-4">
              <h4 className="font-bold text-sm text-neutral-950">Kepatuhan Hukum Elektronik & Regulasi Siber</h4>
              <ul className="space-y-3 text-xs text-neutral-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Undang-Undang RI No. 1 Tahun 2024:</strong> Perubahan Kedua atas UU No. 11/2008 tentang Informasi dan Transaksi Elektronik (UU ITE).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Peraturan Pemerintah No. 71 Tahun 2019:</strong> Penyelenggaraan Sistem dan Transaksi Elektronik (PSTE) sebagai Penyelenggara Sistem Elektronik (PSE).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Kebijakan Toleransi Nol (Zero Tolerance):</strong> Pemindaian otomatis dan penolakan instan terhadap segala bentuk sindikat judi online (judol) dan pinjaman online ilegal (pinjol) di level kernel sistem.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
