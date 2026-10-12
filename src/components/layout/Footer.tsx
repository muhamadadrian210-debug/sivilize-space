'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { SivilizeLogo } from '@/components/brand/SivilizeLogo';

export function Footer() {
  return (
    <footer className="bg-[#0A0D14] text-neutral-400 text-xs border-t border-neutral-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Entity & Legal Authority */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <SivilizeLogo size={36} showSubtitle={true} className="[&_span]:text-white [&_span.text-neutral-600]:text-neutral-400" />
            </Link>

            <p className="text-neutral-400 leading-relaxed text-xs max-w-sm">
              Infrastruktur WaaS mandiri untuk bisnis & UMKM Indonesia. Seluruh proses sewa, aktivasi, dan pembayaran diselesaikan 100% mandiri di dalam website tanpa perantara WhatsApp.
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 font-mono text-[11px] text-neutral-300 space-y-1">
              <p><strong>Entitas:</strong> PT SIVILIZE CORP INDONESIA</p>
              <p><strong>NIB:</strong> 0207260103661 | <strong>KBLI:</strong> 62199</p>
              <p><strong>Domisili:</strong> Kota Kupang, Nusa Tenggara Timur (NTT)</p>
              <p><strong>Saluran Pelaporan Bug/Aduan:</strong> <a href="mailto:sivilizecorpindonesia@gmail.com" className="text-emerald-400 hover:underline">sivilizecorpindonesia@gmail.com</a></p>
              <p className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-800/80 font-sans">
                *Transaksi & sewa diselesaikan mandiri di web. Email hanya untuk pelaporan kendala teknis / legalitas.
              </p>
            </div>
          </div>

          {/* Col 3: Solusi Platform */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">
              Platform WaaS
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/fitur" className="hover:text-white transition-colors">
                  Fitur & Alur Operasional
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors">
                  Showcase Demo Website
                </Link>
              </li>
              <li>
                <Link href="/harga" className="hover:text-white transition-colors">
                  Struktur Biaya Sewa
                </Link>
              </li>
              <li>
                <Link href="/rakit" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Studio Rakit Website (Custom)</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-neutral-800 text-emerald-400 font-mono font-bold">
                    Baru
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:sivilizecorpindonesia@gmail.com?subject=Laporan Kendala / Bug SivilizeSpace"
                  className="hover:text-emerald-400 transition-colors text-neutral-300 font-medium"
                >
                  Lapor Bug: sivilizecorpindonesia@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Ekosistem Sivilize Corp */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">
              Ekosistem Bisnis
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a
                  href="https://sivilizecorp.my.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>SiWeb Production (Agency)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <span className="text-neutral-600">SiKasir POS Hardware (Tahap II)</span>
              </li>
              <li>
                <span className="text-neutral-600">Sivilize Dine Lite QR</span>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-white transition-colors">
                  Profil & Legalitas Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  Pusat Bantuan & Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Regulasi & Keamanan */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">
              Kepatuhan & Hukum
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SLA 99.8% Uptime</span>
              </li>
              <li>
                <span>UU ITE No. 1 Tahun 2024</span>
              </li>
              <li>
                <span>PP No. 71 Tahun 2019 (PSTE)</span>
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Kebijakan Anti-Judol & Pinjol</span>
              </li>
              <li>
                <span className="text-neutral-500">Edge IP: 76.76.21.21</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Edge Details */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[11px] gap-4">
          <p>© 2026 PT Sivilize Corp Indonesia. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="font-mono text-neutral-500">
            Arsitektur Standalone Multi-Tenant • Global Anycast Edge SLA 99.8% • Singapore Enterprise Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
