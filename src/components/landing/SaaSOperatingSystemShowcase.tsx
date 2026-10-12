'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

export function SaaSOperatingSystemShowcase() {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'checkout' | 'invoice'>('dashboard');

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden font-sans">
      {/* 1. Window Browser Header (BMW / Vercel Industrial Minimalism) */}
      <div className="bg-neutral-900 px-5 py-3 flex items-center justify-between border-b border-neutral-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-neutral-700" />
            <div className="w-3 h-3 rounded-full bg-neutral-700" />
            <div className="w-3 h-3 rounded-full bg-neutral-700" />
          </div>
          <span className="ml-3 font-mono text-[11px] text-neutral-400 font-medium">
            sivilizespace.app / portal / merchant / kopisenja
          </span>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex items-center bg-neutral-800 rounded-lg p-0.5 border border-neutral-700">
          <button
            type="button"
            onClick={() => setActiveScreen('dashboard')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              activeScreen === 'dashboard'
                ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            1. SaaS Merchant Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('checkout')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              activeScreen === 'checkout'
                ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            2. Web Checkout Pembeli
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('invoice')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              activeScreen === 'invoice'
                ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            3. Invoice Digital Terpadu
          </button>
        </div>
      </div>

      {/* 2. Interactive Screen Views */}
      <div className="p-6 sm:p-8 bg-[#FAFAFA] min-h-[460px] flex flex-col justify-between">
        {/* SCREEN 1: SAAS MERCHANT CONTROL CENTER */}
        {activeScreen === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Bar Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                  KS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-neutral-900">Kedai Kopi Senja</h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      Aktif (Paket Pro)
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    kopisenja.sivilizecorp.my.id
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] text-neutral-400">Jatuh Tempo Sewa</p>
                  <p className="font-bold text-neutral-800">12 Oktober 2027 (Tahunan)</p>
                </div>
                <a
                  href="/toko/kopisenja"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <span>Buka Website Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
                  <span>Total Transaksi Web</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-neutral-900 font-mono">Rp 18.450.000</p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  100% masuk rekening Anda • 0% potongan komisi
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
                  <span>Pesanan Masuk</span>
                  <Package className="w-4 h-4 text-neutral-700" />
                </div>
                <p className="text-2xl font-black text-neutral-900 font-mono">342 Order</p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Semua transaksi tercatat di database SaaS
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
                  <span>Katalog & Stok Aktif</span>
                  <Layers className="w-4 h-4 text-neutral-700" />
                </div>
                <p className="text-2xl font-black text-neutral-900 font-mono">24 Produk</p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Edit harga & varian kapan saja via browser
                </p>
              </div>
            </div>

            {/* Recent Web Orders Table (Proof that transactions occur inside the web) */}
            <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-neutral-900">
                    Daftar Transaksi Pesanan Web Terkini
                  </h5>
                  <p className="text-[11px] text-neutral-500">
                    Pengunjung bertransaksi mandiri di website tanpa repot konfirmasi manual
                  </p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-neutral-500">
                  Sinkronisasi Anycast 0.03s
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-neutral-100">
                    <tr>
                      <th className="p-3 pl-4">No. Pesanan</th>
                      <th className="p-3">Pelanggan</th>
                      <th className="p-3">Item Pesanan</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Metode Bayar</th>
                      <th className="p-3 pr-4">Status Transaksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    <tr>
                      <td className="p-3 pl-4 font-mono font-bold text-neutral-900">#ORD-1092</td>
                      <td className="p-3 font-medium">Budi Santoso</td>
                      <td className="p-3 text-neutral-600">Flores Bajawa (1x), Croissant (1x)</td>
                      <td className="p-3 font-mono font-bold text-neutral-900">Rp 50.000</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-bold text-[10px]">
                          QRIS Dinamis
                        </span>
                      </td>
                      <td className="p-3 pr-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Lunas Terverifikasi</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 pl-4 font-mono font-bold text-neutral-900">#ORD-1091</td>
                      <td className="p-3 font-medium">Siti Rahma</td>
                      <td className="p-3 text-neutral-600">Kopi Susu Senja Gula Aren (2x)</td>
                      <td className="p-3 font-mono font-bold text-neutral-900">Rp 48.000</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-bold text-[10px]">
                          Bank Transfer
                        </span>
                      </td>
                      <td className="p-3 pr-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Lunas Terverifikasi</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 pl-4 font-mono font-bold text-neutral-900">#ORD-1090</td>
                      <td className="p-3 font-medium">dr. Adrian P.</td>
                      <td className="p-3 text-neutral-600">Biji Kopi Arabika 250g</td>
                      <td className="p-3 font-mono font-bold text-neutral-900">Rp 85.000</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-bold text-[10px]">
                          QRIS Dinamis
                        </span>
                      </td>
                      <td className="p-3 pr-4">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3" />
                          <span>Sedang Diproses</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: WEB CHECKOUT EXPERIENCE PEMBELI */}
        {activeScreen === 'checkout' && (
          <div className="max-w-xl mx-auto w-full bg-white rounded-2xl border border-neutral-200 p-6 space-y-5 animate-in fade-in duration-300 shadow-sm">
            <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-neutral-900">
                  Pemesanan & Transaksi Mandiri di Web
                </h4>
                <p className="text-xs text-neutral-500">Website: kopisenja.sivilizecorp.my.id</p>
              </div>
              <span className="text-xs font-mono bg-neutral-100 px-2.5 py-1 rounded-md text-neutral-700 font-bold">
                2 Item
              </span>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">Flores Bajawa Single Origin</p>
                  <p className="text-neutral-500 text-[11px]">Varian: Manual Brew (V60)</p>
                </div>
                <span className="font-mono font-bold text-neutral-900">Rp 28.000</span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">Croissant Butter Artisan</p>
                  <p className="text-neutral-500 text-[11px]">Panggang Fresh Pagi</p>
                </div>
                <span className="font-mono font-bold text-neutral-900">Rp 22.000</span>
              </div>
            </div>

            {/* Total Summary */}
            <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal Pesanan:</span>
                <span className="font-mono font-semibold">Rp 50.000</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Biaya Layanan Platform:</span>
                <span className="font-mono font-semibold text-emerald-600">Rp 0 (Bebas Komisi)</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Pembayaran:</span>
                <span className="font-mono text-base">Rp 50.000</span>
              </div>
            </div>

            {/* Instant Web Payment Trigger */}
            <div className="p-3.5 rounded-xl bg-neutral-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Bayar via QRIS / Bank Transfer</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">Lunas Seketika</span>
            </div>
          </div>
        )}

        {/* SCREEN 3: INVOICE DIGITAL RESMI TERBIT OTOMATIS */}
        {activeScreen === 'invoice' && (
          <div className="max-w-xl mx-auto w-full bg-white rounded-2xl border border-neutral-200 p-6 space-y-5 animate-in fade-in duration-300 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Invoice Resmi Digital
                </span>
                <h4 className="font-extrabold text-base text-neutral-900">#INV-2026-KS1092</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                LUNAS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-neutral-400 text-[11px]">Diterbitkan Oleh:</p>
                <p className="font-bold text-neutral-900">Kedai Kopi Senja</p>
                <p className="text-neutral-500">Platform SivilizeSpace WaaS</p>
              </div>
              <div>
                <p className="text-neutral-400 text-[11px]">Tanggal & Waktu:</p>
                <p className="font-bold text-neutral-900">12 Oktober 2026 • 10:24 WITA</p>
                <p className="text-neutral-500 font-mono">Gateway: PT Sivilize Midtrans</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-neutral-800">
                <span>Rincian Transaksi:</span>
                <span>Jumlah</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Flores Bajawa Single Origin (1x)</span>
                <span className="font-mono">Rp 28.000</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Croissant Butter Artisan (1x)</span>
                <span className="font-mono">Rp 22.000</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between font-extrabold text-neutral-900 text-sm">
                <span>Total Lunas:</span>
                <span className="font-mono">Rp 50.000</span>
              </div>
            </div>

            <p className="text-[11px] text-center text-neutral-400 font-mono">
              Infrastruktur WaaS Resmi PT Sivilize Corp Indonesia • NIB 0207260103661
            </p>
          </div>
        )}

        {/* Bottom Context Footnote */}
        <div className="mt-6 pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium">
              Seluruh transaksi, stok, katalog, dan invoice berjalan otomatis di sistem web SaaS ini.
            </span>
          </div>
          <span className="font-mono text-neutral-400 text-[11px]">Zero WhatsApp Dependence</span>
        </div>
      </div>
    </div>
  );
}
