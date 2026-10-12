import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Store, Product } from '@/types/database';
import { StorefrontView } from '@/components/storefront/StorefrontView';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TenantStorePage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  // Fetch store data from Supabase PostgreSQL
  const { data, error: storeError } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  const store = data as Store | null;

  if (storeError || !store) {
    // Render Fallback Not Found Page for Tenant
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6">
          <span className="text-3xl">🏪</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Website &quot;{slug}&quot; Belum Terdaftar
        </h1>
        <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
          Nama website bisnis ini masih tersedia! Anda bisa menyewa website instan Anda di Sivilize Space sekarang.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-transform"
        >
          Sewa Website Sendiri di Sivilize Space
        </Link>
      </div>
    );
  }

  // Cek status aktif website (Masa tenggang / suspended)
  if (!store.is_active) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
          <span className="text-3xl">⏳</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Website Sedang Tidak Aktif
        </h1>
        <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
          Masa aktif sewa website ini sedang dalam masa tenggang atau nonaktif sementara. Silakan hubungi pemilik website.
        </p>
      </div>
    );
  }

  // Fetch products for this active store
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .order('display_order', { ascending: true });

  const products = (productsData || []) as Product[];

  return (
    <StorefrontView
      store={store}
      products={products}
    />
  );
}
