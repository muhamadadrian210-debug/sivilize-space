import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { authenticateTenantRequest } from '@/lib/session';
import { uploadLimiter } from '@/lib/rate-limiter';

/**
 * -----------------------------------------------------------------------------
 * ENTERPRISE FILE UPLOAD & MAGIC BYTES INSPECTION (FW 13)
 * PT SIVILIZE CORP INDONESIA — DIVISI SIWEB PRODUCTION
 * -----------------------------------------------------------------------------
 * Memeriksa biner magic bytes gambar asli sebelum mengunggah ke Supabase Storage.
 * Mencegah stored XSS, script execution, dan penyimpanan teks Base64 bengkak di DB.
 */

// Magic Bytes Signatures
const SIGNATURES = {
  webp: [0x52, 0x49, 0x46, 0x46], // 'RIFF'
  jpeg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
};

function isValidImageMagicBytes(buffer: Uint8Array): boolean {
  if (buffer.length < 12) return false;

  // Cek PNG
  if (
    buffer[0] === SIGNATURES.png[0] &&
    buffer[1] === SIGNATURES.png[1] &&
    buffer[2] === SIGNATURES.png[2] &&
    buffer[3] === SIGNATURES.png[3]
  ) {
    return true;
  }

  // Cek JPEG
  if (
    buffer[0] === SIGNATURES.jpeg[0] &&
    buffer[1] === SIGNATURES.jpeg[1] &&
    buffer[2] === SIGNATURES.jpeg[2]
  ) {
    return true;
  }

  // Cek WebP ('RIFF' di 0-3 dan 'WEBP' di 8-11)
  if (
    buffer[0] === SIGNATURES.webp[0] &&
    buffer[1] === SIGNATURES.webp[1] &&
    buffer[2] === SIGNATURES.webp[2] &&
    buffer[3] === SIGNATURES.webp[3] &&
    buffer[8] === 0x57 && // 'W'
    buffer[9] === 0x45 && // 'E'
    buffer[10] === 0x42 && // 'B'
    buffer[11] === 0x50 // 'P'
  ) {
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  // 🛡️ RATE LIMITER SHIELD (Maksimal 15 upload per menit per IP)
  const rateLimitResult = uploadLimiter.check(req);
  if (!rateLimitResult.success) {
    return uploadLimiter.toResponse(
      rateLimitResult,
      'Terlalu banyak permintaan upload dalam 1 menit. Mohon tunggu sebentar.'
    );
  }

  try {

    // 🛡️ FW 10 & 12: Autentikasi Tenant
    const auth = authenticateTenantRequest(req);
    if (!auth.authorized || !auth.storeId) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File gambar wajib disertakan.' }, { status: 400 });
    }

    // Maksimal ukuran 2MB (WebP kompresi rata-rata <150KB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file melebihi batas maksimal (maks 2MB).' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    // 🛡️ FW 13: Validasi Magic Bytes Biner
    if (!isValidImageMagicBytes(uint8)) {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      await supabaseAdmin.from('security_blacklist').insert([
        {
          ip_address: ip,
          violating_slug: auth.storeId,
          violation_type: 'fake_image_mime_spoofing',
          triggered_firewall_layer: 13,
          honeypot_name: 'File MIME Inspector',
          evidence_payload: `Header bytes: ${Array.from(uint8.slice(0, 16)).join(',')}`,
        },
      ]);

      return NextResponse.json(
        { error: 'Format biner file bukan gambar yang sah (JPEG/PNG/WebP).' },
        { status: 400 }
      );
    }

    // Nama file unik di bucket storage
    const bucketName = 'product-images';
    const timestamp = Date.now();
    const cleanFileName = `${auth.storeId}/${timestamp}-${Math.floor(Math.random() * 10000)}.webp`;

    // Pastikan bucket ada
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === bucketName);

    if (!bucketExists) {
      await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 2 * 1024 * 1024,
      });
    }

    // Upload ke Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(cleanFileName, arrayBuffer, {
        contentType: 'image/webp',
        upsert: true,
      });

    if (uploadError) {
      console.warn('Supabase storage upload error:', uploadError.message);
      // Fallback: Jika storage bucket belum siap di project Supabase, berikan feedback jelas
      return NextResponse.json(
        { error: `Gagal mengunggah foto ke storage cloud: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Ambil Public CDN URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(cleanFileName);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      sizeKb: Math.round(file.size / 1024),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Kesalahan server unggah file.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
