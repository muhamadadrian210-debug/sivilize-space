'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Store, Product } from '@/types/database';
import { formatRupiah, generateWhatsAppOrderUrl } from '@/lib/utils';
import {
  ShoppingBag,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  X,
  Plus,
  Minus,
  Search,
  Check,
  Flame,
  Coffee,
} from 'lucide-react';

interface CatalogTemplateProps {
  store: Store;
  products: Product[];
}

interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
  notes?: string;
}

export function CatalogTemplate({ store, products }: CatalogTemplateProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerNotes, setCustomerNotes] = useState('');

  // Ekstrak kategori unik
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category_tag) set.add(p.category_tag);
    });
    return ['Semua', ...Array.from(set)];
  }, [products]);

  // Filter produk berdasarkan kategori & pencarian
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'Semua' || p.category_tag === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description &&
          p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Kalkulasi keranjang
  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalAmount = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      const newQty = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [product.id]: { product, quantity: newQty },
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
  };

  const handleCheckoutWhatsApp = () => {
    if (totalItems === 0) return;
    const items = Object.values(cart).map((item) => ({
      name: item.product.name + (item.variant ? ` (${item.variant})` : ''),
      quantity: item.quantity,
      price: item.product.price,
    }));
    const url = generateWhatsAppOrderUrl(
      store.owner_phone,
      store.store_name,
      items,
      totalAmount,
      customerNotes
    );
    window.open(url, '_blank');
  };

  // Konfigurasi Grid & Kolom Dinamis sesuai pilihan Penyewa
  const getGridColsClass = () => {
    const desktop = store.layout_config?.grid_columns_desktop || 3;
    const mobile = store.layout_config?.grid_columns_mobile || 1;
    const spacing = store.layout_config?.spacing || 'normal';

    let cols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    if (desktop === 2) {
      cols = mobile === 2 ? 'grid-cols-2 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2';
    } else if (desktop === 4) {
      cols = mobile === 2 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    } else if (desktop === 'list') {
      cols = 'grid-cols-1 max-w-2xl mx-auto';
    } else {
      cols = mobile === 2 ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }

    let gap = 'gap-4';
    if (spacing === 'compact') gap = 'gap-2.5';
    if (spacing === 'spacious') gap = 'gap-6';

    return `grid ${cols} ${gap}`;
  };

  const getCardStyleClass = () => {
    const style = store.layout_config?.card_style || 'border';
    if (style === 'shadow') return 'rounded-2xl shadow-md border-0 bg-[var(--theme-card)]';
    if (style === 'flat') return 'rounded-2xl border-0 bg-[var(--theme-card)]/75';
    return 'rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)]';
  };

  const getTextAlignClass = () => {
    const align = store.layout_config?.text_alignment;
    if (align === 'center') return 'text-center items-center justify-center';
    if (align === 'right') return 'text-right items-end justify-end';
    return 'text-left items-start';
  };

  const getHeadingSizeClass = () => {
    const size = store.layout_config?.heading_size;
    if (size === 'huge') return 'text-3xl sm:text-5xl';
    if (size === 'large') return 'text-2xl sm:text-4xl';
    if (size === 'small') return 'text-lg sm:text-2xl';
    return 'text-2xl sm:text-3xl';
  };

  const getButtonStyleClass = () => {
    const btn = store.layout_config?.button_style;
    if (btn === 'pill') return 'rounded-full px-4';
    if (btn === 'sharp') return 'rounded-none px-3';
    if (btn === 'block') return 'w-full rounded-xl text-center block';
    return 'rounded-xl px-3';
  };

  const isListView = store.layout_config?.grid_columns_desktop === 'list';
  const customPages = store.custom_pages?.filter((p) => p.is_published) || [];
  const [activeCustomPageSlug, setActiveCustomPageSlug] = useState<string | null>(null);
  const activeCustomPage = customPages.find((p) => p.slug === activeCustomPageSlug);

  return (
    <div
      data-theme={store.theme_id || 'warm-cafe'}
      className="min-h-screen mobile-dvh bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col font-sans selection:bg-[var(--theme-accent)] selection:text-white relative"
    >
      {/* Background Image Layer from Custom Rakitan */}
      {store.layout_config?.background_image && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${store.layout_config.background_image})`,
            opacity: (store.layout_config.background_opacity ?? 80) / 100,
            filter: `blur(${store.layout_config.background_blur ?? 0}px)`,
          }}
        />
      )}

      {/* 1. Header & Hero Banner */}
      <header className="relative z-10 w-full border-b border-[var(--theme-border)] bg-[var(--theme-card)]/90 backdrop-blur-md">
        {store.banner_url ? (
          <div className="w-full h-44 sm:h-60 overflow-hidden relative">
            <img
              src={store.banner_url}
              alt={store.store_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-card)] via-transparent to-black/30" />
          </div>
        ) : (
          <div className="w-full h-28 bg-gradient-to-r from-[var(--theme-accent)]/20 via-[var(--theme-card)] to-[var(--theme-accent)]/10" />
        )}

        <div className="max-w-4xl mx-auto px-4 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className={`flex-1 flex flex-col ${getTextAlignClass()}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Buka Sekarang
                </span>
                <span className="text-xs font-semibold opacity-70">
                  • {store.category || 'Kuliner & Kafe'}
                </span>
              </div>
              <h1 className={`${getHeadingSizeClass()} font-black tracking-tight`}>
                {store.store_name}
              </h1>
              {store.description && (
                <p className="mt-1.5 text-xs sm:text-sm opacity-80 max-w-xl leading-relaxed">
                  {store.description}
                </p>
              )}
            </div>

            {/* Quick Badges: Jam Buka & Lokasi */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {store.opening_hours && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>{store.opening_hours}</span>
                </div>
              )}
              {store.address && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span className="max-w-[200px] truncate">{store.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Custom Pages Tabs (+Rp 50k Add-On) */}
          {customPages.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[var(--theme-border)] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveCustomPageSlug(null)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCustomPageSlug === null
                    ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                    : 'bg-[var(--theme-bg)] border border-[var(--theme-border)] opacity-80 hover:opacity-100'
                }`}
              >
                Katalog Menu
              </button>
              {customPages.map((pg) => (
                <button
                  key={pg.id}
                  type="button"
                  onClick={() => setActiveCustomPageSlug(pg.slug)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCustomPageSlug === pg.slug
                      ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                      : 'bg-[var(--theme-bg)] border border-[var(--theme-border)] opacity-80 hover:opacity-100'
                  }`}
                >
                  {pg.title}
                </button>
              ))}
            </div>
          )}

          {/* Search Box */}
          {activeCustomPageSlug === null && (
            <div className="mt-4 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari menu favorit Anda..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all"
              />
            </div>
          )}
        </div>
      </header>

      {/* KONTEN UTAMA: HALAMAN KUSTOM ATAU KATALOG MENU */}
      {activeCustomPage ? (
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:px-6">
          <div className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">{activeCustomPage.title}</h2>
            <div className="prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed opacity-90 whitespace-pre-line">
              {activeCustomPage.content}
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--theme-border)] flex justify-between items-center text-xs opacity-60">
              <span>Halaman resmi {store.store_name}</span>
              <button
                type="button"
                onClick={() => setActiveCustomPageSlug(null)}
                className="font-bold underline hover:opacity-100 cursor-pointer"
              >
                ← Kembali ke Katalog Menu
              </button>
            </div>
          </div>
        </main>
      ) : (
        <>
          {/* 2. Filter Kategori Tab */}
          <nav className="sticky top-0 z-20 backdrop-blur-xl bg-[var(--theme-bg)]/90 border-b border-[var(--theme-border)]">
            <div className="max-w-4xl mx-auto px-4 py-2.5 sm:px-6 overflow-x-auto no-scrollbar flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[var(--theme-accent)] text-white shadow-md'
                      : 'bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text)] opacity-80 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </nav>

          {/* 3. Grid Menu Katalog */}
          <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:px-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 opacity-60">
                <Coffee className="w-12 h-12 mx-auto mb-3 opacity-40 animate-pulse" />
                <p className="text-sm font-medium">Tidak ada menu yang sesuai.</p>
              </div>
            ) : (
          <div className={getGridColsClass()}>
            {filteredProducts.map((product) => {
              const qtyInCart = cart[product.id]?.quantity || 0;

              // Tampilan List Baris (1 Kolom - Format Menu Restoran / Jasa)
              if (isListView) {
                return (
                  <div
                    key={product.id}
                    className={`${getCardStyleClass()} p-4 flex items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all group`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-[var(--theme-bg)] border border-[var(--theme-border)]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-center shrink-0">
                          <Coffee className="w-6 h-6 opacity-30 text-[var(--theme-accent)]" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--theme-bg)] text-[var(--theme-text)] border border-[var(--theme-border)]">
                          {product.category_tag}
                        </span>
                        <h3 className="font-extrabold text-sm sm:text-base mt-1 truncate">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs opacity-75 line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        )}
                        <p className="font-black text-sm text-[var(--theme-accent)] mt-1">
                          {formatRupiah(product.price)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {product.is_available ? (
                        qtyInCart > 0 ? (
                          <div className="flex items-center gap-2 bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded-full px-2 py-1 shadow-xs">
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--theme-card)] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => addToCart(product)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--theme-card)] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--theme-accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" /> Pesan
                          </button>
                        )
                      ) : (
                        <span className="text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                          Habis
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              // Tampilan Grid Multi-Kolom (2, 3, atau 4 Kolom)
              return (
                <div
                  key={product.id}
                  className={`${getCardStyleClass()} p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group`}
                >
                  {product.image_url ? (
                    <div className="w-full h-44 rounded-xl overflow-hidden mb-3 bg-[var(--theme-bg)] relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                        {product.category_tag}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-24 rounded-xl mb-3 bg-[var(--theme-bg)] flex items-center justify-center border border-[var(--theme-border)]">
                      <Coffee className="w-8 h-8 opacity-25 text-[var(--theme-accent)]" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-extrabold text-sm sm:text-base line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                    {product.description && (
                      <p className="text-xs opacity-75 line-clamp-2 mb-3 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[var(--theme-border)] mt-2">
                    <span className="font-black text-sm sm:text-base text-[var(--theme-accent)]">
                      {formatRupiah(product.price)}
                    </span>

                    {product.is_available ? (
                      qtyInCart > 0 ? (
                        <div className="flex items-center gap-2 bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded-full px-2 py-1 shadow-xs">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--theme-card)] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {qtyInCart}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--theme-card)] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--theme-accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Pesan
                        </button>
                      )
                    ) : (
                      <span className="text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                        Habis
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
        </>
      )}

      {/* 4. Sticky Floating Cart (Ergonomi Mobile 100dvh) */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-30 px-4 max-w-md mx-auto pointer-events-none">
          <div className="pointer-events-auto rounded-2xl bg-[var(--theme-accent)] text-white p-3.5 shadow-2xl flex items-center justify-between border border-white/20 backdrop-blur-md">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
                {totalItems}
              </div>
              <div>
                <p className="text-[11px] opacity-90 font-medium">Total Pesanan</p>
                <p className="font-extrabold text-sm sm:text-base leading-tight">
                  {formatRupiah(totalAmount)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-[var(--theme-accent)] font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Lihat Rincian Pesanan</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)] mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="font-black text-base">Rincian Pesanan Mandiri</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
              {Object.values(cart).map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{item.product.name}</p>
                    <p className="text-xs text-[var(--theme-accent)] font-bold">
                      {formatRupiah(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-6 h-6 rounded-full border border-[var(--theme-border)] flex items-center justify-center text-xs cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item.product)}
                      className="w-6 h-6 rounded-full border border-[var(--theme-border)] flex items-center justify-center text-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <label className="block text-xs font-semibold opacity-80 mb-1">
                  Catatan untuk Penjual (Opsional):
                </label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Contoh: Es sedikit gula, sambal dipisah, minta sedotan..."
                  className="w-full text-xs rounded-xl p-3 bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] resize-none h-16"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--theme-border)] mt-2">
              <div className="flex items-center justify-between mb-3 text-sm">
                <span className="opacity-80">Total Tagihan:</span>
                <span className="font-black text-lg text-[var(--theme-accent)]">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Pesanan ke WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Footer Legal */}
      <footer className="mt-auto py-6 border-t border-[var(--theme-border)] bg-[var(--theme-card)]/50 text-center text-xs opacity-75">
        <p>
          Didukung oleh{' '}
          <Link
            href="/"
            className="font-bold text-[var(--theme-accent)] hover:underline"
          >
            SivilizeSpace
          </Link>{' '}
          — Divisi SiWeb Production, PT Sivilize Corp Indonesia
        </p>
      </footer>
    </div>
  );
}
