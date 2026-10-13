# 🏛️ SIVILIZE SPACE
### Platform Ekosistem Sewa Website Bisnis (WaaS) & Kasir Pintar Mandiri No. 1 di Indonesia
**Produk Resmi Divisi SiWeb Production — PT Sivilize Corp Indonesia**  
*Nomor Induk Berusaha (NIB): 0207260103661 | Klasifikasi KBLI: 62199 (Aktivitas Pemrograman & Layanan Web Mandiri)*  
*Alamat Kantor Pusat: Kota Kupang, Nusa Tenggara Timur, Indonesia*  
*Email Pelaporan Resmi: sivilizecorpindonesia@gmail.com*  

---

## 🌟 Tentang Sivilize Space

**Sivilize Space** adalah platform *Website-as-a-Service (WaaS)* terpadu yang dirancang khusus untuk merevolusi digitalisasi UMKM dan korporasi di Indonesia. Tidak hanya menyediakan website bisnis siap pakai berkecepatan tinggi, Sivilize Space mengintegrasikan ekosistem operasional lengkap yang mencakup:

1. **Website Bisnis Mandiri (Sivilize Space)**: Etalase online berestetika premium, profil resmi, dan katalog produk dengan integrasi pembayaran QRIS Dinamis.
2. **Aplikasi Kasir POS (SiKasir POS)**: Aplikasi kasir online/offline terpadu dengan Kitchen Display System (KDS), kalkulasi resep bahan baku, struk bluetooth, dan modul industri spesifik.
3. **Self-Order Meja Tamu QR (Sivilize Dine Lite)**: Khusus industri F&B, tamu cukup scan QR di meja resto untuk memesan mandiri, tersambung 2-arah seketika dengan kasir.
4. **AI Copilot & Guided Tour (Google Gemini 2.5 Flash)**: Asisten AI cerdas 24/7 dan pemandu interaktif langkah demi langkah yang memberikan bimbingan sesuai kategori bisnis Anda.

---

## ⚡ Fitur Utama & Pembaruan Terkini

### 1. 🎯 Segmentasi Industri & Bundling Ekosistem (Pill Bar)
Halaman depan kini dilengkapi dengan selektor industri interaktif (*Segmented Pill Bar*) yang mencakup 6 sektor usaha utama dengan fasilitas lengkap yang sudah termasuk (*included*):

| Kategori Usaha | Fasilitas Ekosistem Termasuk | Fitur Spesifik Industri |
| :--- | :--- | :--- |
| **☕ Kuliner & Kafe (F&B)** | Website + **SiKasir POS** + **Sivilize Dine Lite** | QR Self-Order Meja, Kitchen Display (KDS), Resep Bahan Baku |
| **🛒 Retail & Minimarket** | Website + **SiKasir POS** | Scan Barcode Produk, Struk Bluetooth, Level Stok Minimum |
| **🔧 Bengkel & Otomotif** | Website + **SiKasir POS** | Pelacakan Nomor Polisi (Nopol), Riwayat Servis, Komisi Mekanik |
| **🧺 Laundry Kiloan/Satuan**| Website + **SiKasir POS** | Manajemen Rak Cucian, Status Cuci-Kering-Setrika, Notif WA |
| **✂️ Barbershop & Salon** | Website + **SiKasir POS** | Pilihan Kapster/Stylist, Komisi Staf, Jadwal Booking |
| **💊 Apotek & Toko Obat** | Website + **SiKasir POS** | Input Resep Dokter, Peringatan Kedaluwarsa Obat, Batch No. |

---

### 2. ⚡ Auto-Provisioning & Aktivasi Lisensi 1-Klik
- **Tanpa Registrasi Ulang:** Setelah pelanggan menyelesaikan pembayaran sewa via QRIS, database toko langsung terbuat secara otomatis di Cloud Database Supabase dengan masa aktif 365 hari (tahunan).
- **Auto-Login:** Sesi toko langsung aktif seketika di peramban, mengarahkan pemilik usaha langsung ke Dashboard tanpa perlu mengisi formulir pendaftaran manual dari awal.
- **Kode Lisensi Ekosistem:** Diterbitkan otomatis untuk setiap toko (contoh: `SIV-FNB-365D`, `SIV-RETAIL-365D`, `SIV-BENGKEL-365D`).
- **Aktivasi Instan Kasir:** Cukup masukkan kode lisensi pada aplikasi **SiKasir POS** atau **Sivilize Dine Lite**, aplikasi langsung aktif sebagai Admin tanpa registrasi manual.

---

