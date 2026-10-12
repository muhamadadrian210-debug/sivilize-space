import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Store, Product } from '@/types/database';
import { StorefrontView } from '@/components/storefront/StorefrontView';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ domain: string }>;
}

export default async function CustomDomainStorePage({ params }: PageProps) {
  const { domain } = await params;

  if (!domain) {
    notFound();
  }

  // Fetch store by custom_domain from Supabase
  const { data, error: storeError } = await supabase
    .from('stores')
    .select('*')
    .eq('custom_domain', domain)
    .maybeSingle();

  const store = data as Store | null;

  if (storeError || !store) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Domain {domain} Belum Dikonfigurasi
        </h1>
        <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
          Domain ini belum tersambung ke toko aktif manapun di SivilizeSpace.
        </p>
      </div>
    );
  }

  if (!store.is_active) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Toko Sedang Tidak Aktif
        </h1>
        <p className="text-slate-400 max-w-md text-sm mb-6">
          Masa aktif langganan toko ini telah habis. Silakan hubungi pemilik toko.
        </p>
      </div>
    );
  }

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
