'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  MessageSquare,
  Send,
  Loader2,
  Bot,
  Lightbulb,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import type { Store } from '@/types/database';

export interface TourStep {
  title: string;
  description: string;
  tabKey?: 'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem';
  badge: string;
  defaultTip: string;
  suggestedQuestions: string[];
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Selamat Datang di Pusat Kendali Toko Anda!',
    description:
      'Dashboard ini adalah pusat operasional website bisnis Anda. Dari sini Anda bisa mengatur menu, tata letak tampilan web di ponsel & PC, hingga menghubungkan aplikasi kasir dan meja QR.',
    badge: 'Langkah 1/5 • Pengenalan',
    defaultTip: 'Website Anda sudah langsung aktif di server Anycast Edge berkecepatan tinggi.',
    suggestedQuestions: [
      'Fitur apa saja yang ada di dashboard ini?',
      'Apakah data toko saya aman di Supabase?',
    ],
  },
  {
    title: 'Katalog Produk & Sinkronisasi Kasir',
    description:
      'Di tab "Katalog & Menu", Anda bisa menambah produk, mengganti harga dalam hitungan detik, atau menekan tombol "Tarik Produk dari SiKasir" agar produk di kasir otomatis masuk ke web.',
    tabKey: 'katalog',
    badge: 'Langkah 2/5 • Manajemen Menu',
    defaultTip: 'Setiap perubahan harga langsung tayang di website detik itu juga tanpa perlu restart.',
    suggestedQuestions: [
      'Bagaimana cara upload foto menu yang optimal?',
      'Bagaimana cara kerja sinkronisasi dari SiKasir POS?',
    ],
  },
  {
    title: 'Kustomisasi Tata Letak & Grid Tampilan',
    description:
      'Di tab "Tata Letak & Grid", Anda bebas mengatur jumlah kolom produk (2, 3, atau 4 kolom), perataan teks, tombol beli, dan urutan seksi website agar sesuai selera estetika brand Anda.',
    tabKey: 'tata-letak',
    badge: 'Langkah 3/5 • Desain Web',
    defaultTip: 'Gunakan simulator tampilan ponsel & desktop di sebelah kanan untuk melihat hasil seketika.',
    suggestedQuestions: [
      'Berapa kolom terbaik untuk tampilan layar HP?',
      'Apakah tata letak ini responsif di semua perangkat?',
    ],
  },
  {
    title: 'Lisensi Ekosistem SiKasir POS & Dine Lite',
    description:
      'Di tab "Ekosistem Lisensi", Anda mendapatkan Kode Aktivasi Resmi (contoh: SIV-FNB-365D). Masukkan kode ini saat pertama kali membuka SiKasir POS atau Dine Lite agar semua data tersambung 2-arah.',
    tabKey: 'ekosistem',
    badge: 'Langkah 4/5 • Integrasi Kasir',
    defaultTip: 'Stok berkurang di kasir fisik langsung otomatis update di QR Meja dan website publik.',
    suggestedQuestions: [
      'Di mana saya memasukkan kode lisensi di SiKasir?',
      'Apakah Dine Lite otomatis tahu nomor meja tamu?',
    ],
  },
  {
    title: 'Profil Bisnis, Jam Buka & Custom Domain',
    description:
      'Lengkapi nama brand, slogan, jam buka ruko, alamat Maps, atau gunakan domain pribadi Anda (misal www.bisnisanda.com) melalui panduan Vercel Anycast DNS kami.',
    tabKey: 'profil',
    badge: 'Langkah 5/5 • Identitas Brand',
    defaultTip: 'Jika butuh bantuan kapan saja, klik tombol AI Copilot di pojok kanan bawah layar Anda!',
    suggestedQuestions: [
      'Berapa DNS Record untuk pasang domain sendiri?',
      'Apakah SSL HTTPS domain pribadi sudah gratis?',
    ],
  },
];

interface AIGuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchTab?: (tab: 'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem') => void;
  store?: Store | null;
}

