# 👑 MASTER BLUEPRINT & PRODUCT REQUIREMENT DOCUMENT (PRD) v4.0
## SIVILIZESPACE (SIVILIZE SPACE) — STANDALONE MULTI-TENANT WAAS PLATFORM
### ENTERPRISE SECURITY EDITION: PURE VERCEL + FIREBASE / SUPABASE
### 🛡️ 20-LAYER FIREWALL ARCHITECTURE & 20 DECOY HONEYPOT SYSTEM (MICROSOFT-GRADE ZERO TRUST)
**Platform Sewa Website Bisnis Siap Pakai & Mandiri untuk UMKM & Pelaku Usaha Indonesia**  
*Produk Resmi di bawah Divisi SiWeb Production — PT Sivilize Corp Indonesia*  
*Nomor Induk Berusaha (NIB): 0207260103661 | Klasifikasi KBLI: 62199*

---

## 🏛️ DAFTAR ISI MASTER BLUEPRINT
1. **BAB I: IDENTITAS, BRANDING & FILOSOFI EKOSISTEM SIVILIZE CORP**
2. **BAB II: ANALISIS PASAR, PAIN POINTS UMKM & USER PERSONAS**
3. **BAB III: STRUKTUR HARGA PSIKOLOGIS & ATURAN DOMAIN (REVISI KHUSUS TAHUNAN)**
4. **BAB IV: LIMA SENJATA PEMBUNUH PENJUALAN (KILLER VALUE PROPOSITIONS)**
5. **BAB V: TECH STACK SELECTION — PURE VERCEL + FIREBASE / SUPABASE (ZERO CLOUDFLARE)**
6. **BAB VI: ARSITEKTUR DNS REGISTRAR KE VERCEL MURNI (ZERO-CLOUDFLARE ENGINE)**
7. **BAB VII: FILOSOFI ZERO-TRUST ENTERPRISE: MUTUAL DISTRUST FRONTEND, BACKEND & DATABASE**
8. **BAB VIII: BENTENG PERTAHANAN 20 LAYER FIREWALL & 20 DECOY HONEYPOT SYSTEM**
9. **BAB IX: DUAL DATABASE ENGINE (SUPABASE POSTGRESQL & FIREBASE FIRESTORE)**
10. **BAB X: NEXT.JS 15 MULTI-TENANT MIDDLEWARE & VERCEL DOMAIN API PIPELINE**
11. **BAB XI: 12 DETAIL MIKRO TERSEMBUNYI (THE 12 HIDDEN MICRO-SPECS)**
12. **BAB XII: 3 MASTER TEMPLATE UI & 5 DESIGN TOKENS (ANTI-AI SLOP)**
13. **BAB XIII: SPESIFIKASI CLIENT DASHBOARD & SUPER ADMIN**
14. **BAB XIV: DOKUMEN HUKUM RESMI: TERMS OF SERVICE, ANTI-JUDOL & SLA 99.8%**
15. **BAB XV: ACTION PLAN EKSEKUSI TAHAP DEMI TAHAP**

---

## 🏛️ BAB I: IDENTITAS, BRANDING & FILOSOFI EKOSISTEM SIVILIZE CORP

### 1.1 Entitas & Payung Hukum
* **Badan Usaha Resmi:** **PT SIVILIZE CORP INDONESIA**
* **Legalitas Kemenkumham RI:** NIB `0207260103661` | KBLI `62199` (Aktivitas Pemrograman Komputer Lainnya).
* **Domisili Kantor Pusat:** Kota Kupang, Nusa Tenggara Timur (NTT), Indonesia.
* **Divisi Pengelola:** **SiWeb Production** (Divisi Solusi Web & Agensi Korporat).
* **Nama Produk SaaS:** **SivilizeSpace** (atau *Sivilize Space*).
* **Makna Filosofi Akronim "Si-":**
  * Seluruh lini teknologi PT Sivilize Corp Indonesia diawali dengan singkatan brand:
  * **SiWeb** = **SI**vilize Web (Solusi Agency Website Korporat).
  * **SiKasir** = **SI**vilize Kasir (Hardware & Software Point of Sale).
  * **SivilizeSpace** = Ruang Digital Mandiri (*Space*) untuk UMKM Indonesia berkarya dan berdagang tanpa diperas komisi pihak ketiga.

### 1.2 Strategi Pemisahan Dua Pintu (The Two-Door Strategy)
* **Pintu 1 (Jasa Custom Corporate & Tender):** Dikelola oleh **Divisi SiWeb Production** di `sivilizecorp.my.id`. Menangani website custom berskala korporat, B2B, company profile PT berbadan hukum, dan tender instansi bernilai **Rp 2.500.000 – Rp 15.000.000+**.
* **Pintu 2 (SaaS Sewa Website UMKM Instan):** Dikelola oleh **Platform SivilizeSpace** di domain mandirinya (misal: `sivilizespace.vercel.app` atau `space.sivilizecorp.com` atau `sivilizespace.id`). Menangani ribuan pedagang UMKM, cafe, distro, dan laundry dengan sistem sewa mandiri langganan mulai **Rp 39.000/bulan**.

### 1.3 The Autodesk & Apple Synergy Model (Sinergi Roda Gila Sivilize)
* **SivilizeSpace ⮀ SiKasir POS:** Data produk dan harga diinput 1 kali di kasir fisik toko -> Otomatis tayang di katalog web SivilizeSpace. Transaksi offline langsung memotong stok real-time di website.
* **SivilizeSpace ⮀ Sivilize Dine Lite:** Pelanggan dine-in di meja scan QR Dine Lite; pelanggan delivery pesan lewat SivilizeSpace; semua pesanan terpusat di SiKasir POS.
* **SivilizeSpace ⮀ Sivilize Creative:** Sesi foto menu & produk katalog profesional.
* **SivilizeSpace ⮀ Sivilize Brief AI:** Notulensi briefing shift kasir dan rekap penjualan harian toko otomatis.

---

## 🎯 BAB II: ANALISIS PASAR, PAIN POINTS UMKM & USER PERSONAS

### 2.1 Masalah Nyata di Lapangan (Market Pain Points)
1. **Pemerasan Komisi Marketplace (8% – 12%+):** Potongan biaya admin platform pihak ketiga menggerus laba bersih pedagang kecil.
2. **Kelelahan Chat Manual:** Penjual lelah mengirim 50 foto katalog satu per satu setiap ada calon pembeli bertanya di WhatsApp.
3. **Biaya Agensi Terlalu Tinggi (Capex Berat):** Bikin website di agensi konvensional butuh modal jutaan di muka dan sering ditinggal kabur (*ghosting*).
4. **Platform Asing Tidak Sesuai Kultur Lokal:** Tarif dollar Shopify/Wix ($19–$39/bln), wajib kartu kredit luar negeri, dan tanpa integrasi WhatsApp checkout.

