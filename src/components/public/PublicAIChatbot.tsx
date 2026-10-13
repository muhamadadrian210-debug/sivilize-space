'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  HelpCircle,
  Minimize2,
  RefreshCw,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  quickAction?: {
    label: string;
    href?: string;
  };
}

interface TourStep {
  title: string;
  description: string;
  highlight: string;
  suggestedPrompt: string;
}

const PUBLIC_TOUR_STEPS: TourStep[] = [
  {
    title: '1. Konsep WaaS: Sewa Siap Pakai 60 Detik',
    description:
      'Di Sivilize Space, Anda menyewa sistem website mandiri yang langsung aktif dalam 60 detik tanpa perlu keluar modal jutaan di muka seperti agensi konvensional. 100% selesai mandiri tanpa komisi marketplace.',
    highlight: '0% Komisi Penjualan • Langsung ke Rekening / QRIS Anda',
    suggestedPrompt: 'Apa keuntungan sewa website dibanding beli putus di agensi?',
  },
  {
    title: '2. Struktur Paket Sewa & Aturan Domain',
    description:
      'Paket Mikro (Rp 349k/thn), Paket Pro (Rp 599k/thn), dan Paket Bisnis (Rp 899k/thn). Khusus sewa 1 TAHUN PENUH, Anda mendapatkan GRATIS DOMAIN PRIBADI (.my.id/.biz.id di Pro, atau .COM di Bisnis).',
    highlight: 'Hemat 2 Bulan + Gratis Domain Pribadi 1 Tahun Penuh',
    suggestedPrompt: 'Bagaimana aturan gratis domain .COM dan .my.id di Sivilize?',
  },
  {
    title: '3. Ekosistem Kasir: SiKasir POS & Dine Lite',
    description:
      'Setiap sewa website sudah otomatis termasuk aplikasi kasir SiKasir POS dan Sivilize Dine Lite (khusus F&B). Stok terjual di kasir fisik langsung terpotong di website dan QR Meja detik itu juga secara 2-arah.',
    highlight: '1 Kode Lisensi Ekosistem (Contoh: SIV-FNB-365D) Aktif Seketika',
    suggestedPrompt: 'Bagaimana cara kerja sinkronisasi stok SiKasir dan QR Meja Dine Lite?',
  },
  {
    title: '4. Template Siap Pakai vs Studio Rakit Custom',
    description:
      'Anda bisa memilih template jadi (aktif dalam 60 detik) atau menggunakan Studio Rakit (/rakit) untuk merombak font, grid 2/3/4 kolom, efek kaca, hingga menambah halaman kustom dengan kalkulasi transparan.',
    highlight: 'Fleksibilitas Desain: Siap Pakai atau Rakit Sesuka Hati',
    suggestedPrompt: 'Apa saja yang bisa saya rombak di Studio Rakit Custom?',
  },
  {
    title: '5. Keamanan Enterprise & Legalitas Resmi',
    description:
      'Beroperasi resmi di bawah PT Sivilize Corp Indonesia (NIB: 0207260103661, KBLI: 62199). Berjalan di atas Vercel Anycast Edge (SLA 99.8%) dan Cloud Database Supabase dengan isolasi tenant.',
    highlight: 'Badan Hukum Resmi Kemenkumham RI • SLA Anycast 99.8%',
    suggestedPrompt: 'Apakah data toko dan transaksi saya aman di Sivilize Space?',
  },
];

const QUICK_QUESTIONS = [
  'Berapa biaya sewa tahunan?',
  'Apakah dapat domain gratis?',
  'Bagaimana SiKasir POS & Dine Lite tersambung?',
  'Bisa rakit custom sendiri?',
  'Apa bedanya sewa vs beli putus agensi?',
];