export function AIGuidedTour({ isOpen, onClose, onSwitchTab, store }: AIGuidedTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [aiGuidance, setAiGuidance] = useState<{ [stepIdx: number]: string }>({});
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [qnaAnswer, setQnaAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const step = TOUR_STEPS[currentStepIndex];

  // Auto switch tab corresponding to step
  useEffect(() => {
    if (isOpen && step.tabKey && onSwitchTab) {
      onSwitchTab(step.tabKey);
    }
  }, [isOpen, currentStepIndex, step.tabKey, onSwitchTab]);

  // Fetch smart Gemini advice for the current step if not yet cached
  useEffect(() => {
    if (!isOpen) return;

    setQnaAnswer(null);
    setUserQuestion('');

    if (aiGuidance[currentStepIndex]) return;

    let isMounted = true;
    const fetchStepGuidance = async () => {
      setIsLoadingAi(true);
      try {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'tour-guide',
            store_name: store?.store_name || 'Bisnis Anda',
            category: store?.category || 'UMKM Retail',
            plan_tier: store?.plan_tier || 'Pro',
            tour_step_title: step.title,
            tour_step_key: step.tabKey || 'umum',
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.reply) {
            setAiGuidance((prev) => ({ ...prev, [currentStepIndex]: data.reply }));
          }
        }
      } catch {
        // Fallback to default tips
      } finally {
        if (isMounted) setIsLoadingAi(false);
      }
    };

    fetchStepGuidance();
    return () => {
      isMounted = false;
    };
  }, [isOpen, currentStepIndex, store, step.title, step.tabKey, aiGuidance]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleAskGemini = async (customQuestion?: string) => {
    const q = (customQuestion || userQuestion).trim();
    if (!q || isAsking) return;

    setIsAsking(true);
    setQnaAnswer(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'tour-guide',
          message: q,
          store_name: store?.store_name || 'Bisnis Anda',
          category: store?.category || 'UMKM Retail',
          plan_tier: store?.plan_tier || 'Pro',
          tour_step_title: step.title,
          tour_step_key: step.tabKey || 'umum',
        }),
      });

      const data = await res.json();
      setQnaAnswer(data.reply || 'Fitur ini sudah langsung terintegrasi dan siap Anda gunakan.');
    } catch {
      setQnaAnswer('Koneksi AI sedang sibuk. Silakan coba tanyakan kembali beberapa saat lagi.');
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-neutral-800 text-white p-6 sm:p-7 shadow-2xl">
        {/* Ambient glow decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800/80 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  SIVILIZE AI TOUR GUIDE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  ✨ Gemini 2.5 Flash
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                Panduan Interaktif: {store?.store_name || 'Toko Mitra'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Tutup panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Badge & Progress Indicators */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono font-bold text-neutral-300">
            {step.badge}
          </span>

          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'w-6 bg-emerald-500 shadow-sm shadow-emerald-500/50'
                    : idx < currentStepIndex
                    ? 'w-2 bg-emerald-700/60'
                    : 'w-2 bg-neutral-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="space-y-4 mb-5 relative z-10">
          <h4 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
            {step.title}
          </h4>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {step.description}
          </p>

          {/* Gemini AI Live Guidance Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-900/40 border border-emerald-500/20 shadow-inner relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                {isLoadingAi ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                    Bimbingan AI Spesifik ({store?.category || 'Bisnis Anda'})
                  </span>
                  {isLoadingAi && (
                    <span className="text-[10px] text-neutral-400 font-mono animate-pulse">
                      Sedang memikirkan tips...
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-200 leading-relaxed whitespace-pre-line">
                  {aiGuidance[currentStepIndex] || step.defaultTip}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Q&A With Gemini Tour Guide */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tanya AI Tour Guide tentang langkah ini:</span>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5">
              {step.suggestedQuestions.map((sq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setUserQuestion(sq);
                    handleAskGemini(sq);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-medium transition-colors text-left cursor-pointer border border-neutral-700/60"
                >
                  💡 {sq}
                </button>
              ))}
            </div>

            {/* Input Row */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAskGemini();
                }}
                placeholder="Ketik pertanyaan Anda tentang fitur ini..."
                className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700/80 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => handleAskGemini()}
                disabled={isAsking || !userQuestion.trim()}
                className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-neutral-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
              >
                {isAsking ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">Tanya</span>
              </button>
            </div>

            {/* Q&A Answer Box */}
            {qnaAnswer && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-100 flex items-start gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed whitespace-pre-line">{qnaAnswer}</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 gap-3 relative z-10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-neutral-800 hover:bg-neutral-900 disabled:opacity-30 disabled:pointer-events-none text-neutral-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer transition-transform active:scale-[0.98]"
          >
            <span>
              {currentStepIndex === TOUR_STEPS.length - 1
                ? 'Selesai & Mulai Kelola'
                : 'Langkah Berikutnya'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
