import React from 'react';
import Link from 'next/link';
import { SivilizeLogo } from '@/components/brand/SivilizeLogo';
import { ArrowLeft, Compass, Cpu, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-white selection:text-neutral-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/15 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Brand */}
      <div className="relative z-10">
        <Link href="/" className="inline-block">
          <SivilizeLogo size={36} showSubtitle={true} className="[&_span]:text-white [&_span.text-neutral-600]:text-neutral-400" />
        </Link>
      </div>

      {/* Center 404 Card */}
      <div className="relative z-10 max-w-lg mx-auto text-center py-12 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>STATUS 404 — URL TIDAK DITEMUKAN</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Halaman di Luar Orbit.
        </h1>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Alamat URL atau subdomain website yang Anda tuju belum terdaftar atau telah dipindahkan ke tautan baru.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/rakit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-800 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Studio Rakit Website</span>
          </Link>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-xs gap-3 border-t border-neutral-800/60 pt-6">
        <p>© 2026 PT Sivilize Corp Indonesia • NIB: 0207260103661</p>
        <p className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-neutral-400" />
          <span>Laporan Link Rusak: </span>
          <a href="mailto:sivilizecorpindonesia@gmail.com" className="text-emerald-400 hover:underline font-mono">
            sivilizecorpindonesia@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
