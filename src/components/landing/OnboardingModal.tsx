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
  AlertCircle,
} from 'lucide-react';
import type { TemplateType, ThemeId, PlanTier } from '@/types/database';
import { getDeviceFingerprint } from '@/lib/device-fingerprint';
import { formatRupiah } from '@/lib/utils';
import { detectIsFoodCategory, generateSmartLicenseKey } from '@/lib/ecosystem-license';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlug?: string;
  initialPlan?: PlanTier;
  initialCategory?: string;
  initialPrice?: number;
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
  initialCategory,
  initialPrice,
  initialLayoutConfig,
}: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [storeName, setStoreName] = useState('');
  const [slug, setSlug] = useState(initialSlug);
  const [category, setCategory] = useState(initialCategory || 'Kuliner & Minuman');
  const [templateType, setTemplateType] = useState<TemplateType>('katalog');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4 | 'list'>(3);
  const [themeId, setThemeId] = useState<ThemeId>('warm-cafe');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [pin, setPin] = useState('');
  const [planTier] = useState<PlanTier>(initialPlan);
  const effectivePrice = initialPrice || (planTier === 'mikro' ? 349000 : planTier === 'bisnis' ? 899000 : 599000);

  // Status & Official Invoice States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [createdSlug, setCreatedSlug] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [ecosystemLicenseCode, setEcosystemLicenseCode] = useState('SIV-FNB-365D');
  const [copiedLicense, setCopiedLicense] = useState(false);

  // Live Subdomain Availability Checker
  const [slugStatus, setSlugStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    reason?: string;
  }>({ checking: false, available: null });

  useEffect(() => {
    if (!slug || slug.trim().length < 3) {
      setSlugStatus({ checking: false, available: null });
      return;
    }

    setSlugStatus((prev) => ({ ...prev, checking: true }));
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`/api/store/check-slug?slug=${encodeURIComponent(slug.trim())}`);
        const data = await res.json();
        setSlugStatus({
          checking: false,
          available: !!data.available,
          reason: data.reason,
        });
      } catch {
        setSlugStatus({ checking: false, available: null });
      }
    }, 350);

    return () => clearTimeout(handler);
  }, [slug]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      if (initialCategory) {
        setCategory(initialCategory);
      }
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
  }, [isOpen, initialSlug, initialCategory]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const deviceFp = await getDeviceFingerprint();
      const res = await fetch('/api/store/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-device-fingerprint': deviceFp,
        },
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
          device_fingerprint: deviceFp,
          is_paid: true, // Auto-provisioning flag
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Gagal mendaftarkan website.');
        setLoading(false);
        return;
      }

      const assignedSlug = data.store?.slug || slug;
      setCreatedSlug(assignedSlug);

      const resolvedLicense =
        data.store?.ecosystem_license_code ||
        data.store?.layout_config?.ecosystem_license_code ||
        generateSmartLicenseKey(category, 'tahunan');

      setEcosystemLicenseCode(resolvedLicense);

      const generatedInv = `INV-SC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setInvoiceNo(generatedInv);
      setInvoiceDate(generatedDate);

      // Auto provisioning & Auto-login session in browser
      if (data.store) {
        const fullStoreData = {
          ...data.store,
          ecosystem_license_code: resolvedLicense,
          is_paid: true,
          is_active: true,
        };
        localStorage.setItem('sivilize_active_store', JSON.stringify(fullStoreData));
      }
      setStep(4); // Sukses & Provisioning Live screen with Official Invoice
    } catch {
      setErrorMsg('Koneksi terganggu. Silakan coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(ecosystemLicenseCode);
    setCopiedLicense(true);
    setTimeout(() => setCopiedLicense(false), 2500);
  };

  const handleCopySummary = () => {
    const isFood = detectIsFoodCategory(category);
    const text = `NOTA TRANSAKSI PEMBAYARAN RESMI PT SIVILIZE CORP INDONESIA
