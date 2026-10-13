'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Minimize2,
  RefreshCw,
} from 'lucide-react';
import type { Store } from '@/types/database';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  quickAction?: {
    label: string;
    actionTab: 'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem';
  };
}

interface AIChatbotAssistantProps {
  store: Store;
  onNavigateTab?: (tab: 'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem') => void;
  onStartTour?: () => void;
}

const KNOWLEDGE_RESPONSES: { keywords: string[]; answer: string; quickTab?: 'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem' }[] = [
  {
    keywords: ['database', 'supabase', 'firebase', 'hilang', 'aman', 'simpan'],
    answer:
      'Tenang sekali! Seluruh data website, katalog produk, menu, foto WebP, dan lisensi Anda 100% OTOMATIS tersimpan di Cloud Database Supabase PT Sivilize Corp Indonesia dengan isolasi tenant (store_id) yang sangat aman. Anda tidak perlu membuat akun database sendiri. Data Anda tidak akan pernah hilang meskipun ganti ponsel atau laptop.',
  },
  {
    keywords: ['sikasir', 'kasir', 'dine lite', 'meja', 'qr', 'lisensi', 'koneksi', 'sambung'],
    answer:
      'Untuk menyambungkan SiKasir POS dan Sivilize Dine Lite, Anda cukup menyalin Kode Lisensi Ekosistem Anda di tab "Ekosistem Lisensi" (misal: SIV-FNB-365D). Buka aplikasi kasir atau dine lite di perangkat Anda, lalu masukkan kode tersebut pada form aktivasi awal. Stok dan pesanan langsung tersambung 2-arah seketika!',
    quickTab: 'ekosistem',
  },
  {
    keywords: ['harga', 'stok', 'tambah produk', 'menu', 'katalog', 'hapus'],
    answer:
      'Untuk mengelola menu/produk, buka tab "Katalog & Menu". Anda bisa klik "Tambah Item Baru" untuk memasukkan foto dan harga, atau klik tombol switch hijau pada produk untuk menandai "Habis / Tersedia". Anda juga bisa klik "Tarik Produk dari SiKasir" untuk sinkronisasi otomatis!',
    quickTab: 'katalog',
  },
  {
    keywords: ['tata letak', 'grid', 'desain', 'warna', 'tema', 'kolom', 'tampilan'],
    answer:
      'Tampilan toko bisa Anda modifikasi di tab "Tata Letak & Grid". Anda bisa memilih mode 2 kolom, 3 kolom, atau 4 kolom untuk desktop, mengatur posisi teks, serta tombol beli. Pratinjau langsung terlihat di simulator sebelah kanan.',
    quickTab: 'tata-letak',
  },
  {
    keywords: ['domain', 'custom domain', 'com', 'my.id', 'dns', 'vercel'],
    answer:
      'Bisa banget! Anda bisa menggunakan domain pribadi seperti www.bisnisanda.com. Cukup arahkan DNS domain Anda ke server Vercel Anycast Edge kami: Record A (@ ➔ 76.76.21.21) dan CNAME (www ➔ cname.vercel-dns.com). Sertifikat SSL HTTPS akan aktif otomatis 100%.',
    quickTab: 'langganan',
  },
  {
    keywords: ['transaksi', 'jasa', 'qris', 'kontraktor', 'bayar', 'pembuatan website'],
    answer:
      'Untuk bisnis seperti F&B, Retail, Laundry, dan Bengkel, pelanggan bisa langsung checkout mandiri via QRIS di web. Namun untuk bisnis jasa non-transaksional (seperti kontraktor bangunan, jasa pembuatan website, konsultan hukum), tombol di web otomatis diarahkan ke konsultasi WhatsApp resmi & form estimasi proyek (Lead Generation) karena biaya proyek butuh diskusi spesifikasi terlebih dahulu.',
  },
];

export function AIChatbotAssistant({ store, onNavigateTab, onStartTour }: AIChatbotAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Halo ${store.store_name}! 👋 Saya Sivilize AI Assistant. Saya siap memandu Anda mengelola website, menyambungkan aplikasi kasir SiKasir POS, mengatur Dine Lite, atau menjawab pertanyaan apa pun tentang sistem Anda. Ada yang bisa saya bantu?`,
      time: 'Baru saja',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          store_name: store.store_name,
          category: store.category,
          plan_tier: store.plan_tier,
        }),
      });

      const data = await res.json();
      const qLower = query.toLowerCase();
      const matched = KNOWLEDGE_RESPONSES.find((item) =>
        item.keywords.some((kw) => qLower.includes(kw))
      );

      const replyText =
        data.reply ||
        matched?.answer ||
        `Fitur yang Anda tanyakan sudah terintegrasi di platform Sivilize Space. Anda bisa melihat panduan interaktif atau membuka tab terkait untuk mencobanya secara langsung.`;

      const aiReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        quickAction: matched?.quickTab
          ? {
              label: `Buka Tab ${matched.quickTab.toUpperCase()}`,
              actionTab: matched.quickTab,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch {
      const qLower = query.toLowerCase();
      const matched = KNOWLEDGE_RESPONSES.find((item) =>
        item.keywords.some((kw) => qLower.includes(kw))
      );

      const aiReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text:
          matched?.answer ||
          'Koneksi AI sedang memproses data lokal. Seluruh sistem database Supabase, SiKasir POS, dan toko Anda tetap aman dan aktif 100%.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        quickAction: matched?.quickTab
          ? {
              label: `Buka Tab ${matched.quickTab.toUpperCase()}`,
              actionTab: matched.quickTab,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, aiReply]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-xl text-xs font-semibold animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Butuh bantuan? Tanya AI Copilot</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-neutral-950 via-neutral-900 to-emerald-900 border-2 border-emerald-500/40 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
          title="Tanya Sivilize AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </>
          )}
        </button>
      </div>

      {/* CHAT WINDOW MODAL / POPUP */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 h-[520px] rounded-3xl bg-neutral-950 border border-neutral-800 text-white shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 backdrop-blur-md">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Sivilize AI Copilot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-neutral-400">
                  Panduan Resmi Ekosistem SaaS & Toko
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onStartTour && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onStartTour();
                  }}
                  className="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-bold transition-colors cursor-pointer"
                  title="Mulai Tour Interaktif"
                >
                  Mulai Tur
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-neutral-800 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line text-[11px] sm:text-xs">{msg.text}</p>
                  <span className="block text-[9px] text-neutral-400 mt-1 text-right">
                    {msg.time}
                  </span>

                  {msg.quickAction && onNavigateTab && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateTab(msg.quickAction!.actionTab);
                        setIsOpen(false);
                      }}
                      className="mt-2 w-full py-1.5 px-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center justify-center gap-1 border border-emerald-500/30 transition-colors cursor-pointer"
                    >
                      <span>{msg.quickAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span className="italic">AI sedang mengetik jawaban...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestion Pills */}
          <div className="px-3 py-2 border-t border-neutral-900 bg-neutral-950 flex gap-1.5 overflow-x-auto no-scrollbar">
            {[
              'Apakah data database saya aman?',
              'Cara sambungin SiKasir POS?',
              'Cara ubah harga & stok?',
              'Bisakah pakai domain sendiri?',
            ].map((faq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(faq)}
                className="px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-[10px] whitespace-nowrap cursor-pointer transition-colors"
              >
                {faq}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-neutral-800 bg-neutral-900/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanya apa saja tentang toko Anda..."
              className="flex-1 px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-neutral-950 font-bold transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