### 2.2 Target User Personas
* **Persona A: Juragan Kuliner & Cafe (Warung Kopi, Resto, Bakery):** Butuh daftar menu estetik + pilihan varian (Hot/Ice) + jam buka + tombol checkout WhatsApp. *(Paket Mikro)*
* **Persona B: Owner Distro & Retail Fashion (Baju, Hijab, Sepatu):** Butuh etalase katalog foto produk rapi dengan domain resmi untuk bio Instagram & TikTok. *(Paket Pro)*
* **Persona C: Penyedia Jasa & Servis (Laundry Kiloan, Barbershop, Bengkel):** Butuh daftar paket servis + sematan Google Maps + tombol booking jadwal. *(Paket Pro)*
* **Persona D: Solo Profesional & Kreator (Fotografer, MUA, Konsultan, Notaris):** Butuh web portofolio bonafide dengan domain internasional bergengsi (`.COM`). *(Paket Bisnis)*

---

## 💰 BAB III: STRUKTUR HARGA PSIKOLOGIS & ATURAN DOMAIN (REVISI KHUSUS TAHUNAN)

> [!IMPORTANT]
> **KEBIJAKAN MUTLAK ATURAN DOMAIN SIVILIZE:**  
> **Gratis Domain Pribadi (`.my.id` / `.biz.id` / `.COM`) HANYA DAN KHUSUS berlaku untuk pelanggan yang mengambil SEWA 1 TAHUN PENUH (TAHUNAN/ANNUAL).**  
> Bagi pelanggan yang memilih sewa **BULANAN (Monthly)**:
> 1. Alamat website menggunakan subdomain resmi: `namatoko.sivilizecorp.my.id`.
> 2. Klien bulanan **TIDAK MENDAPATKAN GRATIS DOMAIN**. Jika ingin memakai domain pribadi, klien wajib membeli domain sendiri lalu menyambungkannya, atau membayar add-on sewa domain tahunan di muka. (Ini mencegah kerugian perusahaan akibat biaya beli domain internasional Rp 180.000 tapi klien cuma sewa sebulan lalu kabur).

```
[ ⚡ 1 Halaman (Mikro) ]     [ 🚀 2–3 Halaman (Bisnis) ]     [ 🏢 4–5 Halaman (Lengkap) ]
```

| Parameter Bisnis & Teknis | ⚡ PAKET MIKRO (1 Halaman) | 🚀 PAKET PRO (2–3 Halaman) | 🏢 PAKET BISNIS (4–5 Halaman) |
| :--- | :--- | :--- | :--- |
| **Kategori Target Usaha** | Warung kopi, laundry, jualan 1 produk, jasa servis | Cafe, resto, toko distro, klinik, salon | Sekolah, yayasan, company profile, retail cabang |
| **Harga Sewa Bulanan** | **Rp 39.000 / Bulan** | **Rp 69.000 / Bulan** | **Rp 99.000 / Bulan** |
| **Domain untuk Bulanan** | Subdomain: `namatoko.sivilizecorp.my.id` | Subdomain: `namatoko.sivilizecorp.my.id` *(Bawa domain sendiri: +Rp 0)* | Subdomain: `namatoko.sivilizecorp.my.id` *(Bawa domain sendiri: +Rp 0)* |
| **Harga Sewa Tahunan** *(Hemat 2 Bln)* | **Rp 349.000 / Tahun** | **Rp 599.000 / Tahun** | **Rp 899.000 / Tahun** |
| **Domain KHUSUS TAHUNAN** | Subdomain: `namatoko.sivilizecorp.my.id` | **GRATIS DOMAIN PRIBADI: `.my.id` / `.biz.id` (1 TAHUN)** | **GRATIS DOMAIN INTERNASIONAL: `.COM` (1 TAHUN)** |
| **Margin Keuntungan Perusahaan** | **100% Bersih** (Biaya domain Rp 0) | Biaya beli domain Rp 15rb (Margin 97%!) | Biaya beli domain Rp 180rb (Margin 80% tebal!) |
| **Struktur Layout Halaman** | 1 Halaman Panjang (Bio-Link Pro Toko) | Beranda + Menu Lengkap + Lokasi/Promo | Multi-Halaman Lengkap + Galeri + Cabang |
| **Kapasitas Produk/Menu** | 5 – 10 Item Menu/Produk Unggulan | 15 – 30 Item Menu/Produk | Unlimited (Tanpa Batas) + Form Reservasi |
| **Smart WA Link Format** | Chat WA dengan format teks otomatis | Chat WA dengan format teks otomatis | Chat WA + Form Reservasi Kustom |
| **Add-on Tambah Halaman** | N/A (Wajib upgrade ke Pro) | +Rp 50.000 / Halaman / Tahun | +Rp 50.000 / Halaman / Tahun |

---

## 🛡️ BAB IV: LIMA SENJATA PEMBUNUH PENJUALAN (KILLER VALUE PROPOSITIONS)

1. **Garansi 100% Bebas Pusing (Full Tech SLA):** Kendala teknis, link error, server down, atau bug ditanggung gratis 100% oleh tim engineer Sivilize selama masa sewa aktif.
2. **Bebas Ganti Harga & Menu Tanpa Biaya Revisi:** Pemilik toko mengupdate menu, harga diskon, atau nomor WhatsApp admin kapan saja lewat HP dalam 5 detik via Client Dashboard.
3. **Anti-Jebakan Tagihan Hosting Siluman:** Biaya sewa flat dan transparan. Tidak ada tagihan pembaruan server siluman sebesar Rp 1.500.000 di tahun kedua seperti vendor nakal di luaran.
4. **Teknologi Next.js Selalu Ter-Update Otomatis:** Performa kecepatan, skor Google Core Web Vitals 99+, dan standar SEO terbaru otomatis dinikmati klien tanpa perlu install plugin rentan seperti WordPress.
5. **Didukung Payung Hukum PT Resmi:** Pembayaran aman melalui QRIS resmi PT Sivilize Corp Indonesia (NIB resmi Kemenkumham), bukan transfer ke rekening perorangan yang tidak jelas.

---

## 💻 BAB V: TECH STACK SELECTION — PURE VERCEL + FIREBASE / SUPABASE (ZERO CLOUDFLARE)

> [!IMPORTANT]
> **Arsitektur Tanpa Cloudflare:** Seluruh layer jaringan, DNS, SSL, dan edge runtime ditangani secara **murni oleh Vercel Anycast Edge Network** dan DNS Registrar. Database, otentikasi, dan file storage ditangani oleh **Supabase (PostgreSQL Cloud)** atau **Firebase (Google Cloud Platform)**. Zero dependency pada Cloudflare proxy, Cloudflare WAF, maupun Cloudflare Workers!

