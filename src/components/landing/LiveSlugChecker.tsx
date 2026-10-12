'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Search, CheckCircle2, XCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { isValidSlug } from '@/lib/utils';

interface LiveSlugCheckerProps {
  onClaimSlug: (slug: string) => void;
}

export function LiveSlugChecker({ onClaimSlug }: LiveSlugCheckerProps) {
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const trimmed = slug.trim().toLowerCase();

    if (!trimmed) {
      startTransition(() => {
        setStatus('idle');
        setMessage('');
        setSuggestions([]);
      });
      return;
    }

    if (!isValidSlug(trimmed)) {
      startTransition(() => {
        setStatus('invalid');
        setMessage('Gunakan huruf kecil, angka, dan strip (-) (3–30 karakter)');
        setSuggestions([]);
      });
      return;
    }

    startTransition(() => {
      setStatus('checking');
    });

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/store/check-slug?slug=${encodeURIComponent(trimmed)}`);
        const data = await res.json();

        if (data.available) {
          setStatus('available');
          setMessage(`${trimmed}.sivilizecorp.my.id`);
          setSuggestions([]);
        } else {
          setStatus('taken');
          setMessage(data.reason || 'Nama ini sudah dipakai website lain');
          setSuggestions(data.suggestions || []);
        }
      } catch {
        setStatus('idle');
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0">
      <div className="relative group">
        {/* Subtle ambient rim glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-emerald-500/20 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />

        <div className="relative bg-[#0d131f] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl p-2 sm:p-2.5 transition-all shadow-2xl shadow-black/60">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 text-slate-400 text-xs sm:text-sm font-mono flex-1 bg-black/30 rounded-xl border border-white/[0.04]">
              <Search className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-slate-500 hidden xs:inline select-none">https://</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="namabisnismu"
                className="bg-transparent text-white font-semibold outline-none flex-1 placeholder:text-slate-600 placeholder:font-normal text-xs sm:text-sm min-w-0"
                maxLength={30}
              />
              <span className="text-slate-400 text-xs font-semibold select-none shrink-0">
                .sivilizecorp.my.id
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (status === 'available' && slug) {
                  onClaimSlug(slug);
                } else if (slug && isValidSlug(slug)) {
                  onClaimSlug(slug);
                } else {
                  onClaimSlug('bisnis-saya');
                }
              }}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-white/10 active:scale-[0.98] shrink-0 cursor-pointer"
            >
              <span>{status === 'available' ? 'Klaim Domain Ini' : 'Sewa Website Sekarang'}</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Card */}
      {status !== 'idle' && (
        <div className="mt-3 px-3 py-2 rounded-xl bg-black/40 border border-white/[0.06] text-xs flex flex-col gap-1.5 transition-all">
          <div className="flex items-center gap-2">
            {status === 'checking' && (
              <>
                <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                <span className="text-slate-400">Mengecek ketersediaan database Anycast...</span>
              </>
            )}

            {status === 'available' && (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 font-semibold">Domain Tersedia:</span>
                <span className="text-white font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {message}
                </span>
                <span className="text-emerald-400 text-[11px] ml-auto font-medium">Bebas biaya sewa awal!</span>
              </>
            )}

            {status === 'taken' && (
              <>
                <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-medium">{message}</span>
              </>
            )}

            {status === 'invalid' && (
              <>
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-rose-300">{message}</span>
              </>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-white/[0.04]">
              <span className="text-slate-400 text-[11px]">Rekomendasi:</span>
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setSlug(sug)}
                  className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-indigo-300 hover:text-white font-mono text-[11px] transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Trust micro-text */}
      <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-400 flex-wrap">
        <span className="inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Langsung aktif dalam 60 detik</span>
        </span>
        <span className="text-slate-600">•</span>
        <span>Bisa bawa domain .com / .id sendiri kapan saja</span>
      </div>
    </div>
  );
}
