'use client';

import React from 'react';
import { Check, X, Minus } from 'lucide-react';

export function ComparisonTable() {
  const comparisonRows = [
    {
      feature: 'Potongan Komisi Penjualan',
      marketplace: '15% – 20% per transaksi',
      agency: '0%',
      sivilize: '0% (Murni Bebas Komisi)',
      highlight: true,
    },
    {
      feature: 'Biaya Awal Pembuatan',
      marketplace: 'Gratis (tapi komisi mencekik)',
      agency: 'Rp 3.000.000 – Rp 10.000.000',
      sivilize: 'Mulai Rp 39.000 / bln',
      highlight: true,
    },
    {
      feature: 'Biaya Perpanjangan Hosting Tahunan',
      marketplace: 'Tidak ada',
      agency: 'Rp 1.000.000 – Rp 2.500.000 (Sering siluman)',
      sivilize: 'Rp 0 (Sudah Termasuk Selamanya)',
      highlight: true,
    },
    {
      feature: 'Kemudahan Ganti Harga / Menu',
      marketplace: 'Menu rumit & approval lambat',
      agency: 'Tergantung programmer (bayar revisi)',
      sivilize: '5 Detik Lewat HP Sendiri',
      highlight: false,
    },
    {
      feature: 'Perang Banting Harga Kompetitor',
      marketplace: 'Ada iklan toko lawan di bawah produk Anda',
      agency: 'Tidak ada',
      sivilize: 'Etalase Bersih Milik Anda 100%',
      highlight: false,
    },
    {
      feature: 'Kepemilikan Data Pembeli',
      marketplace: 'Nomor HP & nama disensor/milik platform',
      agency: 'Milik Anda',
      sivilize: 'Langsung Masuk WhatsApp Anda',
      highlight: false,
    },
    {
      feature: 'Jaminan Server Error / Maintenance',
      marketplace: 'Platform umum',
      agency: 'Lepas tangan setelah serah terima',
      sivilize: 'SLA 99.8% Ditangani PT Sivilize',
      highlight: false,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-3xl bg-[#0d131f] border border-white/[0.08] shadow-2xl">
      <div className="p-6 sm:p-8 border-b border-white/[0.06] bg-black/40 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          PERBANDINGAN RIIL & TRANSPARAN
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
          Kenapa Pengusaha Cerdas Berhenti Mengandalkan Marketplace Saja
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.08] bg-black/60 text-slate-400">
              <th className="p-4 sm:p-5 font-bold text-white w-2/5">Fitur & Kebijakan</th>
              <th className="p-4 sm:p-5 font-semibold text-slate-400 w-1/5">Marketplace & Ojol</th>
              <th className="p-4 sm:p-5 font-semibold text-slate-400 w-1/5">Vendor Web Agensi</th>
              <th className="p-4 sm:p-5 font-extrabold text-emerald-400 bg-emerald-950/20 w-1/5 border-l border-emerald-500/20">
                SivilizeSpace
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {comparisonRows.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-4 sm:p-5 font-semibold text-white">
                  {row.feature}
                </td>
                <td className="p-4 sm:p-5 text-slate-400">
                  {row.marketplace}
                </td>
                <td className="p-4 sm:p-5 text-slate-400">
                  {row.agency}
                </td>
                <td className="p-4 sm:p-5 font-bold text-emerald-300 bg-emerald-950/20 border-l border-emerald-500/20">
                  {row.sivilize}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