| Layer Arsitektur | Teknologi Pilihan | Peran & Alasan Rekayasa (Zero Cloudflare) |
| :--- | :--- | :--- |
| **Framework Web & Edge Engine** | **Next.js 15 (App Router + Turbopack)** | Server Components (RSC) untuk performa sub-second; Edge Middleware untuk routing multi-tenant subdomain. |
| **Hosting & Edge Infrastructure** | **Vercel Pro / Hobby** | Anycast CDN bawaan Vercel dengan IP `76.76.21.21`, auto-provisioning SSL Let's Encrypt, auto-renewal, dan Vercel Domains REST API. |
| **DNS Management (Pilihan 1)** | **Direct DNS Registrar** (Niagahoster / Domainesia / IDCloudHost / Namecheap) | Konfigurasi DNS A-Record & Wildcard CNAME langsung di panel registrar tempat beli domain, tembak langsung ke Vercel tanpa proxy perantara. |
| **DNS Management (Pilihan 2)** | **Vercel DNS (Nameserver Delegated)** | Delegasikan NS registrar ke `ns1.vercel-dns.com` & `ns2.vercel-dns.com`. Vercel mengontrol DNS secara otomatis 100%. |
| **Database & Auth (Opsi Supabase)** | **Supabase (PostgreSQL Cloud)** | Relational DB PostgreSQL dengan Row Level Security (RLS), Supabase Auth (OTP/Magic Link), dan Supabase Storage untuk upload WebP. |
| **Database & Auth (Opsi Firebase)** | **Google Firebase (Firestore + Auth + Storage)** | NoSQL document store dengan Google Global CDN, Firebase Auth (Phone SMS OTP bawaan), dan Firebase Storage buckets. |
| **Payment Gateway** | **Midtrans (Core API / Snap)** | Akun Merchant tipe **Individu (KTP & Buku Tabungan Pribadi)**. Menghasilkan QRIS Dinamis otomatis dengan nama merchant `SIVILIZE CORP`, settlement otomatis ke rekening bank founder. |
| **Client-Side Compression** | **HTML5 Canvas / browser-image-compression** | Mengubah foto mentah kamera HP (5MB-10MB) menjadi format WebP beresolusi maks 1080px (<150KB) sebelum dikirim ke storage. |

---

## ⚡ BAB VI: ARSITEKTUR DNS REGISTRAR KE VERCEL MURNI (ZERO-CLOUDFLARE ENGINE)

### 6.1 Alur Kerja Subdomain Otomatis Tanpa Cloudflare
```
[ PENGUNJUNG AKSES: tokokopi.sivilizecorp.my.id ]
                      │
                      ▼
[ DNS RESOLVER REGISTRAR (Niagahoster/Domainesia/IDCloudHost) ]
Record: CNAME  *  --->  cname.vercel-dns.com
                      │
                      ▼
[ VERCEL ANYCAST EDGE NETWORK (76.76.21.21) ]
1. Menerima request untuk *.sivilizecorp.my.id
2. SSL Wildcard (*.sivilizecorp.my.id) aktif otomatis via Vercel Let's Encrypt
                      │
                      ▼
[ NEXT.JS EDGE MIDDLEWARE (src/middleware.ts) ]
1. Baca header host: "tokokopi.sivilizecorp.my.id"
2. Ekstrak slug: "tokokopi"
3. Rewrite internal ke /toko/tokokopi tanpa ganti URL di browser pembeli
                      │
                      ▼
[ FETCH DATA DARI SUPABASE / FIREBASE ] ──► [ RENDER DALAM 0.03 DETIK ]
```

### 6.2 Konfigurasi DNS di Panel Registrar Domain (`sivilizecorp.my.id`)
| Tipe Record | Nama Host / Subdomain | Target / Nilai Tujuan | TTL | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **A Record** | `@` (root) | `76.76.21.21` | 3600 | Mengarahkan root domain ke Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com.` | 3600 | Mengarahkan www ke Vercel |
| **CNAME (WILDCARD)** | `*` | `cname.vercel-dns.com.` | 3600 | **KUNCI UTAMA:** Menangkap semua subdomain `*.sivilizecorp.my.id` langsung ke Vercel! |

### 6.3 Pengaturan Domain di Vercel Dashboard
1. Buka Vercel Project `sivilizespace` -> `Settings` -> `Domains`.
2. Daftarkan **1 buah domain Wildcard:** `*.sivilizecorp.my.id`.
3. Vercel memverifikasi DNS dan menerbitkan SSL Wildcard Let's Encrypt secara otomatis.
4. Anda bisa menampung 10.000+ toko baru tanpa perlu menyentuh DNS atau Vercel lagi!

---

## 🛡️ BAB VII: FILOSOFI ZERO-TRUST ENTERPRISE: MUTUAL DISTRUST FRONTEND, BACKEND & DATABASE

> [!CAUTION]
> **PRINSIP DASAR MICROSOFT SECURITY COMPLIANCE: NEVER TRUST, ALWAYS VERIFY.**  
> Di SivilizeSpace, **TIDAK ADA SATUPUN LAYER YANG DIPERCAYA SECARA BUTA**. Setiap layer menganggap layer tetangganya sudah disusupi atau dikontrol oleh hacker.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MUTUAL DISTRUST MODEL                           │
│                                                                        │
│  [ FRONTEND (Client DOM) ]                                             │
│       │   ▲                                                            │
│       │   │  ❌ Frontend TIDAK PERCAYA user input (DOM XSS / Payload)  │
│       │   │  ❌ Frontend TIDAK PERCAYA backend (Escape all HTML tags)   │
│       ▼   │                                                            │
│  [ BACKEND (API & Edge Middleware) ]                                   │
│       │   ▲                                                            │
│       │   │  ❌ Backend TIDAK PERCAYA frontend sama sekali!            │
│       │   │     (Semua request dianggap cURL/Postman buatan hacker)    │
│       │   │  ❌ Backend memvalidasi ulang schema, token, & signature   │
│       ▼   │                                                            │
│  [ DATABASE (PostgreSQL / Firestore) ]                                 │
│           │  ❌ Database TIDAK PERCAYA backend!                       │
│           │     (Enforce Row-Level Security, Constraints, Triggers)    │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Frontend Distrust Logic:**
   * Frontend tidak percaya user: Semua form input di-sanitize di browser, dilarang inject script tag, file upload dicek tipe MIME asli dan ukuran byte.
   * Frontend tidak percaya backend: Data string dari backend (nama toko, deskripsi) tidak pernah dirender dengan `dangerouslySetInnerHTML`. Semua output dirender via React JSX safe text binding untuk mematikan potensi stored XSS.
2. **Backend Distrust Logic:**
   * Backend mengasumsikan seluruh validasi frontend telah di-bypass.
   * Setiap request masuk wajib melewati validasi skema ketat (Zod Schema Validator). Parameter ilegal langsung dibuang (*strip unknown keys*).
   * Nomor telepon, slug toko, dan nilai uang dihitung ulang di server. Server tidak pernah menerima harga produk dari client side!
3. **Database Distrust Logic:**
   * Database PostgreSQL tidak pernah percaya query string bebas dari backend: Wajib menggunakan *Parameterized Queries* / ORM bawaan.
   * Database memberlakukan aturan *Check Constraints* (`price >= 0`, `slug ~ '^[a-z0-9-]+$'`).
   * Row-Level Security (RLS) di PostgreSQL atau Security Rules di Firestore memastikan seorang user tidak bisa membaca atau mengubah baris milik toko lain meskipun backend mengalami bug logika (*Anti-BOLA/IDOR*).

---

## 🏰 BAB VIII: BENTENG PERTAHANAN 20 LAYER FIREWALL & 20 DECOY HONEYPOT SYSTEM

Platform SivilizeSpace dipersenjatai dengan **20 Lapisan Firewall Khusus** yang masing-masing dijaga oleh **1 Umpan Jebakan Siber (Decoy Honeypot)** aktif:

```
[ TRAFIK INTERNET LUAR ]
   │
   ▼
[ FW 01: Edge Perimeter ]        ──► [ HP 01: Security Sinkhole Trap ]
   │
[ FW 02: Host-Header Shield ]     ──► [ HP 02: Ghost Host Trap ]
   │
