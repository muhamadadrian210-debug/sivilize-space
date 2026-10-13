import { NextRequest, NextResponse } from 'next/server';
import { aiChatLimiter } from '@/lib/rate-limiter';
import { checkIsBanned, createBannedResponse } from '@/lib/blacklist';

const SYSTEM_PROMPT = `
Kamu adalah "Sivilize AI Consultant & Tour Guide", asisten kecerdasan buatan resmi dari platform Website-as-a-Service (WaaS) Sivilize Space (produk resmi Divisi SiWeb Production — PT Sivilize Corp Indonesia, NIB: 0207260103661, Kupang, NTT).

Peran & Sikapmu:
1. Terbuka, ramah, profesional, cerdas, dan siap melayani siapa saja—baik calon klien umum yang bertanya di website publik, maupun pemilik toko/merchant yang sedang mengelola dashboard mereka.
2. JANGAN MEMBATASI PERTANYAAN: Pengguna berhak menanyakan apa saja—mulai dari cara kerja Sivilize Space, perbandingan dengan WordPress/Shopify/Wix, strategi bisnis online, tips katalog, optimasi penjualan cafe/distro/laundry/bengkel/klinik, teknologi Next.js & Anycast Edge, keamanan Supabase/Firebase, cara rakit custom, hingga pertanyaan bisnis/teknis umum lainnya. Jawablah dengan cerdas, mendalam, dan solutif!
3. BATASAN KEAMANAN & ETIKA (STRICT SAFETY ONLY):
   - Jika pengguna mengirim pesan berisi kata-kata toksik, hinaan kasar, pelecehan (harassment), atau ujaran kebencian (SARA), tolak dengan sopan: "Demi kenyamanan bersama, mohon gunakan bahasa yang santun dan profesional. Saya siap membantu pertanyaan Anda seputar bisnis dan website."
   - Jika pengguna menanyakan atau mempromosikan hal ilegal sesuai Syarat Layanan & Hukum ITE RI (Perjudian online / slot gacor, pornografi, pinjaman online ilegal, penipuan finansial, peretasan ilegal), tolak dengan tegas namun profesional: "Sivilize Space menerapkan kebijakan Zero-Tolerance terhadap perjudian online, pornografi, dan aktivitas ilegal lainnya sesuai UU ITE dan regulasi perizinan resmi kami."

Pengetahuan Inti Platform Sivilize Space:
- Nilai Utama: Sewa website bisnis siap pakai & mandiri dalam 60 detik. 0% komisi marketplace. Transaksi QRIS otomatis & invoice digital terbit seketika tanpa perlu chat manual WhatsApp.
- Struktur Harga Transparan:
  * Paket Mikro (1 Halaman): Rp 39.000/bln atau Rp 349.000/tahun (Subdomain: namatoko.sivilizecorp.my.id).
  * Paket Pro (2-3 Halaman): Rp 69.000/bln atau Rp 599.000/tahun (GRATIS DOMAIN PRIBADI: .my.id / .biz.id untuk sewa tahunan).
  * Paket Bisnis (4-5 Halaman): Rp 99.000/bln atau Rp 899.000/tahun (GRATIS DOMAIN INTERNASIONAL: .COM untuk sewa tahunan).
  * Catatan Aturan Domain: Gratis domain pribadi HANYA berlaku untuk paket tahunan. Untuk bulanan, klien menggunakan subdomain resmi atau membawa domain sendiri (+Rp 0).
- Ekosistem 3-in-1 Terpadu:
  * Sivilize Space Web Storefront: Website katalog mandiri dengan kecepatan Anycast Edge (SLA 99.8%).
  * SiKasir POS: Aplikasi kasir pintar (Kitchen Display System/KDS, barcode scanner, resep bahan, multi-cabang).
  * Sivilize Dine Lite: Khusus F&B, sistem self-order tamu di meja resto via scan QR tanpa perlu install aplikasi.
  * Sinkronisasi Stok 2-Arah Seketika: Stok di kasir fisik berkurang langsung otomatis terupdate di QR meja dan website toko detik itu juga.
  * 1 Kode Lisensi Ekosistem (misal: SIV-FNB-365D) mengaktifkan semua aplikasi secara instan.
- Template vs Rakitan Custom:
  * Template Siap Pakai: Langsung tayang dalam 60 detik dengan 5 tema resmi (Warm Cafe, Midnight Distro, Fresh Herbal, Pastel Beauty, Corporate Clean).
  * Studio Rakit Custom (/rakit): Klien bebas merombak font, layout grid 2/3/4 kolom, efek visual frosted glass, dan tambah halaman ekstra (+Rp 50.000/halaman/tahun) dengan kalkulasi harga transparan.
- Infrastruktur & Keamanan:
  * Pure Vercel Anycast Edge (IP 76.76.21.21) + Cloud Database Supabase (PostgreSQL) / Google Firebase.
  * Zero-Trust Architecture, 20-Layer Firewall & Honeypot System.
  * Badan Hukum: PT Sivilize Corp Indonesia, NIB 0207260103661, KBLI 62199.
`;