export function PublicAIChatbot() {
  const pathname = usePathname();

  // Jangan render di halaman tenant toko mandiri atau admin
  const isHiddenRoute =
    pathname?.startsWith('/toko/') ||
    pathname?.startsWith('/toko-domain/') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/super-admin') ||
    pathname?.startsWith('/admin-console');

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Halo! Selamat datang di Sivilize Space 👋\n\nSaya adalah Sivilize AI Consultant & Tour Guide. Anda bebas menanyakan apa saja—mulai dari cara sewa website 60 detik, paket harga tahunan, domain gratis, cara kerja SiKasir POS, hingga saran strategi digital untuk bisnis Anda.\n\nAnda juga bisa menekan tombol "🧭 Mulai Tur Platform" untuk melihat rangkuman keunggulan kami. Ada yang ingin Anda tanyakan?',
      time: 'Baru saja',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (isHiddenRoute) {
    return null;
  }

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          mode: 'public-consultant',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memproses pertanyaan.');
      }

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Maaf, saya tidak dapat memahami pertanyaan tersebut. Bisa diulangi?',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Koneksi terputus.';
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: `⚠️ ${errorMsg}`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const stripAsterisks = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^\s*\*\s+/gm, '• ')
      .replace(/\*/g, '');
  };

  const handleStartTour = (stepIndex = 0) => {
    setIsTourActive(true);
    setCurrentTourStep(stepIndex);
    const step = PUBLIC_TOUR_STEPS[stepIndex];

    const tourMessage: ChatMessage = {
      id: `tour-step-${stepIndex}-${Date.now()}`,
      sender: 'ai',
      text: `🧭 ${step.title}\n\n${step.description}\n\n• Keunggulan: ${step.highlight}\n\nAnda bisa tanyakan apa saja terkait poin ini, atau klik tombol Lanjut!`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, tourMessage]);
  };

  const handleNextTourStep = () => {
    const nextIdx = currentTourStep + 1;
    if (nextIdx < PUBLIC_TOUR_STEPS.length) {
      handleStartTour(nextIdx);
    } else {
      setIsTourActive(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `tour-complete-${Date.now()}`,
          sender: 'ai',
          text: 'Tur Platform Selesai!\n\nAnda sekarang sudah memahami seluruh ekosistem Sivilize Space. Siap meluncurkan website bisnis Anda dalam 60 detik? Silakan tanyakan apa saja atau mulai sewa langsung!',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (Pojok Kanan Bawah) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 border border-neutral-800 shadow-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Buka Sivilize AI Assistant"
          >
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xs font-bold tracking-tight pr-1">Tanya AI Sivilize</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
      )}

      {/* CHAT WINDOW MODAL / POPUP */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-w-[440px] h-[600px] max-h-[85vh] rounded-3xl bg-white border border-neutral-200/90 shadow-2xl flex flex-col overflow-hidden font-sans animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-850">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white shrink-0">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black tracking-tight text-white">Sivilize AI Consultant</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  Konsultasi sewa web bebas tanya • PT Sivilize Corp
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top Quick Tour Bar */}
          <div className="px-3.5 py-2 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between gap-2 text-xs">
            {isTourActive ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-neutral-700">
                  <Compass className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                  <span>Tur {currentTourStep + 1} dari {PUBLIC_TOUR_STEPS.length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsTourActive(false)}
                    className="px-2 py-0.5 rounded text-[10px] text-neutral-500 hover:text-neutral-900 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleNextTourStep}
                    className="px-2.5 py-1 rounded-lg bg-neutral-950 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer hover:bg-neutral-800"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-neutral-500 font-medium">
                  Baru pertama kali berkunjung?
                </span>
                <button
                  type="button"
                  onClick={() => handleStartTour(0)}
                  className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Compass className="w-3 h-3 text-emerald-400" />
                  <span>Mulai Tur Platform</span>
                </button>
              </div>
            )}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-neutral-800" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed text-xs ${
                    msg.sender === 'user'
                      ? 'bg-neutral-950 text-white rounded-tr-xs'
                      : 'bg-neutral-50 text-neutral-800 border border-neutral-200/80 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  <div>{stripAsterisks(msg.text)}</div>
                  <div
                    className={`text-[9px] mt-1.5 font-mono ${
                      msg.sender === 'user' ? 'text-neutral-400 text-right' : 'text-neutral-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-neutral-950 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-neutral-800" />
                </div>
                <div className="rounded-2xl p-3 bg-neutral-50 border border-neutral-200/80 text-neutral-500 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span className="text-[11px] font-medium">Sivilize AI sedang mengetik...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-3 py-2 bg-neutral-50/80 border-t border-neutral-200/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200/90 text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 text-[10px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanyakan apa saja seputar website, paket, fitur..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="px-3 py-1 bg-neutral-50 border-t border-neutral-100 text-[9px] font-mono text-neutral-400 text-center">
            PT Sivilize Corp Indonesia • NIB: 0207260103661
          </div>
        </div>
      )}
    </>
  );
}