[ FW 03: Edge L7 HTTP WAF ]       ──► [ HP 03: Exploit Shell Decoy ]
   │
[ FW 04: Bot Scraper Shield ]     ──► [ HP 04: Zero-Opacity Form Field ]
   │
[ FW 05: Geo-Rate Limiter ]       ──► [ HP 05: Tarpit Delay Trap ]
   │
[ FW 06: Subdomain Protector ]    ──► [ HP 06: Phishing Slug Lure ]
   │
[ FW 07: Client DOM Boundary ]    ──► [ HP 07: Global Scope Observer ]
   │
[ FW 08: CSP & XSS Barrier ]      ──► [ HP 08: Canary Reflection Trap ]
   │
[ FW 09: API Strict Schema ]      ──► [ HP 09: Privilege Escalation Trap ]
   │
[ FW 10: Auth Token Guardian ]    ──► [ HP 10: Decoy Secret Route ]
   │
[ FW 11: Anti-Brute Force ]       ──► [ HP 11: Fake Admin Portal ]
   │
[ FW 12: BOLA / IDOR Shield ]     ──► [ HP 12: Predictable UUID Trap ]
   │
[ FW 13: File MIME Inspector ]    ──► [ HP 13: Executable Upload Lure ]
   │
[ FW 14: Payment HMAC Shield ]    ──► [ HP 14: Unsigned Webhook Trap ]
   │
[ FW 15: CSRF Token Guard ]       ──► [ HP 15: Unsafe Mutation Trap ]
   │
[ FW 16: SQLi Parameterizer ]     ──► [ HP 16: Canary Database Column ]
   │
[ FW 17: Database RLS Shield ]    ──► [ HP 17: Cross-Tenant Probe Trap ]
   │
[ FW 18: Storage Bucket ACL ]     ──► [ HP 18: Fake Keys Canary File ]
   │
[ FW 19: AI Anti-Judol Shield ]   ──► [ HP 19: Gambling Term Indexer ]
   │
[ FW 20: Auto-SIEM Blacklist ]    ──► [ HP 20: Instant Hardware Banishment ]
   │
   ▼
[ AKSES BERSIH & AMAN KE APLIKASI ]
```

### Rincian 20 Layer Firewall & 20 Decoy Honeypot:

#### 1. Firewall 01: Edge Network Perimeter Firewall (Vercel Anycast L3/L4)
* **Tugas:** Menahan banjir trafik SYN Flood, UDP Flood, dan serangan volumetrik DDoS hingga skala ratusan Gbps pada IP Anycast Vercel `76.76.21.21`.
* **🍯 Honeypot 01 (Blackhole Sinkhole Route):** Endpoint `/.well-known/security-trap` dan port probes ilegal. Siapa pun bot yang memindai endpoint ini otomatis di-drop koneksinya secara instan.

#### 2. Firewall 02: DNS & Host-Header Spoofing Firewall (Next.js Middleware)
* **Tugas:** Memvalidasi bahwa header `Host` yang masuk benar-benar berakhiran `.sivilizecorp.my.id` atau domain resmi yang terdaftar di database. Mencegah serangan *HTTP Host Header Cache Poisoning*.
* **🍯 Honeypot 02 (Decoy Ghost Host Trap):** Menangkap request dengan host palsu `internal-admin.sivilizecorp.my.id` atau `vpn.sivilizecorp.my.id`. Akses langsung memicu pencatatan IP penyerang ke tabel blacklist.

#### 3. Firewall 03: Web Application Firewall (WAF) L7 HTTP Inspection (Vercel Edge)
* **Tugas:** Memblokir payload URL yang mengandung string traversal (`../`, `..\\`), perintah shell Linux (`/bin/sh`, `curl | bash`), dan file konfigurasi sensitif (`.env`, `web.config`).
* **🍯 Honeypot 03 (Decoy Shell & PHP Admin Trap):** Membuat rute jebakan untuk scanner otomatis: `/wp-admin`, `/phpmyadmin`, `/api/.env`, `/config.json`. Bot yang menyentuh URL ini langsung disuntik status HTTP 418 dan diblokir permanen.

#### 4. Firewall 04: Bot & Scraper Behavioral Mitigation Firewall
* **Tugas:** Membedakan browser manusia asli dengan script scraping Puppeteer/Selenium tanpa membebani user dengan captcha berbayar.
* **🍯 Honeypot 04 (Zero-Opacity Form Trap):** Menyisipkan input form tersembunyi dengan CSS `opacity: 0; position: absolute; pointer-events: none; tab-index: -1` bernama `user_website_url` dan `tax_id`. Manusia tidak bisa melihat atau mengisi kolom ini. Jika kolom ini terisi saat form checkout dikirim, request dipastikan 100% berasal dari bot!

#### 5. Firewall 05: IP Reputation & Rate Limiting Firewall
* **Tugas:** Membatasi request API maksimal 20 request per 10 detik per alamat IP menggunakan algoritma Token Bucket di Vercel Edge.
* **🍯 Honeypot 05 (Tarpit Delay Trap):** Endpoint khusus `/api/v1/ping-fast`. Bot yang mencoba melakukan brute force request ke rute ini akan dimasukkan ke antrean *tarpit* (respons sengaja ditahan lambat selama 30 detik untuk menghabiskan resource memori scanner hacker).

#### 6. Firewall 06: Subdomain Phishing & Reservation Firewall
* **Tugas:** Mencegah pendaftaran subdomain yang meniru institusi perbankan (`bca`, `mandiri`, `bri`), dompet digital (`dana`, `gopay`, `ovo`), atau otoritas sistem (`sivilize`, `admin`, `login`).
* **🍯 Honeypot 06 (Phishing Slug Decoy Trap):** Jika ada orang yang mencoba mendaftarkan slug-slug bank tersebut di form onboarding, sistem tidak memunculkan error, melainkan mengarahkan mereka ke halaman verifikasi jebakan yang merekam KTP/identitas dan IP pelaku untuk diteruskan ke tim cyber.

#### 7. Firewall 07: Client-Side Input Boundary & DOM Sanitization Firewall (Frontend)
* **Tugas:** Memvalidasi tipe data, format teks, dan panjang karakter di level browser sebelum paket data dikirim ke network.
* **🍯 Honeypot 07 (Decoy Global Scope Observer):** Menaruh variabel umpan di window browser `window.__SIVILIZE_ADMIN_SECRET__ = "fake_token_xyz"`. Jika ada script ekstensi browser jahat atau XSS yang mencoba membaca properti ini, event listener mendeteksi pencurian dan mematikan sesi seketika.

#### 8. Firewall 08: Content Security Policy (CSP) & Anti-XSS Barrier (HTTP Headers)
* **Tugas:** Memasang header ketat: `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://app.midtrans.com; object-src 'none'; frame-ancestors 'none';`.
* **🍯 Honeypot 08 (Canary XSS Reflection Trap):** Parameter URL tersembunyi `?debug_preview=`. Jika diisi payload `<script>`, server mendeteksi upaya injeksi dan langsung mencatat IP ke alert log.

