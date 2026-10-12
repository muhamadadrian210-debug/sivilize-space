'use client';

import React from 'react';
import type { Store, Product } from '@/types/database';
import { CatalogTemplate } from './templates/CatalogTemplate';
import { ServiceTemplate } from './templates/ServiceTemplate';
import { ProfileTemplate } from './templates/ProfileTemplate';

interface StorefrontViewProps {
  store: Store;
  products: Product[];
}

export function StorefrontView({ store, products }: StorefrontViewProps) {
  // Switch layout sesuai Master Template pilihan tenant (BAB XII.1)
  switch (store.template_type) {
    case 'layanan':
      return <ServiceTemplate store={store} products={products} />;
    case 'profil':
      return <ProfileTemplate store={store} products={products} />;
    case 'katalog':
    default:
      return <CatalogTemplate store={store} products={products} />;
  }
}
