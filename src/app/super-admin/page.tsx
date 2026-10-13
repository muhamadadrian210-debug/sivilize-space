'use client';

import React, { useState, useEffect } from 'react';
import type { Store, SecurityBlacklist } from '@/types/database';
import {
  ShieldAlert,
  ShieldCheck,
  Store as StoreIcon,
  Search,
  ExternalLink,
  Power,
  CalendarPlus,
  Trash2,
  Lock,
  LogOut,
  RefreshCw,
  Layers,
  Radio,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export default function SuperAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('ceo');
  const [masterKey, setMasterKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [stores, setStores] = useState<Store[]>([]);
  const [stats, setStats] = useState({
    total_stores: 0,
    active_stores: 0,
    suspended_stores: 0,
    total_products: 0,
    security_alerts: 0,
  });
  const [blacklistLogs, setBlacklistLogs] = useState<SecurityBlacklist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const fetchDashboardData = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/super-admin/stores');
      if (res.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('sivilize_super_admin_logged');
        return;
      }
      const data = await res.json();
      if (data.stores) {
        setStores(data.stores);
        setStats(data.stats);
        setBlacklistLogs(data.blacklist_logs || []);
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingData(false);
    }
  };

  // Auto check login session in localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('sivilize_super_admin_logged');
      if (saved === 'true') {
        setIsAuthenticated(true);
        fetchDashboardData();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (overrideKey?: string) => {
    setIsLoggingIn(true);
    setAuthError('');
    setActionMessage('');

    try {
      const keyToUse = overrideKey || masterKey;
      const res = await fetch('/api/super-admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, master_key: keyToUse }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Autentikasi gagal.');
        setIsLoggingIn(false);
        return;
      }

      setIsAuthenticated(true);
      localStorage.setItem('sivilize_super_admin_logged', 'true');
      fetchDashboardData();
    } catch {
      setAuthError('Koneksi ke backend terganggu.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/super-admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    localStorage.removeItem('sivilize_super_admin_logged');
  };

  // Emergency Kill-Switch Toggle
  const handleToggleKillSwitch = async (store: Store) => {
    const confirmText = store.is_active
      ? `PERINGATAN: Anda yakin ingin me-nonaktifkan (SUSPEND) website "${store.store_name}" secara darurat? Website akan langsung mati dari publik!`
      : `Aktifkan kembali website "${store.store_name}"?`;

    if (!confirm(confirmText)) return;

    try {
      const res = await fetch('/api/super-admin/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_kill_switch', store_id: store.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(data.message);
        fetchDashboardData();
      } else {
        alert(data.error || 'Gagal mengubah status website.');
      }
    } catch {
      alert('Terjadi kesalahan koneksi.');
    }
  };

  // Manual Subscription Extension
  const handleExtendSubscription = async (store: Store, days: number) => {
    if (!confirm(`Perpanjang masa sewa website "${store.store_name}" selama +${days} hari?`)) return;

    try {
      const res = await fetch('/api/super-admin/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'extend_subscription',
          store_id: store.id,
          days_to_add: days,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(data.message);
        fetchDashboardData();
      } else {
        alert(data.error || 'Gagal memperpanjang masa sewa.');
      }
    } catch {
      alert('Terjadi kesalahan koneksi.');
    }
  };

  // Delete Store
  const handleDeleteStore = async (store: Store) => {
    if (!confirm(`HAPUS PERMANEN: Website "${store.store_name}" beserta seluruh datanya akan dihapus permanen dari Supabase. Lanjutkan?`)) return;

    try {
      const res = await fetch('/api/super-admin/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_store', store_id: store.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(`Website "${store.store_name}" berhasil dihapus.`);
        fetchDashboardData();
      } else {
        alert(data.error || 'Gagal menghapus website.');
      }
    } catch {
      alert('Terjadi kesalahan koneksi.');
    }
  };

  const filteredStores = stores.filter((s) => {
    const matchesSearch =
      s.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.owner_phone.includes(searchQuery);

    if (statusFilter === 'active') return matchesSearch && s.is_active;
    if (statusFilter === 'suspended') return matchesSearch && !s.is_active;
    return matchesSearch;
  });

  // 1. TAMPILAN LOGIN MASTER SUPER ADMIN (JIKA BELUM LOGIN)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-neutral-100 flex items-center justify-center p-4 font-sans selection:bg-rose-500 selection:text-white">
        <div className="w-full max-w-md rounded-3xl bg-neutral-900 border border-neutral-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500" />

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 mx-auto flex items-center justify-center shadow-inner mb-4">
              <ShieldAlert className="w-7 h-7 text-rose-400" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              SUPER ADMIN COCKPIT
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              PT Sivilize Corp Indonesia • Khusus Akses CEO / Founder
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase">
                Username Operator:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ceo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase">
                Master Security Key:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  placeholder="Ketik Master Key..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white font-mono text-xs tracking-wider focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleLogin()}
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-rose-950/50 mt-2"
            >
              {isLoggingIn ? 'Memverifikasi Hak Akses...' : 'Otorisasi Masuk Cockpit'}
            </button>

            {/* Quick Demo Master Access button */}
            <div className="pt-4 border-t border-neutral-800/80">
              <button
                type="button"
                onClick={() => {
                  setMasterKey('sivilize-ceo-master-2026');
                  handleLogin('sivilize-ceo-master-2026');
                }}
                className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-mono font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>🔑 Masuk Otomatis Sebagai CEO (Default Master Key)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD SUPER ADMIN AKTIF (LOGGED IN)
  return (
    <div className="min-h-screen bg-[#070A0F] text-neutral-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-rose-600/30">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-white uppercase font-mono">
                  SIVILIZE SUPER ADMIN
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-mono font-bold">
                  CEO OVERRIDE
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                PT Sivilize Corp Indonesia • NIB: 0207260103661
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchDashboardData}
              disabled={isLoadingData}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-rose-950 hover:text-rose-300 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* Action Alert Banner */}
        {actionMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{actionMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionMessage('')}
              className="text-emerald-400 font-bold hover:underline"
            >
              Tutup
            </button>
          </div>
        )}

        {/* 1. Platform Executive Metrics */}
        <section className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">Total Website</span>
            <p className="text-3xl font-black text-white font-mono mt-1">{stats.total_stores}</p>
            <span className="text-[10px] text-neutral-500 mt-2">Seluruh ekosistem WaaS</span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-emerald-400 uppercase">Website Aktif (Live)</span>
            <p className="text-3xl font-black text-emerald-300 font-mono mt-1">{stats.active_stores}</p>
            <span className="text-[10px] text-emerald-500 mt-2">Anycast Edge Aktif</span>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-rose-400 uppercase">Website Suspended</span>
            <p className="text-3xl font-black text-rose-300 font-mono mt-1">{stats.suspended_stores}</p>
            <span className="text-[10px] text-rose-500 mt-2">Dinonaktifkan / Expired</span>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">Total Produk</span>
            <p className="text-3xl font-black text-white font-mono mt-1">{stats.total_products}</p>
            <span className="text-[10px] text-neutral-500 mt-2">Katalog seluruh tenant</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono text-amber-400 uppercase">SIEM Alerts</span>
            <p className="text-3xl font-black text-amber-300 font-mono mt-1">{stats.security_alerts}</p>
            <span className="text-[10px] text-amber-500 mt-2">Bot Honeypot Terjerat</span>
          </div>
        </section>

        {/* 2. Tenant Control Center (Daftar Seluruh Website) */}
        <section className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-white">Manajemen Website Penyewa (Tenants)</h2>
              <p className="text-xs text-neutral-400">
                Kontrol hak tayang, perpanjangan sewa manual, dan tombol darurat pemblokiran website
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari website / slug / HP..."
                  className="pl-9 pr-3.5 py-1.5 rounded-xl bg-black border border-neutral-800 text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-56 font-mono"
                />
              </div>

              <div className="flex items-center bg-black rounded-xl p-0.5 border border-neutral-800 text-xs">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'all' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                  }`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'active' ? 'bg-emerald-950 text-emerald-300' : 'text-neutral-400'
                  }`}
                >
                  Aktif
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('suspended')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'suspended' ? 'bg-rose-950 text-rose-300' : 'text-neutral-400'
                  }`}
                >
                  Suspended
                </button>
              </div>
            </div>
          </div>

          {/* Stores Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/60 text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-800">
                <tr>
                  <th className="p-4 pl-6">Nama Bisnis & Subdomain</th>
                  <th className="p-4">Kategori & Template</th>
                  <th className="p-4">Lisensi Ekosistem</th>
                  <th className="p-4">Kontak Pemilik</th>
                  <th className="p-4">Masa Berlaku Sewa</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Aksi Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-sans">
                {filteredStores.map((store) => {
                  const isExpired = store.expired_at ? new Date(store.expired_at) < new Date() : false;
                  const licenseCode =
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
                      : 'SIV-RETAIL-365D');

                  return (
                    <tr key={store.id} className="hover:bg-neutral-800/30 transition-colors">
                      {/* Store Name & Domain */}
                      <td className="p-4 pl-6">
                        <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                          <span>{store.store_name}</span>
                          <a
                            href={`/toko/${store.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-500 hover:text-white"
                            title="Kunjungi website publik"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {store.slug}.sivilizecorp.my.id
                        </span>
                      </td>

                      {/* Category & Template */}
                      <td className="p-4">
                        <p className="font-semibold text-neutral-200">{store.category}</p>
                        <span className="text-[10px] font-mono text-neutral-500 capitalize">
                          Tpl: {store.template_type} • {store.theme_id}
                        </span>
                      </td>

                      {/* Ecosystem License Code */}
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-[11px]">
                          {licenseCode}
                        </span>
                        <span className="block text-[10px] text-neutral-500 mt-1">
                          SiKasir & Dine Lite
                        </span>
                      </td>

                      {/* Owner Phone */}
                      <td className="p-4 font-mono text-neutral-300">
                        <a
                          href={`https://wa.me/${store.owner_phone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline hover:text-emerald-400"
                        >
                          {store.owner_phone}
                        </a>
                      </td>

                      {/* Expiration */}
                      <td className="p-4 font-mono text-xs">
                        {store.expired_at ? (
                          <div>
                            <p className={isExpired ? 'text-rose-400 font-bold' : 'text-neutral-300'}>
                              {new Date(store.expired_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                            <span className="text-[10px] text-neutral-500">
                              {isExpired ? 'Kadaluarsa' : 'Aktif Berbayar'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-neutral-500">Belum diset</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {store.is_active ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold font-mono">
                            LIVE
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold font-mono">
                            SUSPENDED
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Emergency Kill Switch */}
                          <button
                            type="button"
                            onClick={() => handleToggleKillSwitch(store)}
                            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              store.is_active
                                ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800'
                                : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                            }`}
                            title={store.is_active ? 'Matikan Website Seketika' : 'Aktifkan Website'}
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase font-mono">
                              {store.is_active ? 'Kill-Switch' : 'Aktifkan'}
                            </span>
                          </button>

                          {/* Extend Subscription (+30 Hari) */}
                          <button
                            type="button"
                            onClick={() => handleExtendSubscription(store, 30)}
                            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer text-[10px] font-mono font-bold flex items-center gap-1"
                            title="Tambah Masa Sewa +30 Hari (1 Bulan)"
                          >
                            <CalendarPlus className="w-3.5 h-3.5 text-indigo-400" />
                            <span>+30H</span>
                          </button>

                          {/* Extend Subscription (+365 Hari) */}
                          <button
                            type="button"
                            onClick={() => handleExtendSubscription(store, 365)}
                            className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition-colors cursor-pointer text-[10px] font-mono font-bold flex items-center gap-1"
                            title="Tambah Masa Sewa +365 Hari (1 Tahun Penuh)"
                          >
                            <CalendarPlus className="w-3.5 h-3.5 text-emerald-400" />
                            <span>+365H</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteStore(store)}
                            className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-950 hover:text-rose-400 text-neutral-400 transition-colors cursor-pointer"
                            title="Hapus Website Permanen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. SIEM Blacklist Honeypot Logs */}
        <section className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-sm text-white">
                SIEM Blacklist & Honeypot Trap Logs (PT Sivilize Zero Trust)
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Total {blacklistLogs.length} Terjerat
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {blacklistLogs.length === 0 ? (
              <p className="text-neutral-500 py-4 text-center">Belum ada aktivitas bot ilegal terdeteksi.</p>
            ) : (
              blacklistLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-black/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-neutral-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                      Layer {log.triggered_firewall_layer}
                    </span>
                    <span className="font-bold text-white">{log.violation_type}</span>
                    <span className="text-neutral-400">{log.ip_address || 'IP Unknown'}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    {log.banned_at ? new Date(log.banned_at).toLocaleString('id-ID') : '-'}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
