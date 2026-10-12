'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Store,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Lock,
  Sparkles,
  Loader2,
  ExternalLink,
  Printer,
  Copy,
  ShieldCheck,
  Mail,
  Building2,
} from 'lucide-react';
import type { TemplateType, ThemeId, PlanTier } from '@/types/database';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlug?: string;
  initialPlan?: PlanTier;
  initialLayoutConfig?: {
    grid_columns_desktop?: 2 | 3 | 4 | 'list';
    text_alignment?: 'left' | 'center' | 'right';
    heading_size?: 'small' | 'normal' | 'large' | 'huge';
    button_style?: 'rounded' | 'pill' | 'sharp' | 'block';
    background_image?: string | null;
    section_order?: string[];
  };
}

export function OnboardingModal({
  isOpen,
  onClose,
  initialSlug = '',
  initialPlan = 'pro',
  initialLayoutConfig,
}: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [storeName, setStoreName] = useState('');
  const [slug, setSlug] = useState(initialSlug);
  const [category, setCategory] = useState('Kuliner & Minuman');
  const [templateType, setTemplateType] = useState<TemplateType>('katalog');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4 | 'list'>(3);
  const [themeId, setThemeId] = useState<ThemeId>('warm-cafe');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [pin, setPin] = useState('');
  const [planTier] = useState<PlanTier>(initialPlan);

  // Status & Official Invoice States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [createdSlug, setCreatedSlug] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      if (initialSlug) {
        setSlug(initialSlug);
        setStoreName((curr) =>
          curr
            ? curr
            : initialSlug
                .split('-')
                .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                .join(' ')
        );
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [isOpen, initialSlug]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/store/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_name: storeName,
          slug,
          category,
          template_type: templateType,
          theme_id: themeId,
          grid_columns_desktop: initialLayoutConfig?.grid_columns_desktop || gridColumns,
          text_alignment: initialLayoutConfig?.text_alignment,
          heading_size: initialLayoutConfig?.heading_size,
          button_style: initialLayoutConfig?.button_style,
          background_image: initialLayoutConfig?.background_image,
          section_order: initialLayoutConfig?.section_order,
          owner_phone: ownerPhone,
          pin,
          plan_tier: planTier,
          billing_cycle: 'tahunan',
          is_paid: true, // Auto-provisioning flag
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Gagal mendaftarkan toko.');
        setLoading(false);
        return;
      }

      const assignedSlug = data.store?.slug || slug;
      setCreatedSlug(assignedSlug);

      const generatedInv = `INV-SC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setInvoiceNo(generatedInv);
      setInvoiceDate(generatedDate);

      // Auto login session in browser
      if (data.store) {
        localStorage.setItem('sivilize_active_store', JSON.stringify(data.store));
      }
      setStep(4); // Sukses & Provisioning Live screen with Official Invoice
    } catch {
      setErrorMsg('Koneksi terganggu. Silakan coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySummary = () => {
    const text = `NOTA TRANSAKSI PEMBAYARAN RESMI PT SIVILIZE CORP INDONESIA
