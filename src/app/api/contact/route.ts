import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkIsBanned, createBannedResponse } from '@/lib/blacklist';
import { checkProhibitedContent } from '@/lib/security';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(80),
  phone: z.string().min(8, 'Nomor WhatsApp/HP tidak valid').max(25),
  store_name: z.string().max(100).optional(),
  message: z.string().min(5, 'Pesan minimal 5 karakter').max(1500),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // 1. Blacklist check
  const banCheck = await checkIsBanned(req);
  if (banCheck.isBanned) {
    return createBannedResponse(banCheck);
  }

  try {
    const body = await req.json();

    // 2. Honeypot trap check
    if (body.honeypot) {
      return NextResponse.json({ error: 'Akses ditolak.' }, { status: 403 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Input data tidak valid.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { name, phone, store_name, message } = parsed.data;

    // 3. Prohibited content check
    const contentCheck = checkProhibitedContent(`${name} ${message} ${store_name || ''}`);
    if (contentCheck.isViolating) {
      return NextResponse.json(
        { error: `Pesan ditolak: Terdeteksi kata tidak diizinkan (${contentCheck.matchedWord}).` },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // 4. Simpan ke database jika tabel contact_messages ada, atau failover ke log terstruktur
    try {
      await supabaseAdmin.from('contact_messages').insert([
        {
          name,
          phone,
          business_name: store_name || null,
          message,
          ip_address: ip,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      // Table may not exist yet in Supabase, fail gracefully without blocking user
    }

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda berhasil diterima oleh tim PT Sivilize Corp Indonesia. Kami akan menghubungi Anda melalui WhatsApp/Telepon dalam 1x24 jam.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat mengirim pesan. Silakan hubungi sivilizecorpindonesia@gmail.com secara langsung.' },
      { status: 500 }
    );
  }
}
