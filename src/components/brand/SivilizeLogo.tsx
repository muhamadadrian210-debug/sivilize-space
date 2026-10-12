'use client';

import React from 'react';

interface SivilizeLogoProps {
  className?: string;
  size?: number; // size of the icon mark in px
  variant?: 'full' | 'mark' | 'horizontal';
  theme?: 'dark' | 'light' | 'auto';
  showSubtitle?: boolean;
}

export function SivilizeLogo({
  className = '',
  size = 36,
  variant = 'full',
  theme = 'auto',
  showSubtitle = true,
}: SivilizeLogoProps) {
  // SVG Icon Mark: Monolithic Architectural 'S' Portal
  // Makna: Dua blok fondasi modular saling mengunci membentuk huruf 'S' (Sivilize).
  // Melambangkan stabilitas infrastruktur server, ruang toko mandiri (Space),
  // dan transaksi langsung tanpa perantara pihak ketiga.
  const iconMark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      aria-label="Logo Sivilize Space"
    >
      {/* Base Container: Squircle Matte Obsidian */}
      <rect
        width="100"
        height="100"
        rx="24"
        className="fill-neutral-950 dark:fill-white transition-colors"
      />
      
      {/* Subtle Inner Border Plate */}
      <rect
        x="1.5"
        y="1.5"
        width="97"
        height="97"
        rx="22.5"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        className="dark:stroke-black/10"
      />

      {/* Top Architectural Block (S upper segment) */}
      <path
        d="M72 26H38C30.268 26 24 32.268 24 40V42C24 45.3137 26.6863 48 30 48H62C67.5228 48 72 52.4772 72 58V60C72 61.1046 71.1046 62 70 62H48"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white dark:text-neutral-950"
      />

      {/* Bottom Architectural Block (S lower segment) */}
      <path
        d="M28 74H62C69.732 74 76 67.732 76 60V58C76 54.6863 73.3137 52 70 52H38C32.4772 52 28 47.5228 28 42V40C28 38.8954 28.8954 38 30 38H52"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white dark:text-neutral-950"
      />

      {/* Center Keystone Pillar (Modular Storefront Space Core) */}
      <circle
        cx="50"
        cy="50"
        r="3.5"
        className="fill-emerald-400 dark:fill-emerald-600"
      />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{iconMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {iconMark}

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-extrabold tracking-tight text-[15px] sm:text-[17px] text-neutral-950 dark:text-white font-sans">
            SIVILIZE
          </span>
          <span className="font-semibold tracking-tight text-[15px] sm:text-[17px] text-neutral-600 dark:text-neutral-400 font-sans">
            SPACE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 leading-none">
              WAAS INFRASTRUCTURE
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 leading-none">
              SEWA WEBSITE BISNIS
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
