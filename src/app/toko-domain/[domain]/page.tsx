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
          Domain ini belum tersambung ke website aktif manapun di Sivilize Space.
        </p>
      </div>
    );
  }

  if (!store.is_active) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Website Sedang Tidak Aktif
        </h1>
        <p className="text-slate-400 max-w-md text-sm mb-6">
          Masa aktif sewa website ini telah habis. Silakan hubungi pemilik website.
        </p>
      </div>
    );
  }

  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .order('display_order', { ascending: true });

  const productMeta = (store.layout_config as any)?.product_meta || {};
  const products = (productsData || []).map((p: any) => {
    const meta = productMeta[p.id] || {};
    const stock = p.stock !== undefined && p.stock !== null ? Number(p.stock) : (meta.stock !== undefined ? Number(meta.stock) : 10);
    const barcode = p.barcode || meta.barcode || null;
    const sku = p.sku || meta.sku || null;

    return {
      ...p,
      stock,
      barcode,
      sku,
      is_available: stock <= 0 ? false : (p.is_available ?? true),
    } as Product;
  });

  return (
    <StorefrontView
      store={store}
      products={products}
    />
  );
}
