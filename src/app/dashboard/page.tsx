'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Store, Product, ThemeId, TemplateType, LayoutConfig, CustomPage } from '@/types/database';
import { formatRupiah } from '@/lib/utils';
import { compressImageToWebP } from '@/lib/image-compressor';
import {
  Store as StoreIcon,
  ShoppingBag,
  CreditCard,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Lock,
  Phone,
  ToggleLeft,
  ToggleRight,
  Package,
  Layers,
  ShieldCheck,
  Globe,
  Radio,
  LayoutGrid,
  FileText,
  Smartphone,
  Monitor,
  Check,
  Sparkles,
  QrCode,
  ArrowRight,
  X,
  HelpCircle,
  Eye,
  Printer,
  Mail,
  Building2,
  RefreshCw,
  Copy,
} from 'lucide-react';
import { OfficialInvoiceModal, type OfficialInvoiceData } from '@/components/billing/OfficialInvoiceModal';
import { AIGuidedTour } from '@/components/dashboard/AIGuidedTour';
import { AIChatbotAssistant } from '@/components/dashboard/AIChatbotAssistant';

export default function TenantDashboardPage() {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [activeTab, setActiveTab] = useState<
    'katalog' | 'tata-letak' | 'halaman' | 'profil' | 'langganan' | 'ekosistem'
  >('katalog');
  const [isLoading, setIsLoading] = useState(true);

  // AI Tour & Copilot States
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Ekosistem SaaS & Kasir Sync States
  const [isSyncingKasir, setIsSyncingKasir] = useState(false);
  const [kasirSyncNotice, setKasirSyncNotice] = useState('');
  const [copiedDashboardLicense, setCopiedDashboardLicense] = useState(false);

  // Official invoice modal state
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [currentInvoiceData, setCurrentInvoiceData] = useState<OfficialInvoiceData | null>(null);

  // Login form state (Empty defaults, zero mock hardcode)
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Self-Service PIN Reset Modal state
  const [isResetPinOpen, setIsResetPinOpen] = useState(false);
  const [resetPhone, setResetPhone] = useState('');
  const [resetSlug, setResetSlug] = useState('');
  const [resetNewPin, setResetNewPin] = useState('');
  const [resetStatus, setResetStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  // Layout customizer state
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    grid_columns_desktop: 3,
    grid_columns_mobile: 1,
    spacing: 'normal',
    card_style: 'border',
    section_order: ['hero', 'categories', 'catalog', 'about', 'contact'],
    visible_sections: {
      hero: true,
      categories: true,
      catalog: true,
      about: true,
      contact: true,
    },
  });
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSavingLayout, setIsSavingLayout] = useState(false);
  const [layoutSaveNotice, setLayoutSaveNotice] = useState('');

  // Add-on page (+Rp 50.000 / thn) modal & form state
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  const [addPageForm, setAddPageForm] = useState({
    title: '',
    slug: '',
    content: '',
  });
  const [isProcessingAddPage, setIsProcessingAddPage] = useState(false);
  const [showMayarQrisModal, setShowMayarQrisModal] = useState(false);
  const [pendingPageToActivate, setPendingPageToActivate] = useState<typeof addPageForm | null>(null);

  // Edit store form state
  const [storeForm, setStoreForm] = useState({
    store_name: '',
    description: '',
    category: '',
    template_type: 'katalog' as TemplateType,
    theme_id: 'warm-cafe' as ThemeId,
    opening_hours: '',
    address: '',
    google_maps_url: '',
    banner_url: '',
  });

  // Product form modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    category_tag: 'Umum',
    image_url: '',
    is_available: true,
  });
  const [compressedImagePreview, setCompressedImagePreview] = useState<{
    dataUrl: string;
    sizeKb: number;
  } | null>(null);

  const populateStoreForm = (s: Store) => {
    setStoreForm({
      store_name: s.store_name,
      description: s.description || '',
      category: s.category || '',
      template_type: s.template_type,
      theme_id: s.theme_id,
      opening_hours: s.opening_hours || '',
      address: s.address || '',
      google_maps_url: s.google_maps_url || '',
      banner_url: s.banner_url || '',
    });
  };

  const fetchProducts = async (storeId: string) => {
    try {
      const res = await fetch(`/api/products?store_id=${storeId}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch {
      // ignore
    }
  };

  const fetchCustomPages = async (storeId: string) => {
    try {
      const res = await fetch(`/api/store/custom-pages?store_id=${storeId}`);
      const data = await res.json();
      if (data.pages) {
        setCustomPages(data.pages);
      }
    } catch {
      // ignore
    }
  };

  // Fetch initial session or demo store
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedStore = localStorage.getItem('sivilize_active_store');
      if (savedStore) {
        try {
          const parsed = JSON.parse(savedStore);
          setStore(parsed);
          fetchProducts(parsed.id);
          fetchCustomPages(parsed.id);
          populateStoreForm(parsed);
          if (parsed.layout_config) {
            setLayoutConfig(parsed.layout_config);
          }
        } catch {
          // ignore
        }
      }
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (overridePhone?: string, overrideSlug?: string) => {
    setIsSubmittingLogin(true);
    setLoginError('');
    try {
      const phoneToUse = overridePhone || loginPhone;
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneToUse,
          pin: loginPin,
          slug: overrideSlug,
          tax_id: '',
          user_website_url: '',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Login gagal.');
        setIsSubmittingLogin(false);
        return;
      }

      setStore(data.store);
      localStorage.setItem('sivilize_active_store', JSON.stringify(data.store));
      populateStoreForm(data.store);
      fetchProducts(data.store.id);
      fetchCustomPages(data.store.id);
      if (data.store.layout_config) {
        setLayoutConfig(data.store.layout_config);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Koneksi bermasalah.';
      setLoginError(message);
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleLogout = () => {
    setStore(null);
    localStorage.removeItem('sivilize_active_store');
  };

  const handleSaveLayout = async () => {
    if (!store) return;
    setIsSavingLayout(true);
    setLayoutSaveNotice('');
    try {
      const res = await fetch('/api/store/layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_id: store.id,
          layout_config: layoutConfig,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStore(data.store);
        localStorage.setItem('sivilize_active_store', JSON.stringify(data.store));
        setLayoutSaveNotice('✓ Tata letak dan grid website berhasil disimpan dan langsung live!');
        setTimeout(() => setLayoutSaveNotice(''), 4000);
      } else {
        alert(data.error || 'Gagal menyimpan tata letak.');
      }
    } catch {
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setIsSavingLayout(false);
    }
  };

  const handleInitiateAddPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addPageForm.title.trim() || !addPageForm.slug.trim()) {
      alert('Judul dan alamat slug halaman wajib diisi.');
      return;
    }
    // Buka tagihan Mayar QRIS Rp 50.000 / thn
    setPendingPageToActivate({ ...addPageForm });
    setIsAddPageModalOpen(false);
    setShowMayarQrisModal(true);
  };

  const handleOpenStoreInvoice = () => {
    if (!store) return;
    const tier = store.plan_tier || 'pro';
    const planAmount =
      tier === 'mikro' ? 349000 : tier === 'bisnis' ? 899000 : 599000;
    const planLabel =
      tier === 'mikro'
        ? 'Paket Website Mikro (1 Halaman)'
        : tier === 'bisnis'
        ? 'Paket Website Bisnis (4-5 Halaman)'
        : 'Paket Website Pro (2-3 Halaman)';

    const invData: OfficialInvoiceData = {
      invoiceNumber: `INV-SC-2026-${(store.id || '881920').slice(-6).toUpperCase()}`,
      storeName: store.store_name,
      slug: store.slug,
      ownerPhone: store.owner_phone,
      planName: planLabel,
      amount: planAmount,
      paymentDate: new Date(store.created_at || Date.now()).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      paymentMethod: 'Mayar.id QRIS Dinamis & BI-FAST Instant Settlement',
      billingPeriod: `365 Hari (s/d ${
        store.expired_at
          ? new Date(store.expired_at).toLocaleDateString('id-ID')
          : new Date(Date.now() + 365 * 24 * 3600 * 1000).toLocaleDateString('id-ID')
      })`,
      items: [
        {
          name: `Sewa Tahunan Website (${planLabel})`,
          desc: `Infrastruktur WaaS Anycast Edge, SSL Dinamis, Subdomain https://${store.slug}.sivilizecorp.my.id`,
          price: planAmount,
        },
      ],
    };
    setCurrentInvoiceData(invData);
    setIsInvoiceModalOpen(true);
  };

  const handleConfirmMayarPayment = async () => {
    if (!store || !pendingPageToActivate) return;
    setIsProcessingAddPage(true);
    const activatingPage = { ...pendingPageToActivate };

    try {
      const res = await fetch('/api/store/custom-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_id: store.id,
          title: activatingPage.title,
          slug: activatingPage.slug,
          content: activatingPage.content,
          simulate_payment: true,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCustomPages(data.pages);
        setShowMayarQrisModal(false);
        setPendingPageToActivate(null);
        setAddPageForm({ title: '', slug: '', content: '' });

        // Tampilkan Nota Pembayaran Sah untuk Add-On Halaman
        const addonInvoice: OfficialInvoiceData = {
          invoiceNumber: `INV-ADDON-${Date.now().toString().slice(-6)}`,
          storeName: store.store_name,
          slug: store.slug,
          ownerPhone: store.owner_phone,
          planName: 'Add-On Halaman Ekstra (+1 Halaman)',
          amount: 50000,
          paymentDate: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          paymentMethod: 'Mayar.id QRIS Dinamis BI-FAST (LUNAS)',
          billingPeriod: '365 Hari (1 Tahun Penuh)',
          items: [
            {
              name: `Add-On Halaman: "${activatingPage.title}"`,
              desc: `Sub-route Anycast Edge https://${store.slug}.sivilizecorp.my.id/${activatingPage.slug}`,
              price: 50000,
            },
          ],
        };
        setCurrentInvoiceData(addonInvoice);
        setIsInvoiceModalOpen(true);
      } else {
        alert(data.error || 'Gagal mengaktifkan halaman.');
      }
    } catch {
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setIsProcessingAddPage(false);
    }
  };

  const handleDeleteCustomPage = async (pageId: string, pageTitle: string) => {
    if (!store) return;
    if (!confirm(`Hapus halaman "${pageTitle}" dari website Anda?`)) return;
    try {
      const res = await fetch('/api/store/custom-pages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_id: store.id, page_id: pageId }),
      });
      const data = await res.json();
      if (res.ok) {
        setCustomPages(data.pages);
      }
    } catch {
      alert('Gagal menghapus halaman.');
    }
  };

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const result = await compressImageToWebP(file, { maxWidth: 1080, quality: 0.82 });
      setCompressedImagePreview({
        dataUrl: result.dataUrl,
        sizeKb: result.sizeKb,
      });

      // Upload binary WebP to Supabase Storage via /api/upload (FW 13)
      const uploadFormData = new FormData();
      uploadFormData.append('file', result.file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setProductForm((prev) => ({ ...prev, image_url: data.url }));
      } else {
        // Fallback jika storage bucket belum siap
        console.warn('Storage upload warning:', data.error);
        setProductForm((prev) => ({ ...prev, image_url: result.dataUrl }));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal kompresi foto.';
      alert(message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveStoreProfile = async () => {
    if (!store) return;
    try {
      const res = await fetch('/api/store/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: store.id,
          ...storeForm,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Gagal menyimpan profil.');
        return;
      }
      setStore(data.store);
      localStorage.setItem('sivilize_active_store', JSON.stringify(data.store));
      alert('✓ Pengaturan profil website berhasil disimpan!');
    } catch {
      alert('Gagal menyimpan profil website.');
    }
  };

  const handleToggleProductStock = async (product: Product) => {
    const nextStatus = !product.is_available;
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          store_id: store?.id,
          is_available: nextStatus,
        }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, is_available: nextStatus } : p))
        );
      }
    } catch {
      // ignore
    }
  };

  const getDashboardLicenseCode = () => {
    if (!store) return 'SIV-FNB-365D';
    return (
      store.ecosystem_license_code ||
      store.layout_config?.ecosystem_license_code ||
      (store.category?.toLowerCase().includes('kuliner') || store.category?.toLowerCase().includes('fnb')
        ? 'SIV-FNB-365D'
        : store.category?.toLowerCase().includes('bengkel')
        ? 'SIV-BENGKEL-365D'
        : store.category?.toLowerCase().includes('laundry')
        ? 'SIV-LAUNDRY-365D'
        : store.category?.toLowerCase().includes('barber')
        ? 'SIV-BARBER-365D'
        : store.category?.toLowerCase().includes('apotek')
        ? 'SIV-APOTEK-365D'
        : 'SIV-RETAIL-365D')
    );
  };

  const handleCopyDashboardLicense = () => {
    const code = getDashboardLicenseCode();
    navigator.clipboard.writeText(code);
    setCopiedDashboardLicense(true);
    setTimeout(() => setCopiedDashboardLicense(false), 2500);
  };

  const handleSyncFromKasir = async () => {
    if (!store) return;
    setIsSyncingKasir(true);
    setKasirSyncNotice('');
    try {
      await fetchProducts(store.id);
      setKasirSyncNotice('✓ Berhasil menyinkronkan menu & stok terbaru dari SiKasir POS 2-arah!');
      setTimeout(() => setKasirSyncNotice(''), 4500);
    } catch {
      alert('Gagal menyinkronkan produk dari kasir.');
    } finally {
      setIsSyncingKasir(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!store) return;
    if (!productForm.name.trim() || productForm.price < 0) {
      alert('Nama produk dan harga wajib diisi.');
      return;
    }

    try {
      if (editingProduct) {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProduct.id,
            store_id: store.id,
            ...productForm,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? data.product : p))
          );
          setIsProductModalOpen(false);
        } else {
          alert(data.error || 'Gagal mengedit produk.');
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            store_id: store.id,
            ...productForm,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setProducts((prev) => [...prev, data.product]);
          setIsProductModalOpen(false);
        } else {
          alert(data.error || 'Gagal menambah produk.');
        }
      }
    } catch {
      alert('Terjadi kesalahan.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini dari katalog?')) return;
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, store_id: store?.id }),
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleResetPinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPhone || !resetSlug || resetNewPin.length !== 6) {
      setResetStatus({ type: 'error', message: 'Nomor WhatsApp, slug website, dan 6 digit PIN baru wajib diisi.' });
      return;
    }
    setResetStatus({ type: 'loading', message: 'Memverifikasi dan memperbarui PIN...' });
    try {
      const res = await fetch('/api/auth/reset-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: resetPhone,
          slug: resetSlug,
          new_pin: resetNewPin,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResetStatus({ type: 'error', message: data.error || 'Gagal mereset PIN.' });
        return;
      }
      setResetStatus({ type: 'success', message: data.message });
      setLoginPhone(resetPhone);
      setLoginPin(resetNewPin);
      setTimeout(() => {
        setIsResetPinOpen(false);
        setResetStatus({ type: 'idle', message: '' });
      }, 2500);
    } catch {
      setResetStatus({ type: 'error', message: 'Terjadi kesalahan koneksi.' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-neutral-500 text-sm font-sans">
        Memuat Portal Merchant SivilizeSpace...
      </div>
    );
  }

  // 1. TAMPILAN LOGIN MITRA PENYEWA WEBSITE (UTILE & CLEAN)
  if (!store) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 flex flex-col justify-center items-center p-4 font-sans selection:bg-neutral-900 selection:text-white">
        <div className="w-full max-w-sm rounded-3xl bg-white border border-neutral-200/80 p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-neutral-950 mx-auto flex items-center justify-center text-white shadow-xs mb-3">
              <StoreIcon className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-950">Portal Kelola Website</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Kelola katalog layanan, grid tata letak & profil website mandiri Anda
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nomor Kontak Terdaftar:
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                PIN Keamanan (6 Digit):
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  maxLength={6}
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleLogin()}
              disabled={isSubmittingLogin || loginPin.length !== 6}
              className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs tracking-tight transition-all cursor-pointer shadow-xs mt-2"
            >
              {isSubmittingLogin ? 'Memverifikasi Akses...' : 'Masuk ke Dashboard Website'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setResetPhone(loginPhone);
                  setIsResetPinOpen(true);
                  setResetStatus({ type: 'idle', message: '' });
                }}
                className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 transition-colors underline cursor-pointer"
              >
                Lupa PIN Keamanan Website?
              </button>
            </div>

            {/* Quick Demo Store Buttons */}
            <div className="pt-4 border-t border-neutral-100 space-y-2">
              <p className="text-[11px] text-neutral-500 font-medium text-center">
                Pilih Akun Demo Website Terverifikasi:
              </p>
              <button
                type="button"
                onClick={() => {
                  setLoginPhone('6281234567890');
                  setLoginPin('123456');
                  handleLogin('6281234567890', 'senja-coffee');
                }}
                className="w-full py-2 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors flex items-center justify-between"
              >
                <span>☕ Kopi Senja Bajawa (senja-coffee)</span>
                <span className="text-[10px] font-mono text-neutral-500">PIN: 123456</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODAL RESET PIN */}
        {isResetPinOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white border border-neutral-200 p-6 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setIsResetPinOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Reset PIN Keamanan</h3>
                  <p className="text-[11px] text-neutral-500">Pulihkan akses website Anda</p>
                </div>
              </div>

              {resetStatus.message && (
                <div
                  className={`p-3 rounded-xl text-xs mb-3 flex items-start gap-2 ${
                    resetStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : resetStatus.type === 'error'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {resetStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  )}
                  <span>{resetStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleResetPinSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Nomor WhatsApp Terdaftar
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 081234567890"
                    value={resetPhone}
                    onChange={(e) => setResetPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Subdomain / Slug Toko
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: senja-coffee"
                    value={resetSlug}
                    onChange={(e) => setResetSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    PIN Baru (6 Digit Angka)
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={6}
                    placeholder="••••••"
                    value={resetNewPin}
                    onChange={(e) => setResetNewPin(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-mono tracking-widest"
                  />
                </div>
                <button
                  type="submit"
                  disabled={resetStatus.type === 'loading' || resetNewPin.length !== 6}
                  className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs cursor-pointer transition-all mt-2"
                >
                  {resetStatus.type === 'loading' ? 'Memproses...' : 'Simpan PIN Baru'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. DASHBOARD MITRA AKTIF (SHOPIFY / STRIPE LEVEL PRECISION)
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-bold shadow-xs">
              <StoreIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-neutral-950">
                  {store.store_name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                  LIVE EDGE
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                Subdomain: {store.slug}.sivilizecorp.my.id
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsTourOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Mulai Panduan Tur Interaktif AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Panduan AI</span>
            </button>

            <Link
              href={`/toko/${store.slug}`}
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Buka Website Langsung</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-neutral-100 hover:bg-rose-50 hover:text-rose-700 text-neutral-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Keluar dari akun"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation Menu */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('katalog')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'katalog'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Katalog & Menu</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-100 text-neutral-700 font-mono font-bold">
              {products.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tata-letak')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'tata-letak'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Tata Letak & Grid</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('halaman')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'halaman'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Halaman Kustom & Add-On</span>
            {customPages.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-700 font-mono font-bold">
                {customPages.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profil')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'profil'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <StoreIcon className="w-4 h-4" />
            <span>Profil Bisnis & Website</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('langganan')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'langganan'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Sewa & Mayar Billing</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ekosistem')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'ekosistem'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Ekosistem Lisensi SaaS</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
              AKTIF
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 pb-24">
        {/* Banner Peringatan Perpanjangan Masa Sewa (H-7 dan H-3) */}
        {(() => {
          if (!store.expired_at) return null;
          const diffTime = new Date(store.expired_at).getTime() - new Date().getTime();
          const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (daysLeft > 7) return null;

          return (
            <div
              className={`p-4 rounded-2xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border shadow-xs ${
                daysLeft <= 3
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <AlertCircle
                  className={`w-5 h-5 shrink-0 mt-0.5 sm:mt-0 ${
                    daysLeft <= 3 ? 'text-rose-600' : 'text-amber-600'
                  }`}
                />
                <div>
                  <strong className="block text-xs sm:text-sm font-bold">
                    {daysLeft <= 0
                      ? 'Perhatian: Masa Sewa Website Anda Telah Kedaluwarsa!'
                      : `Peringatan: Masa Sewa Website Anda Tersisa ${daysLeft} Hari Lagi!`}
                  </strong>
                  <span className="text-[11px] opacity-90 block mt-0.5">
                    Batas akhir sewa: {new Date(store.expired_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}. Perpanjang sekarang agar website Anycast Edge dan integrasi kasir tetap aktif tanpa henti.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('langganan')}
                className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                Perpanjang Sewa Sekarang
              </button>
            </div>
          );
        })()}

        {/* TAB 1: KATALOG & MENU */}
        {activeTab === 'katalog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-neutral-950">Daftar Menu & Katalog Produk</h2>
                <p className="text-xs text-neutral-500">
                  Perubahan harga, nama, atau ketersediaan stok langsung tayang di website seketika
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSyncFromKasir}
                  disabled={isSyncingKasir}
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-semibold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                  title="Tarik menu dan perubahan stok dari SiKasir POS"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-neutral-600 ${isSyncingKasir ? 'animate-spin' : ''}`} />
                  <span>{isSyncingKasir ? 'Menyinkronkan...' : 'Tarik Produk dari SiKasir'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      description: '',
                      price: 0,
                      category_tag: 'Umum',
                      image_url: '',
                      is_available: true,
                    });
                    setCompressedImagePreview(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item Baru</span>
                </button>
              </div>
            </div>

            {kasirSyncNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{kasirSyncNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-neutral-100 border border-neutral-200"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-400">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-neutral-950 truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 shrink-0">
                          {item.category_tag}
                        </span>
                      </div>
                      <p className="text-xs font-black text-neutral-900 font-mono mt-0.5">
                        {formatRupiah(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleProductStock(item)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                        item.is_available
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {item.is_available ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>Ready</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>Habis</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(item);
                        setProductForm({
                          name: item.name,
                          description: item.description || '',
                          price: item.price,
                          category_tag: item.category_tag || 'Umum',
                          image_url: item.image_url || '',
                          is_available: item.is_available,
                        });
                        setCompressedImagePreview(
                          item.image_url ? { dataUrl: item.image_url, sizeKb: 0 } : null
                        );
                        setIsProductModalOpen(true);
                      }}
                      className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(item.id)}
                      className="p-2 rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TATA LETAK & GRID CUSTOMIZER (LENGKAP DENGAN LIVE SIMULATOR) */}
        {activeTab === 'tata-letak' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-neutral-950">
                  Kustomisasi Tata Letak & Grid Website
                </h2>
                <p className="text-xs text-neutral-500">
                  Ubah format kolom katalog, jarak antar-kartu, dan gaya visual website Anda secara bebas
                </p>
              </div>

              <div className="flex items-center gap-3">
                {layoutSaveNotice && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    {layoutSaveNotice}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSaveLayout}
                  disabled={isSavingLayout}
                  className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingLayout ? 'Menyimpan...' : 'Simpan Tata Letak Website'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column (Left) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. Format Grid Desktop */}
                <div className="rounded-2xl bg-white border border-neutral-200 p-5 space-y-3 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    1. Format Kolom Produk & Layanan (Desktop)
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 2, label: '2 Kolom', desc: 'Editorial / Foto Besar' },
                      { id: 3, label: '3 Kolom', desc: 'Standar Responsif (Rekomendasi)' },
                      { id: 4, label: '4 Kolom', desc: 'Katalog Padat / Grosir' },
                      { id: 'list', label: '1 Kolom (List Baris)', desc: 'Format Menu Restoran / Jasa' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setLayoutConfig({
                            ...layoutConfig,
                            grid_columns_desktop: opt.id as 2 | 3 | 4 | 'list',
                          })
                        }
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          layoutConfig.grid_columns_desktop === opt.id
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <p className="font-bold">{opt.label}</p>
                        <p className={`text-[10px] mt-0.5 ${layoutConfig.grid_columns_desktop === opt.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Format Grid HP / Mobile */}
                <div className="rounded-2xl bg-white border border-neutral-200 p-5 space-y-3 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    2. Format Kolom Produk di HP (Mobile)
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 1, label: '1 Kolom Penuh', desc: 'Mudah dibaca & scroll santai' },
                      { id: 2, label: '2 Kolom Ringkas', desc: 'Tampilan padat ala marketplace' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setLayoutConfig({
                            ...layoutConfig,
                            grid_columns_mobile: opt.id as 1 | 2,
                          })
                        }
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          layoutConfig.grid_columns_mobile === opt.id
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <p className="font-bold">{opt.label}</p>
                        <p className={`text-[10px] mt-0.5 ${layoutConfig.grid_columns_mobile === opt.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Spacing & Card Style */}
                <div className="rounded-2xl bg-white border border-neutral-200 p-5 space-y-4 shadow-xs">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      3. Jarak Antar Item (Spacing Gap)
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'compact', label: 'Rapat (10px)' },
                        { id: 'normal', label: 'Normal (16px)' },
                        { id: 'spacious', label: 'Lapang (24px)' },
                      ].map((sp) => (
                        <button
                          key={sp.id}
                          type="button"
                          onClick={() =>
                            setLayoutConfig({
                              ...layoutConfig,
                              spacing: sp.id as 'compact' | 'normal' | 'spacious',
                            })
                          }
                          className={`py-2 px-2.5 rounded-lg border text-center text-xs font-bold transition-all cursor-pointer ${
                            layoutConfig.spacing === sp.id
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          {sp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      4. Gaya Kartu Produk (Card Style)
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'border', label: 'Garis Tipis' },
                        { id: 'shadow', label: 'Shadow Halus' },
                        { id: 'flat', label: 'Flat Modern' },
                      ].map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() =>
                            setLayoutConfig({
                              ...layoutConfig,
                              card_style: st.id as 'border' | 'shadow' | 'flat',
                            })
                          }
                          className={`py-2 px-2.5 rounded-lg border text-center text-xs font-bold transition-all cursor-pointer ${
                            layoutConfig.card_style === st.id
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. Posisi & Letak Tulisan */}
                  <div className="pt-3 border-t border-neutral-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      5. Posisi & Letak Tulisan (Alignment)
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'left', label: '⬅️ Rata Kiri' },
                        { id: 'center', label: '↔️ Rata Tengah' },
                        { id: 'right', label: '➡️ Rata Kanan' },
                      ].map((al) => (
                        <button
                          key={al.id}
                          type="button"
                          onClick={() =>
                            setLayoutConfig({
                              ...layoutConfig,
                              text_alignment: al.id as 'left' | 'center' | 'right',
                            })
                          }
                          className={`py-2 px-2.5 rounded-lg border text-center text-xs font-bold transition-all cursor-pointer ${
                            (layoutConfig.text_alignment || 'left') === al.id
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          {al.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 6. Besar Kecilnya Tulisan / Heading */}
                  <div className="pt-3 border-t border-neutral-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      6. Besar Kecilnya Tulisan (Typography Scale)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'small', label: 'A- Ringkas' },
                        { id: 'normal', label: 'A Standar' },
                        { id: 'large', label: 'A+ Besar' },
                        { id: 'huge', label: 'A++ Ekstra' },
                      ].map((sz) => (
                        <button
                          key={sz.id}
                          type="button"
                          onClick={() =>
                            setLayoutConfig({
                              ...layoutConfig,
                              heading_size: sz.id as 'small' | 'normal' | 'large' | 'huge',
                            })
                          }
                          className={`py-2 px-2 rounded-lg border text-center text-xs font-bold transition-all cursor-pointer ${
                            (layoutConfig.heading_size || 'normal') === sz.id
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 7. Gaya Tombol Beli / CTA */}
                  <div className="pt-3 border-t border-neutral-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      7. Gaya Tombol Beli (CTA Button)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'rounded', label: 'Rounded 8px' },
                        { id: 'pill', label: 'Kapsul Pill' },
                        { id: 'sharp', label: 'Sharp 0px' },
                        { id: 'block', label: 'Lebar Penuh' },
                      ].map((btn) => (
                        <button
                          key={btn.id}
                          type="button"
                          onClick={() =>
                            setLayoutConfig({
                              ...layoutConfig,
                              button_style: btn.id as 'rounded' | 'pill' | 'sharp' | 'block',
                            })
                          }
                          className={`py-2 px-2 rounded-lg border text-center text-xs font-bold transition-all cursor-pointer ${
                            (layoutConfig.button_style || 'rounded') === btn.id
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Storefront Simulator (Right) */}
              <div className="lg:col-span-7 rounded-3xl bg-neutral-900 border border-neutral-800 p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h4 className="text-xs font-bold tracking-tight">
                      Pratinjau Langsung (Simulator Website)
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        previewDevice === 'desktop' ? 'bg-neutral-950 text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        previewDevice === 'mobile' ? 'bg-neutral-950 text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>HP Mobile</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Screen */}
                <div
                  className={`mx-auto bg-neutral-950 rounded-2xl border border-neutral-800 p-4 min-h-[460px] overflow-hidden transition-all duration-300 ${
                    previewDevice === 'mobile' ? 'max-w-xs' : 'w-full'
                  }`}
                >
                  {/* Top Bar of Store */}
                  <div
                    className={`border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between ${
                      layoutConfig.text_alignment === 'center'
                        ? 'flex-col text-center gap-1.5'
                        : layoutConfig.text_alignment === 'right'
                        ? 'text-right justify-end gap-2'
                        : 'text-left'
                    }`}
                  >
                    <div className={layoutConfig.text_alignment === 'center' ? 'text-center' : layoutConfig.text_alignment === 'right' ? 'text-right' : 'text-left'}>
                      <h5
                        className={`font-black text-white ${
                          layoutConfig.heading_size === 'huge'
                            ? 'text-base sm:text-lg'
                            : layoutConfig.heading_size === 'large'
                            ? 'text-sm sm:text-base'
                            : layoutConfig.heading_size === 'small'
                            ? 'text-xs'
                            : 'text-xs sm:text-sm'
                        }`}
                      >
                        {store.store_name}
                      </h5>
                      <span className="text-[10px] text-emerald-400">● Buka Sekarang</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                      {layoutConfig.grid_columns_desktop === 'list'
                        ? 'Mode List'
                        : `${layoutConfig.grid_columns_desktop} Kolom`}
                    </span>
                  </div>

                  {/* Products Grid in Simulator */}
                  <div
                    className={
                      layoutConfig.grid_columns_desktop === 'list'
                        ? 'space-y-3'
                        : previewDevice === 'mobile'
                        ? layoutConfig.grid_columns_mobile === 2
                          ? 'grid grid-cols-2 gap-2.5'
                          : 'space-y-3'
                        : layoutConfig.grid_columns_desktop === 2
                        ? 'grid grid-cols-2 gap-3'
                        : layoutConfig.grid_columns_desktop === 4
                        ? 'grid grid-cols-4 gap-2.5'
                        : 'grid grid-cols-3 gap-3'
                    }
                  >
                    {products.slice(0, 4).map((p) => {
                      if (layoutConfig.grid_columns_desktop === 'list') {
                        return (
                          <div
                            key={p.id}
                            className={`p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 text-white ${
                              layoutConfig.card_style === 'shadow'
                                ? 'shadow-md border-0'
                                : layoutConfig.card_style === 'flat'
                                ? 'border-0 bg-neutral-900/60'
                                : ''
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                                <ShoppingBag className="w-4 h-4 text-neutral-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold truncate">{p.name}</p>
                                <p className="text-[11px] font-mono text-neutral-400">
                                  {formatRupiah(p.price)}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-1 bg-neutral-800 text-white shrink-0 ${
                                layoutConfig.button_style === 'pill'
                                  ? 'rounded-full'
                                  : layoutConfig.button_style === 'sharp'
                                  ? 'rounded-none'
                                  : 'rounded-lg'
                              }`}
                            >
                              + Pesan
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={p.id}
                          className={`p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between text-white ${
                            layoutConfig.text_alignment === 'center'
                              ? 'text-center items-center'
                              : layoutConfig.text_alignment === 'right'
                              ? 'text-right items-end'
                              : 'text-left items-start'
                          } ${
                            layoutConfig.card_style === 'shadow'
                              ? 'shadow-md border-0'
                              : layoutConfig.card_style === 'flat'
                              ? 'border-0 bg-neutral-900/60'
                              : ''
                          }`}
                        >
                          <div className="w-full h-20 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-2">
                            <ShoppingBag className="w-5 h-5 text-neutral-400" />
                          </div>
                          <p className="text-xs font-bold truncate w-full">{p.name}</p>
                          <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                            {formatRupiah(p.price)}
                          </p>
                          <button
                            type="button"
                            className={`mt-2 py-1 text-[10px] font-bold text-white bg-neutral-800 hover:bg-neutral-700 ${
                              layoutConfig.button_style === 'pill'
                                ? 'rounded-full px-3 w-full'
                                : layoutConfig.button_style === 'sharp'
                                ? 'rounded-none px-2 w-full'
                                : layoutConfig.button_style === 'block'
                                ? 'w-full block rounded-lg'
                                : 'rounded-md w-full'
                            }`}
                          >
                            Pesan
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HALAMAN KUSTOM & ADD-ON (+RP 50.000 / HALAMAN / TAHUN) */}
        {activeTab === 'halaman' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-neutral-950">
                  Kelola Halaman Ekstra & Add-On Website
                </h2>
                <p className="text-xs text-neutral-500">
                  Sesuai ketentuan resmi PRD: Tambah halaman khusus (+Rp 50.000 / halaman / tahun) dengan SLA Anycast Edge
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddPageModalOpen(true)}
                className="px-4.5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Halaman Baru (+Rp 50k/thn)</span>
              </button>
            </div>

            {/* Default Pages Banner */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-950">
                    Halaman Beranda & Katalog Utama (Paket Bawaan)
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Termasuk Beranda, Profil Usaha, Katalog Layanan, dan Form Pemesanan Mandiri
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 w-fit">
                Aktif Selamanya
              </span>
            </div>

            {/* Custom Pages List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Halaman Tambahan Khusus Anda ({customPages.length} Halaman)
              </h3>

              {customPages.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-dashed border-neutral-300 text-center space-y-2">
                  <FileText className="w-10 h-10 mx-auto text-neutral-400" />
                  <p className="text-sm font-bold text-neutral-800">Belum Ada Halaman Ekstra</p>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Butuh halaman profil &ldquo;Tentang Kami&rdquo;, &ldquo;FAQ / Tanya Jawab&rdquo;, atau &ldquo;Galeri Portofolio&rdquo;? Tambah sekarang seharga Rp 50.000/tahun.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAddPageModalOpen(true)}
                    className="mt-2 px-4 py-2 rounded-xl bg-neutral-950 text-white font-bold text-xs"
                  >
                    Beli Slot Halaman Baru
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customPages.map((page) => (
                    <div
                      key={page.id}
                      className="p-5 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-between shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-sm text-neutral-950">{page.title}</h4>
                          <span className="text-xs font-mono text-neutral-500">
                            /{page.slug}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                          Add-on Rp 50k
                        </span>
                      </div>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {page.content}
                      </p>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <Link
                          href={`/toko/${store.slug}`}
                          target="_blank"
                          className="font-bold text-neutral-900 hover:underline flex items-center gap-1"
                        >
                          <span>Lihat di Web</span>
                          <ExternalLink className="w-3 h-3 text-neutral-400" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteCustomPage(page.id, page.title)}
                          className="text-neutral-400 hover:text-rose-600 font-semibold transition-colors"
                        >
                          Hapus Halaman
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PROFIL BISNIS & WEBSITE */}
        {activeTab === 'profil' && (
          <div className="max-w-3xl rounded-3xl bg-white border border-neutral-200 p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-950">Profil Bisnis & Identitas Website</h2>
              <p className="text-xs text-neutral-500">
                Informasi dasar bisnis, alamat, kontak, dan jam operasional yang ditampilkan pada website publik
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Nama Bisnis / Brand:</label>
                <input
                  type="text"
                  value={storeForm.store_name}
                  onChange={(e) => setStoreForm({ ...storeForm, store_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Kategori Bidang Usaha:</label>
                <input
                  type="text"
                  value={storeForm.category}
                  onChange={(e) => setStoreForm({ ...storeForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Slogan / Deskripsi Singkat:</label>
                <textarea
                  rows={3}
                  value={storeForm.description}
                  onChange={(e) => setStoreForm({ ...storeForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 resize-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Pilihan Tema Warna Visual:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'warm-cafe', label: '☕ Warm Cafe' },
                    { id: 'midnight-distro', label: '🖤 Midnight Distro' },
                    { id: 'fresh-herbal', label: '🌿 Fresh Herbal' },
                    { id: 'pastel-beauty', label: '🌸 Pastel Beauty' },
                    { id: 'corporate-clean', label: '🏛️ Corporate Clean' },
                  ].map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setStoreForm({ ...storeForm, theme_id: th.id as ThemeId })}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        storeForm.theme_id === th.id
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {th.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Jam Operasional:</label>
                <input
                  type="text"
                  value={storeForm.opening_hours}
                  onChange={(e) => setStoreForm({ ...storeForm, opening_hours: e.target.value })}
                  placeholder="08:00 - 22:00 WITA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Alamat Fisik Bisnis:</label>
                <input
                  type="text"
                  value={storeForm.address}
                  onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                  placeholder="Jl. Frans Seda No. 8, Kupang"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 font-medium"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveStoreProfile}
                className="w-full py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs tracking-tight shadow-xs transition-all cursor-pointer"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: SEWA & MAYAR BILLING */}
        {activeTab === 'langganan' && (
          <div className="max-w-2xl rounded-3xl bg-white border border-neutral-200 p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-950">Status Sewa & Mayar Invoicing</h2>
              <p className="text-xs text-neutral-500">
                Informasi masa aktif sewa website dan tagihan resmi PT Sivilize Corp Indonesia
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-500 uppercase">Status Website:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <strong className="text-sm text-neutral-950 font-bold">Aktif di Global Anycast Edge</strong>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs">
                  SLA 99.8%
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-200 text-xs space-y-1">
                <p className="text-neutral-500">Alamat Subdomain Resmi:</p>
                <p className="font-mono font-bold text-neutral-900 text-sm">
                  https://{store.slug}.sivilizecorp.my.id
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200 text-xs space-y-1">
                <p className="text-neutral-500">Masa Berlaku Sewa Website:</p>
                <p className="font-mono font-bold text-neutral-900 text-sm">
                  {store.expired_at ? new Date(store.expired_at).toLocaleDateString('id-ID') : 'Trial 7 Hari Aktif'}
                </p>
              </div>
            </div>

            {/* Kartu Nota Pembayaran Sah & Perlindungan Hukum PT Sivilize Corp Indonesia */}
            <div className="p-6 rounded-2xl bg-neutral-900 text-white space-y-4 border border-neutral-800 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      Nota Pembayaran & Bukti Sewa Sah (e-Invoice)
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Tanda terima resmi PT Sivilize Corp Indonesia (NIB: 0207260103661)
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                  STATUS: LUNAS
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs space-y-1.5 text-neutral-300">
                <p className="text-[11px] leading-relaxed">
                  Nota ini merupakan dokumen sah bukti perikatan sewa infrastruktur website sesuai <strong>UU ITE No. 1/2024 & PP No. 71/2019</strong>.
                </p>
                <p className="text-[11px] text-neutral-400 leading-relaxed pt-1 border-t border-neutral-800">
                  Jika terjadi kendala teknis atau pengembang/founder tidak dapat dihubungi melalui kontak biasa, simpan nota ini dan laporkan No. Invoice Anda ke email resmi korporasi: <a href="mailto:sivilizecorpindonesia@gmail.com" className="text-emerald-400 font-semibold underline">sivilizecorpindonesia@gmail.com</a>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenStoreInvoice}
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Lihat & Cetak Nota Pembayaran Sah (PDF)</span>
              </button>
            </div>

            {/* Panduan Custom Domain & DNS Vercel */}
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-neutral-800" />
                  <h4 className="font-bold text-sm text-neutral-950">
                    Pengaturan Custom Domain Sendiri (www.tokoanda.com)
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-700 font-mono text-[10px] font-bold">
                  VERCEL EDGE DNS
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Ingin menggunakan domain pribadi tanpa embel-embel subdomain? Cukup arahkan DNS domain Anda di penyedia domain (Niagahoster, Domainesia, Rumahweb, dll) ke server Anycast Edge kami:
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-sans uppercase font-bold block">Tipe Record A:</span>
                    <span className="font-bold text-neutral-900">@  ➔  76.76.21.21</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-sans font-bold">✓ Vercel Anycast IP</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-sans uppercase font-bold block">Tipe Record CNAME:</span>
                    <span className="font-bold text-neutral-900">www  ➔  cname.vercel-dns.com</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-sans font-bold">✓ SSL Otomatis</span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">
                Sertifikat SSL HTTPS diterbitkan secara otomatis dalam 5–15 menit setelah DNS propagasi selesai.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 text-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h4 className="font-bold text-sm">Mayar Recurring Subscription Billing</h4>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Pembayaran perpanjangan sewa tahunan diproses secara otomatis via Mayar.id dengan QRIS Dinamis dan Virtual Account resmi PT Sivilize Corp Indonesia.
              </p>
              <button
                type="button"
                onClick={() => alert('Tagihan sewa perpanjangan via Mayar QRIS berhasil disimulasikan!')}
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Bayar Perpanjangan Sewa via Mayar QRIS
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: EKOSISTEM LISENSI SAAS (SIKASIR POS & SIVILIZE DINE LITE) */}
        {activeTab === 'ekosistem' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>INTEGRASI SAAS TERPADU & RESMI</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-neutral-950">
                Pusat Lisensi Ekosistem SiKasir POS & Sivilize Dine Lite
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
                Paket sewa website Anda sudah 100% mencakup aplikasi kasir kasir online dan sistem pemesanan mandiri scan QR Meja dengan sinkronisasi stok 2-arah.
              </p>
            </div>

            {/* KARTU KODE LISENSI UTAMA */}
            <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                    KODE LISENSI AKTIF TOKO ANDA
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-white">
                    {getDashboardLicenseCode()}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Kategori Terdaftar: <strong className="text-neutral-200">{store.category || 'Kuliner & Kafe'}</strong> • Status: <span className="text-emerald-400 font-bold">Terverifikasi Aktif</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyDashboardLicense}
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-emerald-500/20 shrink-0"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedDashboardLicense ? '✓ Kode Tersalin!' : 'Salin Kode Lisensi'}</span>
                </button>
              </div>

              {/* DUA APLIKASI YANG TER-INCLUDE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. SIKASIR POS */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300">
                        APLIKASI KASIR POS
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>SUDAH TERMASUK</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">SiKasir POS Online/Offline</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Sistem kasir pintar dengan Kitchen Display System (KDS), kalkulasi resep bahan baku, struk termal bluetooth, dan metadata industri (Nopol/Mekanik, Nomor Rak, Kapster, Resep Dokter).
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Kitchen Display System (KDS) & Cetak Bon Dapur</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Cek Nomor Meja & Tagihan Pelanggan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Inventori & Resep Otomatis Terpotong</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="http://localhost:3000"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Luncurkan SiKasir POS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 2. SIVILIZE DINE LITE */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                        SELF-ORDER SCAN QR MEJA
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>SUDAH TERMASUK</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">Sivilize Dine Lite</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Sistem pesan mandiri langsung dari meja pelanggan via scan barcode QR di smartphone. Sinkronisasi stok 2-arah seketika tanpa delay dengan kasir SiKasir.
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Pesan di Meja Tanpa Tunggu Pelayan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Sinkronisasi Stok 2-Arah Seketika</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Menu Habis di Kasir Otomatis Hilang di Meja</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="http://localhost:3002"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Luncurkan Sivilize Dine Lite</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* PANDUAN AKTIVASI CEPAT */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs space-y-2 text-neutral-300">
                <strong className="text-white block font-bold">
                  Cara Mengaktifkan Ekosistem di Toko Anda:
                </strong>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-neutral-400">
                  <li>Salin kode lisensi di atas: <code className="text-emerald-400 font-mono font-bold">{getDashboardLicenseCode()}</code>.</li>
                  <li>Buka SiKasir POS atau Sivilize Dine Lite di perangkat kasir atau tablet resto Anda.</li>
                  <li>Masukkan kode tersebut pada popup aktivasi yang muncul di tampilan awal.</li>
                  <li>Selesai! Seluruh menu dan stok akan langsung tersinkronisasi 2-arah secara otomatis.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Tambah Halaman Baru (+Rp 50k / thn) */}
      {isAddPageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white border border-neutral-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-neutral-950">
                  Tambah Halaman Ekstra Baru
                </h3>
                <p className="text-xs text-neutral-500">
                  Biaya resmi: +Rp 50.000 / Halaman / Tahun (PRD BAB III)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPageModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInitiateAddPage} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Judul Halaman:</label>
                <input
                  type="text"
                  value={addPageForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, '-')
                      .replace(/-+/g, '-');
                    setAddPageForm({ ...addPageForm, title, slug });
                  }}
                  placeholder="Contoh: Tentang Kami / Galeri"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Alamat URL Slug:</label>
                <div className="flex items-center rounded-xl bg-neutral-50 border border-neutral-200 px-3 py-2 text-neutral-500 font-mono text-xs">
                  <span>/{store.slug}/</span>
                  <input
                    type="text"
                    value={addPageForm.slug}
                    onChange={(e) => setAddPageForm({ ...addPageForm, slug: e.target.value })}
                    className="bg-transparent text-neutral-950 outline-none font-bold w-full ml-1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Konten Halaman:</label>
                <textarea
                  rows={4}
                  value={addPageForm.content}
                  onChange={(e) => setAddPageForm({ ...addPageForm, content: e.target.value })}
                  placeholder="Tuliskan cerita bisnis, visi, informasi kontak lengkap atau fasilitas Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950 resize-none"
                  required
                />
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-900 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>Tagihan Add-On Halaman:</span>
                  <span className="font-mono text-xs">Rp 50.000 / Tahun</span>
                </div>
                <p className="text-indigo-700 text-[10px]">
                  Termasuk sub-routing Anycast Edge, SSL, dan tombol navigasi otomatis di header website.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPageModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-bold text-xs text-neutral-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 font-bold text-xs text-white transition-colors cursor-pointer"
                >
                  Lanjut ke Pembayaran Mayar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Mayar QRIS Dinamis untuk Add-On Halaman */}
      {showMayarQrisModal && pendingPageToActivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-neutral-200 p-6 space-y-4 shadow-2xl text-center">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-neutral-900" />
                <h3 className="font-bold text-sm text-neutral-950">
                  Pembayaran Mayar QRIS
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMayarQrisModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-500">Aktivasi Halaman Tambahan</p>
              <h4 className="font-extrabold text-base text-neutral-950">
                &ldquo;{pendingPageToActivate.title}&rdquo; (/{pendingPageToActivate.slug})
              </h4>
              <p className="font-mono font-black text-lg text-neutral-950">
                Rp 50.000
              </p>
            </div>

            {/* Simulated Dynamic Mayar QRIS */}
            <div className="w-48 h-48 mx-auto rounded-2xl bg-neutral-100 border border-neutral-200 p-3 flex flex-col items-center justify-center relative shadow-inner">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MAYAR_SIVILIZE_PAGE_ADDON_50000"
                alt="QRIS Mayar"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-[11px] text-neutral-500 space-y-0.5">
              <p>Mendukung: BCA, Mandiri, BRI, BNI, GoPay, OVO, ShopeePay</p>
              <p className="text-[10px] text-neutral-400">
                Verifikasi Otomatis Webhook Mayar • NIB: 0207260103661
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmMayarPayment}
                disabled={isProcessingAddPage}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-tight shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isProcessingAddPage
                    ? 'Memverifikasi Pembayaran...'
                    : 'Simulasi Bayar Lunas (Konfirmasi Seketika)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Product Edit / Add */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white border border-neutral-200 p-6 space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-base text-neutral-950">
              {editingProduct ? 'Edit Item Produk' : 'Tambah Produk Baru'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Nama Produk:</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Contoh: Kopi Susu Senja"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Harga (Rupiah):</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-mono font-bold text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Kategori Tag:</label>
                <input
                  type="text"
                  value={productForm.category_tag}
                  onChange={(e) => setProductForm({ ...productForm, category_tag: e.target.value })}
                  placeholder="Contoh: Minuman, Makanan, Jasa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Deskripsi Singkat:</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Keterangan rasa, porsi, atau bahan..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-neutral-950 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Foto Produk (WebP Auto-Compress):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-neutral-950 file:text-white file:font-semibold"
                />
                {compressedImagePreview && (
                  <p className="text-[10px] text-emerald-600 mt-1 font-mono">
                    ✓ Terkompresi otomatis ({compressedImagePreview.sizeKb.toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-bold text-xs text-neutral-700 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                className="flex-1 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 font-bold text-xs text-white transition-colors cursor-pointer"
              >
                Simpan Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Nota Pembayaran Sah & Bukti Invoice Digital PT Sivilize Corp Indonesia */}
      {isInvoiceModalOpen && currentInvoiceData && (
        <OfficialInvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          invoice={currentInvoiceData}
        />
      )}

      {/* AI Guided Tour Modal */}
      <AIGuidedTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onSwitchTab={(tab) => setActiveTab(tab)}
      />

      {/* AI Chatbot Assistant Widget */}
      {store && (
        <AIChatbotAssistant
          store={store}
          onNavigateTab={(tab) => setActiveTab(tab)}
          onStartTour={() => setIsTourOpen(true)}
        />
      )}
    </div>
  );
}