### 3. 🤖 AI Copilot & AI Tour Guide (Google Gemini 2.5 Flash)
- **Sivilize AI Copilot (Chatbot Assistant 24/7):** Asisten AI mengambang di pojok kanan bawah dashboard toko, siap menjawab pertanyaan seputar pengelolaan katalog, kustomisasi tata letak, integrasi kasir, dan custom domain.
- **Sivilize AI Tour Guide (Interactive Guided Tour):** Tur interaktif 5 langkah memandu merchant menjelajahi pusat kendali toko. Dilengkapi bimbingan kontekstual cerdas spesifik untuk kategori usaha merchant dan fitur **Tanya AI Tour Guide** interaktif.
- **Zero-Downtime Fallback:** Jika koneksi API AI sedang offline atau kuota habis, sistem cerdas lokal otomatis mengambil alih tanpa menampilkan pesan error kepada merchant.

---

### 4. 🛡️ Multi-Layer Cyber Security & Defense Engine
Sivilize Space menerapkan arsitektur keamanan berlapis kelas *Enterprise Zero-Trust*:

```text
[ REQUEST INTERNET ]
        │
        ├── 🛡️ Layer 1: Geo-Blocking (Membatasi request bot dari negara berbahaya)
        │
        ├── ⏱️ Layer 2: Sliding-Window IP Rate Limiter (Mencegah flood & API quota abuse)
        │
        ├── 📱 Layer 3: Client Device Fingerprinting (Hardware hash WebGL/Canvas SHA-256)
        │
        ├── 🚫 Layer 4: Multi-Layer Blacklist (Blokir by Device, IP, Phone, Country)
        │
        ├── 🔒 Layer 5: Anti-Brute Force Lockout (5x salah PIN = Lockout 15 Menit HTTP 429)
        │
        ├── 🍯 Layer 6: Zero-Opacity Honeypot & Tarpit Delay (Membuat bot scraper hang)
        │
        ├── 🔍 Layer 7: Semantic Anti-Judol & Anti-Pinjol Filter (Regex content scanner)
        │
        └── 🖼️ Layer 8: Binary Magic Bytes Inspection (Validasi asli WebP, JPEG, PNG)
        │
        ▼
[ DASHBOARD & DATABASE SUPABASE ]
```

#### Kuota Rate Limiter:
- `/api/ai/chat`: Maksimal **12 request / menit / IP** (Menjaga batas Free Tier Gemini 15 RPM).
- `/api/store/register`: Maksimal **5 pendaftaran / 10 menit / IP** (Mencegah spam tabel toko).
- `/api/auth/login`: Maksimal **10 login / menit / IP** (Mencegah network DDoS flood).
- `/api/upload`: Maksimal **15 upload / menit / IP** (Mencegah pengurasan Supabase Storage).

---

### 5. 🔑 Autentikasi Fleksibel
- **WhatsApp + PIN 6-Digit (Utama):** Standar terbaik bagi pelaku UMKM di Indonesia, tanpa perlu mengingat password panjang dan langsung terhubung dengan nomor notifikasi WhatsApp.
- **Masuk dengan Akun Google / Gmail (Alternatif):** Tombol 1-klik bagi pengguna korporat/modern untuk menghubungkan akun Google dengan verifikasi toko.

---

### 6. 💓 Automated Zero-Sleep Keep-Alive Engine
Mencegah database Supabase Free Tier tertidur (*inactivity pause* setelah 7 hari idle) dan memanaskan Vercel Serverless Function agar bebas *cold-start*:

1. **Vercel Cron (`vercel.json`):** Menembak `/api/keep-alive` otomatis setiap 12 jam via Edge Network.
2. **GitHub Actions Bot (`.github/workflows/keep-alive.yml`):** Runner cloud eksternal gratis yang menembak Vercel dan Supabase REST API langsung setiap 6 jam (`cron: '0 */6 * * *'`).
3. **Diagnostic Endpoint (`/api/keep-alive`):** Melakukan kueri nyata ke tabel toko dan mencatat latensi Supabase Singapore (`ap-southeast-1`).
4. **Local Daemon Script (`scripts/keep-alive-daemon.mjs`):** Script mandiri untuk pengujian atau eksekusi berkala via Node.js/PM2.

---

## 🏗️ Tech Stack & Arsitektur