#### 9. Firewall 09: API Strict Schema & Payload Sanitization Firewall (Zod Parser)
* **Tugas:** Memvalidasi seluruh request body menggunakan skema Zod. Membuang seluruh atribut yang tidak terdefinisi (*strip unknown keys*). Mencegah serangan *Mass Assignment Vulnerability*.
* **🍯 Honeypot 09 (Privilege Escalation Trap):** Jika payload JSON yang dikirimkan klien mengandung atribut manipulasi seperti `is_admin: true`, `role: "superadmin"`, atau `balance: 99999999`, firewall menandai request sebagai serangan manipulasi hak akses dan memutus koneksi.

#### 10. Firewall 10: Authentication Token & State Verification Firewall (Auth Shield)
* **Tugas:** Memvalidasi kredensial login tenant (WhatsApp + PIN 6 Angka) menggunakan hashing bcrypt/Argon2.
* **🍯 Honeypot 10 (Decoy Master Token Route):** Rute palsu `/api/auth/master-override`. Penyerang yang mencoba mengirim request bearer token palsu ke rute ini langsung dibekukan sesi dan IP-nya.

#### 11. Firewall 11: Anti-Brute Force & Credential Stuffing Firewall
* **Tugas:** Mengunci akun tenant secara otomatis jika salah memasukkan PIN sebanyak 5 kali berturut-turut selama 15 menit.
* **🍯 Honeypot 11 (Fake Admin Portal Trap):** URL login tiruan `/admin-console`. Penyerang yang mencoba ribuan kombinasi password di URL ini akan diberikan respons lambat bertahap dan IP-nya dimasukkan ke daftar ban permanen.

#### 12. Firewall 12: Broken Object Level Authorization (BOLA / IDOR) Firewall
* **Tugas:** Memastikan tenant A hanya bisa mengedit produk miliknya sendiri. Setiap query database memverifikasi klausa `WHERE store_id = auth_store_id`.
* **🍯 Honeypot 12 (Predictable UUID Decoy Trap):** Meletakkan tautan tak terlihat di HTML yang mengarah ke ID rekayasa `/api/store/00000000-0000-0000-0000-000000000000`. Jika ID ini di-request, sistem tahu ada hacker yang sedang melakukan scanning IDOR otomatis.

#### 13. Firewall 13: File Upload & MIME Magic Bytes Inspection Firewall
* **Tugas:** Memvalidasi file foto produk bukan hanya dari ekstensinya (`.jpg`), melainkan membaca header biner (*magic bytes* `FF D8 FF` untuk JPEG, `89 50 4E 47` untuk PNG, `52 49 46 46` untuk WebP).
* **🍯 Honeypot 13 (Executable Upload Lure):** Form upload foto yang sengaja menerima ekstensi `.php`, `.phtml`, atau `.exe` palsu ke direktori sandbox terisolasi. Begitu file tersebut dikirim, sistem mengisolasi penyerang dan memblokir aksesnya.

#### 14. Firewall 14: Payment Gateway Cryptographic Signature Firewall (Midtrans SHA512)
* **Tugas:** Memverifikasi hash `SHA512(order_id + status_code + gross_amount + ServerKey)` pada setiap webhook pembayaran yang masuk.
* **🍯 Honeypot 14 (Unsigned Webhook Trap):** Endpoint publik `/api/payment/simulate-success`. Setiap percobaan penipuan pembayaran manual yang menembak rute ini akan diidentifikasi sebagai aksi penipuan transaksi.

#### 15. Firewall 15: Cross-Site Request Forgery (CSRF) & SameSite Cookie Firewall
* **Tugas:** Enforce header `SameSite=Lax` atau `SameSite=Strict` pada cookie autentikasi dan memblokir mutasi data via HTTP method GET.
* **🍯 Honeypot 15 (Unsafe Mutation Trigger Trap):** Rute palsu `/api/store/delete?auto_confirm=1` yang menerima method GET. Siapa pun bot yang memicu link ini dari crawler otomatis tidak akan menghapus data, melainkan mencatat bot scraper tersebut ke blacklist.

#### 16. Firewall 16: SQL Injection & ORM Parameterization Firewall
* **Tugas:** Menolak 100% perakitan raw string query (`SELECT * FROM stores WHERE slug = '` + slug + `'`). Semua query wajib menggunakan parameter binding bawaan Supabase/PostgreSQL.
* **🍯 Honeypot 16 (Canary Database Column):** Menempatkan kolom tersembunyi `canary_trap_token` di tabel. Jika ada query yang mencoba melakukan `UNION SELECT` dan membocorkan kolom canary ini, trigger database langsung mengirim sinyal darurat ke SIEM.

#### 17. Firewall 17: Database Row Level Security (RLS) & Multi-Tenant Isolation
* **Tugas:** Kebijakan RLS tingkat kernel PostgreSQL yang mengunci akses data per tenant secara mutlak di level engine basis data.
* **🍯 Honeypot 17 (Cross-Tenant Probe Trap):** Record toko buatan `slug: system-honey-tenant`. Akses baca yang mencurigakan terhadap record ini memicu penguncian akun penyerang seketika.

#### 18. Firewall 18: Storage Bucket & Data Exfiltration Quarantine Firewall
* **Tugas:** Mengunci bucket Supabase Storage / Firebase Storage dengan aturan Private ACL. File yang diupload hanya bisa ditulis oleh pemilik toko yang valid.
* **🍯 Honeypot 18 (Decoy Sensitive Bucket File):** Menaruh file umpan bernama `sivilize_master_credentials.txt.bak` di storage publik dengan teks jebakan dan URL pelacak. Siapa pun yang mendownload file ini jejak IP dan User-Agent-nya langsung terekam.

#### 19. Firewall 19: Anti-Judol & Anti-Pinjol Semantic AI Content Firewall
* **Tugas:** Scanner teks otomatis yang mendeteksi kata kunci terlarang judi online (*slot, gacor, maxwin, zeus, togel, depo, withdraw*) dan pinjol ilegal pada nama toko, deskripsi produk, atau banner.
* **🍯 Honeypot 19 (Gambling Term Indexer Trap):** Menampung input yang mencurigakan ke antrean moderasi otomatis. Jika skor kecurigaan melampaui batas ambang, toko ditolak secara instan sebelum bisa terbit ke publik.

#### 20. Firewall 20: Auto-SIEM Audit Logging & Immediate Hardware Banishment Firewall
* **Tugas:** Pusat komando keamanan yang menggabungkan seluruh log pelanggaran dari Firewall 01 sampai 19 ke dalam tabel `security_blacklist`.
* **🍯 Honeypot 20 (Canary Trigger & Instant Hardware Banishment):** Begitu pelanggaran terkonfirmasi, sistem mengeksekusi perintah pemblokiran seketika: memutus DNS routing, memblokir IP, membekukan cookie, dan memblacklist nomor WhatsApp pelaku seumur hidup dari seluruh ekosistem PT Sivilize Corp Indonesia.

---

## 🗄️ BAB IX: DUAL DATABASE ENGINE (SUPABASE POSTGRESQL & FIREBASE FIRESTORE)

### 9.1 OPSI A: SKEMA SUPABASE POSTGRESQL (LENGKAP DENGAN SECURITY CONSTRAINTS)