function checkToxicityAndHarm(text: string): { isViolating: boolean; message?: string } {
  const lower = text.toLowerCase();

  // 1. Toxic / Harassment / Hinaan Kasar / Sara
  const toxicWords = [
    'anjing', 'babi', 'bangsat', 'kontol', 'memek', 'pantek', 'ngentot',
    'asu', 'perek', 'lonte', 'bajingan', 'goblok', 'tolol', 'idiot',
    'bacot', 'mati lu', 'bunuh diri'
  ];
  for (const w of toxicWords) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(lower)) {
      return {
        isViolating: true,
        message: 'Demi kenyamanan bersama, mohon gunakan bahasa yang santun dan profesional. Saya siap membantu Anda berkonsultasi seputar website dan bisnis.',
      };
    }
  }

  // 2. Illegal Activities: Judi Online (Judol), Pornografi, Pinjol Ilegal
  const illegalWords = [
    'slot gacor', 'judol', 'judi online', 'togel', 'pragmatic play', 'maxwin', 'zeus slot',
    'bokep', 'pornografi', 'open bo', 'vcs', 'seks bebas',
    'pinjol ilegal', 'carding', 'arisan bodong'
  ];
  for (const w of illegalWords) {
    if (lower.includes(w)) {
      return {
        isViolating: true,
        message: 'Platform Sivilize Space menerapkan kebijakan Zero-Tolerance terhadap perjudian online, pornografi, dan aktivitas ilegal sesuai amanat UU ITE RI dan dokumen hukum resmi kami.',
      };
    }
  }

  return { isViolating: false };
}

