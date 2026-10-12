'use client';

import React, { useState } from 'react';
import {
  X,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Mail,
  Copy,
  ExternalLink,
  Store,
  FileText,
} from 'lucide-react';

export interface InvoiceItem {
  name: string;
  desc?: string;
  price: number;
}

export interface OfficialInvoiceData {
  invoiceNumber: string;
  storeName: string;
  slug: string;
  ownerPhone: string;
  planName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  billingPeriod: string;
  items: InvoiceItem[];
}

interface OfficialInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: OfficialInvoiceData;
  onProceedToDashboard?: () => void;
}

export function OfficialInvoiceModal({
  isOpen,
  onClose,
  invoice,
  onProceedToDashboard,
}: OfficialInvoiceModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `NOTA TRANSAKSI RESMI PT SIVILIZE CORP INDONESIA
No. Invoice: ${invoice.invoiceNumber}
Website Bisnis: ${invoice.storeName} (https://${invoice.slug}.sivilizecorp.my.id)
Tanggal: ${invoice.paymentDate}
Total: ${formatRupiah(invoice.amount)} (LUNAS)
Metode: ${invoice.paymentMethod}
Masa Berlaku: ${invoice.billingPeriod}
Status: VERIFIED BY MAYAR.ID & BI-FAST QRIS
Email Resmi Pelaporan & Kendala Teknis: sivilizecorpindonesia@gmail.com
NIB: 0207260103661 (PT Sivilize Corp Indonesia)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white text-neutral-900 border border-neutral-300 shadow-2xl flex flex-col max-h-[94vh] overflow-hidden">
        {/* Top Control Bar (Screen Only) */}
        <div className="p-4 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-tight text-neutral-300">
              BUKTI PEMBAYARAN SAH • PT SIVILIZE CORP INDONESIA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
              <span>{copied ? 'Tersalin ✓' : 'Salin Data'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-neutral-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div id="official-printable-invoice" className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6 text-neutral-900 font-sans">
          {/* Header Kop Resmi Perusahaan */}
          <div className="border-b-2 border-neutral-950 pb-5">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center font-black">
                    <Store className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-neutral-950 font-sans">
                    PT SIVILIZE CORP INDONESIA
                  </h2>
                </div>
                <p className="text-[11px] text-neutral-600 font-mono">
                  Nomor Induk Berusaha (NIB): <strong className="text-neutral-900">0207260103661</strong> • KBLI: 62199
                </p>
                <p className="text-[11px] text-neutral-600">
                  Domisili: Kota Kupang, Nusa Tenggara Timur (NTT), Indonesia
                </p>
                <p className="text-[11px] text-neutral-600">
                  Email Resmi Pengaduan & Layanan: <strong className="text-emerald-700 font-mono">sivilizecorpindonesia@gmail.com</strong>
                </p>
              </div>

              {/* Status Stamp Lunas */}
              <div className="text-right">
                <div className="inline-block p-2.5 rounded-2xl border-2 border-emerald-600 bg-emerald-50 text-emerald-800 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>LUNAS / PAID</span>
                  </div>
                  <p className="text-[9px] font-mono mt-0.5 opacity-80">VERIFIKASI MAYAR.ID RESMI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Nomor Invoice</span>
              <strong className="font-mono text-sm text-neutral-950">{invoice.invoiceNumber}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Waktu Transaksi</span>
              <span className="font-medium text-neutral-800">{invoice.paymentDate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Metode Pembayaran</span>
              <span className="font-semibold text-neutral-800">{invoice.paymentMethod}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Masa Aktif Layanan</span>
              <strong className="text-emerald-700">{invoice.billingPeriod}</strong>
            </div>
          </div>

          {/* Detail Penyewa */}
          <div className="p-4 rounded-2xl border border-neutral-200 space-y-1.5 text-xs">
            <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-neutral-600" />
              <span>Identitas Pelanggan & Website Terdaftar</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div>
                <span className="text-neutral-500 block text-[10px]">Nama Bisnis / Brand:</span>
                <strong className="text-neutral-950 text-sm">{invoice.storeName}</strong>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">Alamat Subdomain:</span>
                <span className="font-mono font-bold text-emerald-700">https://{invoice.slug}.sivilizecorp.my.id</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">WhatsApp Terdaftar:</span>
                <span className="font-mono text-neutral-800">{invoice.ownerPhone}</span>
              </div>
            </div>
          </div>

          {/* Tabel Rincian Biaya */}
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-[11px]">
              Rincian Komponen Sewa & Layanan WaaS:
            </h4>
            <div className="border border-neutral-200 rounded-2xl overflow-hidden text-xs">
              <div className="bg-neutral-100 p-2.5 font-bold text-neutral-700 flex justify-between">
                <span>Deskripsi Layanan</span>
                <span>Jumlah (IDR)</span>
              </div>
              <div className="divide-y divide-neutral-100">
                {invoice.items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-start justify-between gap-4">
                    <div>
                      <strong className="block text-neutral-950">{it.name}</strong>
                      {it.desc && <span className="text-[11px] text-neutral-500">{it.desc}</span>}
                    </div>
                    <span className="font-mono font-bold text-neutral-900 shrink-0">
                      {formatRupiah(it.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary Bottom */}
              <div className="bg-neutral-50 p-3 border-t border-neutral-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">{formatRupiah(invoice.amount)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Pajak PPN (Ditanggung Platform SivilizeSpace):</span>
                  <span className="font-mono">Rp 0 (0%)</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Biaya Gateway & Payment Processing:</span>
                  <span className="font-mono">Rp 0 (Gratis)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-200 text-sm font-black text-neutral-950">
                  <span>TOTAL PEMBAYARAN DITERIMA:</span>
                  <span className="font-mono text-base text-emerald-700">{formatRupiah(invoice.amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Notice & Klausa Perlindungan Konsumen */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-900 text-[11px] uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>JAMINAN HUKUM, PERLINDUNGAN KONSUMEN & KONTRAK SAH</span>
            </div>
            <p className="leading-relaxed text-[11px] text-amber-900/90">
              Nota digital ini merupakan bukti transaksi resmi dan perjanjian sewa infrastruktur website yang sah secara hukum dari <strong>PT SIVILIZE CORP INDONESIA (NIB: 0207260103661)</strong> berlaku selama <strong>365 hari kalender</strong>. Seluruh uang sewa diterima langsung ke rekening badan usaha resmi tanpa perantara calo.
            </p>
            <div className="p-2.5 rounded-xl bg-white border border-amber-300/80 font-mono text-[10px] text-neutral-800 space-y-1">
              <p>
                <strong>Saluran Pengaduan Langsung:</strong> Jika terjadi kendala operasional, server tidak dapat diakses, atau memerlukan pembuktian legalitas perusahaan, pemegang nota sah ini berhak melaporkan langsung ke:
              </p>
              <p className="text-emerald-700 font-bold text-xs flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>sivilizecorpindonesia@gmail.com</span>
                <span className="text-neutral-500 font-normal">(Sertakan No. Invoice: {invoice.invoiceNumber})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between flex-wrap gap-3 print:hidden shrink-0">
          <p className="text-[11px] text-neutral-500">
            Simpan nomor nota ini sebagai bukti arsip resmi Anda.
          </p>

          <div className="flex items-center gap-2">
            {onProceedToDashboard ? (
              <button
                type="button"
                onClick={onProceedToDashboard}
                className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Masuk ke Dashboard Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href="/dashboard"
                className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <span>Masuk ke Dashboard Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