```sql
-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Master Table: stores (Toko Tenant Multi-Tenant)
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(30) UNIQUE NOT NULL,
    store_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(30) NOT NULL DEFAULT 'kuliner',
    template_type VARCHAR(30) DEFAULT 'katalog',
    theme_id VARCHAR(30) DEFAULT 'warm-cafe',
    owner_phone VARCHAR(20) NOT NULL,
    pin_hash VARCHAR(255) NOT NULL,
    banner_url TEXT,
    logo_url TEXT,
    opening_hours VARCHAR(100) DEFAULT '09:00 - 21:00 WITA',
    address TEXT,
    google_maps_url TEXT,
    custom_domain VARCHAR(100) UNIQUE,
    is_active BOOLEAN DEFAULT false,
    failed_login_attempts INT DEFAULT 0,
    lockout_until TIMESTAMPTZ,
    expired_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Security Constraint: Validasi regex format slug di level kernel database
    CONSTRAINT valid_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

-- 3. Table: products (Item Katalog / Jasa)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    image_url TEXT,
    category_tag VARCHAR(50) DEFAULT 'Umum',
    is_available BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Security Constraint: Harga dilarang minus
    CONSTRAINT positive_price CHECK (price >= 0)
);

-- 4. Table: subscriptions (Riwayat Tagihan & Transaksi Midtrans)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    order_id VARCHAR(100) UNIQUE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    plan_tier VARCHAR(30) NOT NULL, -- 'mikro', 'pro', 'bisnis'
    billing_cycle VARCHAR(20) NOT NULL, -- 'bulanan', 'tahunan'
    has_free_domain BOOLEAN DEFAULT false, -- TRUE HANYA JIKA billing_cycle = 'tahunan'
    claimed_free_domain VARCHAR(100),
    payment_status VARCHAR(30) DEFAULT 'pending',
    payment_type VARCHAR(30),
    midtrans_transaction_id VARCHAR(100),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table: security_blacklist (Daftar Cekal Siber & SIEM PT Sivilize Corp Indonesia)
CREATE TABLE security_blacklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address VARCHAR(45),
    device_fingerprint VARCHAR(255),
    violating_slug VARCHAR(30),
    phone_number VARCHAR(20),
    violation_type VARCHAR(50) NOT NULL, -- 'judol', 'pinjol', 'xss', 'idor', 'honeypot_trap'
    triggered_firewall_layer INT NOT NULL, -- Layer 1 s.d. 20
    honeypot_name VARCHAR(100),
    evidence_payload TEXT,
    banned_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. High Performance Indexes
CREATE INDEX idx_stores_slug ON stores(slug);
CREATE INDEX idx_stores_custom_domain ON stores(custom_domain);
CREATE INDEX idx_stores_is_active ON stores(is_active);
CREATE INDEX idx_products_store_id ON products(store_id);
CREATE INDEX idx_products_is_available ON products(is_available);
CREATE INDEX idx_subscriptions_order_id ON subscriptions(order_id);
CREATE INDEX idx_security_ip ON security_blacklist(ip_address);
CREATE INDEX idx_security_device ON security_blacklist(device_fingerprint);

-- 7. Supabase Row Level Security (RLS) Policies
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_blacklist ENABLE ROW LEVEL SECURITY;

-- Publik hanya boleh membaca toko yang aktif
CREATE POLICY "Public stores are viewable by everyone" 
ON stores FOR SELECT 
USING (is_active = true);

-- Publik hanya boleh membaca produk dari toko yang aktif
CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM stores 
    WHERE stores.id = products.store_id 
    AND stores.is_active = true
  )
);
```

---

### 9.2 OPSI B: SKEMA GOOGLE FIREBASE (FIRESTORE NO-SQL & SECURITY RULES)

```
FIRESTORE COLLECTIONS STRUCTURE:
/stores/{storeId}
    ├── slug: "kopisenja" (indexed)
    ├── storeName: "Kopi Senja Utama"
    ├── description: "Kedai kopi artisan lokal Kupang"
    ├── category: "kuliner"
    ├── templateType: "katalog"
    ├── themeId: "warm-cafe"
    ├── ownerPhone: "6281234567890"
    ├── pinHash: "$2b$10$..."
    ├── openingHours: "09:00 - 22:00 WITA"
    ├── address: "Jl. Frans Seda No. 8, Kupang"
    ├── customDomain: null
    ├── isActive: true
    ├── failedLoginAttempts: 0
    ├── lockoutUntil: null
    ├── expiredAt: Timestamp
    ├── createdAt: Timestamp
    │
    └── /products/{productId} (Subcollection)
          ├── name: "Es Kopi Gula Aren"
          ├── price: 18000
          ├── imageUrl: "https://firebasestorage.googleapis.com/..."
          ├── categoryTag: "Kopi"
          ├── isAvailable: true
          ├── displayOrder: 1
          └── createdAt: Timestamp

/subscriptions/{subscriptionId}
    ├── storeId: "storeIdRef"
    ├── orderId: "ORDER-SIV-1728394"
    ├── amount: 599000
    ├── planTier: "pro"
    ├── billingCycle: "tahunan"
    ├── hasFreeDomain: true  <-- TRUE KHUSUS TAHUNAN!
    ├── claimedFreeDomain: "kopisenja.my.id"
    ├── paymentStatus: "settlement"
    ├── paidAt: Timestamp
    └── createdAt: Timestamp

/security_blacklist/{blacklistId}
    ├── ipAddress: "114.125.x.x"
    ├── deviceFingerprint: "fp_hash_7788"
    ├── violationType: "honeypot_trap"
    ├── triggeredFirewallLayer: 4
    ├── honeypotName: "Zero-Opacity Form Trap"
    ├── bannedAt: Timestamp
    └── evidencePayload: "bot filled hidden field tax_id"
```

