'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  MessageCircle,
  Plus,
  Minus,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

type DemoStoreKey = 'kopi' | 'laundry' | 'dokter';

interface DemoItem {
  id: string;
  name: string;
  category: string;
  price: number;
  desc: string;
  tag?: string;
}

export function DeviceShowcase() {
  const [activeTab, setActiveTab] = useState<DemoStoreKey>('kopi');
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    'kopi-1': 1,
    'kopi-2': 1,
  });

  const stores = {
    kopi: {
      slug: 'kopisenja',
      name: 'Kedai Kopi Senja',
      category: 'Artisan Coffee & Eatery',
      badge: 'Buka Sekarang • 08:00 - 22:00',
      themeClass: 'bg-[#18120d] text-[#fbf3eb]',
      cardClass: 'bg-[#261c14] border-[#3d2c20]',
      accentColor: 'text-amber-400',
      btnColor: 'bg-amber-600 hover:bg-amber-500 text-white',
      bannerGradient: 'from-amber-950/80 via-[#261c14] to-[#18120d]',
      items: [
        {
          id: 'kopi-1',
          name: 'Flores Bajawa Single Origin',
          category: 'Manual Brew',
          price: 28000,
          desc: 'Tasting notes cokelat murni, karamel lembut & aroma rempah NTT.',
          tag: 'Terlaris',
        },
        {
          id: 'kopi-2',
          name: 'Kopi Susu Senja Gula Aren',
          category: 'Signature',
          price: 24000,
          desc: 'Espresso blend Arabika-Robusta dengan gula aren organik murni.',
          tag: 'Favorit',
        },
        {
          id: 'kopi-3',
          name: 'Croissant Butter Artisan',
          category: 'Pastry',
          price: 22000,
          desc: 'Panggang fresh tiap pagi dengan French butter renyah berlapis.',
        },
      ] as DemoItem[],
    },
    laundry: {
      slug: 'sivilizelaundry',
      name: 'Sivilize Laundry Express',
      category: 'Professional Laundry & Dry Clean',
      badge: 'Antar Jemput Gratis • Radius 5 Km',
      themeClass: 'bg-[#0b1712] text-[#f0fbf5]',
      cardClass: 'bg-[#13281f] border-[#1e3e31]',
      accentColor: 'text-emerald-400',
      btnColor: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      bannerGradient: 'from-emerald-950/80 via-[#13281f] to-[#0b1712]',
      items: [
        {
          id: 'laundry-1',
          name: 'Cuci Komplit Kilat 4 Jam',
          category: 'Kiloan Express',
          price: 15000,
          desc: 'Cuci, kering mesin, setrika uap rapi + parfum antibakteri premium.',
          tag: 'Express',
        },
        {
          id: 'laundry-2',
          name: 'Cuci Bedcover King Size',
          category: 'Satuan',
          price: 35000,
          desc: 'Pembersihan serat mendalam, anti-tungau & bungkus plastik vakum.',
        },
        {
          id: 'laundry-3',
          name: 'Paket Bulanan 30 Kg',
          category: 'Langganan',
          price: 210000,
          desc: 'Hemat Rp 30.000 + jemput antar prioritas tanpa antre.',
          tag: 'Hemat',
        },
      ] as DemoItem[],
    },
    dokter: {
      slug: 'dr-adrian',
      name: 'dr. Adrian Pratama, Sp.A',
      category: 'Spesialis Anak & Tumbuh Kembang',
      badge: 'SIP: 446/SIP/DKK/2023 • Terverifikasi',
      themeClass: 'bg-[#0c1424] text-[#f1f5f9]',
      cardClass: 'bg-[#142036] border-[#1e3052]',
      accentColor: 'text-sky-400',
      btnColor: 'bg-sky-600 hover:bg-sky-500 text-white',
      bannerGradient: 'from-blue-950/80 via-[#142036] to-[#0c1424]',
      items: [
        {
          id: 'doc-1',
          name: 'Konsultasi Online WhatsApp (30 Mnt)',
          category: 'Telemedisin',
          price: 150000,
          desc: 'Diskusi keluhan anak, evaluasi dosis obat & resume medis digital.',
          tag: 'Praktis',
        },
        {
          id: 'doc-2',
          name: 'Skrining Tumbuh Kembang & Vaksin',
          category: 'Klinik Fisik',
          price: 250000,
          desc: 'Pemeriksaan kurva WHO, milestone motorik & jadwal vaksinasi anak.',
        },
        {
          id: 'doc-3',
          name: 'Evaluasi MPASI & Berat Badan Seret',
          category: 'Gizi Anak',
          price: 175000,
          desc: 'Panduan menu gizi seimbang dan solusi GTM (Gerakan Tutup Mulut).',
        },
      ] as DemoItem[],
    },
  };

  const current = stores[activeTab];

  const updateQuantity = (itemId: string, delta: number) => {
    setCartQuantities((prev) => {
      const currentVal = prev[itemId] || 0;
      const newVal = Math.max(0, currentVal + delta);
      return { ...prev, [itemId]: newVal };
    });
  };

  const totalItems = Object.entries(cartQuantities).reduce((acc, [key, count]) => {
    const isItemInCurrent = current.items.some((it) => it.id === key);
    return isItemInCurrent ? acc + count : acc;
  }, 0);

  const totalPrice = Object.entries(cartQuantities).reduce((acc, [key, count]) => {
    const item = current.items.find((it) => it.id === key);
    return item ? acc + item.price * count : acc;
  }, 0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Selector Tab Toko */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0d131f] border border-white/[0.08] mb-6 shadow-xl w-full max-w-sm justify-between">
        <button
          type="button"
          onClick={() => setActiveTab('kopi')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'kopi'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>☕</span>
          <span>Kedai Kopi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('laundry')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'laundry'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🧺</span>
          <span>Laundry</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dokter')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'dokter'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🩺</span>
          <span>dr. Adrian</span>
        </button>
      </div>

      {/* 2. Tactile Smartphone Frame (iPhone 16 Pro styling) */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/18.5] max-h-[680px]">
        {/* Glow ambient behind device */}
        <div className="absolute -inset-4 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-[52px] blur-2xl pointer-events-none" />

        {/* Outer Titanium Bezel */}
        <div className="relative h-full w-full rounded-[48px] p-3 bg-gradient-to-b from-[#2b303c] via-[#1a1e27] to-[#12151b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.12)] flex flex-col">
          {/* Inner Screen Border */}
          <div className="relative h-full w-full rounded-[38px] overflow-hidden bg-black flex flex-col border border-white/[0.06]">
            {/* Dynamic Island & Status Bar */}
            <div className="h-10 w-full bg-black/90 px-6 flex items-center justify-between text-[11px] text-white/80 font-semibold select-none z-30 shrink-0">
              <span>09:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1 px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] text-white/70 font-mono tracking-tighter">Sivilize</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <div className="w-4 h-2 rounded-xs border border-white/60 p-[1px] flex items-center">
                  <div className="h-full w-full bg-emerald-400 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* In-Phone Screen Content (Scrollable Storefront) */}
            <div
              className={`flex-1 overflow-y-auto no-scrollbar flex flex-col ${current.themeClass} transition-colors duration-300 relative`}
            >
              {/* Top Store Banner Header */}
              <div
                className={`p-4 bg-gradient-to-b ${current.bannerGradient} border-b border-white/[0.08] shrink-0`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{current.badge}</span>
                  </span>
                  <a
                    href={`/toko/${current.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-white/60 hover:text-white flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>Asli</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <h4 className="text-base font-extrabold tracking-tight text-white leading-snug">
                  {current.name}
                </h4>
                <p className="text-[11px] text-white/70 mt-0.5">{current.category}</p>

                {/* Subdomain pill */}
                <div className="mt-2 text-[10px] font-mono text-white/50 bg-black/30 px-2 py-0.5 rounded inline-block border border-white/5">
                  {current.slug}.sivilizecorp.my.id
                </div>
              </div>

              {/* Menu / Catalog Items */}
              <div className="p-3.5 space-y-2.5 flex-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-white/80 px-0.5">
                  <span>Daftar Menu & Layanan</span>
                  <span className="text-[10px] text-white/50 font-normal">Pilih untuk pesan</span>
                </div>

                {current.items.map((item) => {
                  const qty = cartQuantities[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border ${current.cardClass} flex flex-col gap-1.5 transition-all shadow-sm`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs font-bold text-white leading-tight">
                              {item.name}
                            </h5>
                            {item.tag && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold bg-white/10 text-emerald-300">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-white/60 line-clamp-2 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-white/[0.05] mt-1">
                        <span className={`text-xs font-extrabold ${current.accentColor}`}>
                          {formatRupiah(item.price)}
                        </span>

                        {/* Interactive Counter */}
                        <div className="flex items-center gap-1.5 bg-black/40 rounded-lg p-0.5 border border-white/10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-[11px] font-mono font-bold text-white w-4 text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Sticky Action Bar inside Phone */}
              <div className="sticky bottom-0 p-3 bg-black/80 backdrop-blur-md border-t border-white/10 shrink-0">
                <a
                  href={`/toko/${current.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-2.5 px-3 rounded-xl ${current.btnColor} font-bold text-xs flex items-center justify-between shadow-lg transition-transform active:scale-[0.98]`}
                >
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {totalItems > 0 ? `Pesan via WA (${totalItems})` : 'Pesan via WhatsApp'}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold bg-black/20 px-2 py-0.5 rounded">
                    {totalPrice > 0 ? formatRupiah(totalPrice) : 'Lihat Menu'}
                  </span>
                </a>
              </div>
            </div>

            {/* Home indicator bar at bottom */}
            <div className="h-4 w-full bg-black flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Direct live demo link pill */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-slate-400">Sedang melihat:</span>
        <a
          href={`/toko/${current.slug}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 flex items-center gap-1"
        >
          <span>{current.name} (Buka Toko Asli)</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