export async function POST(req: NextRequest) {
  // 🛡️ MULTI-LAYER BLACKLIST CHECK (IP, Device Fingerprint, Country)
  const banCheck = await checkIsBanned(req);
  if (banCheck.isBanned) {
    return createBannedResponse(banCheck);
  }

  // 🛡️ RATE LIMITER SHIELD (Maksimal 12 request per menit per IP)
  const rateLimitResult = aiChatLimiter.check(req);
  if (!rateLimitResult.success) {
    return aiChatLimiter.toResponse(
      rateLimitResult,
      'Terlalu banyak pertanyaan dalam waktu singkat. Demi kenyamanan bersama, mohon tunggu sebentar (maksimal 12 chat per menit).'
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const {
      message,
      store_name,
      category,
      plan_tier,
      mode,
      tour_step_title,
      tour_step_key,
    } = body;

    const userMessage = String(message || '').trim();
    if (!userMessage && mode !== 'tour-guide') {
      return NextResponse.json({ error: 'Pesan wajib diisi.' }, { status: 400 });
    }

    // 🛡️ MODERASI KONTEN: Blokir hanya jika Toxic / Harassment / Tindakan Ilegal
    if (userMessage) {
      const moderation = checkToxicityAndHarm(userMessage);
      if (moderation.isViolating) {
        return NextResponse.json({
          reply: moderation.message,
          source: 'safety-moderation-shield',
        });
      }
    }

    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Jika API Key Gemini tersedia, panggil Google AI Studio (Gemini 2.0 / 1.5 Flash)
    if (geminiApiKey) {
      try {
        let systemPromptToUse = SYSTEM_PROMPT;
        let promptText = '';

        if (mode === 'tour-guide') {
          systemPromptToUse = `
${SYSTEM_PROMPT}

Tugas Khusus Saat Ini: Sivilize AI Tour Guide
Kamu sedang memandu pengguna pada langkah tur platform: "${tour_step_title || 'Pengenalan Platform'}" (Bagian: ${tour_step_key || 'umum'}).
Target Konteks: ${store_name ? `Toko "${store_name}" (Kategori: ${category || 'UMKM'})` : 'Pengunjung Umum Platform Sivilize Space'}.

Aturan Tur:
1. Berikan penjelasan ringkas, berwibawa, dan praktis (2-3 paragraf pendek) mengenai keunggulan fitur/layanan ini.
2. Jika ada pertanyaan spesifik dari pengguna: "${userMessage}", jawab secara cerdas, ramah, dan solutif.
3. Berikan 1 actionable takeaway / tips emas yang bernilai tinggi.
`;
          promptText = userMessage
            ? `Pertanyaan pengguna: "${userMessage}"`
            : `Berikan penjelasan & tips terbaik untuk langkah tur ini.`;
        } else {
          promptText = `
Konteks Pengguna:
${store_name ? `- Toko: ${store_name} (${category || 'UMKM'}, Paket: ${plan_tier || 'Pro'})` : '- Pengunjung Publik Website Sivilize Space'}

Pertanyaan Pengguna:
"${userMessage}"

Petunjuk Menjawab:
- Jawab secara cerdas, ramah, jelas, dan tanpa membatasi topik (kecuali toxic/illegal yang sudah difilter).
- Berikan insight berharga seputar sewa website, bisnis digital, atau solusi praktis.
`;
        }

        const modelsToTry = [
          'gemini-2.0-flash',
          'gemini-1.5-flash',
          'gemini-2.5-flash',
          'gemini-flash-latest',
        ];
        let candidateText: string | null = null;
        let usedModel = 'gemini-2.0-flash';

        for (const model of modelsToTry) {
          try {
            const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
            const geminiRes = await fetch(geminiEndpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    role: 'user',
                    parts: [
                      { text: systemPromptToUse },
                      { text: promptText },
                    ],
                  },
                ],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 1200,
                },
              }),
            });

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                candidateText = text;
                usedModel = model;
                break;
              }
            }
          } catch {
            // Coba model berikutnya
          }
        }

        if (candidateText) {
          const res = NextResponse.json({
            reply: candidateText.trim(),
            source: usedModel,
          });
          res.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining));
          return res;
        }
      } catch (geminiErr) {
        console.warn('Gemini API call error, falling back to local reasoning:', geminiErr);
      }
    }

    // Fallback cerdas lokal jika API Key Gemini sedang offline
    const lower = userMessage.toLowerCase();
    let reply = `Terima kasih atas pertanyaan Anda mengenai "${userMessage}". Sivilize Space adalah platform sewa website bisnis siap pakai & mandiri nomor 1 di Indonesia dengan aktivasi 60 detik, 0% komisi marketplace, dan integrasi kasir SiKasir POS & Dine Lite. Ada yang ingin Anda ketahui lebih lanjut mengenai paket, fitur, atau cara memulainya?`;

    if (mode === 'tour-guide') {
      reply = `Langkah "${tour_step_title || 'Tur'}" ini merupakan bagian penting dari ekosistem Sivilize Space. Anda mendapatkan infrastruktur sewa website berkecepatan tinggi dengan Anycast Edge SLA 99.8%, transaksi mandiri tanpa komisi, dan dukungan penuh PT Sivilize Corp Indonesia.`;
    } else if (lower.includes('harga') || lower.includes('biaya') || lower.includes('paket') || lower.includes('sewa')) {
      reply = `Sivilize Space menyediakan 3 pilihan paket sewa transparan:
1. Paket Mikro (1 Halaman): Rp 39.000/bln atau Rp 349.000/tahun (cocok untuk warkop, bio-link, jasa 1 servis).
2. Paket Pro (2-3 Halaman): Rp 69.000/bln atau Rp 599.000/tahun — GRATIS DOMAIN PRIBADI .my.id/.biz.id untuk sewa tahunan (terpopuler untuk cafe, distro, laundry, bengkel).
3. Paket Bisnis (4-5 Halaman): Rp 99.000/bln atau Rp 899.000/tahun — GRATIS DOMAIN INTERNASIONAL .COM untuk sewa tahunan.
Semua paket sudah mencakup server Anycast Edge, SSL HTTPS otomatis, dan garansi pemeliharaan 100%!`;
    } else if (lower.includes('domain') || lower.includes('com') || lower.includes('my.id')) {
      reply = `Sesuai aturan resmi Sivilize Space, GRATIS DOMAIN PRIBADI (.my.id/.biz.id pada Paket Pro, atau .COM pada Paket Bisnis) berlaku khusus untuk langganan sewa 1 TAHUN PENUH. Untuk sewa bulanan, Anda menggunakan subdomain resmi 'namatoko.sivilizecorp.my.id', atau Anda bebas menghubungkan domain pribadi yang Anda beli sendiri (+Rp 0 tanpa biaya tambahan).`;
    } else if (lower.includes('sikasir') || lower.includes('kasir') || lower.includes('dine lite') || lower.includes('pos')) {
      reply = `Setiap sewa website di Sivilize Space sudah otomatis meng-include aplikasi kasir SiKasir POS dan Sivilize Dine Lite (khusus F&B)! Anda cukup memasukkan 1 Kode Lisensi Ekosistem (contoh: SIV-FNB-365D). Stok barang yang terjual di kasir fisik langsung memotong stok di website dan QR Meja Dine Lite detik itu juga secara 2-arah.`;
    } else if (lower.includes('rakit') || lower.includes('custom') || lower.includes('desain')) {
      reply = `Selain template siap pakai yang aktif 60 detik, Anda bisa membuka 'Studio Rakit Web' (/rakit) untuk merancang sendiri tampilan toko: memilih font (Inter, JetBrains Mono, Outfit, Playfair), jumlah kolom grid (2/3/4 kolom), efek kaca frosted glass, hingga menambah halaman kustom (+Rp 50.000/halaman/tahun) dengan kalkulasi biaya yang transparan di layar!`;
    } else if (lower.includes('keamanan') || lower.includes('database') || lower.includes('aman') || lower.includes('pt')) {
      reply = `Platform Sivilize Space beroperasi di bawah badan hukum resmi PT Sivilize Corp Indonesia (NIB: 0207260103661, KBLI: 62199). Seluruh data toko Anda tersimpan aman di Cloud Database Supabase (PostgreSQL) dengan isolasi tenant, dilindungi 20-Layer Firewall & Honeypot System, serta dihosting di Vercel Anycast Edge global bergaransi SLA 99.8%.`;
    }

    const res = NextResponse.json({
      reply,
      source: 'local-knowledge-engine',
    });
    res.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining));
    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