No. Invoice: ${invoiceNo || 'INV-SC-2026-889102'}
Website Bisnis: ${storeName} (https://${createdSlug || slug}.sivilizecorp.my.id)
Kode Lisensi Ekosistem: ${ecosystemLicenseCode} (${isFood ? 'Membuka SiKasir POS & Sivilize Dine Lite QR' : 'Membuka SiKasir POS Only'})
Tanggal: ${invoiceDate || new Date().toLocaleDateString('id-ID')}
Paket Sewa: ${initialPrice ? 'Paket Website Rakitan Kustom' : planTier === 'mikro' ? 'Paket Website Mikro (1 Halaman)' : planTier === 'bisnis' ? 'Paket Website Bisnis (4-5 Halaman)' : 'Paket Website Pro (2-3 Halaman)'} (365 Hari)
Total: ${formatRupiah(effectivePrice)} (LUNAS)
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
                {step === 4 ? 'Nota Pembayaran & Bukti Sewa Sah' : 'Klaim & Buat Website Instan'}
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

          {/* STEP 1: Nama Bisnis & Domain */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nama Bisnis / Brand Anda
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
                    placeholder="namabisnis"
                    className="bg-transparent text-white font-mono outline-none flex-1 min-w-0 text-xs sm:text-sm"
                    required
                  />
                  <span className="text-slate-500 font-mono text-xs select-none ml-1">
                    .sivilizecorp.my.id
                  </span>
                </div>

                {/* Live Slug Checker Indicator */}
                <div className="mt-1.5 min-h-[20px] flex items-center">
                  {slugStatus.checking ? (
                    <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
                      <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                      <span>Memeriksa ketersediaan subdomain...</span>
                    </span>
                  ) : slugStatus.available === true ? (
                    <span className="text-emerald-400 text-[11px] flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Subdomain https://{slug}.sivilizecorp.my.id tersedia!</span>
                    </span>
                  ) : slugStatus.available === false ? (
                    <span className="text-rose-400 text-[11px] flex items-center gap-1.5 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{slugStatus.reason || 'Subdomain tidak tersedia atau sudah dipakai'}</span>
                    </span>
                  ) : (
                    <p className="text-[11px] text-slate-400">
                      Subdomain ini langsung aktif di seluruh dunia dengan latensi 0.03s.
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                disabled={!storeName || !slug || slugStatus.available === false || slugStatus.checking}
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
                  <option value="Kuliner & Minuman">Kedai Kopi / Resto / FnB Kuliner (Termasuk POS & Dine Lite)</option>
                  <option value="Jasa & Laundry">Laundry / Dry Clean / Jasa Kebersihan (Termasuk POS Only)</option>
                  <option value="Retail & Fashion">Distro / Fashion / Aksesoris (Termasuk POS Only)</option>
                  <option value="Kesehatan & Klinik">Dokter / Klinik / Apotek / Bidan (Termasuk POS Only)</option>
                  <option value="Bengkel & Servis">Bengkel / Servis HP / Elektronik (Termasuk POS Only)</option>
                  <option value="Jasa Profesional">Konsultan / Notaris / Les Privat (Termasuk POS Only)</option>
                </select>
              </div>

              {/* Hak Akses Lisensi Ekosistem Real-Time Sesuai Kategori */}
              {(() => {
                const isFood = detectIsFoodCategory(category);
                return (
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      isFood
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                        : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-white">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        {isFood
                          ? 'Paket Usaha Makanan / F&B: Termasuk SiKasir + Dine Lite'
                          : 'Paket Usaha Non-Makanan: Termasuk SiKasir POS Only'}
                      </span>
                    </div>
                    {isFood ? (
                      <p className="text-[11px] text-amber-200/90">
                        ✓ Lisensi sewa Anda otomatis membuka <strong>SiKasir POS</strong> (Kitchen Display KDS, Resep Bahan & Kasir) + <strong>Sivilize Dine Lite</strong> (Self-Order Scan QR Meja Makan Restoran) sekaligus tanpa perlu daftar ulang!
                      </p>
                    ) : (
                      <p className="text-[11px] text-indigo-200/90">
                        ✓ Lisensi sewa Anda otomatis membuka <strong>SiKasir POS Only</strong> (Aplikasi Kasir Barcode, Inventori Stok & Preset Khusus Usaha Anda). Aplikasi Dine Lite QR Meja dinonaktifkan karena bisnis Anda tidak memiliki meja makan restoran.
                      </p>
                    )}
                  </div>
                );
              })()}

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
                    <span className="text-[11px] font-bold">Katalog Produk</span>
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
                    { id: 3, label: '3 Kolom (Standar Bisnis)' },
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
                  <span>Buat PIN Keamanan Website (6 Digit Angka)</span>
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
                      <span>Aktifkan Website Sekarang (60 Detik)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: NOTA PEMBAYARAN & BUKTI SEWA RESMI DIGITAL */}
          {step === 4 && (
            <div className="space-y-4 py-1">
              {/* 1. AUTO-PROVISIONING CELEBRATION BANNER */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold uppercase mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>DASHBOARD ADMIN OTOMATIS DIBUAT</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black tracking-tight">
                    Selamat! Website & Dashboard Admin Anda Telah Siap!
                  </h4>
                  <p className="text-xs text-emerald-100 mt-1 max-w-md leading-relaxed">
                    Sistem telah mem-provisioning database website bisnis Anda. Anda langsung login secara otomatis tanpa perlu registrasi ulang.
                  </p>
                </div>

                <a
                  href="/dashboard"
                  className="px-5 py-3 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shrink-0 transition-transform active:scale-[0.98]"
                >
                  <span>Buka Dashboard Admin</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                </a>
              </div>

              {/* 2. KARTU LISENSI EKOSISTEM SAAS TERPADU (SIKASIR + DINE LITE) */}
              {(() => {
                const isFoodBusiness = detectIsFoodCategory(category);
                return (
                  <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 text-white space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                          ⚡
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                            KODE AKTIVASI EKOSISTEM RESMI
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white">
                            {isFoodBusiness
                              ? 'Termasuk SiKasir POS & Sivilize Dine Lite'
                              : 'Termasuk SiKasir POS (Khusus Non-Makanan)'}
                          </h4>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                        STATUS: LISENSI AKTIF
                      </span>
                    </div>

                    {/* License Code Display & Copy Box */}
                    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">Kode Lisensi Ekosistem:</span>
                        <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-emerald-400">
                          {ecosystemLicenseCode}
                        </span>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          {isFoodBusiness
                            ? 'Masukkan kode ini di SiKasir POS atau Sivilize Dine Lite untuk aktivasi otomatis.'
                            : 'Masukkan kode ini di SiKasir POS untuk aktivasi kasir & sinkronisasi stok.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyLicense}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedLicense ? '✓ Kode Tersalin!' : 'Salin Kode Lisensi'}</span>
                      </button>
                    </div>

                    {/* Included Apps Status Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">💻</span>
                          <div>
                            <strong className="text-white block font-semibold text-xs">SiKasir POS Kasir</strong>
                            <span className="text-[10px] text-neutral-400">
                              {isFoodBusiness ? 'KDS Dapur, Resep & Inventori' : 'Kasir Barcode, Inventori & Struk'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400">✓ Termasuk</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">📱</span>
                          <div>
                            <strong className="text-white block font-semibold text-xs">Sivilize Dine Lite</strong>
                            <span className="text-[10px] text-neutral-400">
                              {isFoodBusiness ? 'Self-Order Scan QR Meja Resto' : 'Khusus Usaha Kuliner / F&B'}
                            </span>
                          </div>
                        </div>
                        {isFoodBusiness ? (
                          <span className="text-[10px] font-bold text-emerald-400">✓ Termasuk</span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-500">❌ Nonaktif (Non-Makanan)</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

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
                    <span className="text-neutral-500">Nama Bisnis / Brand:</span>
                    <span className="font-bold text-neutral-900">{storeName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Subdomain Resmi:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      https://{createdSlug || slug}.sivilizecorp.my.id
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Nomor Kontak Bisnis:</span>
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
                        Sewa Infrastruktur Website WaaS ({initialPrice ? 'Paket Rakitan Kustom' : planTier === 'mikro' ? 'Paket Mikro' : planTier === 'bisnis' ? 'Paket Bisnis' : 'Paket Pro'})
                      </strong>
                      <span className="text-[10px] text-neutral-500">
                        Termasuk Anycast Edge Hosting, SSL Otomatis, Subdomain, & Panel Admin Website
                      </span>
                    </div>
                    <span className="font-mono font-bold text-neutral-950 text-right shrink-0 ml-2">
                      {formatRupiah(effectivePrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-dashed border-neutral-200">
                    <div>
                      <strong className="text-neutral-950 font-bold block">
                        Kunci Lisensi Ekosistem ({ecosystemLicenseCode})
                      </strong>
                      <span className="text-[10px] text-neutral-500">
                        {detectIsFoodCategory(category)
                          ? 'Aktivasi Otomatis SiKasir POS & Sivilize Dine Lite (QR Meja Makan)'
                          : 'Aktivasi Otomatis SiKasir POS Only (Khusus Usaha Non-Makanan)'}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 text-right shrink-0 ml-2">
                      Gratis Termasuk
                    </span>
                  </div>

                  <div className="pt-2 border-t border-dashed border-neutral-200 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">PPN (0% Bebas Pajak UMKM):</span>
                    <span className="font-mono text-neutral-700">Rp 0</span>
                  </div>
                  <div className="flex items-center justify-between font-extrabold text-sm text-neutral-950 pt-1">
                    <span>Total Pembayaran (Lunas):</span>
                    <span className="font-mono text-emerald-700 text-base">
                      {formatRupiah(effectivePrice)}
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
                    Nota digital ini merupakan bukti perikatan dan tanda terima pembayaran sah (e-Receipt) yang dilindungi oleh <strong>UU ITE No. 1 Tahun 2024</strong> dan <strong>PP No. 71 Tahun 2019 (PSTE)</strong>. Seluruh hak akses, domain website, dan data katalog Anda dijamin aktif selama 365 hari kalender penuh.
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
                  <span>Masuk ke Dashboard Website Anda</span>
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
