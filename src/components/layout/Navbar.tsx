'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, ArrowRight, Menu, X, ExternalLink, ShieldCheck, Cpu, Mail } from 'lucide-react';
import { SivilizeLogo } from '@/components/brand/SivilizeLogo';

interface NavbarProps {
  onOpenOnboarding?: () => void;
}

export function Navbar({ onOpenOnboarding }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav Links: Ramping, luas, dan tidak menumpuk
  const primaryLinks = [
    { href: '/harga', label: 'Template Website' },
    { href: '/rakit', label: 'Rakit Custom', badge: 'Custom' },
    { href: '/demo', label: 'Preview Website' },
    { href: '/fitur', label: 'Fitur & SLA' },
  ];

  return (
    <>
      {/* 1. Ultra-Slim Corporate & Server Status Strip (Satu Baris Bersih & Elegan) */}
      <div className="w-full bg-[#0B0F17] text-neutral-400 text-[10px] sm:text-[11px] font-mono tracking-tight px-4 sm:px-6 lg:px-8 py-1 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="text-white font-semibold tracking-wide truncate">
              PT Sivilize Corp Indonesia
            </span>
            <span className="hidden md:inline text-neutral-600">•</span>
            <span className="hidden md:inline text-neutral-400">NIB: 0207260103661</span>
          </div>

          <div className="flex items-center gap-2.5 text-neutral-400 shrink-0 font-sans">
            <a
              href="mailto:sivilizecorpindonesia@gmail.com?subject=Laporan Kendala / Bug SivilizeSpace"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-[10px] font-mono"
              title="Kirim Laporan Bug atau Bantuan ke Email Perusahaan"
            >
              <Mail className="w-3 h-3 text-emerald-400" />
              <span className="text-neutral-300">sivilizecorpindonesia@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span className="hidden sm:inline text-neutral-300 font-medium">Sewa Website Only • 0% Komisi Penjualan</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Spacious, Modern & Never Overcrowded) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <SivilizeLogo size={36} showSubtitle={true} />
          </Link>

          {/* Desktop Navigation Links (Breathable, 4 Clean Items) */}
          <nav className="hidden lg:flex items-center gap-1.5 text-[13px] font-medium text-neutral-600">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-neutral-950 font-bold bg-neutral-100'
                      : 'hover:text-neutral-950 hover:bg-neutral-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-neutral-900 text-white font-mono uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="mailto:sivilizecorpindonesia@gmail.com?subject=Laporan Kendala / Bug SivilizeSpace"
              className="hidden md:inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-neutral-600 hover:text-neutral-950 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
              title="Hubungi Dukungan Resmi & Lapor Bug via Email"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-500" />
              <span>sivilizecorpindonesia@gmail.com</span>
            </a>

            {onOpenOnboarding ? (
              <button
                type="button"
                onClick={onOpenOnboarding}
                className="hidden sm:inline-flex px-4.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-[12px] sm:text-[13px] font-bold tracking-tight shadow-xs transition-all items-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                <span>Sewa Website</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/harga"
                className="hidden sm:inline-flex px-4.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-[12px] sm:text-[13px] font-bold tracking-tight shadow-xs transition-all items-center gap-1.5 active:scale-[0.98]"
              >
                <span>Sewa Website</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Mobile & Tablet Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Slide Drawer (Clean & Never Overlapping) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-200 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-1.5 shadow-lg animate-in slide-in-from-top-2">
            <div className="pb-2 mb-2 border-b border-neutral-100 text-[11px] font-mono text-neutral-500">
              MENU UTAMA PLATFORM
            </div>

            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-neutral-100 text-neutral-950 font-bold' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-950 text-white font-mono uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Secondary Navigation Links */}
            <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/tentang"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-neutral-50 text-neutral-700 text-center font-medium hover:bg-neutral-100"
              >
                Tentang PT
              </Link>
              <Link
                href="/kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-neutral-50 text-neutral-700 text-center font-medium hover:bg-neutral-100"
              >
                Kontak & CS
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <a
                href="mailto:sivilizecorpindonesia@gmail.com?subject=Laporan Kendala / Bug SivilizeSpace"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl border border-neutral-200 text-center text-xs font-semibold text-neutral-800 hover:bg-neutral-50 flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span>Lapor Bug: sivilizecorpindonesia@gmail.com</span>
              </a>

              {onOpenOnboarding ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOnboarding();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 text-white text-center text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Sewa Website Bisnis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href="/harga"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 text-white text-center text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Sewa Website Bisnis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