#### Aturan Keamanan Firebase (`firestore.rules`):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Publik hanya boleh membaca toko yang aktif
    match /stores/{storeId} {
      allow read: if resource.data.isActive == true;
      allow write: if request.auth != null && request.auth.uid == storeId;
      
      // Subcollection produk
      match /products/{productId} {
        allow read: if get(/databases/$(database)/documents/stores/$(storeId)).data.isActive == true;
        allow write: if request.auth != null && request.auth.uid == storeId;
      }
    }
    
    // Riwayat transaksi & blacklist terkunci untuk umum
    match /subscriptions/{subscriptionId} {
      allow read, write: if false; // Hanya diupdate via Admin SDK / Webhook
    }
    
    match /security_blacklist/{blacklistId} {
      allow read, write: if false; // Tertutup
    }
  }
}
```

---

## 🚀 BAB X: NEXT.JS 15 MULTI-TENANT MIDDLEWARE & VERCEL DOMAIN API PIPELINE

### 10.1 Kode Inti Multi-Tenant Edge Middleware (`src/middleware.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // 1. Definisikan Base Domain Platform
  const baseAppDomains = [
    'sivilizespace.vercel.app',
    'sivilizecorp.my.id',
    'www.sivilizecorp.my.id',
    'localhost:3000',
  ];

  // 2. Normalisasi Hostname
  const currentHost = hostname.replace(/:\d+$/, '').toLowerCase();

  // 3. Lewatkan akses Portal Utama
  if (baseAppDomains.includes(currentHost)) {
    return NextResponse.next();
  }

  // 4. Deteksi Subdomain Resmi (*.sivilizecorp.my.id)
  const isSubdomainOfBase = currentHost.endsWith('.sivilizecorp.my.id');
  
  if (isSubdomainOfBase) {
    const subdomain = currentHost.replace('.sivilizecorp.my.id', '');
    
    // Firewall 06: Blokir Subdomain Sistem Terlarang
    const reservedSubdomains = [
      'admin', 'api', 'app', 'auth', 'billing', 'bca', 'mandiri', 
      'bri', 'dana', 'gopay', 'sivilize', 'sivilizecorp', 'www'
    ];
    if (reservedSubdomains.includes(subdomain)) {
      return NextResponse.next();
    }

    // Rewrite internal URL ke dynamic route /toko/[slug]
    return NextResponse.rewrite(
      new URL(`/toko/${subdomain}${url.pathname}${url.search}`, req.url)
    );
  }

  // 5. Kasus Custom Domain Pribadi Klien (Paket Pro/Bisnis Tahunan)
  return NextResponse.rewrite(
    new URL(`/toko-domain/${currentHost}${url.pathname}${url.search}`, req.url)
  );
}
```

### 10.2 Handler Registrasi Custom Domain via Vercel REST API (`src/lib/vercel-domain.ts`)
```typescript
export async function registerDomainToVercel(domainName: string) {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domainName }),
    }
  );
  return response.json();
}
```

---

## 🔬 BAB XI: 12 DETAIL MIKRO TERSEMBUNYI (THE 12 HIDDEN MICRO-SPECS)

1. **The Single Wildcard Rule di Vercel:**  
   * Daftarkan **1 domain wildcard** `*.sivilizecorp.my.id` di Vercel sekali seumur hidup. Jutaan toko subdomain otomatis aktif tanpa menambah kuota domain project Vercel.
2. **Bypass Middleware Regex Anti-DDoS:**  
   * File statis (`_next/static`, `.webp`, `.png`, `favicon.ico`) wajib dikecualikan dari middleware agar tidak membakar kuota Vercel Edge Invocations.
3. **Keep-Alive Cron Bot (Supabase Anti-Sleep):**  
   * Menembak endpoint `/api/keep-alive` setiap 24 jam via Vercel Cron untuk mencegah project gratisan Supabase tertidur setelah 7 hari.
4. **Client-Side WebP Compression (HTML5 Canvas):**  
   * Mengompres foto mentah kamera HP 200MP (10MB) menjadi **WebP maksimal 1080px (<150KB)** sebelum upload. Storage gratisan Supabase (1GB) atau Firebase (5GB) aman menampung puluhan ribu menu.
5. **Normalizer WhatsApp Indonesia:**  
   * Sanitasi otomatis nomor HP lokal: `08...`, `+62 8...`, `8...` dibersihkan menjadi format internasional murni `628...` agar tautan `wa.me/` tidak pernah error.
6. **Verifikasi Kriptografi SHA512 Webhook Midtrans:**  
   * Validasi hash `SHA512(order_id + status_code + gross_amount + ServerKey)` di webhook sebelum aktivasi toko untuk mencegah request injeksi palsu.
7. **Idempotensi Webhook (Anti-Doppelganger Activation):**  
   * Mencegah perpanjangan masa sewa ganda saat Midtrans mengirim ulang webhook (retry delivery).
8. **Reserved Subdomain Slugs Blacklist:**  
   * Blokir subdomain phishing: `admin`, `api`, `bca`, `mandiri`, `bri`, `dana`, `sivilize`, `login`.
9. **Slug Regex Sanitization Terstandarisasi:**  
   * Format wajib: `^[a-z0-9]+(?:-[a-z0-9]+)*$` (3–30 karakter, huruf kecil, angka, strip tunggal di tengah).
10. **Dynamic OpenGraph Meta & WhatsApp Chat Link Preview:**  
    * Setiap toko memiliki preview sosial media mandiri (nama toko, banner produk asli, jam buka) via Next.js `generateMetadata()`.
11. **Ergonomi CSS `100dvh` (Anti In-App Browser Trap):**  
    * Menggunakan unit CSS `100dvh` (Dynamic Viewport Height) agar tombol checkout WhatsApp floating tidak terpotong navbar in-app browser Instagram/WhatsApp.
12. **Standar Waktu UTC & Toleransi Masa Tenggang WITA:**  
    * Seluruh jatuh tempo dihitung berbasis `TIMESTAMPTZ` (UTC) dengan masa tenggang (*Grace Period*) 3 hari kalender sebelum status toko berubah menjadi *suspended*.

---

## 🎨 BAB XII: 3 MASTER TEMPLATE UI & 5 DESIGN TOKENS (ANTI-AI SLOP)

### 12.1 Tiga Master Template Layout
1. **Master Template 1: "Katalog Grid" (Kuliner, Cafe, Bakery & Retail Fisik):**  
   * Hero Banner -> Jam Buka & Status Toko -> Kategori Filter Tab -> Grid Kartu Produk -> Sticky Floating WhatsApp Cart Button.
2. **Master Template 2: "Price List & Layanan" (Bisnis Jasa, Laundry, Bengkel, Barbershop):**  
   * Hero Banner -> Banner Pengumuman Promo -> List Kartu Layanan (Deskripsi, Durasi, Harga Paket) -> Sematan Google Maps Lokasi Fisik -> Tombol Booking WhatsApp.
3. **Master Template 3: "Profil & Bio Ringkas" (Solo Profesional, MUA, Notaris, Kreator):**  
   * Avatar Bulat -> Bio Singkat & Legalitas Usaha -> Galeri Sorotan Portofolio -> Tombol Tautan Sosial Media Resmi -> Tombol Kontak Langsung.

### 12.2 Lima Palet Tema Resmi (Design Tokens via CSS Variables)
* ☕ **Warm Cafe (Default Kuliner):** Background `#FFFBEB`, Card `#FEF3C7`, Text `#451A03`, Accent `#78350F`, Font `Playfair / Plus Jakarta Sans`.
* 🖤 **Midnight Distro (Retail & Streetwear):** Background `#0F172A`, Card `#1E293B`, Text `#F8FAFC`, Accent `#38BDF8`, Font `Inter Bold`.
* 🌿 **Fresh Herbal (Apotek & Makanan Sehat):** Background `#F0FDF4`, Card `#DCFCE7`, Text `#14532D`, Accent `#16A34A`, Font `Plus Jakarta Sans`.
* 🌸 **Pastel Beauty (Salon, MUA, Estetika):** Background `#FDF2F8`, Card `#FCE7F3`, Text `#701A75`, Accent `#DB2777`, Font `Outfit`.
* 🏛️ **Corporate Clean (Jasa Profesional):** Background `#FFFFFF`, Card `#F8FAFC`, Text `#0F172A`, Accent `#1E40AF`, Font `Geist / Inter`.

---

## 📱 BAB XIII: SPESIFIKASI CLIENT DASHBOARD & SUPER ADMIN

