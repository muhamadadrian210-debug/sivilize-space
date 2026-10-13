import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
Kamu adalah "Sivilize AI Copilot", asisten AI resmi dari platform Website-as-a-Service (WaaS) Sivilize Space yang dikembangkan oleh PT Sivilize Corp Indonesia.
Tugas utamamu adalah memandu pemilik toko/bisnis (merchant) dalam mengelola website mereka, menjelaskan fitur, cara menambah menu/katalog, cara kustomisasi tata letak, integrasi SiKasir POS, Sivilize Dine Lite (Self-Order Meja QR), dan pengaturan custom domain.

Pedoman Menjawab:
1. Gunakan bahasa Indonesia yang ramah, sopan, ringkas, jelas, dan santai (profesional untuk UMKM).
2. Jawaban harus langsung to-the-point dan mudah dipahami orang awam yang tidak mengerti koding.
3. Poin-poin Pengetahuan Ekosistem:
   - Database: 100% otomatis tersimpan aman di Cloud Database Supabase PT Sivilize Corp Indonesia. Klien tidak perlu setup akun database sendiri dan data tidak akan hilang saat ganti HP/laptop.
   - SiKasir POS: Aplikasi kasir online/offline dengan Kitchen Display System (KDS), kalkulasi resep bahan baku, struk bluetooth, dan modul industri spesifik (Nopol & mekanik untuk bengkel, rak untuk laundry, kapster untuk barbershop, resep dokter untuk apotek).
   - Sivilize Dine Lite: Khusus F&B, tamu scan QR di meja resto untuk pesan mandiri. Stok dan menu langsung tersambung 2-arah seketika dengan SiKasir.
   - Cara Aktivasi: Masukkan Kode Lisensi (misal: SIV-FNB-365D) di form aktivasi awal SiKasir atau Dine Lite, maka aplikasi kasir langsung aktif tanpa perlu registrasi manual.
   - Custom Domain Pribadi: Bisa diarahkan ke DNS Vercel Anycast Edge (Record A @ -> 76.76.21.21 dan CNAME www -> cname.vercel-dns.com).
   - Transaksi: Bisnis produk (FnB, Retail, dll) bisa transaksi langsung lewat QRIS Dinamis di web. Sedangkan bisnis jasa berat (kontraktor, arsitek, pembuatan web) otomatis diarahkan ke konsultasi WhatsApp resmi & estimasi proyek.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message, store_name, category, plan_tier } = body;

    const userMessage = String(message || '').trim();
    if (!userMessage) {
      return NextResponse.json({ error: 'Pesan wajib diisi.' }, { status: 400 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Jika API Key Gemini tersedia, panggil Google AI Studio (Gemini 1.5 Flash - Gratis)
    if (geminiApiKey) {
      try {
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

        const promptText = `
Nama Toko: ${store_name || 'Toko Mitra'}
Kategori Usaha: ${category || 'Bisnis UMKM'}
Paket: ${plan_tier || 'Pro'}

Pertanyaan Merchant:
"${userMessage}"
`;

        const geminiRes = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: SYSTEM_PROMPT },
                  { text: promptText },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        });

        const geminiData = await geminiRes.json();
        const candidateText =
          geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (candidateText) {
          return NextResponse.json({
            reply: candidateText.trim(),
            source: 'gemini-1.5-flash',
          });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call error, falling back to local reasoning:', geminiErr);
      }
    }

    // Fallback cerdas lokal jika API Key Gemini belum diset di .env
    const lower = userMessage.toLowerCase();
    let reply = `Pertanyaan bagus mengenai "${userMessage}". Seluruh fitur website, katalog produk, dan ekosistem kasir Anda telah terintegrasi di platform Sivilize Space. Anda bisa melihat menu panduan interaktif kami atau membuka tab pengaturan terkait untuk mencobanya secara langsung.`;

    if (lower.includes('database') || lower.includes('supabase') || lower.includes('aman') || lower.includes('hilang')) {
      reply = `Tenang sekali! Seluruh data website, katalog produk, menu, foto WebP, dan lisensi Anda 100% OTOMATIS tersimpan di Cloud Database Supabase PT Sivilize Corp Indonesia dengan isolasi tenant yang sangat aman. Anda tidak perlu membuat akun database sendiri. Data Anda tidak akan pernah hilang meskipun ganti ponsel atau laptop.`;
    } else if (lower.includes('sikasir') || lower.includes('kasir') || lower.includes('dine lite') || lower.includes('meja') || lower.includes('lisensi')) {
      reply = `Untuk menyambungkan SiKasir POS dan Sivilize Dine Lite, Anda cukup menyalin Kode Lisensi Ekosistem Anda di tab "Ekosistem Lisensi" (misal: SIV-FNB-365D). Buka aplikasi kasir atau dine lite di perangkat Anda, lalu masukkan kode tersebut pada form aktivasi awal. Stok dan pesanan langsung tersambung 2-arah seketika tanpa perlu daftar manual!`;
    } else if (lower.includes('harga') || lower.includes('stok') || lower.includes('menu') || lower.includes('produk')) {
      reply = `Untuk mengelola menu/produk, buka tab "Katalog & Menu". Anda bisa klik "Tambah Item Baru" untuk memasukkan foto dan harga, atau klik tombol switch hijau pada produk untuk menandai "Habis / Tersedia". Anda juga bisa klik "Tarik Produk dari SiKasir" untuk sinkronisasi otomatis!`;
    } else if (lower.includes('domain') || lower.includes('dns') || lower.includes('vercel')) {
      reply = `Bisa banget! Anda bisa menggunakan domain pribadi seperti www.bisnisanda.com. Cukup arahkan DNS domain Anda ke server Vercel Anycast Edge kami: Record A (@ ➔ 76.76.21.21) dan CNAME (www ➔ cname.vercel-dns.com). Sertifikat SSL HTTPS akan aktif otomatis 100%.`;
    } else if (lower.includes('transaksi') || lower.includes('jasa') || lower.includes('kontraktor')) {
      reply = `Untuk bisnis produk seperti F&B, Retail, Laundry, dan Bengkel, pelanggan bisa langsung checkout mandiri via QRIS di web. Namun untuk bisnis jasa non-transaksional (seperti kontraktor bangunan, jasa pembuatan website, konsultan hukum), tombol di web otomatis diarahkan ke konsultasi WhatsApp resmi & form estimasi proyek (Lead Generation) karena biaya proyek butuh diskusi spesifikasi terlebih dahulu.`;
    }

    return NextResponse.json({
      reply,
      source: 'local-knowledge-engine',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
