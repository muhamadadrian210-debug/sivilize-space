import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://keloadmjbnhjiplfarvs.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('--- SEEDING REALISTIC SIVILIZESPACE DEMO STORES (ANTI-AI SLOP) ---');

  // 1. Toko Kopi Senja (Template: Katalog, Theme: Warm Cafe)
  const { data: store1, error: err1 } = await supabase
    .from('stores')
    .upsert(
      {
        slug: 'kopisenja',
        store_name: 'Kopi Senja Bajawa',
        description: 'Kedai kopi artisan lokal. Menyajikan biji kopi pilihan langsung dari petani Manggarai & Bajawa, Nusa Tenggara Timur.',
        category: 'Kopi & Pastry',
        template_type: 'katalog',
        theme_id: 'warm-cafe',
        owner_phone: '6281234567890',
        pin_hash: '123456',
        opening_hours: '08:00 - 22:00 WITA',
        address: 'Jl. Frans Seda No. 12, Kel. Fatululi, Kota Kupang, NTT',
        banner_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
        is_active: true,
      },
      { onConflict: 'slug' }
    )
    .select()
    .single();

  if (err1) {
    console.error('Error seeding store 1:', err1);
  } else {
    console.log('✓ Store 1 Created:', store1.slug);
    // Products store 1
    await supabase.from('products').delete().eq('store_id', store1.id);
    await supabase.from('products').insert([
      {
        store_id: store1.id,
        name: 'Es Kopi Susu Aren Bajawa',
        description: 'Signature espresso arabika Bajawa dipadu gula aren organik dan fresh milk creamy.',
        price: 18000,
        category_tag: 'Signature',
        image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
        is_available: true,
        display_order: 1,
      },
      {
        store_id: store1.id,
        name: 'Manual Brew V60 Manggarai',
        description: 'Single origin arabika Manggarai Flores washed process. Tasting notes: citrus, floral, caramel.',
        price: 22000,
        category_tag: 'Manual Brew',
        image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        is_available: true,
        display_order: 2,
      },
      {
        store_id: store1.id,
        name: 'Butter Croissant Artisan',
        description: 'Pastry klasik Prancis dengan butter Normandia, renyah di luar dan lembut di dalam.',
        price: 25000,
        category_tag: 'Pastry',
        image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
        is_available: true,
        display_order: 3,
      },
      {
        store_id: store1.id,
        name: 'Toast Roti Bakar Cokelat Keju',
        description: 'Roti tawar gandum tebal panggang mentega dengan taburan parutan keju cheddar & cokelat pasta Belgia.',
        price: 20000,
        category_tag: 'Camilan',
        image_url: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=600&q=80',
        is_available: true,
        display_order: 4,
      },
      {
        store_id: store1.id,
        name: 'Matcha Latte Uji Kyoto',
        description: 'Bubuk green tea murni asal Uji, Kyoto dipadukan dengan steamed oat milk.',
        price: 24000,
        category_tag: 'Non-Coffee',
        image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
        is_available: true,
        display_order: 5,
      },
    ]);
    console.log('✓ Store 1 Products Populated');
  }

  // 2. Sivilize Laundry (Template: Layanan, Theme: Fresh Herbal)
  const { data: store2, error: err2 } = await supabase
    .from('stores')
    .upsert(
      {
        slug: 'sivilizelaundry',
        store_name: 'Sivilize Laundry Express',
        description: 'Jasa cuci kiloan & satuan profesional. Mesin standar industri, detergen anti-bakteri, dan wangi tahan 14 hari.',
        category: 'Laundry & Dry Clean',
        template_type: 'layanan',
        theme_id: 'fresh-herbal',
        owner_phone: '6281234567890',
        pin_hash: '123456',
        opening_hours: '07:00 - 21:00 WITA (Buka Setiap Hari)',
        address: 'Jl. W.J. Lalamentik No. 45, Oebobo, Kota Kupang, NTT',
        banner_url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
        google_maps_url: 'https://maps.google.com',
        is_active: true,
      },
      { onConflict: 'slug' }
    )
    .select()
    .single();

  if (err2) {
    console.error('Error seeding store 2:', err2);
  } else {
    console.log('✓ Store 2 Created:', store2.slug);
    await supabase.from('products').delete().eq('store_id', store2.id);
    await supabase.from('products').insert([
      {
        store_id: store2.id,
        name: 'Cuci Kering Setrika Reguler (2 Hari)',
        description: 'Paket cuci komplit pakaian harian, disetrika uap halus dan dipacking plastik tebal kedap udara per kg.',
        price: 8000,
        category_tag: 'Kiloan',
        is_available: true,
        display_order: 1,
      },
      {
        store_id: store2.id,
        name: 'Cuci Express Kilat 4 Jam Selesai',
        description: 'Layanan darurat seragam / baju kerja. Masuk pagi, siang sudah bersih dan rapi wangi.',
        price: 15000,
        category_tag: 'Express',
        is_available: true,
        display_order: 2,
      },
      {
        store_id: store2.id,
        name: 'Deep Cleaning Sneakers & Sepatu',
        description: 'Pembersihan sol luar, upper canvas/leather, dan sterilisasi anti-bau apek.',
        price: 35000,
        category_tag: 'Satuan',
        is_available: true,
        display_order: 3,
      },
      {
        store_id: store2.id,
        name: 'Cuci Bedcover King Size & Selimut',
        description: 'Pencucian mesin drum besar dengan formula pelembut khusus serat tebal.',
        price: 30000,
        category_tag: 'Satuan',
        is_available: true,
        display_order: 4,
      },
    ]);
    console.log('✓ Store 2 Products Populated');
  }

  // 3. Dr. Adrian (Template: Profil, Theme: Corporate Clean)
  const { data: store3, error: err3 } = await supabase
    .from('stores')
    .upsert(
      {
        slug: 'dr-adrian',
        store_name: 'dr. Adrian, Sp.GK',
        description: 'Dokter Spesialis Gizi Klinik. Melayani konsultasi program diet medis, penanganan metabolik, diabetes, dan kebugaran tubuh.',
        category: 'Kesehatan & Medis',
        template_type: 'profil',
        theme_id: 'corporate-clean',
        owner_phone: '6281234567890',
        pin_hash: '123456',
        opening_hours: 'Senin - Jumat (16:00 - 20:00 WITA)',
        address: 'Klinik Utama Sivilize Medika, Jl. Sudirman No. 8, Kupang',
        logo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
        is_active: true,
      },
      { onConflict: 'slug' }
    )
    .select()
    .single();

  if (err3) {
    console.error('Error seeding store 3:', err3);
  } else {
    console.log('✓ Store 3 Created:', store3.slug);
    await supabase.from('products').delete().eq('store_id', store3.id);
    await supabase.from('products').insert([
      {
        store_id: store3.id,
        name: 'Konsultasi Gizi Klinik Tatap Muka (45 Mnt)',
        description: 'Pemeriksaan komposisi tubuh (BIA), analisis riwayat makan, dan penyusunan menu diet kustom.',
        price: 250000,
        category_tag: 'Konsultasi',
        is_available: true,
        display_order: 1,
      },
      {
        store_id: store3.id,
        name: 'Telekonsultasi Online via Video Call',
        description: 'Sesi konsultasi jarak jauh untuk pasien luar kota Kupang via Google Meet / WhatsApp.',
        price: 175000,
        category_tag: 'Online',
        is_available: true,
        display_order: 2,
      },
      {
        store_id: store3.id,
        name: 'Paket Pendampingan Diet 1 Bulan',
        description: 'Evaluasi mingguan, penyesuaian gramatur kalori, dan akses konsultasi harian via WhatsApp.',
        price: 750000,
        category_tag: 'Program',
        is_available: true,
        display_order: 3,
      },
    ]);
    console.log('✓ Store 3 Products Populated');
  }

  console.log('--- SEEDING COMPLETE! ALL 3 MASTER TEMPLATES READY! ---');
}

seed().catch(console.error);
