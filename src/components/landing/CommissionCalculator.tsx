'use client';

import React, { useState } from 'react';
import { TrendingDown, ShieldAlert, CheckCircle2, ArrowRight, DollarSign } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

interface CommissionCalculatorProps {
  onStartNow: () => void;
}

export function CommissionCalculator({ onStartNow }: CommissionCalculatorProps) {
  // Slider omset dalam Rupiah
  const [revenue, setRevenue] = useState(25000000); // 25 Juta default

  // Marketplace rata-rata memotong 18% (15% komisi resto + biaya layanan/platform)
  const marketplaceCommissionRate = 0.18;
  const monthlyMarketplaceLoss = Math.round(revenue * marketplaceCommissionRate);
  const yearlyMarketplaceLoss = monthlyMarketplaceLoss * 12;

  // Sivilize Space Paket Pro: Rp 69.000 / bulan
  const sivilizeMonthlyCost = 69000;
  const monthlySavings = Math.max(0, monthlyMarketplaceLoss - sivilizeMonthlyCost);
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-[#0d131f] border border-white/[0.08] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Kalkulator Efisiensi Margin Bersih UMKM</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Berapa Juta Uang Anda yang Diambil Marketplace Setiap Bulan?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Geser estimasi omset penjualan online Anda untuk melihat seberapa banyak modal yang terbuang
            hanya untuk potongan komisi 15%–20%.
          </p>
        </div>

        {/* Interactive Slider */}
        <div className="max-w-xl mx-auto mb-10 bg-black/30 p-5 rounded-2xl border border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Estimasi Omset Penjualan Online:</span>
            <span className="text-lg sm:text-xl font-extrabold text-white font-mono bg-white/[0.05] px-3 py-1 rounded-lg border border-white/10">
              {formatRupiah(revenue)}
              <span className="text-xs text-slate-400 font-normal"> / bln</span>
            </span>
          </div>

          <input
            type="range"
            min={5000000}
            max={100000000}
            step={2500000}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
            <span>Rp 5 Juta</span>
            <span>Rp 50 Juta</span>
            <span>Rp 100 Juta+</span>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Sisi Marketplace (Loss) */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/30 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Di Marketplace / Ojek Online (18%)</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                Uang Hilang Terpotong Komisi
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Belum termasuk perang banting harga kompetitor marketplace dan biaya promo paksaan.
              </p>

              <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-rose-900/40">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Potongan per bulan:</span>
                  <span className="font-mono font-bold text-rose-400">
                    - {formatRupiah(monthlyMarketplaceLoss)}
                  </span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-rose-900/30">
                  <span className="text-slate-300 font-semibold">Total Hangus 1 Tahun:</span>
                  <span className="font-mono font-extrabold text-rose-300 text-sm">
                    - {formatRupiah(yearlyMarketplaceLoss)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-rose-400/80 bg-rose-950/40 px-3 py-2 rounded-lg border border-rose-900/20">
              * Uang ini bisa dipakai untuk sewa ruko baru, beli mesin espresso, atau gaji 1 karyawan!
            </div>
          </div>

          {/* Sisi SivilizeSpace (Profit Saved) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-[#0a1813] border-2 border-emerald-500/40 flex flex-col justify-between relative shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dengan SivilizeSpace (0% Komisi)</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                Margin Bersih Masuk ke Rekening Anda
              </h4>
              <p className="text-xs text-slate-300 mb-6">
                Hanya biaya sewa flat murah. Semua transaksi QRIS 100% milik Anda.
              </p>

              <div className="space-y-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Biaya sewa website flat:</span>
                  <span className="font-mono font-semibold text-slate-200">
                    Mulai Rp 349.000 / thn
                  </span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-emerald-500/20">
                  <span className="text-emerald-300 font-bold">Hemat Bersih per Tahun:</span>
                  <span className="font-mono font-black text-emerald-400 text-base sm:text-lg">
                    + {formatRupiah(yearlySavings)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onStartNow}
              className="mt-6 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-transform active:scale-[0.98] cursor-pointer"
            >
              <span>Selamatkan {formatRupiah(monthlySavings)} / Bulan Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
