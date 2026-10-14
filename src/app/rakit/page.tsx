'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OnboardingModal } from '@/components/landing/OnboardingModal';
import { formatRupiah } from '@/lib/utils';
import type { StoreSectionKey } from '@/types/database';
import {
  Cpu,
  Layers,
  Type,
  LayoutGrid,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Eye,
  EyeOff,
  FileText,
  Compass,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  RefreshCw,
  X,
  Maximize2,
  ShoppingBag,
  Sun,
  Moon,
  Upload,
  Image as ImageIcon,
  Trash2,
  Plus,
  PlusCircle,
  Check,
  HelpCircle,
  MapPin,
  Award,
  ExternalLink,
  Globe,
  CreditCard,
  Users,
  Search,
  Coffee,
  Wrench,
  Shirt,
  Scissors,
  Activity,
  Phone,
  Clock,
  Calendar,
  Star,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export interface ConfigCustomPage {
  id: string;
  slug: string;
  title: string;
  badge: string;
  category: 'about' | 'gallery' | 'faq' | 'warranty' | 'branches' | 'custom';
  summary: string;
  icon: string;
}

export interface ConfigProductItem {
  id: string;
  title: string;
  category: string;
  price: number;
  badge: string;
  desc: string;
  imageUrl: string;
}

export interface ConfigOptionalAddon {
  id: string;
  name: string;
  badge: string;
  category: string;
  price: number;
  period: string;
  desc: string;
  icon: string;
}

export type BusinessCategoryKey = 'fnb' | 'workshop' | 'fashion' | 'laundry' | 'barber' | 'clinic';

export interface BusinessPresetData {
  key: BusinessCategoryKey;
  name: string;
  categoryLabel: string;
  icon: string;
  badge: string;
  tagline: string;
  storeName: string;
  heroHeadline: string;
  heroSubhead: string;
  heroBadge: string;
  promoText: string;
  promoCode: string;
  address: string;
  hours: string;
  phoneWa: string;
  recommendedFont: string;
  recommendedGrid: '2' | '3' | '4' | 'list' | 'masonry';
  contactLayout: 'split_map' | 'three_cards' | 'compact_bar' | 'booking_form';
  galleryLayout: 'grid_3' | 'grid_2' | 'grid_4' | 'carousel_row';
  testimonialLayout: 'cards_2' | 'stars_3' | 'quote_single';
  aboutLayout: 'story_split' | 'pillars_3' | 'stats_counter';
  faqLayout: 'accordion_1' | 'grid_cards_2';
  bgPresetUrl: string | null;
  products: ConfigProductItem[];
  pages: ConfigCustomPage[];
  galleryPhotos: { name: string; url: string }[];
  testimonials: { author: string; city: string; rating: number; quote: string }[];
  faqItems: { q: string; a: string }[];
  aboutStory: { title: string; story: string; stats: { value: string; label: string }[] };
  categoriesList: string[];
}

export const BUSINESS_PRESETS: Record<BusinessCategoryKey, BusinessPresetData> = {
  fnb: {
    key: 'fnb',
    name: 'Kafe & Resto',
    categoryLabel: 'Kuliner & Kedai Kopi',
    icon: '☕',
    badge: 'Katalog FnB',
    tagline: 'Menu kopi artisan, pastry fresh, dan order takeaway instan ke WhatsApp',
    storeName: 'Kopi Senja Bajawa',
    heroHeadline: 'Cita Rasa Asli Flores Bajawa, Dipanggang Segar Setiap Hari.',
    heroSubhead: 'Biji arabika single origin langsung dari 40+ petani lereng Gunung Inerie NTT. Pesan langsung tanpa potongan komisi aplikasi.',
    heroBadge: 'PRODUK ARTISAN NTT',
    promoText: 'Gratis Ongkir se-Bajawa! Kode:',
    promoCode: 'SENJAHEMAT',
    address: 'Jl. Kartini No. 14, Bajawa, NTT',
    hours: 'Senin - Minggu: 08:00 - 22:00 WITA',
    phoneWa: '0812-3456-7890',
    recommendedFont: 'jakarta',
    recommendedGrid: '3',
    contactLayout: 'split_map',
    galleryLayout: 'grid_3',
    testimonialLayout: 'cards_2',
    aboutLayout: 'story_split',
    faqLayout: 'accordion_1',
    bgPresetUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80',
    products: [
      {
        id: 'p_fnb_1',
        title: 'Flores Bajawa Single Origin 200g',
        category: 'Specialty Coffee',
        price: 38000,
        badge: 'Best Seller',
        desc: 'Notes karamel manis, cokelat hitam pekat, dan acidity seimbang dari dataran 1.200 MDPL.',
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_fnb_2',
        title: 'Kopi Susu Senja Gula Aren Murni',
        category: 'Signature Drink',
        price: 24000,
        badge: 'Favorit Kafe',
        desc: 'Espresso double shot dipadu susu segar pilihan dan sirup gula aren organik harum.',
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_fnb_3',
        title: 'Butter Croissant Artisan Crispy',
        category: 'Pastry & Bakery',
        price: 28000,
        badge: 'Fresh Daily',
        desc: 'Lapis renyah keemasan dengan butter murni Prancis kualitas terbaik, dipanggang tiap pagi.',
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_fnb_4',
        title: 'Cold Brew Botol Kaca 250ml',
        category: 'Ready to Drink',
        price: 32000,
        badge: 'Ekstra Kafein',
        desc: 'Ekstraksi dingin perlahan 16 jam, aroma manis alami bebas pahit getir, tahan 7 hari.',
        imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
      },
    ],
    pages: [
      {
        id: 'page_about_fnb',
        slug: 'tentang-kami',
        title: 'Tentang Kami & Petani',
        badge: 'Profil Usaha',
        category: 'about',
        summary: 'Sejarah kedai, filosofi biji kopi single origin, dan kemitraan 40+ petani lokal di Bajawa NTT.',
        icon: '📖',
      },
      {
        id: 'page_gallery_fnb',
        slug: 'galeri-suasana',
        title: 'Galeri & Suasana Kedai',
        badge: 'Spot Foto',
        category: 'gallery',
        summary: 'Dokumentasi visual interior, barista brew bar, ruang santai nyaman, dan proses sangrai artisan.',
        icon: '📸',
      },
      {
        id: 'page_faq_fnb',
        slug: 'faq-bantuan',
        title: 'Tanya Jawab (FAQ)',
        badge: 'Pusat Bantuan',
        category: 'faq',
        summary: 'Jawaban lengkap cara pemesanan, pengiriman instan/ekspedisi, metode bayar QRIS, dan garansi.',
        icon: '❓',
      },
    ],
    galleryPhotos: [
      { name: 'Area Indoor & Meja Kerja', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Barista Brew Bar & Mesin', url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80' },
      { name: 'Taman Outdoor Sejuk', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Manual Brew V60 Bajawa', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
    ],
    testimonials: [
      { author: 'Budi Santoso', city: 'Surabaya', rating: 5, quote: 'Kopi bajawa terenak yang pernah saya coba. Order lewat WA fast respons banget dan packing sangat aman sampai Jawa Timur!' },
      { author: 'Rina Melati', city: 'Jakarta Selatan', rating: 5, quote: 'Cold brew botolnya segar banget buat teman meeting di rumah. Rasanya clean dan acidity-nya tidak bikin kembung.' },
    ],
    faqItems: [
      { q: 'Bagaimana cara pesan menu kopi dan beans?', a: 'Pilih menu yang Anda mau, klik tombol pesan, dan invoice otomatis langsung terkirim ke WhatsApp barista tanpa potongan pihak ketiga.' },
      { q: 'Apakah melayani pengiriman roasted beans ke luar pulau?', a: 'Ya, seluruh biji kopi kemasan kami kirim ke seluruh Indonesia via JNE/SiCepat dengan valve one-way berstandar ekspor.' },
      { q: 'Berapa lama garansi kesegaran biji kopi?', a: 'Kami menjamin biji kopi dikirim maksimal 7 hari setelah tanggal roasting. Jika lebih, kami ganti 100% baru gratis.' },
    ],
    aboutStory: {
      title: 'Kemitraan Langsung dengan 40+ Petani Lereng Gunung Inerie',
      story: 'Didirikan di Bajawa pada tahun 2021 di ketinggian 1.200 MDPL. Kami membeli hasil panen cherry merah langsung dari petani lokal tanpa tengkulak demi menjaga keadilan rantai pasok dan kualitas arabika terbaik.',
      stats: [
        { value: '40+', label: 'Petani Mitra' },
        { value: '1.200', label: 'MDPL Ketinggian' },
        { value: '100%', label: 'Arabika Grade 1' },
      ],
    },
    categoriesList: ['Semua Menu', '☕ Manual Brew', '🥛 Kopi Susu', '🥐 Pastry Fresh', '📦 Roasted Beans'],
  },

  workshop: {
    key: 'workshop',
    name: 'Bengkel & Otomotif',
    categoryLabel: 'Servis Motor & Mobil',
    icon: '🔧',
    badge: 'Jasa & Sparepart',
    tagline: 'Tune-up injeksi, ganti oli, servis berkala, dan booking antrean montir',
    storeName: 'Garasi Presisi Otomotif',
    heroHeadline: 'Servis Kendaraan Presisi, Tune-Up Injeksi & Garansi Pengerjaan.',
    heroSubhead: 'Teknisi tersertifikasi APM, alat scanner OBD2 digital, suku cadang 100% original bergaransi tanpa biaya siluman.',
    heroBadge: 'BENGKEL RESMI & TERSERTIFIKASI',
    promoText: 'Free Scan Komputer OBD2 + Diskon Jasa 25%! Kode:',
    promoCode: 'SERVISHEMAT',
    address: 'Jl. Otista Raya No. 108, Jakarta Timur',
    hours: 'Senin - Sabtu: 08:00 - 17:30 WIB (Minggu Tutup)',
    phoneWa: '0813-8899-7711',
    recommendedFont: 'inter',
    recommendedGrid: 'list',
    contactLayout: 'booking_form',
    galleryLayout: 'grid_2',
    testimonialLayout: 'stars_3',
    aboutLayout: 'pillars_3',
    faqLayout: 'accordion_1',
    bgPresetUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    products: [
      {
        id: 'p_ws_1',
        title: 'Paket Tune-Up Injeksi + Gurah Karbon Mesin',
        category: 'Tune-Up & Injeksi',
        price: 185000,
        badge: 'Best Seller',
        desc: 'Pembersihan throttle body, injektor ultrasonik, dan ruang bakar ruang bakar untuk mengembalikan tenaga mesin seperti baru.',
        imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_ws_2',
        title: 'Ganti Oli Shell Advance Ultra 1L + Filter Oli',
        category: 'Ganti Oli Mesin',
        price: 95000,
        badge: 'Oli Asli 100%',
        desc: 'Oli full sintetis berteknologi PurePlus Gas-to-Liquid, gratis jasa ganti oli dan pembersihan saringan magnet.',
        imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_ws_3',
        title: 'Servis CVT Lengkap + Greasing High-Temp Yamaha/Honda',
        category: 'Sistem Penggerak',
        price: 75000,
        badge: 'Bebas Gredek',
        desc: 'Pembersihan mangkok ganda, v-belt, roller, per CVT, dan pelumasan gemuk tahan panas spesifikasi balap.',
        imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_ws_4',
        title: 'Overhaul Rem Cakram & Kuras Minyak Rem DOT4',
        category: 'Pengereman Safety',
        price: 120000,
        badge: 'Safety First',
        desc: 'Pembersihan kaliper rem, pelumasan pin slider, kuras minyak rem hidrolik, dan tes uji pengereman presisi.',
        imageUrl: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
      },
    ],
    pages: [
      {
        id: 'page_about_ws',
        slug: 'profil-montir',
        title: 'Sertifikasi & Standar Bengkel',
        badge: 'Teknisi Handal',
        category: 'about',
        summary: 'Profil para mekanik bersertifikasi APM, peralatan scanner OBD2 komputer, dan transparansi pengerjaan.',
        icon: '🔧',
      },
      {
        id: 'page_pricelist_ws',
        slug: 'daftar-harga-servis',
        title: 'Daftar Harga Jasa Lengkap',
        badge: 'Transparan',
        category: 'custom',
        summary: 'Price list estimasi biaya servis ringan, servis besar, kelistrikan, dan suku cadang motor/mobil.',
        icon: '📋',
      },
      {
        id: 'page_warranty_ws',
        slug: 'garansi-servis',
        title: 'Kebijakan Garansi 14 Hari',
        badge: 'Garansi Servis',
        category: 'warranty',
        summary: 'Ketentuan klaim perbaikan gratis 14 hari paska servis jika masih terdapat keluhan di bagian yang sama.',
        icon: '🛡️',
      },
    ],
    galleryPhotos: [
      { name: 'Pit Servis Hidrolik Bersih', url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Scanner Diagnosa OBD2 Digital', url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80' },
      { name: 'Rak Sparepart Original Bersegel', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80' },
      { name: 'Ruang Tunggu AC & Wi-Fi', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80' },
    ],
    testimonials: [
      { author: 'Hendra Gunawan', city: 'Jakarta Timur', rating: 5, quote: 'Motor matic saya tarikan jadi enteng banget setelah servis CVT disini. Montirnya ramah dan jujur sparepart bekasnya dibalikin!' },
      { author: 'Dimas Prasetyo', city: 'Bekasi Barat', rating: 5, quote: 'Tune up injeksinya rapi pakai scanner komputer. Hasilnya mesin halus dan konsumsi bensin jadi lebih irit.' },
    ],
    faqItems: [
      { q: 'Apakah ada garansi setelah motor/mobil diservis?', a: 'Ya! Seluruh pengerjaan servis kami bergaransi 14 hari kalender. Jika ada keluhan di bagian yang sama, kami perbaiki ulang 100% gratis.' },
      { q: 'Apakah harus booking jadwal terlebih dahulu?', a: 'Bisa langsung datang, namun booking via WhatsApp sangat disarankan agar mekanik stanby dan Anda tidak perlu antre lama.' },
      { q: 'Apakah oli dan sparepart dijamin asli?', a: 'Semua oli dan sparepart bergaransi original 100% dari distributor resmi dengan barcode terverifikasi.' },
    ],
    aboutStory: {
      title: 'Transparansi Pengerjaan & Suku Cadang Original Tanpa Jebakan',
      story: 'Garasi Presisi didirikan oleh para mantan kepala mekanik bersertifikat APM. Kami menolak praktik ganti sparepart tanpa konfirmasi pelanggan. Setiap bagian yang diganti wajib ditunjukkan fisiknya kepada Anda.',
      stats: [
        { value: '12.000+', label: 'Kendaraan Tertangani' },
        { value: '100%', label: 'Sparepart Orisinal' },
        { value: '14 Hari', label: 'Garansi Servis' },
      ],
    },
    categoriesList: ['Semua Layanan', '🔧 Tune-Up & Injeksi', '🛢️ Ganti Oli Mesin', '⚙️ Servis CVT', '🛑 Pengereman Safety'],
  },

  fashion: {
    key: 'fashion',
    name: 'Distro & Fashion',
    categoryLabel: 'Streetwear & Apparel',
    icon: '👕',
    badge: 'Koleksi Retail',
    tagline: 'Showcase lookbook, panduan size chart, dan checkout order mudah',
    storeName: 'Karsa Apparel & Co.',
    heroHeadline: 'Streetwear Minimalis Berkarakter, Heavyweight Cotton 24s & 16s.',
    heroSubhead: 'Dibuat terbatas untuk Anda yang menghargai kualitas jahitan presisi, siluet oversized nyaman, dan detail eksklusif.',
    heroBadge: 'INDONESIAN CONTEMPORARY STREETWEAR',
    promoText: 'Diskon 20% Koleksi Hoodie & Celana Cargo! Kode:',
    promoCode: 'KARSACOOL',
    address: 'Jl. Bahureksa No. 25, Trunojoyo, Bandung',
    hours: 'Senin - Minggu: 10:00 - 21:00 WIB',
    phoneWa: '0811-2233-4455',
    recommendedFont: 'syne',
    recommendedGrid: '2',
    contactLayout: 'three_cards',
    galleryLayout: 'grid_3',
    testimonialLayout: 'cards_2',
    aboutLayout: 'story_split',
    faqLayout: 'grid_cards_2',
    bgPresetUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    products: [
      {
        id: 'p_fas_1',
        title: 'Oversized Boxy Tee - Vintage Charcoal Wash',
        category: 'T-Shirts & Boxy',
        price: 149000,
        badge: 'Best Seller',
        desc: 'Bahan 100% Combed Cotton 16s Heavyweight tebal tidak menerawang, kerah rib tebal anti melar.',
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_fas_2',
        title: 'Heavyweight French Terry Hoodie 380gsm',
        category: 'Hoodies & Outer',
        price: 329000,
        badge: 'Koleksi Musim Dingin',
        desc: 'Gramasi 380gsm dengan kain fleece lembut di dalam, double-layer hood kokoh dan saku kanguru tersembunyi.',
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_fas_3',
        title: 'Utility Cargo Pants 6-Pockets - Olive Drab',
        category: 'Pants & Cargo',
        price: 269000,
        badge: 'Cutting Nyaman',
        desc: 'Material Cotton Ripstop tahan sobek, resleting YKK asli, dengan tali serut adjuster di mata kaki.',
        imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_fas_4',
        title: 'Corduroy Coach Jacket - Vintage Navy Blue',
        category: 'Hoodies & Outer',
        price: 389000,
        badge: 'Edisi Terbatas',
        desc: 'Bahan korduroi premium bertekstur garis timbul dengan furing satin adem dan kancing snap metalik.',
        imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
      },
    ],
    pages: [
      {
        id: 'page_about_fas',
        slug: 'cerita-brand',
        title: 'Filosofi & Proses Jahit',
        badge: 'Craftsmanship',
        category: 'about',
        summary: 'Kisah di balik eksplorasi bahan katun lokal berkualitas tinggi dan dedikasi pada potongan pola presisi.',
        icon: '📖',
      },
      {
        id: 'page_size_fas',
        slug: 'panduan-ukuran',
        title: 'Tabel Ukuran (Size Chart)',
        badge: 'Fitting Akurat',
        category: 'custom',
        summary: 'Panduan lengkap panjang badan, lebar dada, dan panjang lengan dalam centimeter dari size S hingga XXL.',
        icon: '📏',
      },
      {
        id: 'page_exchange_fas',
        slug: 'kebijakan-tukar',
        title: 'Garansi Tukar Size 7 Hari',
        badge: 'Bebas Khawatir',
        category: 'warranty',
        summary: 'Salah pilih ukuran saat beli online? Tukar size gratis dalam 7 hari kerja dengan syarat label belum lepas.',
        icon: '🔄',
      },
    ],
    galleryPhotos: [
      { name: 'Lookbook Studio Streetwear', url: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=600&q=80' },
      { name: 'Detail Serat Kain Katun 16s', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80' },
      { name: 'Display Butik Trunojoyo', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
      { name: 'Packaging Box Eksklusif', url: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=600&q=80' },
    ],
    testimonials: [
      { author: 'Alif Kurnia', city: 'Bandung', rating: 5, quote: 'Bahan kaos 16s-nya tebal banget tapi tetap dingin dipakai siang hari di Bandung. Cutting boxy-nya pas tidak kaku.' },
      { author: 'Farhan Maulana', city: 'Jakarta Selatan', rating: 5, quote: 'Hoodie 380gsm-nya juara dunia! Jahitan rapi, hood tegak tidak lepek, dan warna navy-nya cakep banget.' },
    ],
    faqItems: [
      { q: 'Bagaimana jika ukuran baju yang saya pesan kebesaran atau kekecilan?', a: 'Anda berhak menukar ukuran dalam waktu 7 hari setelah barang diterima, asalkan hangtag masih utuh dan belum dicuci.' },
      { q: 'Berapa lama estimasi pengiriman paket pesanan?', a: 'Pengiriman Jabodetabek & Bandung 1-2 hari kerja; luar pulau 2-4 hari via J&T dan SiCepat dengan nomor resi otomatis.' },
      { q: 'Apakah stok produk selalu ready?', a: 'Kami memproduksi secara berkala (batch drop). Jika item berstatus sold out, silakan aktifkan notifikasi restock via WhatsApp CS.' },
    ],
    aboutStory: {
      title: 'Menghidupkan Budaya Streetwear Lokal dengan Kualitas Standar Ekspor',
      story: 'Karsa Apparel lahir dari semangat meredefinisi pakaian harian pria. Kami percaya pakaian kasual harus terasa kokoh di tangan, tahan dicuci berulang kali, dan memiliki proporsi potongan yang elegan.',
      stats: [
        { value: '18.000+', label: 'Pieces Terjual' },
        { value: '100%', label: 'Katun Murni' },
        { value: '7 Hari', label: 'Garansi Tukar Size' },
      ],
    },
    categoriesList: ['Semua Koleksi', '👕 T-Shirts & Boxy', '🧥 Hoodies & Outer', '👖 Pants & Cargo', '🧢 Topi & Aksesoris'],
  },

  laundry: {
    key: 'laundry',
    name: 'Laundry Kiloan',
    categoryLabel: 'Cuci & Setrika Uap',
    icon: '🧺',
    badge: 'Layanan Harian',
    tagline: '1 mesin 1 pelanggan, jemput gratis, paket express kilat 6 jam selesai',
    storeName: 'Binar Laundry Express',
    heroHeadline: 'Cucian Bersih Higienis, Setrika Uap Rapi & Antar Jemput Gratis.',
    heroSubhead: '1 Mesin 1 Pelanggan (Tidak dicampur). Air filter reverse osmosis & deterjen ramah serat kain dengan parfum tahan 14 hari.',
    heroBadge: 'LAUNDRY KILOAN & SATUAN PREMIUM',
    promoText: 'Gratis Antar-Jemput Radius 5 KM! Min order 5 kg. Kode:',
    promoCode: 'CUCIJEMPUT',
    address: 'Jl. Tebet Barat Dalam Raya No. 42, Jakarta Selatan',
    hours: 'Senin - Minggu: 07:00 - 21:00 WIB',
    phoneWa: '0815-7766-5544',
    recommendedFont: 'dmsans',
    recommendedGrid: 'list',
    contactLayout: 'compact_bar',
    galleryLayout: 'grid_4',
    testimonialLayout: 'stars_3',
    aboutLayout: 'pillars_3',
    faqLayout: 'accordion_1',
    bgPresetUrl: null,
    products: [
      {
        id: 'p_ld_1',
        title: 'Cuci Komplit + Setrika Uap Boiler (Reguler 2 Hari)',
        category: 'Kiloan Reguler',
        price: 9000,
        badge: 'Paling Populer',
        desc: 'Harga per Kilogram. Cuci higienis 1 mesin 1 nota, setrika uap rapi bebas gosong, lipat rapi plastik klip tebal.',
        imageUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_ld_2',
        title: 'Express Kilat 6 Jam Selesai (Bisa Ditunggu)',
        category: 'Express Kilat',
        price: 16000,
        badge: 'Prioritas Utama',
        desc: 'Harga per Kilogram. Cucian masuk pagi, siang siap antar ke rumah. Prioritas mesin cuci dan setrika uap mandiri.',
        imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_ld_3',
        title: 'Cuci Bedcover King Size + Treatment Anti Tungau',
        category: 'Bedcover & Selimut',
        price: 45000,
        badge: 'Higienis Bebas Alergi',
        desc: 'Pencucian drum besar kapasitas 20kg, deterjen antibakteri, pengeringan steril, dan parfum aroma lavender lembut.',
        imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_ld_4',
        title: 'Dry Cleaning Jas / Kebaya Pesta Satuan',
        category: 'Satuan Dry Clean',
        price: 65000,
        badge: 'Perawatan Khusus',
        desc: 'Perlakuan khusus serat wol & sutra tanpa air, pembersihan noda manual, hanger premium & dustcover pelindung.',
        imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
      },
    ],
    pages: [
      {
        id: 'page_sop_ld',
        slug: 'standar-higienis',
        title: 'SOP 1 Mesin 1 Pelanggan',
        badge: 'Jaminan Bersih',
        category: 'about',
        summary: 'Komitmen kami tidak pernah mencampur cucian antar pelanggan dan penggunaan filter air Reverse Osmosis.',
        icon: '🧼',
      },
      {
        id: 'page_prices_ld',
        slug: 'tarif-lengkap',
        title: 'Daftar Tarif Kiloan & Satuan',
        badge: 'Price List',
        category: 'custom',
        summary: 'Rincian lengkap tarif cuci kiloan, dry clean satuan kemeja, boneka, gorden, dan karpet rumah tangga.',
        icon: '🏷️',
      },
      {
        id: 'page_insurance_ld',
        slug: 'garansi-pakaian',
        title: 'Asuransi Ganti Rugi Pakaian',
        badge: 'Garansi 100%',
        category: 'warranty',
        summary: 'Perlindungan ganti rugi hingga 10x lipat biaya cuci jika terjadi kehilangan atau kerusakan serat pakaian.',
        icon: '🛡️',
      },
    ],
    galleryPhotos: [
      { name: 'Mesin Cuci Industri Front-Load', url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Meja Setrika Uap Boiler Rapi', url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80' },
      { name: 'Packing Klip Plastik Higienis', url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80' },
      { name: 'Armada Motor Antar-Jemput', url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80' },
    ],
    testimonials: [
      { author: 'Maya Lestari', city: 'Tebet, Jakarta', rating: 5, quote: 'Wangi parfum bajunya tahan sampai seminggu di lemari. Pakaian putih tidak pernah kusam atau kelunturan sama sekali.' },
      { author: 'Bambang Irawan', city: 'Pancoran, Jakarta', rating: 5, quote: 'Layanan antar jemputnya tepat waktu banget. Tinggal WA alamat, kurir langsung datang ambil timbang di tempat.' },
    ],
    faqItems: [
      { q: 'Apakah cucian saya dicampur dengan pakaian orang lain?', a: 'Tidak pernah! Prinsip utama Binar Laundry adalah 1 Mesin 1 Pelanggan. Pakaian Anda diproses tersendiri di drum mesin terpisah.' },
      { q: 'Bagaimana cara meminta layanan antar-jemput cucian?', a: 'Cukup klik tombol WhatsApp, kirimkan lokasi share-loc dan waktu penjemputan, kurir kami akan segera datang.' },
      { q: 'Bagaimana jika ada pakaian yang tertukar atau rusak?', a: 'Setiap proses melalui barcode scanner saat timbang. Jika ada kelalaian, kami ganti rugi sesuai ketentuan asuransi cucian kami.' },
    ],
    aboutStory: {
      title: 'Solusi Pakaian Bersih Bebas Repot untuk Keluarga dan Profesional Modern',
      story: 'Binar Laundry mengoperasikan mesin komersial mutakhir dengan sistem air Reverse Osmosis tanpa kapur. Kami memperlakukan setiap helai pakaian pelanggan seperti milik kami sendiri.',
      stats: [
        { value: '45.000+', label: 'Kg Cucian / Bulan' },
        { value: '1 Mesin', label: '1 Pelanggan Khusus' },
        { value: '14 Hari', label: 'Wangi Tahan Lama' },
      ],
    },
    categoriesList: ['Semua Paket', '🧺 Kiloan Reguler', '⚡ Express Kilat 6 Jam', '🛏️ Bedcover & Selimut', '👔 Satuan Dry Clean'],
  },

  barber: {
    key: 'barber',
    name: 'Barbershop & Grooming',
    categoryLabel: 'Cukur Rambut & Salon',
    icon: '💈',
    badge: 'Perawatan Pria',
    tagline: 'Booking jadwal kapster favorit tanpa antre, pomade, dan hot towel shave',
    storeName: 'Gentleman Vault Barbershop',
    heroHeadline: 'Potongan Rambut Presisi, Hot Towel Shave & Kursi Barber Klasik.',
    heroSubhead: 'Relaksasi perawatan pria profesional dengan kapster berpengalaman. Free konsultasi gaya rambut sesuai kontur wajah.',
    heroBadge: 'PREMIUM MENS GROOMING & LOUNGE',
    promoText: 'Paket Gentleman Complete Diskon 15% Jam 10.00-14.00! Kode:',
    promoCode: 'VAULTCUT',
    address: 'Jl. Senopati No. 54, Kebayoran Baru, Jakarta Selatan',
    hours: 'Senin - Minggu: 10:00 - 21:30 WIB',
    phoneWa: '0812-9911-2233',
    recommendedFont: 'playfair',
    recommendedGrid: '3',
    contactLayout: 'booking_form',
    galleryLayout: 'carousel_row',
    testimonialLayout: 'quote_single',
    aboutLayout: 'story_split',
    faqLayout: 'accordion_1',
    bgPresetUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80',
    products: [
      {
        id: 'p_br_1',
        title: 'Classic Gentleman Haircut + Wash + Hair Tonic',
        category: 'Haircut & Styling',
        price: 65000,
        badge: 'Best Seller',
        desc: 'Potongan rambut presisi, cuci rambut air hangat/dingin, pijat kepala relaksasi, dan penataan styling pomade.',
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_br_2',
        title: 'Royal Hot Towel Shave + Essential Oil Massage',
        category: 'Shave & Beard',
        price: 55000,
        badge: 'Relaksasi Mewah',
        desc: 'Cukur jenggot/kumis halus dengan pisau silet baru steril, kompres handuk hangat rempah, dan aftershave dingin.',
        imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_br_3',
        title: 'Hair Coloring Treatment & Grey Hair Blending',
        category: 'Coloring & Masker',
        price: 180000,
        badge: 'Tampil Awet Muda',
        desc: 'Pewarnaan rambut hitam alami atau fashion color (ash grey/blonde) dengan cat rambut bebas amonia perih.',
        imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_br_4',
        title: 'Vault Matte Clay Pomade 100g High Hold',
        category: 'Produk Grooming',
        price: 95000,
        badge: 'Produk Asli',
        desc: 'Daya tahan kuat seharian tanpa kilap berminyak, mudah dibilas air (water-based), aroma vanila tembakau maskulin.',
        imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
      },
    ],
    pages: [
      {
        id: 'page_barbers_br',
        slug: 'profil-kapster',
        title: 'Profil Kapster & Master Barber',
        badge: 'Spesialis Pria',
        category: 'about',
        summary: 'Pengalaman jam terbang tiap kapster, spesialisasi gaya rambut (Fade, Taper, Pompadour, Mullet, French Crop).',
        icon: '💈',
      },
      {
        id: 'page_price_br',
        slug: 'price-list-grooming',
        title: 'Daftar Menu Layanan Lengkap',
        badge: 'Price List',
        category: 'custom',
        summary: 'Daftar tarif potong rambut anak/dewasa, beard grooming, hair spa charcoal, dan paket pernikahan pria.',
        icon: '✂️',
      },
      {
        id: 'page_booking_br',
        slug: 'jadwal-booking',
        title: 'Panduan Reservasi Bebas Antre',
        badge: 'Prioritas Jam',
        category: 'custom',
        summary: 'Panduan reservasi slot waktu kunjungan agar Anda tiba di lokasi dan langsung duduk di kursi barber.',
        icon: '📅',
      },
    ],
    galleryPhotos: [
      { name: 'Kursi Barber Kulit Vintage', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80' },
      { name: 'Deretan Gunting & Razor Steril', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80' },
      { name: 'Proses Hot Towel Treatment', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80' },
      { name: 'Lounge Tunggu & Kopi Gratis', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80' },
    ],
    testimonials: [
      { author: 'Reza Rahardian', city: 'Jakarta Selatan', rating: 5, quote: 'Skin fade-nya luar biasa rapi. Kapsternya komunikatif dan kasih saran bentuk potongan yang cocok sama bentuk muka saya.' },
      { author: 'Kevin Sanjaya', city: 'Jakarta Barat', rating: 5, quote: 'Hot towel shave-nya bikin rileks banget setelah capek seminggu kerja. Tempat bersih, wangi, dan kopinya enak.' },
    ],
    faqItems: [
      { q: 'Apakah harus booking terlebih dahulu untuk potong rambut?', a: 'Sangat disarankan booking lewat WhatsApp agar Anda tidak perlu menunggu saat jam ramai (after-office & weekend).' },
      { q: 'Apakah pisau silet yang digunakan higienis?', a: 'Kami menggunakan silet sekali pakai (disposable blade) baru yang dibuka langsung di depan Anda untuk setiap pelanggan.' },
      { q: 'Apakah melayani potongan rambut anak-anak?', a: 'Ya, kapster kami sangat sabar dan berpengalaman menangani anak-anak dengan kursi khusus dan fasilitas ramah anak.' },
    ],
    aboutStory: {
      title: 'Ruang Perawatan Diri Khusus Pria dengan Standar Ketelitian Tertinggi',
      story: 'Gentleman Vault menghidupkan kembali tradisi barbershop klasik dengan sentuhan modern. Kami memadukan keterampilan gunting tangan, pisau cukur presisi, dan suasana santai yang ramah.',
      stats: [
        { value: '15.000+', label: 'Pria Ganteng Puas' },
        { value: '100%', label: 'Pisau Sekali Pakai' },
        { value: '6 Kapster', label: 'Master Bersertifikat' },
      ],
    },
    categoriesList: ['Semua Layanan', '✂️ Haircut & Styling', '🪒 Shave & Beard', '🎨 Coloring & Masker', '🧴 Produk Grooming'],
  },

  clinic: {
    key: 'clinic',
    name: 'Klinik Herbal & Skincare',
    categoryLabel: 'Kesehatan & Apotek',
    icon: '🏥',
    badge: 'Herbal Terdaftar BPOM',
    tagline: 'Konsultasi herbalis, jamu ekstrak organik, suplemen daya tahan tubuh',
    storeName: 'Nava Sehat Herbal & Skincare',
    heroHeadline: 'Solusi Alami Kebugaran & Kulit Sehat, Terdaftar BPOM & Halal.',
    heroSubhead: 'Konsultasi herbalis berpengalaman, racikan ekstrak rempah Nusantara terstandar uji lab, aman & bebas kimia sintetis.',
    heroBadge: 'APOTEK HERBAL & DERMATOLOGY ALAMI',
    promoText: 'Free Konsultasi Kesehatan + Diskon 20% Paket Imunitas! Kode:',
    promoCode: 'NAVASEHAT',
    address: 'Jl. Raya Pajajaran No. 88, Bogor Timur',
    hours: 'Senin - Sabtu: 08:30 - 20:00 WIB',
    phoneWa: '0813-4455-6677',
    recommendedFont: 'dmsans',
    recommendedGrid: '4',
    contactLayout: 'split_map',
    galleryLayout: 'grid_3',
    testimonialLayout: 'stars_3',
    aboutLayout: 'stats_counter',
    faqLayout: 'grid_cards_2',
    bgPresetUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80',
    products: [
      {
        id: 'p_cl_1',
        title: 'Ekstrak Temulawak & Meniran Murni 60 Kapsul',
        category: 'Imunitas & Hati',
        price: 85000,
        badge: 'BPOM TR213345',
        desc: 'Menjaga fungsi hati, meningkatkan daya tahan tubuh, dan meredakan peradangan lambung maag kronis.',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_cl_2',
        title: 'Madu Hutan Liar Murni Multiflora Flores 500g',
        category: 'Madu Organik',
        price: 115000,
        badge: 'Murni 100%',
        desc: 'Dipanen langsung dari sarang lebah pohon sialang tanpa pemanasan kimia, kaya enzim diastase dan antioksidan.',
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_cl_3',
        title: 'Serum Botanical Bakuchiol Anti-Aging 30ml',
        category: 'Skincare Alami',
        price: 135000,
        badge: 'Aman Bumil & Busui',
        desc: 'Alternatif retinol alami berbasis tanaman untuk mengencangkan kulit, menyamarkan flek hitam, dan mencerahkan wajah.',
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p_cl_4',
        title: 'Teh Celup Daun Kelor & Bunga Telang Organik',
        category: 'Minuman Herbal',
        price: 45000,
        badge: 'Detoks Alami',
        desc: 'Kaya nutrisi polifenol, melancarkan peredaran darah, meredakan stres, dan menjaga kualitas tidur nyenyak.',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
      },
    ],
    pages: [
      {
        id: 'page_bpom_cl',
        slug: 'sertifikasi-bpom',
        title: 'Legalitas BPOM & Uji Laboratorium',
        badge: 'Terverifikasi',
        category: 'about',
        summary: 'Nomor registrasi resmi Badan POM RI, sertifikat Halal Kemenag, dan hasil uji cemaran logam berat.',
        icon: '🛡️',
      },
      {
        id: 'page_consult_cl',
        slug: 'konsultasi-herbalis',
        title: 'Profil Herbalis & Tanya Resep',
        badge: 'Konsultasi Gratis',
        category: 'custom',
        summary: 'Latar belakang praktisi pengobatan tradisional terdaftar dan formulasi ramuan sesuai keluhan Anda.',
        icon: '🩺',
      },
      {
        id: 'page_usage_cl',
        slug: 'panduan-dosis',
        title: 'Aturan Pakai & Dosis Aman',
        badge: 'Panduan Pasien',
        category: 'faq',
        summary: 'Cara konsumsi herbal yang benar sebelum/sesudah makan, jeda obat dokter, dan petunjuk untuk anak/lansia.',
        icon: '📋',
      },
    ],
    galleryPhotos: [
      { name: 'Laboratorium Ekstraksi Bersih', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kebun Tanaman Obat Organik', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Ruang Konsultasi Ramah Pasien', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sertifikat Uji BPOM & Halal', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
    ],
    testimonials: [
      { author: 'Dewi Anggraini', city: 'Bogor', rating: 5, quote: 'Badan terasa jauh lebih bugar dan asam lambung jarang kumat setelah rutin minum temulawak Nava. Madunya juga asli berbusa alami.' },
      { author: 'Siti Nurhaliza', city: 'Depok', rating: 5, quote: 'Serum bakuchiol-nya cocok banget di kulit sensitif saya. Flek bekas jerawat cepat memudar tanpa perih atau kemerahan.' },
    ],
    faqItems: [
      { q: 'Apakah produk herbal di sini sudah terdaftar BPOM?', a: 'Ya, seluruh produk jamu, kapsul herbal, dan skincare Nava telah mengantongi izin edar resmi BPOM dan sertifikat Halal.' },
      { q: 'Bolehkah mengonsumsi herbal ini bersamaan dengan resep dokter?', a: 'Boleh, namun berikan jeda waktu 1 hingga 2 jam antara obat kimia dokter dan ramuan herbal agar khasiat optimal.' },
      { q: 'Apakah melayani konsultasi gratis sebelum membeli?', a: 'Tentu! Anda bisa konsultasi langsung dengan apoteker/herbalis kami via WhatsApp untuk memilih produk yang tepat.' },
    ],
    aboutStory: {
      title: 'Menghubungkan Kearifan Tradisi Herbal Nusantara dengan Standar Medis Modern',
      story: 'Nava Sehat didirikan dengan tekad mengembalikan kepercayaan masyarakat pada herbal Indonesia. Kami memilih bibit rempah terbaik dari perkebunan organik dan mengekstraknya secara higienis.',
      stats: [
        { value: '25.000+', label: 'Keluarga Terbantu' },
        { value: '100%', label: 'Terdaftar BPOM' },
        { value: '0%', label: 'Bahan Kimia Berbahaya' },
      ],
    },
    categoriesList: ['Semua Produk', '🌿 Imunitas & Hati', '🍯 Madu Organik', '✨ Skincare Alami', '🍵 Minuman Herbal'],
  },
};

export const BUSINESS_CATEGORIES_LIST: { key: BusinessCategoryKey; name: string; icon: string; categoryLabel: string; badge: string; highlight: string }[] = [
  { key: 'fnb', name: 'Kafe & Resto', icon: '☕', categoryLabel: 'Kuliner & Kedai Kopi', badge: 'Katalog FnB', highlight: 'Flores Bajawa, Pastry & Cold Brew' },
  { key: 'workshop', name: 'Bengkel & Otomotif', icon: '🔧', categoryLabel: 'Servis Motor & Mobil', badge: 'Jasa & Sparepart', highlight: 'Tune-Up, Ganti Oli & Scan OBD2' },
  { key: 'fashion', name: 'Distro & Fashion', icon: '👕', categoryLabel: 'Streetwear & Apparel', badge: 'Koleksi Retail', highlight: 'Oversized Tee 16s & Cargo Pants' },
  { key: 'laundry', name: 'Laundry Kiloan', icon: '🧺', categoryLabel: 'Cuci & Setrika Uap', badge: 'Layanan Harian', highlight: '1 Mesin 1 Pelanggan & Antar Jemput' },
  { key: 'barber', name: 'Barbershop & Grooming', icon: '💈', categoryLabel: 'Cukur Rambut & Salon', badge: 'Perawatan Pria', highlight: 'Haircut Fade, Shave & Pomade' },
  { key: 'clinic', name: 'Klinik Herbal & Skincare', icon: '🏥', categoryLabel: 'Kesehatan & Apotek', badge: 'BPOM & Halal', highlight: 'Temulawak, Madu Murni & Serum' },
];

export const CONTACT_LAYOUT_OPTIONS = [
  { id: 'split_map', name: 'Split Card + Pin Google Maps', desc: 'Kartu info kontak di kiri + pin visual peta Google Maps di kanan.', icon: '🗺️' },
  { id: 'three_cards', name: '3 Kartu Sejajar Grid', desc: '3 kartu terpisah: WhatsApp CS, Alamat Lokasi, dan Jam Buka.', icon: '💳' },
  { id: 'compact_bar', name: '1 Baris Strip Minimalis', desc: 'Format horizontal hemat tempat dengan tombol WhatsApp hijau tegas.', icon: '⚡' },
  { id: 'booking_form', name: 'Formulir Booking Cepat WA', desc: 'Formulir interaktif bagi pembeli untuk reservasi/janji temu ke WA.', icon: '📅' },
];

export const GALLERY_LAYOUT_OPTIONS = [
  { id: 'grid_3', name: '3 Kolom Simetris Klasik', desc: 'Grid seimbang dan proporsional untuk dokumentasi suasana.', icon: '🖼️' },
  { id: 'grid_2', name: '2 Kolom Lebar Foto Besar', desc: 'Foto berukuran besar mendominasi pandangan pembeli.', icon: '📸' },
  { id: 'grid_4', name: '4 Kolom Padat Kompak', desc: 'Menampilkan banyak foto spot sekaligus secara rapi.', icon: '🎛️' },
  { id: 'carousel_row', name: 'Baris Horizontal Geser', desc: 'Format scroll ke samping ala feed Instagram Story yang modern.', icon: '📱' },
];

export const TESTIMONIAL_LAYOUT_OPTIONS = [
  { id: 'cards_2', name: '2 Kolom Kartu Review Sejajar', desc: 'Dua kartu ulasan berdampingan dengan kutipan lengkap.', icon: '💬' },
  { id: 'stars_3', name: '3 Kolom Rating Bintang Padat', desc: 'Ulasan ringkas dengan rating bintang 5 yang meyakinkan.', icon: '⭐' },
  { id: 'quote_single', name: '1 Kolom Kutipan Besar Editorial', desc: 'Kutipan testimoni besar yang menonjol dan elegan.', icon: '📜' },
];

export const ABOUT_LAYOUT_OPTIONS = [
  { id: 'story_split', name: 'Split Kisah Narasi + Foto', desc: 'Cerita filosofi bisnis di kiri dengan bukti visual usaha di kanan.', icon: '📖' },
  { id: 'pillars_3', name: '3 Pilar Nilai Keunggulan', desc: 'Tiga kartu nilai utama: Mutu Terjamin, Kecepatan, dan Transparansi.', icon: '🏛️' },
  { id: 'stats_counter', name: '4 Angka Statistik Pencapaian', desc: 'Angka pencapaian besar (Pelanggan puas, jam terbang, garansi).', icon: '📊' },
];

export const FAQ_LAYOUT_OPTIONS = [
  { id: 'accordion_1', name: '1 Kolom Accordion Rapi', desc: 'Daftar tanya jawab vertikal bertingkat yang nyaman dibaca.', icon: '📑' },
  { id: 'grid_cards_2', name: '2 Kolom Grid Kartu Q&A', desc: 'Dua kolom kartu tanya jawab modern bersebelahan.', icon: '🗂️' },
];

export default function RakitWebPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [activePreviewPage, setActivePreviewPage] = useState<string>('home');
  const [isSimulatingLoading, setIsSimulatingLoading] = useState(false);
  const [previewSelectedProduct, setPreviewSelectedProduct] = useState<string | null>(null);

  // --- TEMPLATE HALAMAN PRESET SIAP PAKAI ---
  const PRESET_EXTRA_PAGES: ConfigCustomPage[] = [
    {
      id: 'page_about',
      slug: 'tentang-kami',
      title: 'Tentang Kami',
      badge: 'Profil Usaha',
      category: 'about',
      summary: 'Sejarah kedai, filosofi biji kopi single origin, dan kemitraan 40+ petani lokal di Bajawa NTT.',
      icon: '📖',
    },
    {
      id: 'page_gallery',
      slug: 'galeri-suasana',
      title: 'Galeri & Suasana',
      badge: 'Spot Foto',
      category: 'gallery',
      summary: 'Dokumentasi visual interior, barista brew bar, ruang santai nyaman, dan proses sangrai artisan.',
      icon: '📸',
    },
    {
      id: 'page_faq',
      slug: 'faq-bantuan',
      title: 'Tanya Jawab (FAQ)',
      badge: 'Pusat Bantuan',
      category: 'faq',
      summary: 'Jawaban lengkap cara pemesanan, pengiriman instan/ekspedisi, metode bayar QRIS, dan garansi.',
      icon: '❓',
    },
    {
      id: 'page_warranty',
      slug: 'garansi-kualitas',
      title: 'Garansi & Kualitas',
      badge: 'SLA Mutu',
      category: 'warranty',
      summary: 'Komitmen garansi kesegaran biji kopi maksimal 7 hari setelah sangrai & 100% jaminan ganti baru.',
      icon: '🛡️',
    },
    {
      id: 'page_branches',
      slug: 'daftar-cabang',
      title: 'Daftar Cabang & Outlet',
      badge: '3 Lokasi Fisik',
      category: 'branches',
      summary: 'Lokasi cabang Bajawa, Jakarta Selatan, dan Bandung Dago lengkap dengan navigasi Google Maps.',
      icon: '📍',
    },
  ];

  // --- STATE JENIS BISNIS ONBOARDING (KAFE, BENGKEL, DISTRO, LAUNDRY, BARBER, KLINIK) ---
  const [selectedBusinessCategory, setSelectedBusinessCategory] = useState<BusinessCategoryKey>('fnb');

  // --- STATE TATA LETAK KOMPREHENSIF PER BAGIAN ---
  const [contactLayout, setContactLayout] = useState<'split_map' | 'three_cards' | 'compact_bar' | 'booking_form'>('split_map');
  const [galleryLayout, setGalleryLayout] = useState<'grid_3' | 'grid_2' | 'grid_4' | 'carousel_row'>('grid_3');
  const [testimonialLayout, setTestimonialLayout] = useState<'cards_2' | 'stars_3' | 'quote_single'>('cards_2');
  const [aboutLayout, setAboutLayout] = useState<'story_split' | 'pillars_3' | 'stats_counter'>('story_split');
  const [faqLayout, setFaqLayout] = useState<'accordion_1' | 'grid_cards_2'>('accordion_1');
  const [layoutStudioTab, setLayoutStudioTab] = useState<'catalog' | 'contact' | 'gallery' | 'testimonials' | 'about' | 'faq'>('catalog');

  // --- STATE IDENTITAS & KONTEN WEBSITE OTOMATIS BERADAPTASI ---
  const [storeName, setStoreName] = useState(BUSINESS_PRESETS.fnb.storeName);
  const heroHeadlineState = useState(BUSINESS_PRESETS.fnb.heroHeadline);
  const [heroHeadline, setHeroHeadline] = heroHeadlineState;
  const [heroSubhead, setHeroSubhead] = useState(BUSINESS_PRESETS.fnb.heroSubhead);
  const [heroBadge, setHeroBadge] = useState(BUSINESS_PRESETS.fnb.heroBadge);
  const [promoText, setPromoText] = useState(BUSINESS_PRESETS.fnb.promoText);
  const [promoCode, setPromoCode] = useState(BUSINESS_PRESETS.fnb.promoCode);
  const [storeAddress, setStoreAddress] = useState(BUSINESS_PRESETS.fnb.address);
  const [storeHours, setStoreHours] = useState(BUSINESS_PRESETS.fnb.hours);
  const [storeWa, setStoreWa] = useState(BUSINESS_PRESETS.fnb.phoneWa);
  const [galleryPhotos, setGalleryPhotos] = useState(BUSINESS_PRESETS.fnb.galleryPhotos);
  const [testimonialsList, setTestimonialsList] = useState(BUSINESS_PRESETS.fnb.testimonials);
  const [faqItemsList, setFaqItemsList] = useState(BUSINESS_PRESETS.fnb.faqItems);
  const [aboutStoryData, setAboutStoryData] = useState(BUSINESS_PRESETS.fnb.aboutStory);
  const [categoriesList, setCategoriesList] = useState(BUSINESS_PRESETS.fnb.categoriesList);

  // --- STATE MULTI-HALAMAN KUSTOM WEBSITE (+RP 50.000 / HALAMAN / TAHUN) ---
  const [customPagesList, setCustomPagesList] = useState<ConfigCustomPage[]>(BUSINESS_PRESETS.fnb.pages);
  const [newCustomPageTitle, setNewCustomPageTitle] = useState('');

  // Handler Pilih Jenis Bisnis Onboarding (Semua data beradaptasi 100%)
  const handleSelectBusinessCategory = (catKey: BusinessCategoryKey) => {
    const preset = BUSINESS_PRESETS[catKey];
    if (!preset) return;
    setSelectedBusinessCategory(catKey);
    setStoreName(preset.storeName);
    setHeroHeadline(preset.heroHeadline);
    setHeroSubhead(preset.heroSubhead);
    setHeroBadge(preset.heroBadge);
    setPromoText(preset.promoText);
    setPromoCode(preset.promoCode);
    setStoreAddress(preset.address);
    setStoreHours(preset.hours);
    setStoreWa(preset.phoneWa);
    setSelectedFont(preset.recommendedFont);
    setSelectedGrid(preset.recommendedGrid);
    setContactLayout(preset.contactLayout);
    setGalleryLayout(preset.galleryLayout);
    setTestimonialLayout(preset.testimonialLayout);
    setAboutLayout(preset.aboutLayout);
    setFaqLayout(preset.faqLayout);
    setBgImage(preset.bgPresetUrl);
    setProductsList(preset.products);
    setCustomPagesList(preset.pages);
    setGalleryPhotos(preset.galleryPhotos);
    setTestimonialsList(preset.testimonials);
    setFaqItemsList(preset.faqItems);
    setAboutStoryData(preset.aboutStory);
    setCategoriesList(preset.categoriesList);
    setActivePreviewPage('home');
  };

  // --- PRESET FOTO MENU PRODUK (HIGH RESOLUTION NO AI SLOP) ---
  const MENU_PHOTO_PRESETS = [
    {
      name: 'Espresso Crema',
      category: 'Specialty Coffee',
      url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Es Kopi Susu Aren',
      category: 'Signature Drink',
      url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Butter Croissant',
      category: 'Pastry & Bakery',
      url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Tune-Up Injeksi',
      category: 'Servis Otomotif',
      url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Ganti Oli 1L',
      category: 'Servis Otomotif',
      url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Kaos Boxy 16s',
      category: 'Fashion Retail',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Cuci Kiloan Higienis',
      category: 'Laundry Express',
      url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Haircut Gentleman',
      category: 'Barbershop Grooming',
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // --- STATE KATALOG MENU & FOTO PRODUK WEBSITE (BEBAS TARUH FOTO MENU) ---
  const [productsList, setProductsList] = useState<ConfigProductItem[]>(BUSINESS_PRESETS.fnb.products);

  // --- STATE PAKET ADD-ON OPSIONAL RESMI (PRD BAB III & BAB XI) ---
  const OFFICIAL_ADDONS: ConfigOptionalAddon[] = [
    {
      id: 'addon_domain',
      name: 'Domain Kustom Pribadi (.COM / .ID / .MY.ID)',
      badge: 'Branding Bonafide',
      category: 'Infrastruktur DNS',
      price: 150000,
      period: '/ tahun',
      desc: 'Pakai domain Anda sendiri tanpa embel-embel subdomain. Konfigurasi DNS Anycast otomatis & SSL gratis seumur hidup.',
      icon: '🌐',
    },
    {
      id: 'addon_cashier',
      name: 'Akun Staf / Kasir Tambahan (SiKasir Multi-Staff)',
      badge: 'Multi-User POS',
      category: 'Operasional Website',
      price: 50000,
      period: '/ tahun',
      desc: 'Tambahkan hak akses login terpisah untuk barista, pelayan meja, dan kasir dengan proteksi PIN unik per staf.',
      icon: '👥',
    },
    {
      id: 'addon_qris_auto',
      name: 'Integrasi Payment Gateway & QRIS Dinamis Otomatis',
      badge: 'Settlement Instan',
      category: 'Billing & Keuangan',
      price: 50000,
      period: '/ tahun',
      desc: 'Penerbitan QRIS otomatis per transaksi di website dengan verifikasi pembayaran real-time langsung ke rekening Anda.',
      icon: '💳',
    },
    {
      id: 'addon_bilingual',
      name: 'Fitur Multi-Bahasa (Bilingual ID / EN Switcher)',
      badge: 'Wisatawan & Turis',
      category: 'Lokalisasi Bahasa',
      price: 75000,
      period: '/ tahun',
      desc: 'Peralihan instan Bahasa Indonesia dan English pada seluruh menu katalog dan profil website Anda untuk target ekspatriat.',
      icon: '🌍',
    },
    {
      id: 'addon_seo_maps',
      name: 'SEO Specialist Setup & Google Maps Sync Kilat',
      badge: 'Google Rank #1',
      category: 'Pemasaran Organik',
      price: 100000,
      period: '/ tahun',
      desc: 'Indexing kilat di Google Search Console, Rich Snippets OpenGraph WhatsApp, dan verifikasi titik Google Maps bisnis.',
      icon: '📍',
    },
  ];

  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    addon_domain: false,
    addon_cashier: false,
    addon_qris_auto: false,
    addon_bilingual: false,
    addon_seo_maps: false,
  });

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // --- STATE PILIHAN RAKITAN (LENGKAP & NO AI SLOP) ---
  const [selectedFont, setSelectedFont] = useState('jakarta');
  const [selectedGrid, setSelectedGrid] = useState<'2' | '3' | '4' | 'list' | 'masonry'>('3');
  const [selectedNavbar, setSelectedNavbar] = useState<'floating' | 'solid' | 'centered' | 'slim'>('solid');
  const [selectedSurface, setSelectedSurface] = useState<'solid' | 'frosted' | 'deep' | 'flat'>('solid');
  const [selectedRadius, setSelectedRadius] = useState<'sharp' | 'crisp' | 'rounded' | 'pill'>('rounded');
  const [selectedLoading, setSelectedLoading] = useState<'instant' | 'shimmer' | 'progressbar' | 'pulse'>('instant');
  const [selectedCheckoutChannel, setSelectedCheckoutChannel] = useState<'instant_web' | 'bank_transfer' | 'pos_cashier'>('instant_web');

  // --- KUSTOMISASI DETAIL TATA LETAK & BESAR KECIL TEKS (KONTROL PENUH) ---
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [headingScale, setHeadingScale] = useState<'small' | 'normal' | 'large' | 'huge'>('normal');
  const [buttonStyle, setButtonStyle] = useState<'rounded' | 'pill' | 'sharp' | 'block'>('rounded');

  // --- STATE TATA LETAK BEBAS (PINDAH PERABOT RUMAH) ---
  const [sectionOrder, setSectionOrder] = useState<StoreSectionKey[]>([
    'hero',
    'promo',
    'catalog',
    'about',
    'gallery',
    'testimonials',
    'contact',
    'faq',
  ]);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    hero: true,
    promo: true,
    catalog: true,
    about: true,
    gallery: true,
    testimonials: true,
    contact: true,
    faq: true,
  });

  // --- STATE BACKGROUND IMAGE KUSTOM & GALERI ---
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgOpacity, setBgOpacity] = useState<number>(85);
  const [bgBlur, setBgBlur] = useState<number>(0);

  const BACKGROUND_PRESETS = [
    {
      id: 'none',
      name: 'Polos Standar',
      desc: 'Latar netral bersih tanpa gambar',
      url: null,
    },
    {
      id: 'wood',
      name: 'Serat Kayu Artisan',
      desc: 'Tekstur kayu hangat kafe & FnB',
      url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'marble',
      name: 'Marmer Putih Mewah',
      desc: 'Batu marmer bersih butik & klinik',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'dark-mesh',
      name: 'Dark Mesh Tech',
      desc: 'Aksen gelap elegan streetwear & tech',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'grid',
      name: 'Blueprint Minimalis',
      desc: 'Garis geometri modern arsitek',
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'botanical',
      name: 'Botanical Organik',
      desc: 'Nuansa daun lembut bisnis herbal & kafe',
      url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const SECTION_DEFINITIONS: Record<
    StoreSectionKey,
    { label: string; icon: string; category: string; desc: string }
  > = {
    hero: {
      label: 'Banner Utama (Hero Headline & Slogan)',
      icon: '🏛️',
      category: 'Identitas Bisnis',
      desc: 'Judul brand, slogan sambutan, dan deskripsi singkat.',
    },
    promo: {
      label: 'Papan Promo & Pengumuman Berjalan',
      icon: '🏷️',
      category: 'Marketing',
      desc: 'Banner diskon, voucher ongkir, atau promo spesial.',
    },
    catalog: {
      label: 'Katalog Menu & Produk Utama',
      icon: '☕',
      category: 'Inti Website',
      desc: 'Daftar produk dengan format kolom grid pilihan.',
    },
    about: {
      label: 'Cerita Brand & Keunggulan Layanan',
      icon: '📖',
      category: 'Branding',
      desc: 'Filosofi bisnis, sejarah berdirinya, atau profil pengrajin.',
    },
    gallery: {
      label: 'Galeri Foto Suasana & Kedai',
      icon: '📸',
      category: 'Visual Showcase',
      desc: 'Dokumentasi visual interior, barista, dan kebun mitra.',
    },
    testimonials: {
      label: 'Ulasan & Testimoni Pelanggan',
      icon: '⭐',
      category: 'Social Proof',
      desc: 'Komentar bintang 5 dari pembeli terverifikasi.',
    },
    contact: {
      label: 'Kontak WhatsApp, Alamat & Jam Buka',
      icon: '📍',
      category: 'Informasi Kunjungan',
      desc: 'Peta lokasi, rute jalan, dan nomor WA CS resmi.',
    },
    faq: {
      label: 'Tanya Jawab (FAQ) & Kebijakan Garansi',
      icon: '❓',
      category: 'Pusat Bantuan',
      desc: 'Panduan cara beli, transfer, dan garansi kesegaran.',
    },
    categories: {
      label: 'Kategori Produk (Filter Tab)',
      icon: '📑',
      category: 'Navigasi',
      desc: 'Tab filter cepat per kategori barang.',
    },
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      setSectionOrder((prev) => {
        const copy = [...prev];
        const temp = copy[index];
        copy[index] = copy[index - 1];
        copy[index - 1] = temp;
        return copy;
      });
    } else if (direction === 'down' && index < sectionOrder.length - 1) {
      setSectionOrder((prev) => {
        const copy = [...prev];
        const temp = copy[index];
        copy[index] = copy[index + 1];
        copy[index + 1] = temp;
        return copy;
      });
    }
  };

  const toggleSectionVisibility = (key: StoreSectionKey) => {
    setVisibleSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setBgImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- DATA LIBRARY KOMPONEN RAKITAN ---
  const FONT_OPTIONS = [
    {
      id: 'jakarta',
      name: 'Plus Jakarta Sans',
      category: 'Tech Modern Indonesia',
      preview: 'Kopi Flores Bajawa & Ritel Modern',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      price: 0,
    },
    {
      id: 'inter',
      name: 'Inter Display',
      category: 'Ultra Clean & Legible',
      preview: 'Sleek, Neutral, Precision Engine',
      fontFamily: "'Inter', sans-serif",
      price: 0,
    },
    {
      id: 'outfit',
      name: 'Outfit Geometric',
      category: 'Brand Eksklusif & Modern',
      preview: 'Geometri Tegas, Cocok Distro & Kafe',
      fontFamily: "'Outfit', sans-serif",
      price: 0,
    },
    {
      id: 'playfair',
      name: 'Playfair Display',
      category: 'Luxury Serif & Fine Dining',
      preview: 'Restoran Mewah & Klinik Kecantikan',
      fontFamily: "'Playfair Display', Georgia, serif",
      price: 25000,
    },
    {
      id: 'grotesk',
      name: 'Space Grotesk',
      category: 'Futuristik & Creative Agency',
      preview: 'Desain Unik & Studio Kreatif',
      fontFamily: "'Space Grotesk', sans-serif",
      price: 25000,
    },
    {
      id: 'mono',
      name: 'JetBrains Mono',
      category: 'High-Precision Minimalist',
      preview: 'Tabular Figures & Gaya Industrial',
      fontFamily: "'JetBrains Mono', monospace",
      price: 25000,
    },
    {
      id: 'syne',
      name: 'Syne Avant-Garde',
      category: 'High Fashion & Distro Apparel',
      preview: 'Eksentrik, Berani & Menarik Perhatian',
      fontFamily: "'Syne', sans-serif",
      price: 35000,
    },
    {
      id: 'dmsans',
      name: 'DM Sans',
      category: 'Corporate B2B & Layanan',
      preview: 'Profesional, Ramah & Nyaman Dibaca',
      fontFamily: "'DM Sans', sans-serif",
      price: 0,
    },
  ];

  const GRID_OPTIONS = [
    {
      id: '2',
      name: '2 Kolom (Foto Besar)',
      desc: 'Editorial luxury, foto produk tajam mendominasi pandangan pembeli.',
      price: 0,
    },
    {
      id: '3',
      name: '3 Kolom (Standar Bisnis)',
      desc: 'Keseimbangan sempurna antara jumlah produk dan kelegaan visual katalog.',
      price: 0,
    },
    {
      id: '4',
      name: '4 Kolom (Katalog Padat)',
      desc: 'Ideal untuk minimarket, grosir, distributor perkakas & inventaris banyak.',
      price: 25000,
    },
    {
      id: 'list',
      name: '1 Kolom (List Baris Menu)',
      desc: 'Format daftar menu resto, gofood style, atau price list jasa.',
      price: 0,
    },
    {
      id: 'masonry',
      name: 'Asymmetric Masonry',
      desc: 'Tata letak dinamis ala Pinterest untuk portofolio & galeri seni.',
      price: 35000,
    },
  ];

  const NAVBAR_OPTIONS = [
    {
      id: 'solid',
      name: 'Full-Width Sticky Solid',
      desc: 'Header penuh profesional standar korporat dengan batas kontras tinggi.',
      price: 0,
    },
    {
      id: 'floating',
      name: 'Floating Island Glass',
      desc: 'Kapsul navbar melayang dengan efek frosted glass & shadow lembut.',
      price: 25000,
    },
    {
      id: 'centered',
      name: 'Minimalist Centered Logo',
      desc: 'Logo bisnis di tengah dengan menu split kiri-kanan ala butik Paris.',
      price: 25000,
    },
    {
      id: 'slim',
      name: 'Slim Topbar with Contact Strip',
      desc: 'Desain ramping dengan nomor telepon darurat & jam operasional di baris atas.',
      price: 0,
    },
  ];

  const SURFACE_OPTIONS = [
    {
      id: 'solid',
      name: 'Solid 100% Crisp',
      desc: 'Kontras murni, tanpa efek blur, kecepatan render tercepat di edge.',
      price: 0,
    },
    {
      id: 'frosted',
      name: 'Frosted Glass (12px Blur)',
      desc: 'Efek tembus pandang modern dengan latar belakang konten terlihat samar.',
      price: 20000,
    },
    {
      id: 'deep',
      name: 'Deep Smoked Glass (24px)',
      desc: 'Kaca gelap tebal mewah dengan pantulan cahaya mikro ala Apple / Linear.',
      price: 35000,
    },
    {
      id: 'flat',
      name: 'Zero Border Flat',
      desc: 'Minimalis murni tanpa border garis sama sekali, mengandalkan whitespace.',
      price: 0,
    },
  ];

  const RADIUS_OPTIONS = [
    { id: 'sharp', name: 'Sharp 0px (Brutalist)', desc: 'Sudut siku tajam arsitektural.', css: 'rounded-none' },
    { id: 'crisp', name: 'Crisp 8px (Modern)', desc: 'Sudut sedikit membulat standar tech.', css: 'rounded-lg' },
    { id: 'rounded', name: 'Rounded 16px (Friendly)', desc: 'Ramah dan nyaman untuk retail/FnB.', css: 'rounded-2xl' },
    { id: 'pill', name: 'Luxury Pill 24px', desc: 'Sangat melengkung untuk beauty & cafe.', css: 'rounded-3xl' },
  ];

  const LOADING_OPTIONS = [
    {
      id: 'instant',
      name: 'Instant Zero-Lag Edge',
      desc: 'Konten langsung mengudara tanpa skeleton (latensi Anycast Edge 0.03s).',
      price: 0,
    },
    {
      id: 'shimmer',
      name: 'Shimmer Skeleton Loading',
      desc: 'Placeholder berkilau halus saat memuat gambar resolusi tinggi.',
      price: 15000,
    },
    {
      id: 'progressbar',
      name: 'Top Linear Progress Bar',
      desc: 'Garis aksen tipis bergerak di ujung atas browser saat ganti kategori.',
      price: 15000,
    },
    {
      id: 'pulse',
      name: 'Brand Logo Pulse Intro',
      desc: 'Logo bisnis berdenyut halus 0.3 detik pertama saat website pertama kali dibuka.',
      price: 25000,
    },
  ];

  // METODE TRANSAKSI MANDIRI PENGUNJUNG DI DALAM WEBSITE (100% SELF-SERVE)
  const CHECKOUT_CHANNELS = [
    {
      id: 'instant_web',
      name: 'Pesan & Booking Mandiri di Web (Self-Serve)',
      badge: '100% Selesai di Web',
      desc: 'Pengunjung memesan atau booking langsung di dalam website Anda tanpa harus chat manual. Data order tercatat otomatis.',
      buyerFlow: 'Pengunjung pilih item -> isi data langsung di website -> pesanan terekam otomatis di sistem.',
      price: 0,
    },
    {
      id: 'bank_transfer',
      name: 'Pembayaran QRIS & Transfer Langsung di Website',
      badge: 'Langsung ke Rekening Anda',
      desc: 'Pengunjung bertransaksi atau scan QRIS langsung di layar website Anda. Uang 100% di tangan Anda tanpa perantara.',
      buyerFlow: 'Pengunjung scan QRIS di web -> pembayaran terverifikasi otomatis.',
      price: 0,
    },
    {
      id: 'pos_cashier',
      name: 'Reservasi / Bayar di Tempat (Self-Checkin)',
      badge: 'Cocok Jasa & Lokasi Fisik',
      desc: 'Pengunjung memesan online lewat website untuk diambil atau dilayani langsung di lokasi fisik bisnis Anda.',
      buyerFlow: 'Pengunjung terima kode reservasi website -> dilayani langsung di lokasi fisik Anda.',
      price: 0,
    },
  ];

  // --- KALKULASI BIAYA RAKITAN TRANSPARAN (TIDAK SAMPAI 2X LIPAT TEMPLATE) ---
  const BASE_RAKITAN_PRICE = 449000; // Rp 449.000 / tahun (Hanya +Rp 100k di atas paket Mikro dasar)
  const ADDON_PAGE_PRICE = 50000; // Sesuai PRD BAB III: Rp 50.000 / halaman / tahun

  const calculatedTotal = useMemo(() => {
    let total = BASE_RAKITAN_PRICE;

    // Font price
    const fontObj = FONT_OPTIONS.find((f) => f.id === selectedFont);
    if (fontObj) total += fontObj.price;

    // Grid price
    const gridObj = GRID_OPTIONS.find((g) => g.id === selectedGrid);
    if (gridObj) total += gridObj.price;

    // Navbar price
    const navObj = NAVBAR_OPTIONS.find((n) => n.id === selectedNavbar);
    if (navObj) total += navObj.price;

    // Surface price
    const surfObj = SURFACE_OPTIONS.find((s) => s.id === selectedSurface);
    if (surfObj) total += surfObj.price;

    // Extra pages price (+Rp 50.000 / halaman / tahun sesuai PRD Bab III)
    total += customPagesList.length * ADDON_PAGE_PRICE;

    // Loading price
    const loadObj = LOADING_OPTIONS.find((l) => l.id === selectedLoading);
    if (loadObj) total += loadObj.price;

    // Paket Add-on Opsional Resmi
    OFFICIAL_ADDONS.forEach((addon) => {
      if (selectedAddons[addon.id]) {
        total += addon.price;
      }
    });

    return total;
  }, [
    selectedFont,
    selectedGrid,
    selectedNavbar,
    selectedSurface,
    customPagesList.length,
    selectedLoading,
    selectedAddons,
  ]);

  // Handler Multi-Halaman
  const handleAddPresetPage = (preset: ConfigCustomPage) => {
    if (customPagesList.some((p) => p.slug === preset.slug)) {
      setActivePreviewPage(preset.slug);
      return;
    }
    setCustomPagesList((prev) => [...prev, preset]);
    setActivePreviewPage(preset.slug);
  };

  const handleRemovePage = (id: string) => {
    setCustomPagesList((prev) => {
      const remaining = prev.filter((p) => p.id !== id);
      if (activePreviewPage !== 'home' && activePreviewPage !== 'katalog') {
        const stillExists = remaining.some((p) => p.slug === activePreviewPage);
        if (!stillExists) {
          setActivePreviewPage('home');
        }
      }
      return remaining;
    });
  };

  const handleCreateCustomPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomPageTitle.trim()) return;

    const slug = newCustomPageTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newPage: ConfigCustomPage = {
      id: `page_${Date.now()}`,
      slug: slug || `halaman-${Date.now()}`,
      title: newCustomPageTitle.trim(),
      badge: 'Halaman Kustom',
      category: 'custom',
      summary: `Halaman khusus "${newCustomPageTitle.trim()}" yang dibuat mandiri oleh pemilik website.`,
      icon: '📄',
    };

    setCustomPagesList((prev) => [...prev, newPage]);
    setActivePreviewPage(newPage.slug);
    setNewCustomPageTitle('');
  };

  // Handler Upload Foto Menu & Kelola Produk
  const handleProductPhotoUpload = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setProductsList((prev) =>
            prev.map((item) =>
              item.id === productId ? { ...item, imageUrl: uploadEvent.target?.result as string } : item
            )
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = (productId: string, patch: Partial<ConfigProductItem>) => {
    setProductsList((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, ...patch } : item))
    );
  };

  const handleAddNewProduct = () => {
    const nextId = `p${Date.now()}`;
    const newProduct: ConfigProductItem = {
      id: nextId,
      title: 'Menu Baru Istimewa',
      category: 'Spesial Kafe',
      price: 26000,
      badge: 'Baru',
      desc: 'Racikan baru istimewa dengan bahan segar pilihan untuk pelanggan setia.',
      imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    };
    setProductsList((prev) => [...prev, newProduct]);
  };

  const handleDeleteProduct = (productId: string) => {
    if (productsList.length <= 1) {
      alert('Minimal harus ada 1 produk aktif di etalase website Anda.');
      return;
    }
    setProductsList((prev) => prev.filter((item) => item.id !== productId));
  };

  // Current selected font family string
  const activeFontFamily = useMemo(() => {
    return FONT_OPTIONS.find((f) => f.id === selectedFont)?.fontFamily || "'Plus Jakarta Sans', sans-serif";
  }, [selectedFont]);

  // Current selected radius class
  const activeRadiusClass = useMemo(() => {
    return RADIUS_OPTIONS.find((r) => r.id === selectedRadius)?.css || 'rounded-2xl';
  }, [selectedRadius]);

  // Test loading simulation trigger
  const handleTriggerLoadingTest = () => {
    setIsSimulatingLoading(true);
    setTimeout(() => {
      setIsSimulatingLoading(false);
    }, 1200);
  };

  // Helper classes for typography & button customization
  const getTextAlignClass = () => {
    if (textAlign === 'center') return 'text-center items-center justify-center';
    if (textAlign === 'right') return 'text-right items-end justify-end';
    return 'text-left items-start justify-start';
  };

  const getHeadingScaleClass = () => {
    if (headingScale === 'small') return 'text-xs sm:text-sm font-bold';
    if (headingScale === 'large') return 'text-base sm:text-lg font-black';
    if (headingScale === 'huge') return 'text-lg sm:text-xl font-black';
    return 'text-sm sm:text-base font-extrabold';
  };

  const getFullHeadingScaleClass = () => {
    if (headingScale === 'small') return 'text-xl sm:text-2xl font-black';
    if (headingScale === 'large') return 'text-3xl sm:text-5xl font-black';
    if (headingScale === 'huge') return 'text-4xl sm:text-6xl font-black';
    return 'text-2xl sm:text-4xl font-black';
  };

  const getButtonStyleClass = () => {
    if (buttonStyle === 'pill') return 'rounded-full px-3';
    if (buttonStyle === 'sharp') return 'rounded-none px-2';
    if (buttonStyle === 'block') return 'w-full rounded-lg text-center mt-2';
    return `${activeRadiusClass} px-2.5`;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar onOpenOnboarding={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* HERO SECTION: PILIHAN 2 JALUR (TEMPLATE VS RAKIT SENDIRI) */}
        <section className="py-12 sm:py-16 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-800">
                  <Cpu className="w-3.5 h-3.5 text-neutral-950" />
                  <span>STUDIO RAKIT WEBSITE MANDIRI • MULTI-TENANT WAAS</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 leading-tight">
                  Rakit Website Bisnis Anda Seperti Merakit PC.
                </h1>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  Pilih tipografi font, struktur kolom katalog, tata letak navbar, efek keburaman permukaan,
                  jumlah halaman tambahan, dan alur checkout pembeli sendiri. Biaya dihitung transparan
                  komponen demi komponen dengan live preview interaktif seketika!
                </p>
              </div>

              {/* Box Pembanding 2 Opsi Resmi */}
              <div className="w-full lg:max-w-md p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  2 PILIHAN RESMI DI SIVILIZE SPACE:
                </h4>

                <div className="p-3.5 rounded-xl bg-white border border-neutral-200 flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-xs font-bold text-neutral-900">1. Sewa Template Jadi</strong>
                    <p className="text-[11px] text-neutral-500">Mulai Rp 349.000/thn • Siap dalam 60 detik</p>
                  </div>
                  <Link
                    href="/harga"
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 text-[11px] font-bold text-neutral-800 hover:bg-neutral-100"
                  >
                    Pilih Template
                  </Link>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 text-white flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>2. Rakit Custom Sendiri</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500 text-neutral-950 font-black">
                        AKTIF
                      </span>
                    </strong>
                    <p className="text-[11px] text-neutral-400">Mulai Rp 449.000/thn • Bebas Rombak</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">Sedang Dirakit ↓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKBENCH STUDIO RAKIT (DUAL INDEPENDENT SCROLL: KIRI KONFIGURATOR, KANAN NOTA & PREVIEW) */}
        <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-8 pb-28 lg:pb-8">
          {/* Dual Scroll Mode Indicator on Desktop */}
          <div className="hidden lg:flex items-center justify-between text-xs font-mono text-neutral-500 mb-3 px-1">
            <span className="flex items-center gap-1.5 font-bold text-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Scroll Panel 1: Konfigurasi Komponen Rakitan (Modul 0 - 12)</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-neutral-700">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Scroll Panel 2: Nota Rakitan BOM & Live Canvas Interaktif</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* KOLOM KIRI: LIBRARY MODUL KOMPONEN RAKITAN (7 KOLOM - INDEPENDENT SCROLL PANEL 1) */}
            <div className="lg:col-span-7 space-y-8 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-3 custom-scrollbar">
              {/* LANGKAH 0: PILIH JENIS BISNIS ANDA (AUTO-ADAPT INDUSTRY ONBOARDING) */}
              <div className="p-6 rounded-3xl bg-white border-2 border-neutral-900 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm sm:text-base text-neutral-950">
                          0. Pilih Bidang Bisnis Anda (Otomatis Beradaptasi)
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-100 text-emerald-800 font-bold">
                          1-Klik Adaptasi
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500">
                        Pilih jenis usaha Anda sebelum merakit. Seluruh nama brand, headline, katalog produk, layout, foto, dan FAQ akan menyesuaikan seketika!
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    Aktif: {BUSINESS_PRESETS[selectedBusinessCategory]?.name}
                  </span>
                </div>

                {/* 6 Business Selector Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {BUSINESS_CATEGORIES_LIST.map((biz) => {
                    const isSelected = selectedBusinessCategory === biz.key;
                    return (
                      <button
                        key={biz.key}
                        type="button"
                        onClick={() => handleSelectBusinessCategory(biz.key)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-md ring-2 ring-neutral-950/20'
                            : 'border-neutral-200 bg-neutral-50/90 text-neutral-900 hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-2xl">{biz.icon}</span>
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {isSelected ? '✓ AKTIF' : biz.badge}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-xs tracking-tight">{biz.name}</h4>
                        <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {biz.categoryLabel}
                        </p>
                        <p className={`text-[9px] font-mono mt-1.5 truncate ${isSelected ? 'text-emerald-300' : 'text-neutral-600'}`}>
                          • {biz.highlight}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">⚡ Otomatis Menyesuaikan:</span>
                    <span className="text-neutral-600 text-[11px]">
                      Katalog menu, foto resolusi tinggi, tata letak kontak & FAQ berubah 100% mengikuti {BUSINESS_PRESETS[selectedBusinessCategory]?.name}.
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-neutral-500 shrink-0 hidden md:inline-block">
                    Bisa Ganti Kapan Saja
                  </span>
                </div>
              </div>

              {/* MODUL 1: TIPOGRAFI & FONT */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Type className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950">1. Koleksi Tipografi & Font</h3>
                      <p className="text-[11px] text-neutral-500">Pilih karakter font yang merefleksikan identitas bisnis Anda</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">8 Pilihan Font</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFont(f.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedFont === f.id
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs" style={{ fontFamily: f.fontFamily }}>
                          {f.name}
                        </span>
                        {f.price > 0 ? (
                          <span className={`text-[10px] font-mono font-bold ${selectedFont === f.id ? 'text-emerald-300' : 'text-neutral-600'}`}>
                            +{formatRupiah(f.price)}
                          </span>
                        ) : (
                          <span className={`text-[10px] font-mono ${selectedFont === f.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            Termasuk
                          </span>
                        )}
                      </div>
                      <p className={`text-[10px] ${selectedFont === f.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {f.category}
                      </p>
                      <p
                        className={`text-xs mt-2 italic truncate ${selectedFont === f.id ? 'text-neutral-200' : 'text-neutral-700'}`}
                        style={{ fontFamily: f.fontFamily }}
                      >
                        &ldquo;{f.preview}&rdquo;
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* MODUL 2: STUDIO GRID & TATA LETAK KOMPREHENSIF SELURUH BAGIAN WEBSITE */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2">
                        <span>2. Studio Grid & Tata Letak Komprehensif Seluruh Bagian Website</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-100 text-emerald-800 font-mono">
                          Lengkap Semua Section
                        </span>
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Atur varian struktur kolom dan tata letak untuk Katalog, Kontak, Galeri, Testimoni, Cerita, & FAQ
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">6 Kategori Layout</span>
                </div>

                {/* Sub-Tab Selector for Layout Sections */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold scrollbar-none border-b border-neutral-100">
                  {[
                    { id: 'catalog', label: '☕ Grid Katalog', count: '5 Pilihan' },
                    { id: 'contact', label: '📍 Layout Kontak', count: '4 Pilihan' },
                    { id: 'gallery', label: '📸 Layout Galeri', count: '4 Pilihan' },
                    { id: 'testimonials', label: '⭐ Layout Testimoni', count: '3 Pilihan' },
                    { id: 'about', label: '📖 Layout Cerita & Nilai', count: '3 Pilihan' },
                    { id: 'faq', label: '❓ Layout FAQ Bantuan', count: '2 Pilihan' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLayoutStudioTab(tab.id as any)}
                      className={`px-3 py-2 rounded-xl shrink-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                        layoutStudioTab === tab.id
                          ? 'bg-neutral-950 text-white shadow-xs'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${layoutStudioTab === tab.id ? 'bg-neutral-800 text-emerald-300' : 'bg-white/80 text-neutral-500'}`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* TAB CONTENT: 1. GRID KATALOG */}
                {layoutStudioTab === 'catalog' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-neutral-800 font-bold">Pilihan Kolom & Format Grid Katalog Menu:</strong>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Aktif: {selectedGrid === 'list' ? 'List Baris' : `${selectedGrid} Kolom`}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {GRID_OPTIONS.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setSelectedGrid(g.id as '2' | '3' | '4' | 'list' | 'masonry')}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            selectedGrid === g.id
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-xs">{g.name}</span>
                            {g.price > 0 ? (
                              <span className={`text-[10px] font-mono font-bold ${selectedGrid === g.id ? 'text-emerald-300' : 'text-neutral-600'}`}>
                                +{formatRupiah(g.price)}
                              </span>
                            ) : (
                              <span className={`text-[10px] font-mono ${selectedGrid === g.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                Termasuk
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] leading-relaxed ${selectedGrid === g.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {g.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: 2. LAYOUT KONTAK */}
                {layoutStudioTab === 'contact' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-neutral-800 font-bold">Pilihan Tata Letak Kontak & Lokasi Bisnis:</strong>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Aktif: {CONTACT_LAYOUT_OPTIONS.find(c => c.id === contactLayout)?.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CONTACT_LAYOUT_OPTIONS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setContactLayout(c.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            contactLayout === c.id
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{c.icon}</span>
                            <span className="font-extrabold text-xs">{c.name}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${contactLayout === c.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {c.desc}
                          </p>
                          <span className={`text-[9px] font-mono font-bold inline-block mt-2 ${contactLayout === c.id ? 'text-emerald-300' : 'text-neutral-500'}`}>
                            Bisa Diuji di Live Preview →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: 3. LAYOUT GALERI */}
                {layoutStudioTab === 'gallery' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-neutral-800 font-bold">Pilihan Tata Letak Galeri Dokumentasi Foto:</strong>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Aktif: {GALLERY_LAYOUT_OPTIONS.find(g => g.id === galleryLayout)?.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {GALLERY_LAYOUT_OPTIONS.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGalleryLayout(g.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            galleryLayout === g.id
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{g.icon}</span>
                            <span className="font-extrabold text-xs">{g.name}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${galleryLayout === g.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {g.desc}
                          </p>
                          <span className={`text-[9px] font-mono font-bold inline-block mt-2 ${galleryLayout === g.id ? 'text-emerald-300' : 'text-neutral-500'}`}>
                            Bisa Diuji di Live Preview →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: 4. LAYOUT TESTIMONI */}
                {layoutStudioTab === 'testimonials' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-neutral-800 font-bold">Pilihan Tata Letak Testimoni & Review Pelanggan:</strong>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Aktif: {TESTIMONIAL_LAYOUT_OPTIONS.find(t => t.id === testimonialLayout)?.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {TESTIMONIAL_LAYOUT_OPTIONS.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTestimonialLayout(t.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            testimonialLayout === t.id
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{t.icon}</span>
                            <span className="font-extrabold text-xs">{t.name}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${testimonialLayout === t.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {t.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: 5. LAYOUT CERITA & NILAI */}
                {layoutStudioTab === 'about' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-neutral-800 font-bold">Pilihan Tata Letak Cerita & Nilai Keunggulan:</strong>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Aktif: {ABOUT_LAYOUT_OPTIONS.find(a => a.id === aboutLayout)?.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {ABOUT_LAYOUT_OPTIONS.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setAboutLayout(a.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            aboutLayout === a.id
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{a.icon}</span>
                            <span className="font-extrabold text-xs">{a.name}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${aboutLayout === a.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {a.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: 6. LAYOUT FAQ */}
                {layoutStudioTab === 'faq' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-neutral-800 font-bold">Pilihan Tata Letak Tanya Jawab / FAQ:</strong>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Aktif: {FAQ_LAYOUT_OPTIONS.find(f => f.id === faqLayout)?.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {FAQ_LAYOUT_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFaqLayout(f.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            faqLayout === f.id
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{f.icon}</span>
                            <span className="font-extrabold text-xs">{f.name}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${faqLayout === f.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {f.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MODUL 3: STRUKTUR & TATA LETAK NAVBAR */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950">3. Struktur & Tata Letak Navbar</h3>
                      <p className="text-[11px] text-neutral-500">Navigasi utama yang dilihat pengunjung pertama kali</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">4 Model Navbar</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {NAVBAR_OPTIONS.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSelectedNavbar(n.id as 'floating' | 'solid' | 'centered' | 'slim')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedNavbar === n.id
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs">{n.name}</span>
                        {n.price > 0 ? (
                          <span className={`text-[10px] font-mono font-bold ${selectedNavbar === n.id ? 'text-emerald-300' : 'text-neutral-600'}`}>
                            +{formatRupiah(n.price)}
                          </span>
                        ) : (
                          <span className={`text-[10px] font-mono ${selectedNavbar === n.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            Termasuk
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] leading-relaxed ${selectedNavbar === n.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {n.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* MODUL 4: KEBURAMAN PERMUKAAN & GLASSMORPHISM */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950">4. Tingkat Keburaman Permukaan (Surface)</h3>
                      <p className="text-[11px] text-neutral-500">Pilihan efek frosted glassmorphism atau solid kontras tinggi</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">4 Pilihan Surface</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SURFACE_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSurface(s.id as 'solid' | 'frosted' | 'deep' | 'flat')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedSurface === s.id
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs">{s.name}</span>
                        {s.price > 0 ? (
                          <span className={`text-[10px] font-mono font-bold ${selectedSurface === s.id ? 'text-emerald-300' : 'text-neutral-600'}`}>
                            +{formatRupiah(s.price)}
                          </span>
                        ) : (
                          <span className={`text-[10px] font-mono ${selectedSurface === s.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            Termasuk
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] leading-relaxed ${selectedSurface === s.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {s.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* MODUL 5: CORNER RADIUS (LENGKUNGAN SUDUT KARTU) */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950">5. Kelengkungan Sudut Elemen (Corner Radius)</h3>
                      <p className="text-[11px] text-neutral-500">Mempengaruhi aura visual kartu produk dan tombol</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">4 Radius Styles</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {RADIUS_OPTIONS.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRadius(r.id as 'sharp' | 'crisp' | 'rounded' | 'pill')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedRadius === r.id
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 border-2 ${selectedRadius === r.id ? 'border-white bg-neutral-800' : 'border-neutral-400 bg-neutral-200'} ${r.css}`} />
                      <p className="font-extrabold text-xs">{r.name.split(' ')[0]}</p>
                      <p className={`text-[9px] mt-0.5 ${selectedRadius === r.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {r.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* MODUL 6: MULTI-HALAMAN INTERAKTIF (MULTI-PAGE BUILDER) */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2">
                        <span>6. Multi-Halaman Interaktif (Multi-Page Builder)</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-100 text-emerald-800 font-mono">
                          Bisa 2 Halaman atau Lebih
                        </span>
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Sesuai PRD BAB III: +Rp 50.000 / Halaman Tambahan / Tahun (Bebas Tambah & Uji di Preview)
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    Total: {customPagesList.length + 1} Halaman (+{formatRupiah(customPagesList.length * ADDON_PAGE_PRICE)})
                  </span>
                </div>

                {/* Status Ringkasan Halaman */}
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
                  <div className="flex items-center justify-between text-neutral-800 font-bold">
                    <span>Daftar Halaman Aktif di Website Anda:</span>
                    <span className="text-[11px] text-neutral-500 font-normal">
                      Halaman 1 (Beranda + Katalog) = Gratis Termasuk
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {/* Halaman 1 Default */}
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-neutral-950 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                          #1
                        </span>
                        <div>
                          <strong className="text-xs text-neutral-900">Halaman Beranda & Katalog Produk</strong>
                          <p className="text-[10px] text-neutral-500">Etalase utama website dan tombol kontak WhatsApp</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActivePreviewPage('home')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                          activePreviewPage === 'home'
                            ? 'bg-neutral-950 text-white'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {activePreviewPage === 'home' ? 'Sedang Ditinjau' : 'Lihat di Pratinjau'}
                      </button>
                    </div>

                    {/* Halaman Kustom Tambahan */}
                    {customPagesList.map((cp, idx) => (
                      <div
                        key={cp.id}
                        className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                          activePreviewPage === cp.slug
                            ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300'
                            : 'bg-white border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                            #{idx + 2}
                          </span>
                          <span className="text-base shrink-0">{cp.icon}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <strong className="text-xs text-neutral-900 truncate">{cp.title}</strong>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neutral-100 text-neutral-600 border border-neutral-200">
                                /{cp.slug}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-500 truncate">{cp.summary}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={() => setActivePreviewPage(cp.slug)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                              activePreviewPage === cp.slug
                                ? 'bg-emerald-600 text-white'
                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {activePreviewPage === cp.slug ? 'Sedang Ditinjau' : '👁️ Pratinjau'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePage(cp.id)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                            title="Hapus Halaman Ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pilihan 1-Click Template Halaman Tambahan Siap Pasang */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800">
                    A. Tambah Cepat Template Halaman Populer (+Rp 50.000 / thn):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRESET_EXTRA_PAGES.map((preset) => {
                      const isAdded = customPagesList.some((p) => p.slug === preset.slug);
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleAddPresetPage(preset)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                            isAdded
                              ? 'border-emerald-500 bg-emerald-50/50 text-neutral-900'
                              : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span>{preset.icon}</span>
                              <strong className="text-xs font-bold">{preset.title}</strong>
                            </div>
                            <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">{preset.summary}</p>
                            <span className="text-[10px] font-mono font-bold text-emerald-700 mt-1 inline-block">
                              +Rp 50.000 / thn
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {isAdded ? '✓ Aktif' : '+ Pasang'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Tambah Halaman Kustom Bebas */}
                <form onSubmit={handleCreateCustomPage} className="pt-2 border-t border-neutral-100 flex gap-2">
                  <input
                    type="text"
                    value={newCustomPageTitle}
                    onChange={(e) => setNewCustomPageTitle(e.target.value)}
                    placeholder="Contoh: Portofolio Proyek, Daftar Reseller, dll..."
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold shrink-0 cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Halaman Bebas</span>
                  </button>
                </form>
              </div>

              {/* MODUL 7: EFEK LOADING & TRANSISI */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950">7. Efek Loading & Interaksi Transisi</h3>
                      <p className="text-[11px] text-neutral-500">Pengalaman transisi mikro saat pengunjung menjelajahi website Anda</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerLoadingTest}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[11px] font-bold text-neutral-700 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSimulatingLoading ? 'animate-spin' : ''}`} />
                    <span>Tes di Preview</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {LOADING_OPTIONS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setSelectedLoading(l.id as 'instant' | 'shimmer' | 'progressbar' | 'pulse')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedLoading === l.id
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs">{l.name}</span>
                        {l.price > 0 ? (
                          <span className={`text-[10px] font-mono font-bold ${selectedLoading === l.id ? 'text-emerald-300' : 'text-neutral-600'}`}>
                            +{formatRupiah(l.price)}
                          </span>
                        ) : (
                          <span className={`text-[10px] font-mono ${selectedLoading === l.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            Termasuk
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] leading-relaxed ${selectedLoading === l.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {l.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* MODUL 8: ALUR CHECKOUT PEMBELI (TIDAK DIPAKSAKAN MAYAR KE PEMBELI) */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950">8. Alur Interaksi & Transaksi Pengunjung di Website Anda</h3>
                      <p className="text-[11px] text-neutral-500">Metode transaksi yang digunakan pengunjung saat berinteraksi di website</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    0% Komisi Marketplace
                  </span>
                </div>

                <div className="space-y-2.5">
                  {CHECKOUT_CHANNELS.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setSelectedCheckoutChannel(ch.id as 'instant_web' | 'bank_transfer' | 'pos_cashier')}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        selectedCheckoutChannel === ch.id
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs">{ch.name}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              selectedCheckoutChannel === ch.id
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {ch.badge}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${selectedCheckoutChannel === ch.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                          {ch.desc}
                        </p>
                        <p className={`text-[10px] font-mono ${selectedCheckoutChannel === ch.id ? 'text-emerald-400' : 'text-neutral-500'}`}>
                          Alur: {ch.buyerFlow}
                        </p>
                      </div>
                      <span className={`text-xs font-mono font-bold shrink-0 ${selectedCheckoutChannel === ch.id ? 'text-emerald-300' : 'text-neutral-700'}`}>
                        Termasuk (Rp 0)
                      </span>
                    </button>
                  ))}
                </div>

                {/* Penegasan B2B vs B2C Architecture */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="font-bold text-amber-900">Penegasan Arsitektur Pembayaran (B2B vs B2C):</strong>
                    <p className="text-[11px] leading-relaxed text-amber-800">
                      <strong>1. Pembeli / Klien Anda:</strong> Membayar langsung ke Anda (via WhatsApp / Rekening Resmi Bisnis Anda / Kasir) 100% tanpa potongan komisi sepeser pun.<br />
                      <strong>2. Anda (Penyewa):</strong> Membayar biaya sewa platform tahunan & add-on halaman ke PT Sivilize Corp Indonesia secara resmi via <strong>Mayar.id (QRIS Dinamis & Virtual Account)</strong> dengan invoice otomatis & proteksi PBI.
                    </p>
                  </div>
                </div>
              </div>

              {/* MODUL 9: TATA LETAK TEKS, BESAR KECIL TULISAN & GAYA TOMBOL */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950">9. Tata Letak Teks, Besar Kecil Tulisan & Gaya Tombol</h3>
                      <p className="text-[11px] text-neutral-500">Atur sesuka hati posisi teks, skala font, dan bentuk tombol aksi di website Anda</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Bebas Atur 100%
                  </span>
                </div>

                {/* 1. Posisi / Alignment Teks */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                    <span>A. Posisi & Letak Tulisan (Alignment):</span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      {textAlign === 'left' ? 'Rata Kiri' : textAlign === 'center' ? 'Rata Tengah' : 'Rata Kanan'}
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'left', label: '⬅️ Rata Kiri', desc: 'Standar editorial website modern' },
                      { id: 'center', label: '↔️ Rata Tengah', desc: 'Kafe mewah & butik elegan' },
                      { id: 'right', label: '➡️ Rata Kanan', desc: 'Eksentrik artistik modern' },
                    ].map((al) => (
                      <button
                        key={al.id}
                        type="button"
                        onClick={() => setTextAlign(al.id as 'left' | 'center' | 'right')}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          textAlign === al.id
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <p className="font-bold text-xs">{al.label}</p>
                        <p className={`text-[10px] mt-0.5 ${textAlign === al.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {al.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Besar Kecilnya Tulisan / Skala Font */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                    <span>B. Besar Kecilnya Tulisan (Typography Scale):</span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      {headingScale === 'small' ? 'Ringkas' : headingScale === 'normal' ? 'Standar' : headingScale === 'large' ? 'Besar' : 'Ekstra Besar'}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'small', label: 'A- Ringkas', desc: 'Hemat ruang & rapi' },
                      { id: 'normal', label: 'A Standar', desc: 'Proporsional di HP' },
                      { id: 'large', label: 'A+ Besar', desc: 'Judul tegas & jelas' },
                      { id: 'huge', label: 'A++ Ekstra', desc: 'Headline dominan' },
                    ].map((sc) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setHeadingScale(sc.id as 'small' | 'normal' | 'large' | 'huge')}
                        className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          headingScale === sc.id
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <p className="font-bold text-xs">{sc.label}</p>
                        <p className={`text-[9px] mt-0.5 ${headingScale === sc.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {sc.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Bentuk Tombol Beli / CTA */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                    <span>C. Bentuk Tombol Beli / CTA:</span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      {buttonStyle === 'rounded' ? 'Siku Modern' : buttonStyle === 'pill' ? 'Kapsul Pill' : buttonStyle === 'sharp' ? 'Sharp Brutalist' : 'Lebar Penuh Block'}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'rounded', label: 'Siku Modern', desc: 'Rounded 8px' },
                      { id: 'pill', label: 'Kapsul Pill', desc: 'Melengkung penuh' },
                      { id: 'sharp', label: 'Sharp Siku', desc: 'Brutalist 0px' },
                      { id: 'block', label: 'Lebar Penuh', desc: 'Blok penuh kartu' },
                    ].map((bs) => (
                      <button
                        key={bs.id}
                        type="button"
                        onClick={() => setButtonStyle(bs.id as 'rounded' | 'pill' | 'sharp' | 'block')}
                        className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          buttonStyle === bs.id
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <p className="font-bold text-xs">{bs.label}</p>
                        <p className={`text-[9px] mt-0.5 ${buttonStyle === bs.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {bs.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* MODUL 10: PINDAHKAN TATA LETAK BEBAS (SEPERTI PINDAH PERABOT RUMAH) */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2">
                        <span>10. Pindahkan Tata Letak Bebas</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-100 text-emerald-800 font-mono">
                          Bebas Pindah Perabot
                        </span>
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Ibarat memindahkan lemari dari kamar ke dapur, Anda 100% bebas menukar urutan bagian website!
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {sectionOrder.length} Blok Bagian
                  </span>
                </div>

                <div className="space-y-2">
                  {sectionOrder.map((secKey, idx) => {
                    const info = SECTION_DEFINITIONS[secKey];
                    const isVisible = visibleSections[secKey] !== false;
                    return (
                      <div
                        key={secKey}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isVisible
                            ? 'bg-neutral-50/80 border-neutral-200 hover:border-neutral-400'
                            : 'bg-neutral-100/50 border-neutral-200 opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-[10px] font-mono font-bold text-neutral-600 shrink-0">
                            #{idx + 1}
                          </span>
                          <span className="text-base shrink-0">{info?.icon || '📦'}</span>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-xs text-neutral-900 truncate">
                              {info?.label || secKey}
                            </h4>
                            <p className="text-[10px] text-neutral-500 truncate">
                              {info?.desc || ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Tombol Geser Naik */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSection(idx, 'up')}
                            className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            title="Geser Naik"
                          >
                            <ArrowUp className="w-3.5 h-3.5 text-neutral-700" />
                          </button>

                          {/* Tombol Geser Turun */}
                          <button
                            type="button"
                            disabled={idx === sectionOrder.length - 1}
                            onClick={() => moveSection(idx, 'down')}
                            className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            title="Geser Turun"
                          >
                            <ArrowDown className="w-3.5 h-3.5 text-neutral-700" />
                          </button>

                          {/* Tombol Visibilitas */}
                          <button
                            type="button"
                            onClick={() => toggleSectionVisibility(secKey)}
                            className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                              isVisible
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                            }`}
                            title={isVisible ? 'Sembunyikan dari Website' : 'Tampilkan di Website'}
                          >
                            {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MODUL 11: GAMBAR LATAR BELAKANG WEBSITE (BACKGROUND & GALERI) */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2">
                        <span>11. Gambar Background Website Kustom</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-indigo-100 text-indigo-800 font-mono">
                          Galeri / Preset
                        </span>
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Pilih tekstur visual siap pakai atau unggah foto dari galeri HP/laptop Anda
                      </p>
                    </div>
                  </div>
                  {bgImage && (
                    <button
                      type="button"
                      onClick={() => setBgImage(null)}
                      className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus Background</span>
                    </button>
                  )}
                </div>

                {/* Preset Tiles */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800">
                    A. Koleksi Preset Background Siap Pakai:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {BACKGROUND_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setBgImage(preset.url)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                          bgImage === preset.url
                            ? 'border-neutral-950 ring-2 ring-neutral-950 shadow-sm'
                            : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                        }`}
                      >
                        {preset.url ? (
                          <div
                            className="h-12 w-full rounded-xl bg-cover bg-center mb-2 border border-black/10"
                            style={{ backgroundImage: `url(${preset.url})` }}
                          />
                        ) : (
                          <div className="h-12 w-full rounded-xl bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500 mb-2">
                            Polos
                          </div>
                        )}
                        <h4 className="font-black text-xs text-neutral-900 truncate">{preset.name}</h4>
                        <p className="text-[9px] text-neutral-500 truncate mt-0.5">{preset.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload dari Galeri Sendiri */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <label className="text-xs font-bold text-neutral-800">
                    B. Unggah Foto Latar dari Galeri Sendiri:
                  </label>
                  <div className="p-4 rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-xs">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-900">Pilih Foto dari Galeri / Laptop</p>
                        <p className="text-[10px] text-neutral-500">Mendukung file JPG, PNG, WEBP (Otomatis terkompresi)</p>
                      </div>
                    </div>

                    <label className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer shadow-xs transition-all shrink-0">
                      <span>Buka Galeri Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCustomBgUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Sliders: Opacity & Blur Background */}
                {bgImage && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-100">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                        <span>Transparansi Background:</span>
                        <span className="font-mono text-[10px] text-neutral-500">{bgOpacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={bgOpacity}
                        onChange={(e) => setBgOpacity(Number(e.target.value))}
                        className="w-full accent-neutral-950 cursor-pointer"
                      />
                      <p className="text-[9px] text-neutral-400">Atur agar teks website di atas foto tetap kontras dan mudah dibaca</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                        <span>Efek Buram (Blur):</span>
                        <span className="font-mono text-[10px] text-neutral-500">{bgBlur}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={bgBlur}
                        onChange={(e) => setBgBlur(Number(e.target.value))}
                        className="w-full accent-neutral-950 cursor-pointer"
                      />
                      <p className="text-[9px] text-neutral-400">Ciptakan nuansa kaca tembus pandang (frosted glass) mewah</p>
                    </div>
                  </div>
                )}
              </div>
              {/* MODUL 12: KELOLA MENU & UNGGAH FOTO PRODUK WEBSITE (BEBAS PASANG FOTO MENU) */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2">
                        <span>12. Kelola Menu & Unggah Foto Katalog Website</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-100 text-amber-800 font-mono">
                          Foto Menu Bebas
                        </span>
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Unggah foto menu dari galeri HP/laptop Anda atau pilih preset fotografi kuliner & retail
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNewProduct}
                    className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Menu Baru</span>
                  </button>
                </div>

                {/* Preset Galeri Foto Siap Pakai */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800">
                    A. Koleksi Preset Foto Menu Siap Pakai (1-Klik Terapkan ke Menu Pertama):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MENU_PHOTO_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          if (productsList.length > 0) {
                            handleUpdateProduct(productsList[0].id, {
                              imageUrl: preset.url,
                              title: preset.name,
                              category: preset.category,
                            });
                          }
                        }}
                        className="p-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-left transition-all cursor-pointer group"
                      >
                        <div className="h-14 w-full rounded-lg overflow-hidden mb-1.5 bg-neutral-200">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="font-extrabold text-[11px] text-neutral-900 truncate">{preset.name}</p>
                        <p className="text-[9px] text-neutral-500 truncate">{preset.category}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Daftar Menu Aktif & Form Edit Foto */}
                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <label className="text-xs font-bold text-neutral-800">
                    B. Daftar Menu & Foto Produk di Website Anda ({productsList.length} Menu):
                  </label>

                  <div className="space-y-3">
                    {productsList.map((prod, idx) => (
                      <div
                        key={prod.id}
                        className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/80 space-y-3 transition-all hover:border-neutral-300"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Preview Foto Thumbnail */}
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-200 shrink-0">
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] font-mono text-center py-0.5">
                                #{idx + 1}
                              </span>
                            </div>

                            <div>
                              <strong className="text-xs font-bold text-neutral-900">{prod.title}</strong>
                              <p className="text-[10px] text-neutral-500">{prod.category} • {formatRupiah(prod.price)}</p>
                              <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                                {prod.badge}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            {/* Tombol Upload Foto dari Galeri HP/Laptop */}
                            <label className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-[11px] font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                              <Upload className="w-3.5 h-3.5 text-neutral-600" />
                              <span>Ganti Foto dari Galeri</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProductPhotoUpload(prod.id, e)}
                                className="hidden"
                              />
                            </label>

                            {/* Tombol Hapus Produk */}
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-xl border border-neutral-200 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                              title="Hapus Menu Ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Input Edit Data Produk */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] font-bold text-neutral-600 block mb-1">Nama Menu:</label>
                            <input
                              type="text"
                              value={prod.title}
                              onChange={(e) => handleUpdateProduct(prod.id, { title: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-neutral-600 block mb-1">Harga (Rp):</label>
                            <input
                              type="number"
                              value={prod.price}
                              onChange={(e) => handleUpdateProduct(prod.id, { price: Number(e.target.value) })}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-mono font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-neutral-600 block mb-1">Badge Produk:</label>
                            <select
                              value={prod.badge}
                              onChange={(e) => handleUpdateProduct(prod.id, { badge: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs"
                            >
                              <option value="Best Seller">Best Seller</option>
                              <option value="Favorit Kafe">Favorit Kafe</option>
                              <option value="Fresh Daily">Fresh Daily</option>
                              <option value="Promo Khusus">Promo Khusus</option>
                              <option value="Baru">Menu Baru</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MODUL 13: PAKET ADD-ON OPSIONAL RESMI (PRD BAB III & BAB XI) */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2">
                        <span>13. Paket Add-On Opsional Resmi</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-purple-100 text-purple-800 font-mono">
                          PRD Bab III & XI
                        </span>
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Opsi tambahan tingkat enterprise untuk meningkatkan omzet dan kredibilitas usaha Anda
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Opsi Mandiri
                  </span>
                </div>

                <div className="space-y-2.5">
                  {OFFICIAL_ADDONS.map((addon) => {
                    const isChecked = selectedAddons[addon.id];
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isChecked
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                            : 'border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="text-xl shrink-0 mt-0.5">{addon.icon}</span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <strong className="text-xs font-bold">{addon.name}</strong>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                                  isChecked
                                    ? 'bg-neutral-800 text-emerald-300'
                                    : 'bg-neutral-200 text-neutral-700'
                                }`}
                              >
                                {addon.badge}
                              </span>
                            </div>
                            <p
                              className={`text-[11px] leading-relaxed mt-0.5 ${
                                isChecked ? 'text-neutral-300' : 'text-neutral-600'
                              }`}
                            >
                              {addon.desc}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`font-mono font-black text-xs block ${
                              isChecked ? 'text-emerald-300' : 'text-neutral-900'
                            }`}
                          >
                            +{formatRupiah(addon.price)}
                          </span>
                          <span
                            className={`text-[9px] font-mono ${
                              isChecked ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                          >
                            {addon.period}
                          </span>
                          <div className="mt-1">
                            <span
                              className={`inline-block w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                                isChecked
                                  ? 'bg-emerald-500 border-emerald-400 text-neutral-950 font-black'
                                  : 'border-neutral-300 bg-white'
                              }`}
                            >
                              {isChecked ? '✓' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: NOTA KALKULASI & INTERACTIVE LIVE PREVIEW CANVAS (5 KOLOM - INDEPENDENT SCROLL PANEL 2) */}
            <div
              id="nota-rakitan-section"
              className="lg:col-span-5 space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 custom-scrollbar"
            >
              {/* Box Rincian Nota & Tombol Eksekusi */}
              <div className="rounded-3xl bg-neutral-950 text-white p-5 sm:p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="font-extrabold text-sm tracking-tight">
                      Nota Rakitan Website (BOM)
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-emerald-400">
                    KALKULASI REAL-TIME
                  </span>
                </div>

                {/* Daftar Part Terpilih */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Base Engine WaaS (Anycast Edge):</span>
                    <span className="font-mono font-bold text-white">{formatRupiah(BASE_RAKITAN_PRICE)}</span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Font: {FONT_OPTIONS.find((f) => f.id === selectedFont)?.name}</span>
                    <span className="font-mono text-neutral-300">
                      {FONT_OPTIONS.find((f) => f.id === selectedFont)?.price === 0
                        ? 'Rp 0'
                        : `+${formatRupiah(FONT_OPTIONS.find((f) => f.id === selectedFont)?.price || 0)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Grid: {GRID_OPTIONS.find((g) => g.id === selectedGrid)?.name.split('(')[0]}</span>
                    <span className="font-mono text-neutral-300">
                      {GRID_OPTIONS.find((g) => g.id === selectedGrid)?.price === 0
                        ? 'Rp 0'
                        : `+${formatRupiah(GRID_OPTIONS.find((g) => g.id === selectedGrid)?.price || 0)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Navbar: {NAVBAR_OPTIONS.find((n) => n.id === selectedNavbar)?.name.split(' ')[0]}</span>
                    <span className="font-mono text-neutral-300">
                      {NAVBAR_OPTIONS.find((n) => n.id === selectedNavbar)?.price === 0
                        ? 'Rp 0'
                        : `+${formatRupiah(NAVBAR_OPTIONS.find((n) => n.id === selectedNavbar)?.price || 0)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Surface: {SURFACE_OPTIONS.find((s) => s.id === selectedSurface)?.name.split('(')[0]}</span>
                    <span className="font-mono text-neutral-300">
                      {SURFACE_OPTIONS.find((s) => s.id === selectedSurface)?.price === 0
                        ? 'Rp 0'
                        : `+${formatRupiah(SURFACE_OPTIONS.find((s) => s.id === selectedSurface)?.price || 0)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span>
                      Halaman: 1 Beranda + {customPagesList.length} Hal Kustom:
                    </span>
                    <span className="font-mono text-neutral-300">
                      {customPagesList.length === 0
                        ? 'Rp 0 (Termasuk)'
                        : `+${formatRupiah(customPagesList.length * ADDON_PAGE_PRICE)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Loading: {LOADING_OPTIONS.find((l) => l.id === selectedLoading)?.name.split(' ')[0]}</span>
                    <span className="font-mono text-neutral-300">
                      {LOADING_OPTIONS.find((l) => l.id === selectedLoading)?.price === 0
                        ? 'Rp 0'
                        : `+${formatRupiah(LOADING_OPTIONS.find((l) => l.id === selectedLoading)?.price || 0)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Metode Transaksi: {CHECKOUT_CHANNELS.find((c) => c.id === selectedCheckoutChannel)?.name.split('(')[0]}</span>
                    <span className="font-mono text-emerald-400 font-bold">Rp 0 (Termasuk)</span>
                  </div>

                  {/* List Add-on Opsional Terpilih */}
                  {OFFICIAL_ADDONS.filter((a) => selectedAddons[a.id]).map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between text-emerald-400">
                      <span className="truncate pr-2">Addon: {addon.name.split('(')[0]}</span>
                      <span className="font-mono font-bold shrink-0">+{formatRupiah(addon.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Total Box */}
                <div className="pt-3 border-t border-neutral-800 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-neutral-300">TOTAL BIAYA SEWA RAKITAN:</span>
                    <span className="font-mono font-black text-2xl sm:text-3xl text-emerald-400">
                      {formatRupiah(calculatedTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Masa Aktif: 1 Tahun Penuh (365 Hari)</span>
                    <span className="text-emerald-300 font-semibold">Tidak 2x Lipat Template!</span>
                  </div>
                </div>

                {/* Info Pembayaran Mayar B2B */}
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Pembayaran Sewa ke PT Sivilize Corp:</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-relaxed">
                    Tagihan sewa platform ini dibayarkan via <strong>Mayar.id QRIS Dinamis & Virtual Account Resmi</strong>. Website & dashboard admin Anda otomatis aktif 100% seketika!
                  </p>
                </div>

                {/* Tombol Eksekusi Sewa Rakitan */}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-950 font-black text-xs sm:text-sm tracking-tight transition-transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sewa Rakitan Ini Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* LIVE PREVIEW CANVAS (INTERAKTIF & REAL-TIME) */}
              <div className="rounded-3xl bg-white border border-neutral-200 p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-neutral-900" />
                    <h4 className="font-extrabold text-xs text-neutral-900">
                      Live Preview Interaktif
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Device Simulator Toggle */}
                    <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          previewDevice === 'desktop' ? 'bg-white shadow-xs text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
                        }`}
                        title="Desktop (100%)"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('tablet')}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          previewDevice === 'tablet' ? 'bg-white shadow-xs text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
                        }`}
                        title="Tablet (768px)"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          previewDevice === 'mobile' ? 'bg-white shadow-xs text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
                        }`}
                        title="Mobile (390px)"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Theme Mode Toggle */}
                    <button
                      type="button"
                      onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
                      className="p-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                      title="Ganti Mode Terang / Gelap"
                    >
                      {previewTheme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                    </button>

                    {/* Fullscreen Button */}
                    <button
                      type="button"
                      onClick={() => setIsFullscreenPreview(true)}
                      className="p-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                      title="Perbesar Layar Penuh"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* QUICK TWEAKER BAR: Posisi Teks, Ukuran Font, dan Tombol langsung di atas Preview */}
                <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Atur Tampilan Website Sesuka Anda:</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ● Live Seketika
                    </span>
                  </div>

                  {/* Row 1: Letak Konten & Alignment (Spacious full row, no wrap!) */}
                  <div className="flex items-center gap-2 bg-white dark:bg-neutral-950 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <span className="text-neutral-500 text-[11px] font-bold px-1 shrink-0">Letak:</span>
                    <div className="flex items-center gap-1.5 flex-1">
                      <button
                        type="button"
                        onClick={() => setTextAlign('left')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap text-center ${
                          textAlign === 'left'
                            ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                        }`}
                        title="Rata Kiri"
                      >
                        ⬅️ Kiri
                      </button>
                      <button
                        type="button"
                        onClick={() => setTextAlign('center')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap text-center ${
                          textAlign === 'center'
                            ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                        }`}
                        title="Rata Tengah"
                      >
                        ↔️ Tengah
                      </button>
                      <button
                        type="button"
                        onClick={() => setTextAlign('right')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap text-center ${
                          textAlign === 'right'
                            ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                        }`}
                        title="Rata Kanan"
                      >
                        ➡️ Kanan
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Font Scale & Tombol Style (Comfortable grid, no clipping!) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {/* Font Scale */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-950 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="text-neutral-500 font-bold px-1 shrink-0">Font:</span>
                      <div className="flex items-center gap-1 flex-1">
                        {(['small', 'normal', 'large', 'huge'] as const).map((sc) => (
                          <button
                            key={sc}
                            type="button"
                            onClick={() => setHeadingScale(sc)}
                            className={`flex-1 py-1 rounded-lg font-bold cursor-pointer transition-all whitespace-nowrap text-center ${
                              headingScale === sc
                                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                            }`}
                          >
                            {sc === 'small' ? 'A-' : sc === 'normal' ? 'A' : sc === 'large' ? 'A+' : 'A++'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Button Style */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-950 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="text-neutral-500 font-bold px-1 shrink-0">Tombol:</span>
                      <div className="flex items-center gap-1 flex-1">
                        {(['rounded', 'pill', 'sharp', 'block'] as const).map((bs) => (
                          <button
                            key={bs}
                            type="button"
                            onClick={() => setButtonStyle(bs)}
                            className={`flex-1 py-1 rounded-lg font-bold cursor-pointer transition-all whitespace-nowrap text-center ${
                              buttonStyle === bs
                                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                            }`}
                          >
                            {bs === 'rounded' ? 'Siku' : bs === 'pill' ? 'Pill' : bs === 'sharp' ? 'Sharp' : 'Full'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Quick Info & Background Preset indicator */}
                  <div className="flex items-center justify-between pt-1 px-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <span>🎨 Bg:</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        {bgImage ? BACKGROUND_PRESETS.find((p) => p.url === bgImage)?.name || 'Kustom Galeri' : 'Polos'}
                      </strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🏠 Tata Letak:</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        {sectionOrder.length} Blok Bebas Geser
                      </strong>
                    </span>
                  </div>
                </div>

                {/* THE SIMULATOR BROWSER FRAME */}
                <div
                  className={`mx-auto rounded-2xl border transition-all duration-300 overflow-hidden relative shadow-lg ${
                    previewTheme === 'dark' ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                  } ${
                    previewDevice === 'mobile' ? 'max-w-[320px]' : previewDevice === 'tablet' ? 'max-w-[440px]' : 'w-full'
                  }`}
                  style={{ fontFamily: activeFontFamily }}
                >
                  {/* Browser Chrome Header */}
                  <div className={`px-3 py-2 border-b flex items-center justify-between text-[10px] relative z-20 ${
                    previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/10 truncate max-w-[150px]">
                      https://senjabajawa.sivilize.space
                    </div>
                    <span className="text-[9px] font-bold text-emerald-500">LIVE</span>
                  </div>

                  {/* INTERACTIVE PAGE SWITCHER BAR (TAMPILKAN & UJI SEMUA HALAMAN) */}
                  <div className={`px-3 py-2 border-b flex items-center gap-1.5 overflow-x-auto text-[10px] scrollbar-none z-20 ${
                    previewTheme === 'dark' ? 'bg-neutral-900/90 border-neutral-800' : 'bg-neutral-100/90 border-neutral-200'
                  }`}>
                    <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-emerald-500" />
                      <span>Halaman:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActivePreviewPage('home')}
                      className={`px-2 py-0.8 rounded-lg font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                        activePreviewPage === 'home'
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span>🏠 Beranda</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewPage('katalog')}
                      className={`px-2 py-0.8 rounded-lg font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                        activePreviewPage === 'katalog'
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span>☕ Katalog ({productsList.length})</span>
                    </button>
                    {customPagesList.map((cp, cpIdx) => (
                      <button
                        key={cp.id}
                        type="button"
                        onClick={() => setActivePreviewPage(cp.slug)}
                        className={`px-2 py-0.8 rounded-lg font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                          activePreviewPage === cp.slug
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300/50 dark:border-neutral-700/50'
                        }`}
                      >
                        <span>{cp.icon} Hal {cpIdx + 2}: {cp.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Shimmer / Progress bar loading simulator */}
                  {isSimulatingLoading && selectedLoading === 'progressbar' && (
                    <div className="w-full h-1 bg-neutral-200 overflow-hidden relative z-20">
                      <div className="w-full h-full bg-emerald-500 animate-pulse" />
                    </div>
                  )}

                  {/* LIVE BACKGROUND IMAGE LAYER (BEBAS PILIH DARI PRESET / GALERI) */}
                  {bgImage && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-all duration-500 z-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${bgImage})`,
                        opacity: bgOpacity / 100,
                        filter: `blur(${bgBlur}px)`,
                      }}
                    />
                  )}

                  {/* Mock Storefront Canvas */}
                  <div className={`p-3 sm:p-4 space-y-3 relative z-10 min-h-[380px] ${bgImage ? 'backdrop-blur-[0.5px]' : ''}`}>
                    {/* MOCK NAVBAR */}
                    <div
                      className={`transition-all ${
                        selectedNavbar === 'floating'
                          ? `p-2.5 rounded-full border shadow-sm mx-auto flex items-center justify-between ${
                              selectedSurface === 'frosted'
                                ? 'backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-white/40 dark:border-neutral-700/40'
                                : selectedSurface === 'deep'
                                ? 'backdrop-blur-xl bg-neutral-900/90 text-white border-neutral-700/60'
                                : previewTheme === 'dark'
                                ? 'bg-neutral-900 border-neutral-800'
                                : 'bg-white border-neutral-200'
                            }`
                          : selectedNavbar === 'centered'
                          ? `pb-2 border-b text-center space-y-1.5 ${previewTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`
                          : selectedNavbar === 'slim'
                          ? `space-y-1 pb-2 border-b ${previewTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`
                          : `pb-2 border-b flex items-center justify-between ${previewTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`
                      }`}
                    >
                      {selectedNavbar === 'slim' && (
                        <div className="flex items-center justify-between text-[8px] opacity-60 border-b border-black/5 pb-1">
                          <span className="truncate max-w-[200px]">📍 {storeAddress} • Buka {storeHours}</span>
                          <span className="shrink-0 font-mono">WA: {storeWa}</span>
                        </div>
                      )}

                      <div className={`flex items-center ${selectedNavbar === 'centered' ? 'justify-center' : 'justify-between'} w-full gap-2`}>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-5 h-5 rounded-md bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center text-[10px] font-black shrink-0">
                            {storeName.charAt(0) || 'S'}
                          </span>
                          <span className="font-extrabold text-xs tracking-tight truncate">{storeName}</span>
                        </div>

                        {selectedNavbar !== 'centered' && (
                          <div className="flex items-center gap-1.5 text-[9px] font-semibold flex-wrap justify-end">
                            <button
                              type="button"
                              onClick={() => setActivePreviewPage('home')}
                              className={`px-1.5 py-0.5 rounded cursor-pointer ${activePreviewPage === 'home' ? 'font-bold underline' : 'opacity-70'}`}
                            >
                              Beranda
                            </button>
                            <button
                              type="button"
                              onClick={() => setActivePreviewPage('katalog')}
                              className={`px-1.5 py-0.5 rounded cursor-pointer ${activePreviewPage === 'katalog' ? 'font-bold underline' : 'opacity-70'}`}
                            >
                              Katalog
                            </button>
                            {customPagesList.map((cp) => (
                              <button
                                key={cp.id}
                                type="button"
                                onClick={() => setActivePreviewPage(cp.slug)}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${activePreviewPage === cp.slug ? 'font-bold underline text-emerald-600 dark:text-emerald-400' : 'opacity-70'}`}
                              >
                                {cp.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RENDERING HALAMAN KUSTOM: TENTANG KAMI */}
                    {activePreviewPage === 'tentang-kami' && (
                      <div className={`p-4 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-3`}>
                        <div className="flex items-center gap-1.5 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          <span>📖 PROFIL & FILOSOFI BISNIS</span>
                        </div>
                        <h3 className="font-black text-sm">{aboutStoryData.title}</h3>
                        <p className="text-[10px] opacity-80 leading-relaxed">
                          {aboutStoryData.story}
                        </p>
                        <div className="grid grid-cols-3 gap-2 pt-1 text-[9px]">
                          {aboutStoryData.stats.map((st, sidx) => (
                            <div key={sidx} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-center">
                              <strong className="block text-emerald-600 dark:text-emerald-400 text-xs">{st.value}</strong>
                              <span className="opacity-70 text-[8px]">{st.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                          <span className="text-[9px] opacity-70">Ingin tahu lebih lanjut?</span>
                          <button
                            type="button"
                            onClick={() => alert(`Hubungi CS WhatsApp di: ${storeWa}`)}
                            className="px-2.5 py-1 rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-[9px] font-bold"
                          >
                            Hubungi Kami Langsung
                          </button>
                        </div>
                      </div>
                    )}

                    {/* RENDERING HALAMAN KUSTOM: GALERI & SUASANA */}
                    {activePreviewPage === 'galeri-suasana' && (
                      <div className={`p-4 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-3`}>
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-xs">📸 Galeri & Suasana Layanan</h3>
                          <span className="text-[9px] font-mono opacity-60">{galleryPhotos.length} Dokumentasi</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {galleryPhotos.map((photo) => (
                            <div key={photo.name} className="space-y-1">
                              <div className="h-16 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-black/5 dark:border-white/5">
                                <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-[8px] font-bold truncate opacity-80">{photo.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* RENDERING HALAMAN KUSTOM: FAQ & BANTUAN */}
                    {activePreviewPage === 'faq-bantuan' && (
                      <div className={`p-4 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2.5`}>
                        <h3 className="font-black text-xs">❓ Tanya Jawab (FAQ) & Panduan Beli</h3>
                        <div className="space-y-2 text-[10px]">
                          {faqItemsList.map((item, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 space-y-1">
                              <strong className="text-neutral-900 dark:text-white block font-bold">Q: {item.q}</strong>
                              <p className="opacity-80">A: {item.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* RENDERING HALAMAN KUSTOM: GARANSI KUALITAS */}
                    {activePreviewPage === 'garansi-kualitas' && (
                      <div className={`p-4 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-3`}>
                        <h3 className="font-black text-xs flex items-center gap-1.5">
                          <span>🛡️ Garansi Kualitas & Kesegaran 100%</span>
                        </h3>
                        <p className="text-[10px] opacity-80 leading-relaxed">
                          Kami berpegang teguh pada standar mutu tertinggi untuk seluruh produk yang kami kirimkan ke pelanggan.
                        </p>
                        <div className="space-y-2 text-[9px]">
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                            <span className="text-base">☕</span>
                            <div>
                              <strong className="text-emerald-800 dark:text-emerald-300 block">Fresh Roast Guarantee 7 Hari</strong>
                              <span className="opacity-80">Jika kopi lebih dari 7 hari sangrai, kami ganti baru 100% gratis.</span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                            <span className="text-base">📦</span>
                            <div>
                              <strong className="text-blue-800 dark:text-blue-300 block">Jaminan Kemasan Rusak Diganti</strong>
                              <span className="opacity-80">Paket rusak saat pengiriman diganti seketika tanpa perdebatan.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* RENDERING HALAMAN KUSTOM: DAFTAR CABANG */}
                    {activePreviewPage === 'daftar-cabang' && (
                      <div className={`p-4 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-3`}>
                        <h3 className="font-black text-xs">📍 Daftar Cabang & Titik Outlet Fisik</h3>
                        <div className="space-y-2 text-[9px]">
                          <div className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-1">
                            <strong className="text-xs font-bold block text-neutral-900 dark:text-white">1. Outlet Pusat Bajawa (Roastery)</strong>
                            <p className="opacity-70">Jl. Kartini No. 14, Bajawa, Flores, NTT • Buka 07:00 - 22:00 WITA</p>
                            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold block">WA: 0812-3456-7890</span>
                          </div>
                          <div className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-1">
                            <strong className="text-xs font-bold block text-neutral-900 dark:text-white">2. Hub Jakarta Selatan</strong>
                            <p className="opacity-70">Jl. Senopati No. 88, Kebayoran Baru, Jakarta • Buka 08:00 - 23:00 WIB</p>
                            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold block">WA: 0821-9876-5432</span>
                          </div>
                          <div className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-1">
                            <strong className="text-xs font-bold block text-neutral-900 dark:text-white">3. Outlet Bandung Dago</strong>
                            <p className="opacity-70">Jl. Ir. H. Juanda No. 120, Dago Atas, Bandung • Buka 08:00 - 22:00 WIB</p>
                            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold block">WA: 0813-1122-3344</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* RENDERING HALAMAN KUSTOM BEBAS LAINNYA */}
                    {activePreviewPage !== 'home' &&
                      activePreviewPage !== 'katalog' &&
                      activePreviewPage !== 'tentang-kami' &&
                      activePreviewPage !== 'galeri-suasana' &&
                      activePreviewPage !== 'faq-bantuan' &&
                      activePreviewPage !== 'garansi-kualitas' &&
                      activePreviewPage !== 'daftar-cabang' && (
                        <div className={`p-4 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
                          <h3 className="font-black text-xs capitalize">
                            📄 {customPagesList.find((p) => p.slug === activePreviewPage)?.title || 'Halaman Tambahan'}
                          </h3>
                          <p className="text-[10px] opacity-80 leading-relaxed">
                            {customPagesList.find((p) => p.slug === activePreviewPage)?.summary ||
                              'Konten halaman kustom siap diisi materi artikel, galeri, atau brosur penawaran Anda.'}
                          </p>
                          <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[9px] opacity-70">
                            Halaman ini dapat diedit kapan saja secara fleksibel melalui Dashboard Admin Website Anda.
                          </div>
                        </div>
                      )}

                    {/* DYNAMIC BERANDA SECTION RENDERING: BEBAS PINDAH PERABOT TATA LETAK */}
                    {(activePreviewPage === 'home' || activePreviewPage === 'katalog') && (
                      <div className="space-y-3">
                        {sectionOrder.map((secKey, idx) => {
                          if (visibleSections[secKey] === false) return null;
                          if (activePreviewPage === 'katalog' && secKey !== 'catalog' && secKey !== 'categories') return null;

                          return (
                            <div key={secKey} className="group/sec relative">
                              {/* Hover Floating Controls: Pindah Naik / Turun Seketika */}
                              <div className="absolute -top-2.5 right-2 opacity-0 group-hover/sec:opacity-100 transition-opacity bg-neutral-950 text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-md z-30 pointer-events-auto border border-white/20">
                                <span className="font-bold opacity-80">{SECTION_DEFINITIONS[secKey]?.icon} Perabot:</span>
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={(e) => { e.stopPropagation(); moveSection(idx, 'up'); }}
                                  className="hover:text-emerald-400 disabled:opacity-30 cursor-pointer"
                                  title="Pindahkan Lebih ke Atas"
                                >
                                  ⬆️
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === sectionOrder.length - 1}
                                  onClick={(e) => { e.stopPropagation(); moveSection(idx, 'down'); }}
                                  className="hover:text-emerald-400 disabled:opacity-30 cursor-pointer"
                                  title="Pindahkan Lebih ke Bawah"
                                >
                                  ⬇️
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(secKey); }}
                                  className="hover:text-red-400 cursor-pointer ml-0.5"
                                  title="Sembunyikan Bagian Ini"
                                >
                                  👁️
                                </button>
                              </div>

                              {/* SECTION: HERO BANNER */}
                              {secKey === 'hero' && (
                                <div
                                  className={`p-3.5 ${activeRadiusClass} transition-all border flex flex-col ${getTextAlignClass()} ${
                                    selectedSurface === 'frosted'
                                      ? 'backdrop-blur-md bg-white/75 dark:bg-neutral-900/75 border-white/50 dark:border-neutral-700/50 shadow-sm'
                                      : selectedSurface === 'deep'
                                      ? 'backdrop-blur-xl bg-neutral-900/90 text-white border-neutral-700/60 shadow-md'
                                      : selectedSurface === 'flat'
                                      ? 'bg-neutral-200/50 dark:bg-neutral-800/50 border-0'
                                      : previewTheme === 'dark'
                                      ? 'bg-neutral-900 border-neutral-800'
                                      : 'bg-white border-neutral-200 shadow-xs'
                                  }`}
                                >
                                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                    {heroBadge}
                                  </span>
                                  <h3 className={`${getHeadingScaleClass()} mt-0.5 leading-snug`}>
                                    {heroHeadline}
                                  </h3>
                                  <p className="text-[10px] opacity-75 mt-1 leading-relaxed">
                                    {heroSubhead}
                                  </p>
                                </div>
                              )}

                              {/* SECTION: PAPAN PROMO & PENGUMUMAN */}
                              {secKey === 'promo' && (
                                <div className={`p-2.5 ${activeRadiusClass} bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between text-[10px] shadow-xs`}>
                                  <div className="flex items-center gap-1.5 font-bold">
                                    <span>🔥</span>
                                    <span>{promoText} <code className="bg-black/20 px-1 py-0.2 rounded font-mono">{promoCode}</code></span>
                                  </div>
                                  <span className="text-[8px] opacity-80 font-mono">Batas: Hari Ini</span>
                                </div>
                              )}

                              {/* SECTION: KATEGORI FILTER TABS */}
                              {secKey === 'categories' && (
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[9px] font-bold scrollbar-none">
                                  {categoriesList.map((cat, i) => (
                                    <span
                                      key={cat}
                                      className={`px-2 py-1 rounded-lg shrink-0 cursor-pointer transition-colors ${
                                        i === 0
                                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                                          : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                      }`}
                                    >
                                      {cat}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* SECTION: KATALOG PRODUK UTAMA */}
                              {secKey === 'catalog' && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[10px]">
                                    <strong className="font-extrabold uppercase tracking-wide">Katalog Pilihan:</strong>
                                    <span className="opacity-60 text-[9px] font-mono">
                                      Format: {selectedGrid === 'list' ? 'List Menu' : `${selectedGrid} Kolom`}
                                    </span>
                                  </div>

                                  {/* RENDER GRID SESUAI FORMAT */}
                                  <div
                                    className={
                                      selectedGrid === 'list'
                                        ? 'space-y-2'
                                        : selectedGrid === '2'
                                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                                        : selectedGrid === '4'
                                        ? 'grid grid-cols-2 sm:grid-cols-4 gap-1.5'
                                        : selectedGrid === 'masonry'
                                        ? 'grid grid-cols-2 gap-2'
                                        : 'grid grid-cols-1 sm:grid-cols-3 gap-2'
                                    }
                                  >
                                    {productsList.slice(0, selectedGrid === '4' ? 4 : selectedGrid === '2' ? 2 : 3).map((item, pIdx) => (
                                      <div
                                        key={item.id}
                                        onClick={() => setPreviewSelectedProduct(item.title)}
                                        className={`p-2.5 ${activeRadiusClass} border transition-all cursor-pointer hover:border-emerald-500 group ${
                                          selectedSurface === 'frosted'
                                            ? 'backdrop-blur-md bg-white/75 dark:bg-neutral-900/75 border-white/40 dark:border-neutral-700/40 shadow-xs'
                                            : selectedSurface === 'deep'
                                            ? 'backdrop-blur-xl bg-neutral-900/90 text-white border-neutral-700/60 shadow-sm'
                                            : selectedSurface === 'flat'
                                            ? 'bg-neutral-200/50 dark:bg-neutral-800/50 border-0'
                                            : previewTheme === 'dark'
                                            ? 'bg-neutral-900 border-neutral-800'
                                            : 'bg-white border-neutral-200 shadow-xs'
                                        } ${selectedGrid === 'list' ? 'flex items-center justify-between gap-3' : 'space-y-1.5'}`}
                                      >
                                        {/* Thumbnail Foto Menu Nyata (Resolusi Tinggi & Zoom Animasi) */}
                                        <div
                                          className={`rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative shrink-0 group-hover:shadow-xs transition-shadow ${
                                            selectedGrid === 'list' ? 'w-14 h-14' : selectedGrid === '2' ? 'w-full h-24' : 'w-full h-20'
                                          }`}
                                        >
                                          <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                          />
                                          <span className="absolute top-1 left-1 px-1 py-0.2 rounded text-[7px] font-bold bg-neutral-950/80 text-white backdrop-blur-xs">
                                            {item.badge}
                                          </span>
                                        </div>

                                        <div className={`flex-1 min-w-0 ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'}`}>
                                          <div className={`flex items-center gap-1 ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-between'}`}>
                                            <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                              {item.badge}
                                            </span>
                                            <span className="text-[8px] opacity-50 font-mono">#{pIdx + 1}</span>
                                          </div>
                                          <h4 className="font-black text-[10px] sm:text-xs line-clamp-2 mt-0.5 leading-snug">
                                            {item.title}
                                          </h4>
                                          <p className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                            {formatRupiah(item.price)}
                                          </p>
                                        </div>

                                        {/* Button Pesan */}
                                        <button
                                          type="button"
                                          className={`py-1 px-2.5 ${getButtonStyleClass()} bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-[9px] font-bold group-hover:bg-emerald-600 transition-colors shrink-0`}
                                        >
                                          {selectedCheckoutChannel === 'instant_web' ? 'Pesan di Web' : selectedCheckoutChannel === 'bank_transfer' ? 'Bayar di Web' : 'Reservasi di Web'}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* SECTION: PROFIL BISNIS / NILAI (ABOUT) BERDASARKAN LAYOUT */}
                              {secKey === 'about' && (
                                <div className={`p-3.5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
                                  {aboutLayout === 'pillars_3' ? (
                                    <div className="space-y-1.5">
                                      <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">🏛️ 3 PILAR KEUNGGULAN UTAMA</span>
                                      <div className="grid grid-cols-3 gap-1.5 text-center pt-1">
                                        <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 space-y-0.5">
                                          <span className="text-sm">🏆</span>
                                          <strong className="block text-[9px] font-black">Mutu Terjamin</strong>
                                          <span className="text-[8px] opacity-70 block">100% Terverifikasi</span>
                                        </div>
                                        <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 space-y-0.5">
                                          <span className="text-sm">⚡</span>
                                          <strong className="block text-[9px] font-black">Respon Cepat</strong>
                                          <span className="text-[8px] opacity-70 block">Langsung ke WA</span>
                                        </div>
                                        <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 space-y-0.5">
                                          <span className="text-sm">🛡️</span>
                                          <strong className="block text-[9px] font-black">Garansi Puas</strong>
                                          <span className="text-[8px] opacity-70 block">Komitmen Resmi</span>
                                        </div>
                                      </div>
                                    </div>
                                  ) : aboutLayout === 'stats_counter' ? (
                                    <div className="space-y-1.5">
                                      <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">📊 PENCAPAIAN BISNIS TERPERCAYA</span>
                                      <div className="grid grid-cols-3 gap-1.5 text-center pt-1">
                                        {aboutStoryData.stats.map((st) => (
                                          <div key={st.label} className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80">
                                            <strong className="block text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">{st.value}</strong>
                                            <span className="text-[8px] opacity-70">{st.label}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    /* story_split default */
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                                        <span>📖</span>
                                        <span>{aboutStoryData.title}</span>
                                      </div>
                                      <p className="text-[9px] opacity-75 leading-relaxed">
                                        {aboutStoryData.story}
                                      </p>
                                      <div className="flex items-center gap-2 pt-1">
                                        {aboutStoryData.stats.map((st) => (
                                          <span key={st.label} className="text-[8px] font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
                                            <strong>{st.value}</strong> {st.label}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* SECTION: GALERI SUASANA BERDASARKAN LAYOUT */}
                              {secKey === 'gallery' && (
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-[10px]">
                                    <span className="font-extrabold uppercase tracking-wide">📸 Galeri Dokumentasi:</span>
                                    <span className="text-[8px] font-mono opacity-50">Layout: {GALLERY_LAYOUT_OPTIONS.find(g => g.id === galleryLayout)?.name.split(' ')[0]}</span>
                                  </div>

                                  {galleryLayout === 'grid_2' ? (
                                    <div className="grid grid-cols-2 gap-2">
                                      {galleryPhotos.slice(0, 2).map((photo) => (
                                        <div key={photo.name} className="space-y-1">
                                          <div className="h-24 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                            <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                                          </div>
                                          <p className="text-[8px] font-bold truncate opacity-80">{photo.name}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : galleryLayout === 'grid_4' ? (
                                    <div className="grid grid-cols-4 gap-1.5">
                                      {galleryPhotos.slice(0, 4).map((photo) => (
                                        <div key={photo.name} className="space-y-0.5">
                                          <div className="h-14 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                            <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                                          </div>
                                          <p className="text-[7px] truncate opacity-70">{photo.name}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : galleryLayout === 'carousel_row' ? (
                                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                                      {galleryPhotos.map((photo) => (
                                        <div key={photo.name} className="w-24 shrink-0 space-y-1">
                                          <div className="h-16 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                            <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                                          </div>
                                          <p className="text-[8px] font-bold truncate opacity-80">{photo.name}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    /* grid_3 default */
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {galleryPhotos.slice(0, 3).map((photo) => (
                                        <div key={photo.name} className="space-y-1">
                                          <div className="h-16 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                            <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                                          </div>
                                          <p className="text-[8px] truncate opacity-80">{photo.name}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* SECTION: TESTIMONI PELANGGAN BERDASARKAN LAYOUT */}
                              {secKey === 'testimonials' && (
                                <div className="space-y-1.5">
                                  {testimonialLayout === 'stars_3' ? (
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {testimonialsList.slice(0, 3).map((t, idx) => (
                                        <div key={idx} className={`p-2.5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1 text-center`}>
                                          <div className="text-[8px] text-amber-500">⭐⭐⭐⭐⭐</div>
                                          <p className="text-[8px] italic opacity-80 line-clamp-2">&quot;{t.quote}&quot;</p>
                                          <strong className="block text-[8px] text-neutral-900 dark:text-white truncate">{t.author}</strong>
                                        </div>
                                      ))}
                                    </div>
                                  ) : testimonialLayout === 'quote_single' ? (
                                    <div className={`p-3.5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1.5 relative overflow-hidden`}>
                                      <div className="text-xl text-emerald-500/30 font-serif leading-none">&ldquo;</div>
                                      <p className="text-[10px] italic opacity-90 leading-relaxed font-medium">
                                        &quot;{testimonialsList[0]?.quote}&quot;
                                      </p>
                                      <div className="flex items-center justify-between text-[9px] pt-1 border-t border-black/5 dark:border-white/5">
                                        <div className="flex items-center gap-1.5 font-bold">
                                          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px]">✓</span>
                                          <span>{testimonialsList[0]?.author}</span>
                                          <span className="opacity-50 font-normal">• {testimonialsList[0]?.city}</span>
                                        </div>
                                        <span className="text-amber-500 font-bold">5.0 ★</span>
                                      </div>
                                    </div>
                                  ) : (
                                    /* cards_2 default */
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {testimonialsList.slice(0, 2).map((t, idx) => (
                                        <div key={idx} className={`p-3 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1`}>
                                          <div className="flex items-center justify-between text-[8px]">
                                            <span className="font-bold text-amber-500">⭐⭐⭐⭐⭐ 5.0</span>
                                            <span className="opacity-50 font-mono">{t.author}, {t.city}</span>
                                          </div>
                                          <p className="text-[9px] italic opacity-80 leading-relaxed">
                                            &quot;{t.quote}&quot;
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* SECTION: KONTAK WA & LOKASI BERDASARKAN LAYOUT */}
                              {secKey === 'contact' && (
                                <div>
                                  {contactLayout === 'three_cards' ? (
                                    <div className="grid grid-cols-3 gap-1.5 text-center">
                                      <div className={`p-2.5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1`}>
                                        <span className="text-sm">💬</span>
                                        <strong className="block text-[9px]">WhatsApp CS</strong>
                                        <span className="text-[8px] font-mono text-emerald-600 block">{storeWa}</span>
                                      </div>
                                      <div className={`p-2.5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1`}>
                                        <span className="text-sm">📍</span>
                                        <strong className="block text-[9px]">Alamat Fisik</strong>
                                        <span className="text-[8px] opacity-75 block truncate">{storeAddress}</span>
                                      </div>
                                      <div className={`p-2.5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1`}>
                                        <span className="text-sm">🕒</span>
                                        <strong className="block text-[9px]">Jam Buka</strong>
                                        <span className="text-[8px] opacity-75 block truncate">{storeHours}</span>
                                      </div>
                                    </div>
                                  ) : contactLayout === 'compact_bar' ? (
                                    <div className={`p-3 ${activeRadiusClass} bg-neutral-950 text-white flex items-center justify-between gap-2 shadow-xs`}>
                                      <div className="min-w-0">
                                        <p className="text-[9px] font-bold truncate">📍 {storeAddress}</p>
                                        <p className="text-[8px] opacity-60 font-mono truncate">{storeHours}</p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => alert(`Membuka chat WhatsApp ke: ${storeWa}`)}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-black text-[9px] shrink-0"
                                      >
                                        Chat WA →
                                      </button>
                                    </div>
                                  ) : contactLayout === 'booking_form' ? (
                                    <div className={`p-3.5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
                                      <div className="flex items-center justify-between text-[9px] font-bold">
                                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                          <Calendar className="w-3.5 h-3.5" />
                                          <span>Formulir Booking / Reservasi Jadwal</span>
                                        </span>
                                        <span className="opacity-50 font-mono">{storeHours}</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                                        <input
                                          type="text"
                                          placeholder="Nama Anda..."
                                          className="px-2 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[9px]"
                                          readOnly
                                          value="Calon Pelanggan"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Tanggal & Jam..."
                                          className="px-2 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[9px]"
                                          readOnly
                                          value="Besok, 10:00 WIB"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => alert(`Simulasi reservasi terkirim ke WhatsApp: ${storeWa}`)}
                                        className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] text-center cursor-pointer"
                                      >
                                        Kirim Jadwal Booking ke WhatsApp ({storeWa})
                                      </button>
                                    </div>
                                  ) : (
                                    /* split_map default */
                                    <div className={`p-3 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                          <div className="flex items-center justify-between text-[9px] font-bold">
                                            <span className="truncate">📍 {storeAddress}</span>
                                          </div>
                                          <p className="text-[8px] opacity-70">🕒 {storeHours}</p>
                                          <button
                                            type="button"
                                            onClick={() => alert(`Hubungi WhatsApp: ${storeWa}`)}
                                            className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[9px] text-center block mt-1"
                                          >
                                            💬 Chat WhatsApp: {storeWa}
                                          </button>
                                        </div>
                                        <div className="h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                                          <div className="text-center">
                                            <MapPin className="w-4 h-4 text-rose-500 mx-auto animate-bounce" />
                                            <span className="text-[8px] font-bold block opacity-75">Pin Google Maps</span>
                                            <span className="text-[7px] text-emerald-600 font-mono">Terverifikasi</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* SECTION: FAQ & PANDUAN BERDASARKAN LAYOUT */}
                              {secKey === 'faq' && (
                                <div>
                                  {faqLayout === 'grid_cards_2' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[9px]">
                                      {faqItemsList.slice(0, 2).map((item, idx) => (
                                        <div key={idx} className={`p-2.5 ${activeRadiusClass} border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-1`}>
                                          <p className="font-bold text-neutral-900 dark:text-white">❓ {item.q}</p>
                                          <p className="opacity-75">{item.a}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    /* accordion_1 default */
                                    <div className={`p-3 ${activeRadiusClass} border border-dashed border-neutral-300 dark:border-neutral-700 text-[9px] space-y-2`}>
                                      <div className="flex items-center justify-between font-bold">
                                        <span>❓ Tanya Jawab & Panduan ({BUSINESS_PRESETS[selectedBusinessCategory]?.name}):</span>
                                        <span className="text-[8px] opacity-60">{faqItemsList.length} Jawaban</span>
                                      </div>
                                      <div className="space-y-1.5">
                                        {faqItemsList.slice(0, 2).map((item, idx) => (
                                          <div key={idx} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 space-y-0.5">
                                            <p className="font-bold text-neutral-900 dark:text-white">{item.q}</p>
                                            <p className="opacity-75">{item.a}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* MOCK CHECKOUT MODAL SIMULATOR IN PREVIEW */}
                    {previewSelectedProduct && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-40">
                        <div className={`w-full max-w-[280px] p-4 ${activeRadiusClass} bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-white shadow-2xl space-y-2.5`}>
                          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                            <span className="text-[10px] font-bold">Simulasi Checkout Pembeli</span>
                            <button
                              type="button"
                              onClick={() => setPreviewSelectedProduct(null)}
                              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs font-black">{previewSelectedProduct}</p>
                          <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/80 text-[10px] space-y-1">
                            <p className="font-bold text-emerald-600 dark:text-emerald-400">
                              Alur: {CHECKOUT_CHANNELS.find((c) => c.id === selectedCheckoutChannel)?.name}
                            </p>
                            <p className="text-[9px] opacity-75">
                              {CHECKOUT_CHANNELS.find((c) => c.id === selectedCheckoutChannel)?.buyerFlow}
                            </p>
                          </div>
                          <p className="text-[9px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-1.5 rounded text-center font-bold">
                            ✓ 100% Uang masuk langsung ke rekening penjual tanpa perantara!
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Simulasi berhasil! Pesan kontak untuk "${previewSelectedProduct}" terkirim langsung ke nomor WhatsApp bisnis.`);
                              setPreviewSelectedProduct(null);
                            }}
                            className="w-full py-2 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-black cursor-pointer"
                          >
                            Hubungi Langsung Kontak Bisnis
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simulator Bottom Spec Strip */}
                  <div className={`px-3 py-2 border-t text-[9px] flex items-center justify-between opacity-70 relative z-20 ${
                    previewTheme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-100'
                  }`}>
                    <span>Font: {FONT_OPTIONS.find((f) => f.id === selectedFont)?.name}</span>
                    <span>+{customPagesList.length} Hal Kustom</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                  <span>Klik produk di atas untuk simulasi checkout pembeli</span>
                  <button
                    type="button"
                    onClick={() => setIsFullscreenPreview(true)}
                    className="font-bold text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Perbesar Layar Penuh</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE & TABLET STICKY BOTTOM ACTION BAR (RAPI, INSTAN & BEBAS BINGUNG) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-3 sm:p-4 px-4 sm:px-6 flex items-center justify-between shadow-2xl">
          <div className="space-y-0.5">
            <span className="text-[10px] text-neutral-400 font-mono uppercase block">Total Sewa (1 Thn):</span>
            <span className="text-base sm:text-lg font-black font-mono text-emerald-400">
              {formatRupiah(calculatedTotal)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('nota-rakitan-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 sm:px-4 py-2 rounded-xl bg-neutral-800 text-neutral-200 text-xs font-bold hover:bg-neutral-700 cursor-pointer transition-colors"
            >
              Lihat Nota BOM
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 sm:px-5 py-2 rounded-xl bg-white text-neutral-950 text-xs font-black hover:bg-neutral-100 cursor-pointer transition-transform active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <span>Sewa Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* FULLSCREEN INTERACTIVE PREVIEW MODAL */}
      {isFullscreenPreview && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-700 shadow-2xl">
            {/* Modal Header Bar */}
            <div className="p-4 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight">
                    Studio Rakit Website • Mode Layar Penuh Interaktif
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Font: {FONT_OPTIONS.find((f) => f.id === selectedFont)?.name} • Grid: {selectedGrid} Kolom • Total: {formatRupiah(calculatedTotal)}/thn
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Device Selector */}
                <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      previewDevice === 'desktop' ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('tablet')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      previewDevice === 'tablet' ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Tablet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      previewDevice === 'mobile' ? 'bg-white text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>

                {/* Theme Selector */}
                <button
                  type="button"
                  onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
                  title="Ganti Tema Terang / Gelap"
                >
                  {previewTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreenPreview(false)}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-100 dark:bg-neutral-950 flex justify-center">
              <div
                className={`w-full transition-all duration-300 rounded-3xl overflow-hidden border shadow-xl relative ${
                  previewTheme === 'dark' ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                } ${
                  previewDevice === 'mobile' ? 'max-w-[400px]' : previewDevice === 'tablet' ? 'max-w-[760px]' : 'max-w-5xl'
                }`}
                style={{ fontFamily: activeFontFamily }}
              >
                {/* Fullscreen Live Background Image Layer */}
                {bgImage && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-500 z-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${bgImage})`,
                      opacity: bgOpacity / 100,
                      filter: `blur(${bgBlur}px)`,
                    }}
                  />
                )}

                {/* Fullscreen Storefront Content */}
                <div className={`p-6 sm:p-10 space-y-6 relative z-10 ${bgImage ? 'backdrop-blur-[0.5px]' : ''}`}>
                  {/* Full Navbar */}
                  <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-black text-sm">
                        {storeName.charAt(0) || 'S'}
                      </span>
                      <strong className="text-base sm:text-lg font-black tracking-tight">{storeName}</strong>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold flex-wrap">
                      <button type="button" onClick={() => setActivePreviewPage('home')} className={`hover:underline ${activePreviewPage === 'home' ? 'font-black underline text-emerald-500' : ''}`}>Beranda</button>
                      <button type="button" onClick={() => setActivePreviewPage('katalog')} className={`hover:underline ${activePreviewPage === 'katalog' ? 'font-black underline text-emerald-500' : ''}`}>Katalog ({productsList.length})</button>
                      {customPagesList.map((cp) => (
                        <button
                          key={cp.id}
                          type="button"
                          onClick={() => setActivePreviewPage(cp.slug)}
                          className={`hover:underline ${activePreviewPage === cp.slug ? 'font-black underline text-emerald-500' : ''}`}
                        >
                          {cp.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* EXTRA PAGES IN FULLSCREEN: TENTANG KAMI */}
                  {activePreviewPage === 'tentang-kami' && (
                    <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-4`}>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        FILOSOFI & PROFIL RESMI
                      </span>
                      <h3 className="font-black text-2xl sm:text-3xl tracking-tight">{aboutStoryData.title}</h3>
                      <p className="text-sm opacity-80 leading-relaxed max-w-3xl">
                        {aboutStoryData.story}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {aboutStoryData.stats.map((st, sidx) => (
                          <div key={sidx} className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                            <strong className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">{st.value}</strong>
                            <span className="text-xs opacity-75">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXTRA PAGES IN FULLSCREEN: GALERI SUASANA */}
                  {activePreviewPage === 'galeri-suasana' && (
                    <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-4`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-2xl">📸 Galeri & Suasana Layanan</h3>
                        <span className="text-xs font-mono opacity-70">{galleryPhotos.length} Dokumentasi Visual</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {galleryPhotos.map((item) => (
                          <div key={item.name} className="space-y-1.5">
                            <div className="h-36 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                            <strong className="text-xs block opacity-90 truncate">{item.name}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXTRA PAGES IN FULLSCREEN: FAQ & BANTUAN */}
                  {activePreviewPage === 'faq-bantuan' && (
                    <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-4`}>
                      <h3 className="font-black text-2xl">❓ Tanya Jawab (FAQ) & Pusat Bantuan Pembeli</h3>
                      <div className="space-y-3">
                        {faqItemsList.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 space-y-1.5">
                            <strong className="text-sm font-bold block text-neutral-900 dark:text-white">Q: {item.q}</strong>
                            <p className="text-xs opacity-80 leading-relaxed">A: {item.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXTRA PAGES IN FULLSCREEN: GARANSI KUALITAS */}
                  {activePreviewPage === 'garansi-kualitas' && (
                    <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-4`}>
                      <h3 className="font-black text-2xl flex items-center gap-2">
                        <span>🛡️ Kebijakan Garansi & Standar Mutu Resmi</span>
                      </h3>
                      <p className="text-sm opacity-80 leading-relaxed max-w-3xl">
                        Kami menjamin kepuasan setiap pelanggan dengan komitmen mutu standar operasional tertinggi.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                          <span className="text-2xl">✨</span>
                          <strong className="text-sm font-black text-emerald-900 dark:text-emerald-300 block">Jaminan Kualitas 100% Asli</strong>
                          <p className="text-xs opacity-80 leading-relaxed">Setiap produk dan jasa dikerjakan sesuai standar tanpa kompromi material.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
                          <span className="text-2xl">💯</span>
                          <strong className="text-sm font-black text-blue-900 dark:text-blue-300 block">Garansi Solutif Bebas Ribet</strong>
                          <p className="text-xs opacity-80 leading-relaxed">Komplain ditangani langsung oleh tim kami tanpa birokrasi berbelit.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EXTRA PAGES IN FULLSCREEN: DAFTAR CABANG */}
                  {activePreviewPage === 'daftar-cabang' && (
                    <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-4`}>
                      <h3 className="font-black text-2xl">📍 Lokasi & Cabang Pelayanan Resmi</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-2">
                          <strong className="text-base font-bold block">{storeName} — Pusat</strong>
                          <p className="text-xs opacity-75">{storeAddress}</p>
                          <p className="text-xs opacity-75 font-mono">Jam Layanan: {storeHours}</p>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold block">WhatsApp: {storeWa}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EXTRA PAGES IN FULLSCREEN: CUSTOM SLUG LAINNYA */}
                  {activePreviewPage !== 'home' &&
                    activePreviewPage !== 'katalog' &&
                    activePreviewPage !== 'tentang-kami' &&
                    activePreviewPage !== 'galeri-suasana' &&
                    activePreviewPage !== 'faq-bantuan' &&
                    activePreviewPage !== 'garansi-kualitas' &&
                    activePreviewPage !== 'daftar-cabang' && (
                      <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-3`}>
                        <h3 className="font-black text-2xl capitalize">
                          📄 {customPagesList.find((p) => p.slug === activePreviewPage)?.title || 'Halaman Tambahan'}
                        </h3>
                        <p className="text-sm opacity-80 leading-relaxed max-w-2xl">
                          {customPagesList.find((p) => p.slug === activePreviewPage)?.summary ||
                            'Halaman khusus ini aktif dan terhubung ke arsitektur multi-tenant Anycast Edge platform SivilizeSpace.'}
                        </p>
                      </div>
                    )}

                  {/* DYNAMIC FULLSCREEN SECTIONS RENDERING ACCORDING TO USER'S SECTION ORDER */}
                  {(activePreviewPage === 'home' || activePreviewPage === 'katalog') && (
                    <div className="space-y-6">
                      {sectionOrder.map((secKey) => {
                        if (visibleSections[secKey] === false) return null;
                        if (activePreviewPage === 'katalog' && secKey !== 'catalog' && secKey !== 'categories') return null;

                        return (
                          <div key={secKey}>
                            {/* HERO SECTION */}
                            {secKey === 'hero' && (
                              <div className={`p-6 sm:p-8 ${activeRadiusClass} border flex flex-col ${getTextAlignClass()} ${
                                selectedSurface === 'frosted'
                                  ? 'backdrop-blur-md bg-white/75 dark:bg-neutral-900/75 border-white/50 dark:border-neutral-700/50 shadow-md'
                                  : selectedSurface === 'deep'
                                  ? 'backdrop-blur-xl bg-neutral-900/90 text-white border-neutral-700/60 shadow-lg'
                                  : previewTheme === 'dark'
                                  ? 'bg-neutral-900 border-neutral-800'
                                  : 'bg-neutral-50 border-neutral-200'
                              }`}>
                                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                  {heroBadge}
                                </span>
                                <h2 className={`${getFullHeadingScaleClass()} mt-2 leading-tight`}>
                                  {heroHeadline}
                                </h2>
                                <p className="text-sm opacity-80 mt-2 max-w-2xl leading-relaxed">
                                  {heroSubhead}
                                </p>
                              </div>
                            )}

                            {/* PROMO SECTION */}
                            {secKey === 'promo' && (
                              <div className={`p-4 ${activeRadiusClass} bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-sm`}>
                                <div className="flex items-center gap-2 font-bold text-sm">
                                  <span>🔥</span>
                                  <span>{promoText} Kode: <code className="bg-black/20 px-1.5 py-0.5 rounded font-mono">{promoCode}</code></span>
                                </div>
                                <span className="text-xs opacity-90 font-mono">Promo Terbatas</span>
                              </div>
                            )}

                            {/* CATEGORIES FILTER SECTION */}
                            {secKey === 'categories' && (
                              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
                                {categoriesList.map((cat, i) => (
                                  <span
                                    key={cat}
                                    className={`px-3 py-1.5 rounded-xl shrink-0 cursor-pointer transition-colors ${
                                      i === 0
                                        ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                    }`}
                                  >
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* CATALOG GRID FULL */}
                            {secKey === 'catalog' && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-extrabold text-base uppercase tracking-wider">Katalog Produk & Layanan:</h3>
                                  <span className="text-xs font-mono opacity-60">Layout: {selectedGrid} Kolom</span>
                                </div>

                                <div
                                  className={
                                    selectedGrid === 'list'
                                      ? 'space-y-3'
                                      : selectedGrid === '2'
                                      ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                                      : selectedGrid === '4'
                                      ? 'grid grid-cols-2 sm:grid-cols-4 gap-3'
                                      : selectedGrid === 'masonry'
                                      ? 'grid grid-cols-2 sm:grid-cols-3 gap-4'
                                      : 'grid grid-cols-1 sm:grid-cols-3 gap-4'
                                  }
                                >
                                  {productsList.map((prod) => (
                                    <div
                                      key={prod.id}
                                      className={`p-4 ${activeRadiusClass} border transition-all hover:shadow-md ${
                                        selectedSurface === 'frosted'
                                          ? 'backdrop-blur-md bg-white/75 dark:bg-neutral-900/75 border-white/40 dark:border-neutral-700/40'
                                          : previewTheme === 'dark'
                                          ? 'bg-neutral-900 border-neutral-800'
                                          : 'bg-white border-neutral-200'
                                      } ${selectedGrid === 'list' ? 'flex items-center justify-between gap-4' : 'space-y-2'}`}
                                    >
                                      {/* Foto Produk Resolusi Tinggi */}
                                      <div className={`rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative group/img shrink-0 ${
                                        selectedGrid === 'list' ? 'w-16 h-16' : 'w-full h-36'
                                      }`}>
                                        <img
                                          src={prod.imageUrl}
                                          alt={prod.title}
                                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                                          loading="lazy"
                                        />
                                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-neutral-950/80 text-white backdrop-blur-xs">
                                          {prod.badge}
                                        </span>
                                      </div>

                                      <div className={`flex-1 ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'}`}>
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                          {prod.badge}
                                        </span>
                                        <h4 className="font-black text-sm mt-1">{prod.title}</h4>
                                        <p className="text-xs opacity-75 line-clamp-2 mt-0.5">{prod.desc}</p>
                                        <p className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                                          {formatRupiah(prod.price)}
                                        </p>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          alert(`Order "${prod.title}" terkirim via: ${CHECKOUT_CHANNELS.find((c) => c.id === selectedCheckoutChannel)?.name}`);
                                        }}
                                        className={`py-2 px-3 ${getButtonStyleClass()} bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold text-xs hover:bg-emerald-600 transition-colors cursor-pointer shrink-0`}
                                      >
                                        Beli Sekarang
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* ABOUT SECTION ACCORDING TO ABOUT_LAYOUT */}
                            {secKey === 'about' && (
                              <div>
                                {aboutLayout === 'pillars_3' ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {aboutStoryData.stats.map((st, sidx) => (
                                      <div key={sidx} className={`p-5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
                                        <span className="text-xl">🏆</span>
                                        <strong className="block text-xl font-black text-emerald-600 dark:text-emerald-400">{st.value}</strong>
                                        <p className="text-xs font-bold">{st.label}</p>
                                        <p className="text-[11px] opacity-75">Dedikasi layanan terbaik dengan kualitas terverifikasi tanpa kompromi.</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : aboutLayout === 'stats_counter' ? (
                                  <div className={`p-6 sm:p-8 ${activeRadiusClass} bg-neutral-950 text-white space-y-4`}>
                                    <div className="text-center max-w-xl mx-auto space-y-1">
                                      <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono">PENCAPAIAN KAMI</span>
                                      <h4 className="text-xl font-black">{aboutStoryData.title}</h4>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-center">
                                      {aboutStoryData.stats.map((st, sidx) => (
                                        <div key={sidx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                          <p className="text-3xl font-black text-emerald-400 font-mono">{st.value}</p>
                                          <p className="text-xs opacity-75 mt-1 font-semibold">{st.label}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  /* story_split default */
                                  <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} grid grid-cols-1 md:grid-cols-3 gap-6 items-center`}>
                                    <div className="md:col-span-2 space-y-2">
                                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">📖 PROFIL & FILOSOFI BISNIS</span>
                                      <h4 className="font-black text-xl sm:text-2xl">{aboutStoryData.title}</h4>
                                      <p className="text-sm opacity-80 leading-relaxed">{aboutStoryData.story}</p>
                                    </div>
                                    <div className="space-y-3">
                                      {aboutStoryData.stats.map((st, sidx) => (
                                        <div key={sidx} className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-between">
                                          <span className="text-xs opacity-75">{st.label}</span>
                                          <strong className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{st.value}</strong>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* GALLERY SECTION ACCORDING TO GALLERY_LAYOUT */}
                            {secKey === 'gallery' && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-extrabold text-sm uppercase tracking-wider">📸 Galeri Dokumentasi ({galleryPhotos.length} Foto):</h4>
                                  <span className="text-xs font-mono opacity-60">Layout: {GALLERY_LAYOUT_OPTIONS.find((g) => g.id === galleryLayout)?.name}</span>
                                </div>

                                {galleryLayout === 'carousel_row' ? (
                                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                                    {galleryPhotos.map((item) => (
                                      <div key={item.name} className="w-56 shrink-0 space-y-1">
                                        <div className="h-36 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                          <img src={item.url} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                        </div>
                                        <p className="text-xs font-bold truncate opacity-85">{item.name}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : galleryLayout === 'grid_2' ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {galleryPhotos.slice(0, 4).map((item) => (
                                      <div key={item.name} className="space-y-1.5">
                                        <div className="h-44 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                          <img src={item.url} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                        </div>
                                        <p className="text-xs font-bold truncate opacity-85">{item.name}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : galleryLayout === 'grid_4' ? (
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {galleryPhotos.map((item) => (
                                      <div key={item.name} className="space-y-1">
                                        <div className="h-28 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                          <img src={item.url} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                        </div>
                                        <p className="text-[11px] font-bold truncate opacity-85">{item.name}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  /* grid_3 default */
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {galleryPhotos.map((item) => (
                                      <div key={item.name} className="space-y-1.5">
                                        <div className="h-32 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                          <img src={item.url} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                        </div>
                                        <p className="text-xs font-bold truncate opacity-85">{item.name}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* TESTIMONIALS SECTION ACCORDING TO TESTIMONIAL_LAYOUT */}
                            {secKey === 'testimonials' && (
                              <div>
                                {testimonialLayout === 'quote_single' ? (
                                  <div className={`p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} text-center space-y-3`}>
                                    <span className="text-3xl text-amber-500">★★★★★</span>
                                    <p className="text-base sm:text-lg font-bold italic leading-relaxed max-w-2xl mx-auto">
                                      &quot;{testimonialsList[0]?.quote}&quot;
                                    </p>
                                    <div className="pt-2">
                                      <p className="font-black text-sm">{testimonialsList[0]?.author}</p>
                                      <p className="text-xs opacity-60 font-mono">Pelanggan Terverifikasi • {testimonialsList[0]?.city}</p>
                                    </div>
                                  </div>
                                ) : testimonialLayout === 'stars_3' ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {testimonialsList.map((t, tidx) => (
                                      <div key={tidx} className={`p-5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2`}>
                                        <span className="text-amber-500 font-bold text-xs">⭐⭐⭐⭐⭐ Bintang 5</span>
                                        <p className="text-xs opacity-80 leading-relaxed">&quot;{t.quote}&quot;</p>
                                        <div className="pt-1 border-t border-black/5 dark:border-white/5">
                                          <p className="font-bold text-xs">{t.author}</p>
                                          <p className="text-[10px] opacity-60 font-mono">{t.city}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  /* cards_2 default */
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {testimonialsList.slice(0, 2).map((t, tidx) => (
                                      <div key={tidx} className={`p-6 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-2.5`}>
                                        <div className="flex items-center justify-between">
                                          <span className="text-amber-500 font-bold text-xs">⭐⭐⭐⭐⭐ Bintang 5</span>
                                          <span className="text-xs font-mono opacity-50">{t.city}</span>
                                        </div>
                                        <p className="text-xs opacity-85 leading-relaxed">&quot;{t.quote}&quot;</p>
                                        <p className="font-black text-xs text-emerald-600 dark:text-emerald-400">— {t.author}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* CONTACT SECTION ACCORDING TO CONTACT_LAYOUT */}
                            {secKey === 'contact' && (
                              <div>
                                {contactLayout === 'three_cards' ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className={`p-5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1`}>
                                      <span className="text-xl">📍</span>
                                      <strong className="block text-sm font-bold">Alamat Fisik</strong>
                                      <p className="text-xs opacity-75">{storeAddress}</p>
                                    </div>
                                    <div className={`p-5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1`}>
                                      <span className="text-xl">💬</span>
                                      <strong className="block text-sm font-bold">WhatsApp Resmi</strong>
                                      <p className="text-xs opacity-75 font-mono">{storeWa}</p>
                                    </div>
                                    <div className={`p-5 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-1`}>
                                      <span className="text-xl">🕒</span>
                                      <strong className="block text-sm font-bold">Jam Layanan</strong>
                                      <p className="text-xs opacity-75 font-mono">{storeHours}</p>
                                    </div>
                                  </div>
                                ) : contactLayout === 'compact_bar' ? (
                                  <div className={`p-4 sm:p-5 ${activeRadiusClass} bg-neutral-950 text-white flex items-center justify-between flex-wrap gap-4 shadow-sm`}>
                                    <div>
                                      <p className="font-black text-sm">📍 {storeAddress}</p>
                                      <p className="text-xs opacity-70 font-mono mt-0.5">Jam Operasional: {storeHours}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => alert(`Hubungi via WhatsApp: ${storeWa}`)}
                                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-black text-xs cursor-pointer"
                                    >
                                      Chat WhatsApp: {storeWa} →
                                    </button>
                                  </div>
                                ) : contactLayout === 'booking_form' ? (
                                  <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} space-y-4`}>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                      <div>
                                        <h4 className="font-black text-base flex items-center gap-2">
                                          <Calendar className="w-5 h-5 text-emerald-500" />
                                          <span>Formulir Reservasi / Booking Jadwal Langsung</span>
                                        </h4>
                                        <p className="text-xs opacity-70 mt-1">Konfirmasi langsung ke nomor WhatsApp kasir tanpa biaya perantara.</p>
                                      </div>
                                      <span className="text-xs font-mono opacity-60">Jam Buka: {storeHours}</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                      <input
                                        type="text"
                                        placeholder="Nama Lengkap Pemesan..."
                                        className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs"
                                        readOnly
                                        value="Bpk. Hendra Gunawan"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Tanggal & Jam Reservasi..."
                                        className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs"
                                        readOnly
                                        value="Besok Sore, Pukul 14:00 WIB"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => alert(`Simulasi reservasi terkirim ke WhatsApp: ${storeWa}`)}
                                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer text-center"
                                    >
                                      Kirim Booking via WhatsApp ({storeWa})
                                    </button>
                                  </div>
                                ) : (
                                  /* split_map default */
                                  <div className={`p-6 sm:p-8 ${activeRadiusClass} border ${previewTheme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} grid grid-cols-1 sm:grid-cols-2 gap-6 items-center`}>
                                    <div className="space-y-2">
                                      <h4 className="font-extrabold text-base">📍 Kunjungi Lokasi Kami:</h4>
                                      <p className="text-xs opacity-80 leading-relaxed">{storeAddress}</p>
                                      <p className="text-xs opacity-75 font-mono">🕒 Jam Buka: {storeHours}</p>
                                      <button
                                        type="button"
                                        onClick={() => alert(`Hubungi via WhatsApp: ${storeWa}`)}
                                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs block mt-2"
                                      >
                                        💬 WhatsApp CS: {storeWa}
                                      </button>
                                    </div>
                                    <div className="h-32 rounded-2xl bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                                      <div className="text-center">
                                        <MapPin className="w-6 h-6 text-rose-500 mx-auto animate-bounce" />
                                        <span className="text-xs font-bold block opacity-80 mt-1">Pin Google Maps</span>
                                        <span className="text-[10px] text-emerald-600 font-mono">Alamat Terverifikasi Resmi</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* FAQ SECTION ACCORDING TO FAQ_LAYOUT */}
                            {secKey === 'faq' && (
                              <div>
                                {faqLayout === 'grid_cards_2' ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {faqItemsList.map((item, idx) => (
                                      <div key={idx} className={`p-5 ${activeRadiusClass} border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 space-y-1.5`}>
                                        <p className="font-bold text-xs text-neutral-900 dark:text-white">❓ {item.q}</p>
                                        <p className="text-xs opacity-80 leading-relaxed">{item.a}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  /* accordion_1 default */
                                  <div className={`p-6 ${activeRadiusClass} border border-dashed border-neutral-300 dark:border-neutral-700 text-xs space-y-3`}>
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-extrabold text-sm">❓ Pertanyaan Seputar Layanan & Order ({BUSINESS_PRESETS[selectedBusinessCategory]?.name}):</h4>
                                      <span className="text-xs font-mono opacity-60">{faqItemsList.length} Tanya Jawab</span>
                                    </div>
                                    <div className="space-y-2">
                                      {faqItemsList.map((item, idx) => (
                                        <div key={idx} className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 space-y-1">
                                          <p className="font-bold text-neutral-900 dark:text-white">Q: {item.q}</p>
                                          <p className="opacity-80">A: {item.a}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-500">Biaya Rakitan Anda:</span>
                <span className="font-mono font-black text-lg text-emerald-600 dark:text-emerald-400">
                  {formatRupiah(calculatedTotal)}/tahun
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFullscreenPreview(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Kembali ke Konfigurator
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFullscreenPreview(false);
                    setModalOpen(true);
                  }}
                  className="px-5 py-2 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-black hover:bg-neutral-800 cursor-pointer flex items-center gap-2"
                >
                  <span>Sewa Rakitan Ini Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Modal Wizard with Custom Rakitan Configuration */}
      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSlug="website-rakitan"
        initialPlan="pro"
        initialPrice={calculatedTotal}
        initialLayoutConfig={{
          grid_columns_desktop: selectedGrid === 'list' ? 'list' : (parseInt(selectedGrid) as 2 | 3 | 4) || 3,
          text_alignment: textAlign,
          heading_size: headingScale,
          button_style: buttonStyle,
          background_image: bgImage,
          section_order: sectionOrder,
        }}
      />
    </div>
  );
}