- **Framework:** [Next.js 16.4.0](https://nextjs.org/) (App Router, Turbopack Engine)
- **Library UI:** [React 19.3.0](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Lucide React Icons
- **Database & Storage:** [Supabase PostgreSQL Cloud](https://supabase.com/) & Supabase Storage (Kompresi WebP otomatis <150KB)
- **AI Engine:** [Google Gemini 2.5 Flash](https://aistudio.google.com/) via Google AI Studio API
- **Infrastruktur Hosting:** Vercel Anycast Edge Engine (DNS Record A: `76.76.21.21`, CNAME: `cname.vercel-dns.com`)
- **Validasi Data:** Zod Schema Validation

---

## 📂 Struktur Repositori

```text
sivilize-space/
├── .github/
│   └── workflows/
│       └── keep-alive.yml         # GitHub Actions zero-sleep cron bot
├── public/                        # Aset statis & logo
├── scripts/
│   ├── keep-alive-daemon.mjs      # Script pulse keep-alive Supabase & Vercel
│   └── seed.mjs                   # Database seeder
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/chat/           # Gemini 2.5 Flash AI Copilot & Tour Guide
│   │   │   ├── auth/login/        # Login WA + PIN, Google Auth, Brute-Force lockout
│   │   │   ├── keep-alive/        # Anti-sleep diagnostic heartbeat endpoint
│   │   │   ├── store/register/    # Auto-provisioning & penerbitan lisensi
│   │   │   └── upload/            # Magic bytes image upload engine
│   │   ├── dashboard/             # Dashboard pengelola toko & lisensi ekosistem
│   │   └── page.tsx               # Landing page & Segmented Pill Bar industri
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── AIChatbotAssistant.tsx # Widget AI Copilot
│   │   │   └── AIGuidedTour.tsx       # Modal AI Tour Guide Gemini
│   │   └── landing/
│   │       ├── IndustryBundleSection.tsx # Pill Bar 6 industri & bundling kasir
│   │       └── OnboardingModal.tsx       # Form sewa & auto-provisioning
│   ├── lib/
│   │   ├── blacklist.ts           # Engine pencekalan Device, IP, Phone, Country
│   │   ├── device-fingerprint.ts  # Client-side hardware hash generator
│   │   ├── rate-limiter.ts        # Sliding-window in-memory API rate limiter
│   │   ├── security.ts            # Anti-judol & zod validation schema
│   │   └── supabase.ts            # Client Supabase PostgreSQL
│   └── types/
│       └── database.ts            # TypeScript interfaces & database models
├── vercel.json                    # Konfigurasi Vercel Cron jobs
├── .env.example                   # Template variabel lingkungan
└── README.md                      # Dokumentasi resmi
```

---

## 🚀 Panduan Memulai (Local Development)

### 1. Kloning Repositori
```bash
git clone https://github.com/muhamadadrian210-debug/sivilize-space.git
cd sivilize-space
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Lengkapi isinya di `.env.local`:
```env
# Supabase PostgreSQL Cloud
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Multi-Tenant Base Domain
NEXT_PUBLIC_BASE_DOMAIN=sivilizecorp.my.id
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Gemini AI Studio (100% Gratis - aistudio.google.com)
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Jalankan Server Development
```bash
npm run dev
```
Buka peramban Anda di `http://localhost:3000`.

### 5. Validasi Build Produksi
```bash
npm run build
```

---

## 🌐 Panduan Custom Domain Klien

Untuk klien paket Tahunan yang menggunakan domain pribadi (contoh: `www.bisnisanda.com`):
1. Buka dashboard DNS registrar domain (Niagahoster, DomaiNesia, Cloudflare, dll).
2. Tambahkan DNS Record berikut:
   - **Type A**: `@` ➔ `76.76.21.21`
   - **CNAME**: `www` ➔ `cname.vercel-dns.com`
3. Sertifikat SSL HTTPS akan terbit dan aktif secara otomatis dalam 5-15 menit melalui Vercel Edge.

---

## ⚖️ Kepatuhan Hukum & Legalitas

PT Sivilize Corp Indonesia menjamin seluruh operasional platform ini patuh terhadap peraturan perundang-undangan Republik Indonesia:
- **NIB:** 0207260103661
- **KBLI:** 62199 (Aktivitas Pemrograman Komputer Lainnya)
- **UU ITE & PDP:** Seluruh data transaksi dan informasi merchant dienkripsi dengan standar isolasi tenant ketat.
- **Zero-Tolerance:** Platform ini secara aktif memindai dan memblokir segala bentuk sindikat judi online (*judol*), pinjaman online ilegal (*pinjol*), dan aktivitas terlarang lainnya.

---
© 2026 PT Sivilize Corp Indonesia. Seluruh hak cipta dilindungi undang-undang.
