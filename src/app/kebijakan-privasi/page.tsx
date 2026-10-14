'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Lock, Eye, Database, CheckCircle2, Server } from 'lucide-react';

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 border-b border-neutral-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
              Privasi & Perlindungan Data Klien
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-4 leading-tight">
              Kebijakan Privasi
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Komitmen PT Sivilize Corp Indonesia dalam menjaga kerahasiaan, keamanan, dan kedaulatan data
              sesuai Undang-Undang Perlindungan Data Pribadi (UU No. 27 Tahun 2022).
            </p>
            <p className="mt-2 text-xs font-mono text-neutral-400">
              Terakhir diperbarui: 14 Oktober 2026 • Standar Kriptografi SHA-512 & SSL TLS 1.3
            </p>
          </div>
        </section>

        {/* Privacy Clauses */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-10 text-neutral-800 text-xs sm:text-sm leading-relaxed">
            
            {/* Bagian 1 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>Data yang Kami Kumpulkan</span>
              </h3>
              <p>
                Untuk keperluan penyediaan website dan validasi keamanan, kami mengumpulkan data terbatas yang Anda berikan secara sukarela:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>Identitas Bisnis:</strong> Nama website, kategori usaha, deskripsi profil, logo, dan tautan media sosial.</li>
                <li><strong>Kontak Pemilik:</strong> Nomor telepon/WhatsApp aktif yang digunakan untuk autentikasi PIN login dan notifikasi status sewa.</li>
                <li><strong>Data Keamanan & Perangkat:</strong> Sidik jari perangkat (device fingerprint), alamat IP, dan log akses sistem guna mencegah serangan siber, brute-force PIN, dan spam bot.</li>
              </ul>
            </div>

            <hr className="border-neutral-200" />

            {/* Bagian 2 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">2</span>
                <span>Tujuan Penggunaan Data</span>
              </h3>
              <p>
                Data yang dikumpulkan HANYA digunakan untuk tujuan:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Menayangkan website bisnis Anda secara publik di internet sesuai domain/subdomain yang disewa.</li>
                <li>Verifikasi login ke Pusat Kendali Dashboard menggunakan enkripsi hash PIN 6 digit.</li>
                <li>Mengirimkan invoice bukti pembayaran sah dan pengingat tanggal jatuh tempo sewa.</li>
                <li>Memenuhi kewajiban hukum regulasi Penyelenggara Sistem Elektronik (PSE) Republik Indonesia.</li>
              </ul>
            </div>

            <hr className="border-neutral-200" />

            {/* Bagian 3: Zero-Data-Selling Policy */}
            <div className="space-y-3 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-950">
              <h3 className="text-base sm:text-lg font-black text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Prinsip Tanpa Penjualan Data (Zero Data Monetization)</span>
              </h3>
              <p className="font-medium text-emerald-900">
                PT Sivilize Corp Indonesia <strong>TIDAK PERNAH dan TIDAK AKAN PERNAH</strong> menjual, menyewakan, atau memperdagangkan data pribadi, daftar produk, atau kontak nomor klien Anda kepada pihak ketiga, broker iklan, atau platform pemasaran manapun.
              </p>
              <p className="text-xs text-emerald-800 pt-1">
                Bisnis kami murni adalah penyewaan infrastruktur perangkat lunak (Software-as-a-Service), bukan bisnis monetisasi data pengguna.
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Bagian 4 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">3</span>
                <span>Penyimpanan & Enkripsi Data</span>
              </h3>
              <p>
                Seluruh data disimpan di kluster database enterprise terenkripsi Supabase PostgreSQL (Region Singapore) dengan standar keamanan Transport Layer Security (TLS 1.3). PIN akun Anda dienkripsi satu arah menggunakan algoritma kriptografi modern sehingga tidak dapat dibaca bahkan oleh teknisi internal kami.
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Bagian 5 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">4</span>
                <span>Hak Pengguna & Penghapusan Akun</span>
              </h3>
              <p>
                Sesuai hak kedaulatan data di bawah UU PDP No. 27 Tahun 2022, Anda berhak mengubah, memperbarui, atau mengajukan permohonan penghapusan total (right to be forgotten) atas data website bisnis Anda melalui email resmi pengaduan <code>sivilizecorpindonesia@gmail.com</code>.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