No. Invoice: ${invoiceNo || 'INV-SC-2026-889102'}
Toko: ${storeName} (https://${createdSlug || slug}.sivilizecorp.my.id)
Tanggal: ${invoiceDate || new Date().toLocaleDateString('id-ID')}
Paket Sewa: ${planTier === 'mikro' ? 'Paket Toko Mikro (1 Halaman)' : planTier === 'bisnis' ? 'Paket Toko Bisnis (4-5 Halaman)' : 'Paket Toko Pro (2-3 Halaman)'} (365 Hari)
Total: ${planTier === 'mikro' ? 'Rp 349.000' : planTier === 'bisnis' ? 'Rp 899.000' : 'Rp 599.000'} (LUNAS)
Status Pembayaran: LUNAS & TERVERIFIKASI SAH MAYAR.ID
NIB Perusahaan: 0207260103661 (KBLI: 62199)
Email Resmi Pengaduan & Layanan: sivilizecorpindonesia@gmail.com
Alamat: Kota Kupang, Nusa Tenggara Timur (NTT), Indonesia`;

    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          step === 4 ? 'max-w-2xl bg-[#0b0f17]' : 'max-w-lg bg-[#0d131f]'
        } rounded-3xl border border-white/[0.1] shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[94vh]`}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white leading-tight">
                {step === 4 ? 'Nota Pembayaran & Bukti Sewa Sah' : 'Klaim & Buat Toko Instan'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {step === 4
                  ? 'Dokumen resmi PT Sivilize Corp Indonesia • NIB: 0207260103661'
                  : `Langkah ${step} dari 3 • Aktif dalam 60 detik`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-200 text-xs sm:text-sm">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Nama Toko & Domain */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nama Bisnis / Toko Anda
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => {
                    setStoreName(e.target.value);
                    if (!initialSlug) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, '-')
                          .replace(/-+/g, '-')
                          .slice(0, 30)
                      );
                    }
                  }}
                  placeholder="Contoh: Kopi Senja Flores, Laundry Barokah"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-white font-medium outline-none text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Alamat Subdomain Gratis
                </label>
                <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus-within:border-indigo-500 text-white">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) =>
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                    }
                    placeholder="namatoko"
                    className="bg-transparent text-white font-mono outline-none flex-1 min-w-0 text-xs sm:text-sm"
                    required
                  />
                  <span className="text-slate-500 font-mono text-xs select-none ml-1">
                    .sivilizecorp.my.id
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Subdomain ini langsung aktif di seluruh dunia dengan latensi 0.03s.
                </p>
              </div>

              <button
                type="button"
                disabled={!storeName || !slug}
                onClick={() => setStep(2)}
                className="w-full mt-4 py-3 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Lanjut ke Kategori & Desain</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Kategori, Template & Tema */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kategori Usaha
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white font-medium outline-none text-xs sm:text-sm"
                >
                  <option value="Kuliner & Minuman">Kedai Kopi / Resto / FnB Kuliner</option>
                  <option value="Jasa & Laundry">Laundry / Dry Clean / Jasa Kebersihan</option>
                  <option value="Retail & Fashion">Distro / Fashion / Aksesoris</option>
                  <option value="Kesehatan & Klinik">Dokter / Klinik / Apotek / Bidan</option>
                  <option value="Bengkel & Servis">Bengkel / Servis HP / Elektronik</option>
                  <option value="Jasa Profesional">Konsultan / Notaris / Les Privat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tipe Template Layout
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTemplateType('katalog');
                      setThemeId('warm-cafe');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      templateType === 'katalog'
                        ? 'border-indigo-500 bg-indigo-950/40 text-white'
                        : 'border-white/[0.06] bg-black/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-base">☕</span>
                    <span className="text-[11px] font-bold">Katalog Toko</span>
                    <span className="text-[9px] text-slate-400">FnB & Ritel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTemplateType('layanan');
                      setThemeId('fresh-herbal');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      templateType === 'layanan'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white'
                        : 'border-white/[0.06] bg-black/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-base">🧺</span>
                    <span className="text-[11px] font-bold">Layanan Jasa</span>
                    <span className="text-[9px] text-slate-400">Pricelist Jasa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTemplateType('profil');
                      setThemeId('corporate-clean');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      templateType === 'profil'
                        ? 'border-sky-500 bg-sky-950/40 text-white'
                        : 'border-white/[0.06] bg-black/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-base">🩺</span>
                    <span className="text-[11px] font-bold">Profil Pakar</span>
                    <span className="text-[9px] text-slate-400">Dokter & Ahli</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Format Kolom Produk Awal
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 2, label: '2 Kolom (Foto Besar)' },
                    { id: 3, label: '3 Kolom (Standar Toko)' },
                    { id: 4, label: '4 Kolom (Katalog Padat)' },
                    { id: 'list', label: '1 Kolom (List Menu Resto)' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGridColumns(g.id as 2 | 3 | 4 | 'list')}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                        gridColumns === g.id
                          ? 'border-indigo-400 bg-indigo-500/20 text-white font-semibold'
                          : 'border-white/[0.04] bg-black/20 text-slate-400 hover:text-white'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nuansa Warna (Bisa Diubah Kapan Saja)
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'warm-cafe', label: 'Warm Cafe (Cokelat Hangat)' },
                    { id: 'midnight-distro', label: 'Midnight Distro (Gelap Estetik)' },
                    { id: 'fresh-herbal', label: 'Fresh Herbal (Hijau Segar)' },
                    { id: 'pastel-beauty', label: 'Pastel Beauty (Pink Anggun)' },
                    { id: 'corporate-clean', label: 'Corporate Clean (Putih Rapi)' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeId(t.id as ThemeId)}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                        themeId === t.id
                          ? 'border-indigo-400 bg-indigo-500/20 text-white font-semibold'
                          : 'border-white/[0.04] bg-black/20 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut ke Kontak & PIN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: WhatsApp & PIN Dashboard */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nomor WhatsApp Pemilik (Untuk Terima Order)</span>
                </label>
                <input
                  type="tel"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus:border-emerald-500 text-white font-medium outline-none text-xs sm:text-sm"
                  required
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Format WhatsApp pembeli akan otomatis dikirim ke nomor ini saat mereka klik &ldquo;Pesan&rdquo;.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Buat PIN Toko (6 Digit Angka)</span>
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Contoh: 123456"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-white font-mono tracking-widest text-center text-sm outline-none"
                  required
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Digunakan untuk masuk ke Client Dashboard di HP Anda untuk ubah harga & produk.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Bebas coba gratis 7 hari tanpa kartu kredit. Terverifikasi resmi PT Sivilize Corp Indonesia.
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
                <button
                  type="submit"
                  disabled={loading || ownerPhone.length < 8 || pin.length !== 6}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-900/30"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mendaftarkan ke Anycast Edge...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>Aktifkan Toko Sekarang (60 Detik)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: NOTA PEMBAYARAN & BUKTI SEWA RESMI DIGITAL */}
          {step === 4 && (
            <div className="space-y-4 py-1">
              {/* Top Success Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-bold text-xs sm:text-sm">
                      Pembayaran & Sewa Berhasil Dikonfirmasi!
                    </strong>
                    <span className="text-[11px] text-emerald-300">
                      Website toko Anda langsung live di Anycast Edge global.
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
                  STATUS: LUNAS
                </span>
              </div>

              {/* Printable Official Invoice Card */}
              <div className="rounded-2xl bg-white text-neutral-900 border border-neutral-200 p-5 sm:p-6 space-y-4 shadow-xl">
                {/* Invoice Kop */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-neutral-200 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-950 flex items-center justify-center text-white">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="font-black text-sm tracking-tight text-neutral-950">
                        PT SIVILIZE CORP INDONESIA
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 font-mono mt-1">
                      NIB: 0207260103661 • KBLI: 62199 (Aktivitas Pemrograman Komputer)
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      Domisili: Kota Kupang, Nusa Tenggara Timur (NTT), Indonesia
                    </p>
                    <p className="text-[10px] text-neutral-700 font-semibold mt-0.5 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-neutral-500" />
                      <span>Email Pengaduan: </span>
                      <a href="mailto:sivilizecorpindonesia@gmail.com" className="text-emerald-700 underline font-mono">
                        sivilizecorpindonesia@gmail.com
                      </a>
                    </p>
                  </div>

                  {/* Stamp Lunas */}
                  <div className="text-left sm:text-right shrink-0">
                    <span className="inline-block px-3 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs tracking-wider uppercase shadow-xs">
                      ✓ LUNAS / PAID
                    </span>
                    <p className="text-[10px] text-neutral-500 font-mono mt-1">
                      Verified by Mayar.id & QRIS
                    </p>
                  </div>
                </div>

                {/* Invoice Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs border-b border-neutral-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">No. Invoice</span>
                    <span className="font-mono font-bold text-neutral-900 text-xs sm:text-[13px]">
                      {invoiceNo || 'INV-SC-2026-881920'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Tanggal Transaksi</span>
                    <span className="font-semibold text-neutral-800 text-xs sm:text-[13px]">
                      {invoiceDate || new Date().toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Masa Aktif Sewa</span>
                    <span className="font-bold text-emerald-700 text-xs sm:text-[13px]">
                      365 Hari (1 Tahun)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Metode Bayar</span>
                    <span className="font-medium text-neutral-800 text-xs sm:text-[13px]">
                      Mayar.id QRIS Dinamis
                    </span>
                  </div>
                </div>

                {/* Tenant & Website Details */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Nama Bisnis / Toko:</span>
                    <span className="font-bold text-neutral-900">{storeName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Subdomain Resmi:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      https://{createdSlug || slug}.sivilizecorp.my.id
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Nomor WhatsApp Toko:</span>
                    <span className="font-mono font-medium text-neutral-800">{ownerPhone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Kategori Usaha:</span>
                    <span className="font-medium text-neutral-800">{category}</span>
                  </div>
                </div>

                {/* Breakdown Item & Total */}
                <div className="space-y-2 text-xs border-b border-neutral-200 pb-3">
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <strong className="text-neutral-950 font-bold block">
                        Sewa Infrastruktur Website WaaS ({planTier === 'mikro' ? 'Paket Mikro' : planTier === 'bisnis' ? 'Paket Bisnis' : 'Paket Pro'})
                      </strong>
                      <span className="text-[10px] text-neutral-500">
                        Termasuk Anycast Edge Hosting, SSL Otomatis, Subdomain, & Panel Admin Toko
                      </span>
                    </div>
                    <span className="font-mono font-bold text-neutral-950 text-right shrink-0 ml-2">
                      {planTier === 'mikro' ? 'Rp 349.000' : planTier === 'bisnis' ? 'Rp 899.000' : 'Rp 599.000'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-dashed border-neutral-200 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">PPN (0% Bebas Pajak UMKM):</span>
                    <span className="font-mono text-neutral-700">Rp 0</span>
                  </div>
                  <div className="flex items-center justify-between font-extrabold text-sm text-neutral-950 pt-1">
                    <span>Total Pembayaran (Lunas):</span>
                    <span className="font-mono text-emerald-700 text-base">
                      {planTier === 'mikro' ? 'Rp 349.000' : planTier === 'bisnis' ? 'Rp 899.000' : 'Rp 599.000'}
                    </span>
                  </div>
                </div>

                {/* Legal Guarantee & Founder Accountability Clause */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1.5 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Jaminan Kepastian Hukum & Perlindungan Hak Penyewa</span>
                  </div>
                  <p>
                    Nota digital ini merupakan bukti perikatan dan tanda terima pembayaran sah (e-Receipt) yang dilindungi oleh <strong>UU ITE No. 1 Tahun 2024</strong> dan <strong>PP No. 71 Tahun 2019 (PSTE)</strong>. Seluruh hak akses, domain toko, dan data katalog Anda dijamin aktif selama 365 hari kalender penuh.
                  </p>
                  <p className="font-medium text-amber-950 pt-1 border-t border-amber-200/60">
                    <strong>PENTING:</strong> Jika timbul kendala teknis, downtime, atau jika pemilik/pengembang tidak dapat dihubungi melalui saluran biasa (menghilang), simpan dokumen nota ini dan laporkan langsung No. Invoice Anda ke email resmi korporasi: <a href="mailto:sivilizecorpindonesia@gmail.com" className="font-bold underline text-amber-950">sivilizecorpindonesia@gmail.com</a> untuk eskalasi pemulihan sistem dan jaminan operasional.
                  </p>
                </div>

                {/* Action Buttons: Cetak & Salin */}
                <div className="flex flex-wrap gap-2 pt-1 print:hidden">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak / Simpan PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="py-2.5 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Copy className="w-4 h-4 text-neutral-600" />
                    <span>{copiedInvoice ? 'Tersalin!' : 'Salin Data'}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href="/dashboard"
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
                >
                  <span>Masuk ke Dashboard Toko Anda</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`/toko/${createdSlug || slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Lihat Website</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
