import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { parseLicenseMetadata } from '@/lib/ecosystem-license';
import type { Store, Product, TableConfig } from '@/types/database';

export const dynamic = 'force-dynamic';

/**
 * -----------------------------------------------------------------------------
 * ENTERPRISE INBOUND 2-WAY SYNC WEBHOOK (SIKASIR POS & SIVILIZE DINE LITE)
 * PT SIVILIZE CORP INDONESIA — EKOSISTEM WAAS TERPADU
 * -----------------------------------------------------------------------------
 * Endpoint resmi penghubung mesin kasir offline (SiKasir POS) dan QR Meja (Dine Lite)
 * ke database cloud website secara dua arah seketika (real-time 2-way sync).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { license_key, app, action, items, transaction, table } = body;

    if (!license_key || typeof license_key !== 'string' || license_key.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Kunci Lisensi Ekosistem wajib disertakan.' },
        { status: 400 }
      );
    }

    const cleanKey = license_key.trim().toUpperCase();

    // 1. Verifikasi Toko Pemilik Lisensi
    const { data: storeData, error: storeError } = await supabaseAdmin
      .from('stores')
      .select('*')
      .or(`ecosystem_license_code.eq.${cleanKey},layout_config->>ecosystem_license_code.eq.${cleanKey}`)
      .maybeSingle();

    let store = storeData as Store | null;

    if (!store) {
      const { data: allStores } = await supabaseAdmin
        .from('stores')
        .select('*')
        .eq('is_active', true)
        .limit(20);

      store = (allStores as Store[] || []).find((s) => {
        const sCode = s.ecosystem_license_code || (s.layout_config as Record<string, any>)?.ecosystem_license_code;
        return sCode && sCode.toUpperCase() === cleanKey;
      }) || null;
    }

    if (storeError || !store) {
      return NextResponse.json(
        { success: false, error: 'Kunci lisensi tidak valid atau tidak terdaftar di sistem Sivilize Space.' },
        { status: 404 }
      );
    }

    if (!store.is_active) {
      return NextResponse.json(
        { success: false, error: `Sewa website "${store.store_name}" sedang nonaktif/tenggang. Silakan perpanjang sewa.` },
        { status: 403 }
      );
    }

    const metadata = parseLicenseMetadata(cleanKey, store.category);

    // 2. Proteksi Hak Akses Ekosistem: Non-Makanan Dilarang Masuk ke Dine Lite
    if (app === 'sivilize_dine_lite' && !metadata.isFoodBusiness) {
      return NextResponse.json(
        {
          success: false,
          error: `Usaha Anda (${store.category}) adalah kategori Non-Makanan dan tidak memiliki hak akses Sivilize Dine Lite (QR Meja). Gunakan SiKasir POS.`,
          allowed_apps: metadata.allowedApps,
        },
        { status: 403 }
      );
    }

    const currentConfig = (store.layout_config as any) || {};
    const productMeta = currentConfig.product_meta || {};
    let configModified = false;

    // 3. HANDLER ACTION: SYNC_STOCK (Update/Kurangi Stok Fisik dari Kasir)
    if (action === 'sync_stock' && Array.isArray(items)) {
      const updatedList = [];

      for (const item of items) {
        let targetId = item.product_id;

        // Jika dikirim via barcode scanner, cari ID produk berdasarkan barcode
        if (!targetId && item.barcode) {
          const { data: foundByBarcode } = await supabaseAdmin
            .from('products')
            .select('id')
            .eq('store_id', store.id)
            .eq('barcode', item.barcode)
            .maybeSingle();

          if (foundByBarcode) {
            targetId = foundByBarcode.id;
          } else {
            // Cari di productMeta
            for (const [pId, metaVal] of Object.entries(productMeta) as [string, any][]) {
              if (metaVal.barcode && metaVal.barcode === item.barcode) {
                targetId = pId;
                break;
              }
            }
          }
        }

        if (!targetId) continue;

        // Hitung stok baru
        let finalStock = item.new_stock !== undefined ? Number(item.new_stock) : undefined;
        if (finalStock === undefined && item.stock_change !== undefined) {
          const existingStock = productMeta[targetId]?.stock ?? 10;
          finalStock = Math.max(0, existingStock + Number(item.stock_change));
        }

        if (finalStock !== undefined) {
          const isAvailable = finalStock > 0;

          // Coba update ke database
          const { error: updErr } = await supabaseAdmin
            .from('products')
            .update({
              stock: finalStock,
              is_available: isAvailable,
              updated_at: new Date().toISOString(),
            })
            .eq('id', targetId)
            .eq('store_id', store.id);

          // Update productMeta layout_config sebagai jaminan konsistensi
          productMeta[targetId] = {
            ...(productMeta[targetId] || {}),
            stock: finalStock,
          };
          configModified = true;

          updatedList.push({ product_id: targetId, new_stock: finalStock, is_available: isAvailable });
        }
      }

      if (configModified) {
        await supabaseAdmin
          .from('stores')
          .update({
            layout_config: { ...currentConfig, product_meta: productMeta },
            updated_at: new Date().toISOString(),
          })
          .eq('id', store.id);
      }

      return NextResponse.json({
        success: true,
        message: 'Stok berhasil disinkronisasi ke website.',
        synced_items: updatedList,
      });
    }

    // 4. HANDLER ACTION: CREATE_TRANSACTION (Kasir Offline Menjual Barang / Tamu Meja Pesan)
    if (action === 'create_transaction' && transaction) {
      const orderId = transaction.order_id || `${app === 'sivilize_dine_lite' ? 'DINE-M' + (transaction.table_number || '01') : 'POS'}-${Math.floor(100000 + Math.random() * 900000)}`;
      const totalAmount = Number(transaction.total_amount || 0);
      const itemsPurchased = Array.isArray(transaction.items) ? transaction.items : [];
      const tableNumber = transaction.table_number || (app === 'sivilize_dine_lite' ? 'Meja 01' : null);

      // Otomatis kurangi stok setiap item yang terjual
      for (const p of itemsPurchased) {
        if (!p.product_id) continue;
        const qty = Number(p.quantity || 1);
        const currentStock = productMeta[p.product_id]?.stock ?? 10;
        const newStock = Math.max(0, currentStock - qty);

        productMeta[p.product_id] = {
          ...(productMeta[p.product_id] || {}),
          stock: newStock,
        };
        configModified = true;

        // Update di tabel products
        await supabaseAdmin
          .from('products')
          .update({
            stock: newStock,
            is_available: newStock > 0,
            updated_at: new Date().toISOString(),
          })
          .eq('id', p.product_id)
          .eq('store_id', store.id);
      }

      // Catat transaksi ke inquiries / riwayat pesanan toko
      const existingInquiries = Array.isArray(currentConfig.inquiries) ? currentConfig.inquiries : [];
      const itemsSummary = itemsPurchased.map((it: any) => `${it.name || 'Item'} (${it.quantity}x)`).join(', ');

      const newInquiry = {
        id: orderId,
        type: 'order' as const,
        customer_name: transaction.cashier_name || (app === 'sivilize_dine_lite' ? `Tamu ${tableNumber}` : 'Kasir Offline Counter'),
        customer_phone: store.owner_phone || '-',
        details: `Item: ${itemsSummary || 'Pembelian Langsung Kasir'}`,
        total_amount: totalAmount,
        notes: `Metode Bayar: ${transaction.payment_method || 'CASH'}${tableNumber ? ' • ' + tableNumber : ''}`,
        status: 'completed' as const,
        created_at: new Date().toISOString(),
        table_number: tableNumber,
        order_source: app === 'sivilize_dine_lite' ? 'Sivilize Dine Lite (Self-Order QR Meja)' : 'SiKasir POS (Kasir Offline)',
      };

      existingInquiries.unshift(newInquiry);

      await supabaseAdmin
        .from('stores')
        .update({
          layout_config: {
            ...currentConfig,
            product_meta: productMeta,
            inquiries: existingInquiries.slice(0, 200), // Batasi 200 riwayat terbaru
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', store.id);

      return NextResponse.json({
        success: true,
        order_id: orderId,
        message: 'Transaksi kasir berhasil dicatat & stok website langsung terpotong 2-arah.',
        deducted_items_count: itemsPurchased.length,
      });
    }

    // 5. HANDLER ACTION: MANAGE_TABLE (Tambah/Update/Hapus Meja untuk Dine Lite)
    if ((action === 'manage_table' || action === 'delete_table') && table) {
      let existingTables: TableConfig[] = Array.isArray(currentConfig.tables) ? currentConfig.tables : [];
      const tableNumber = String(table.number || '01').padStart(2, '0');
      const tableId = table.id || `tbl-${tableNumber}`;

      if (action === 'delete_table' || table.delete === true) {
        existingTables = existingTables.filter((t) => t.id !== tableId && t.number !== tableNumber);
      } else {
        const existingIdx = existingTables.findIndex((t) => t.id === tableId || t.number === tableNumber);

        const tableEntry: TableConfig = {
          id: tableId,
          number: tableNumber,
          name: table.name || `Meja ${tableNumber}`,
          capacity: table.capacity || 4,
          status: table.status || 'available',
        };

        if (existingIdx >= 0) {
          existingTables[existingIdx] = tableEntry;
        } else {
          existingTables.push(tableEntry);
        }
      }

      await supabaseAdmin
        .from('stores')
        .update({
          layout_config: {
            ...currentConfig,
            tables: existingTables,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', store.id);

      return NextResponse.json({
        success: true,
        message: `Meja ${tableNumber} berhasil disimpan.`,
        tables: existingTables,
      });
    }

    // 6. DEFAULT ACTION: FETCH_CATALOG & STATUS LENGKAP
    const { data: rawProducts } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('store_id', store.id)
      .order('display_order', { ascending: true });

    const enriched = (rawProducts || []).map((p: any) => {
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
      };
    });

    return NextResponse.json({
      success: true,
      store: {
        id: store.id,
        name: store.store_name,
        slug: store.slug,
        category: store.category,
        license_key: cleanKey,
        is_food_business: metadata.isFoodBusiness,
        allowed_apps: metadata.allowedApps,
        tables: currentConfig.tables || [
          { id: 'tbl-01', number: '01', name: 'Meja 01 (Indoor)', status: 'available' },
          { id: 'tbl-02', number: '02', name: 'Meja 02 (Indoor)', status: 'available' },
          { id: 'tbl-03', number: '03', name: 'Meja 03 (Outdoor)', status: 'available' },
        ],
      },
      products: enriched,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server sync webhook.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