### 13.1 Tenant Client Dashboard (Khusus Layar HP / Mobile-First)
* **Autentikasi Cepat:** Login via **Nomor WhatsApp Toko + PIN 6 Angka**.
* **Tab 1: Profil Usaha:** Ubah nama toko, jam operasional, alamat fisik, titik Google Maps, dan nomor WhatsApp admin.
* **Tab 2: Katalog Produk:** Tambah/edit item, upload foto langsung dari kamera HP, pasang harga, dan toggle stok (Tersedia / Habis).
* **Tab 3: Tampilan & Tema:** Pilih satu dari 5 tema warna resmi dan lihat pratinjau instan.
* **Tab 4: Langganan & Masa Aktif:** Menampilkan sisa hari sewa aktif dan tombol satu-klik "Perpanjang Sewa" yang langsung memunculkan QRIS Midtrans di layar.

### 13.2 Super Admin Dashboard
* Di tahap awal (0–1.000 toko), manfaatkan **Supabase Studio** atau **Firebase Console** bawaan (Zero Maintenance Code).
* Memantau daftar toko yang baru aktif, volume omzet langganan, dan toko yang mendekati masa kadaluarsa.
* **Fitur Emergency Kill-Switch:** Tombol darurat untuk mengubah status `is_active: false` dalam 1 detik jika ditemukan pelanggaran hukum.

---

## ⚖️ BAB XIV: DOKUMEN HUKUM RESMI: TERMS OF SERVICE, ANTI-JUDOL & SLA 99.8%

### 14.1 Landasan Hukum Elektronik Mengikat
Perjanjian Lisensi dan Syarat Layanan ini mengikat secara hukum antara **PT Sivilize Corp Indonesia** dan **Penyewa (Tenant)** sesuai amanat:
* **Undang-Undang Republik Indonesia Nomor 1 Tahun 2024** tentang Perubahan Kedua atas UU No. 11/2008 tentang Informasi dan Transaksi Elektronik (UU ITE).
* **Peraturan Pemerintah (PP) Nomor 71 Tahun 2019** tentang Penyelenggaraan Sistem dan Transaksi Elektronik.

### 14.2 Larangan Konten Ilegal Mutlak (Acceptable Use Policy - Zero Tolerance)
Platform SivilizeSpace **DILARANG KERAS MUTLAK** digunakan untuk memfasilitasi, mengiklankan, atau mendistribusikan:
1. **Perjudian & Taruhan Siber:** Promosi slot gacor, togel, kasino online, taruhan bola, dan permainan uang tanpa izin (Pasal 303 KUHP & Pasal 27 ayat 2 UU ITE).
2. **Penipuan Finansial & Investasi Bodong:** Skema piramida/ponzi, arisan bodong, dan robot trading ilegal.
3. **Pinjaman Online Ilegal:** Layanan pinjol tanpa izin Otoritas Jasa Keuangan (OJK).
4. **Pornografi & Eksploitasi Seksual:** Konten pornografi, perdagangan orang, dan prostitusi online (UU No. 44 Tahun 2008).
5. **Narkotika & Zat Terlarang:** Penjualan obat keras daftar G tanpa resep dokter resmi, narkotika, dan psikotropika.
6. **Pelanggaran Hak Cipta & Merek (HAKI):** Penjualan barang bajakan ilegal atau pencatutan merek dagang orang lain tanpa hak.
7. **Phishing & Rekayasa Sosial:** Halaman tiruan perbankan dan pencurian kredensial akun.

### 14.3 Eksekusi Sanksi Pemblokiran IP & Device Fingerprint
Jika terbukti melanggar ketentuan Bab 14.2:
* **Takedown Instan:** Domain dan website toko dinonaktifkan dalam waktu kurang dari 60 detik sejak terdeteksi.
* **Permanent Blacklist:** Alamat IP, Device Fingerprint, nomor telepon WhatsApp, dan nomor rekening bank pelaku dimasukkan ke dalam daftar cekal permanen (*Security Blacklist*) seluruh ekosistem PT Sivilize Corp Indonesia seumur hidup.
* **Hangus Tanpa Ganti Rugi (*Strict Zero Refund*):** Seluruh sisa biaya sewa yang telah dibayarkan disita sebagai denda pelanggaran sistem.
* **Pelaporan Pidana Siber:** Data identitas, log IP, dan jejak audit digital diserahkan langsung kepada **Direktorat Tindak Pidana Siber Bareskrim Polri** dan **Kementerian Komunikasi dan Digital (Kemenkomdigi)**.

### 14.4 Batasan Tanggung Jawab Hukum (Indemnification Clause)
PT Sivilize Corp Indonesia bertindak murni sebagai penyedia infrastruktur teknologi netral (*Neutral Intermediary*). Segala sengketa transaksi jual beli fisik, kualitas barang dagangan, dan perselisihan antara Penyewa dan Pembeli Akhirnya adalah tanggung jawab mutlak Penyewa secara perdata dan pidana. PT Sivilize Corp Indonesia, direksi, dan karyawannya dibebaskan dari segala tuntutan hukum pihak ketiga.

### 14.5 Service Level Agreement (SLA) & Garansi Teknis
* **Komitmen Uptime:** **99.8% setiap bulan kalender** didukung oleh infrastruktur edge global Vercel Anycast Network.
* **Garansi Bug Teknis:** Kerusakan sistem internal diperbaiki gratis 100% oleh tim engineer Sivilize selama masa sewa aktif. Waktu tanggap penanganan insiden kritis maksimal 1 jam kerja.
* **Kebijakan Pembatalan:** Seluruh pembayaran sewa bersifat final digital (*Strict Non-Refundable*).
* **Masa Tenggang (*Grace Period*):** Keterlambatan pembayaran sewa diberikan toleransi 3 hari kalender. Pada hari ke-4 toko dialihkan ke halaman suspensi tagihan. Pada hari ke-14 data toko diarsipkan permanen.

---

## 🛠️ BAB XV: ACTION PLAN EKSEKUSI TAHAP DEMI TAHAP

```
[ TAHAP 1: PERSIAPAN REPO STANDALONE ]
└── Inisialisasi project standalone "sivilizespace" (Next.js 15, Tailwind, TS, App Router).
    *PENTING: Jangan menyentuh repo portfolio-website yang sudah live di sivilizecorp.my.id!*

[ TAHAP 2: DATABASE & FIREWALL SETUP ]
└── Eksekusi skrip SQL Supabase di Bab IX.1 (atau setup koleksi Firestore di Bab IX.2).
└── Konfigurasi tabel security_blacklist dan Honeypot Decoys.

[ TAHAP 3: DNS & VERCEL WILDCARD ]
└── Buka panel DNS Registrar domain: Pasang CNAME * mengarah ke cname.vercel-dns.com.
└── Buka Vercel Dashboard project sivilizespace: Tambahkan domain *.sivilizecorp.my.id.
└── Verifikasi SSL Wildcard terbit hijau.

[ TAHAP 4: IMPLEMENTASI CODING NEXT.JS ]
└── Pasang src/middleware.ts untuk rewrite host subdomain ke /toko/[slug].
└── Buat dynamic route src/app/toko/[slug]/page.tsx.
└── Implementasikan 3 template UI: CatalogTemplate, ServiceTemplate, ProfileTemplate.

[ TAHAP 5: BILLING & MIDTRANS WEBHOOK ]
└── Pasang endpoint /api/midtrans/webhook dengan verifikasi SHA512 kriptografi.
└── Tes pembayaran simulasi QRIS sandbox -> Verifikasi status toko otomatis aktif.
└── Deploy ke Vercel Production & Siap menerima ribuan UMKM Indonesia!
```
