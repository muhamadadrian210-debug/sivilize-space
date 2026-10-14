import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { normalizeWhatsAppPhone, isValidSlug } from '@/lib/utils';
import { hashPin } from '@/lib/session';
import type { Store } from '@/types/database';

/**
 * -----------------------------------------------------------------------------
 * SIVILIZESPACE TENANT PIN RESET CONTROLLER
 * PT SIVILIZE CORP INDONESIA — ZERO TRUST MERCHANT RECOVERY
 * -----------------------------------------------------------------------------
 * Memungkinkan pemilik website mereset PIN 6-digit mereka dengan memvalidasi
 * kepemilikan nomor WhatsApp terdaftar dan subdomain (slug) resmi toko.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, slug: rawSlug, new_pin, license_key } = body;

    if (!phone || !rawSlug || !new_pin || !license_key) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp, slug website, PIN baru 6 digit, dan Kunci Lisensi (tertera di Invoice Resmi) wajib diisi.' },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(new_pin)) {
      return NextResponse.json(
        { error: 'PIN baru harus terdiri dari tepat 6 digit angka.' },
        { status: 400 }
      );
    }

    const cleanPhone = normalizeWhatsAppPhone(phone);
    const slug = String(rawSlug).toLowerCase().trim();
    const cleanKey = String(license_key).toUpperCase().trim();

    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: 'Format slug website tidak valid.' },
        { status: 400 }
      );
    }

    // Cari website berdasarkan slug dan nomor HP pemilik
    const { data: store, error } = await supabaseAdmin
      .from('stores')
      .select('id, store_name, slug, owner_phone, is_active, failed_login_attempts, ecosystem_license_code, layout_config')
      .eq('slug', slug)
      .eq('owner_phone', cleanPhone)
      .maybeSingle();

    if (error || !store) {
      // Catat percobaan pemulihan gagal demi audit keamanan
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      await supabaseAdmin.from('security_blacklist').insert([
        {
          ip_address: ip,
          violating_slug: slug,
          phone_number: cleanPhone,
          violation_type: 'failed_pin_reset_attempt',
          triggered_firewall_layer: 11,
          evidence_payload: JSON.stringify({ slug, phone: cleanPhone }),
        },
      ]);

      return NextResponse.json(
        { error: 'Kombinasi nomor WhatsApp dan alamat website tidak cocok atau belum terdaftar.' },
        { status: 404 }
      );
    }

    // Verifikasi Kunci Lisensi Ekosistem (Anti-Bajak Akun Zero Trust)
    const storedLicense = (
      store.ecosystem_license_code ||
      (store.layout_config as Record<string, any>)?.ecosystem_license_code ||
      ''
    ).toUpperCase().trim();

    if (!storedLicense || storedLicense !== cleanKey) {
      return NextResponse.json(
        {
          error:
            'Kunci Lisensi Ekosistem tidak cocok dengan invoice resmi website ini. Silakan periksa kembali kode lisensi pada nota fisik sewa Anda.',
        },
        { status: 403 }
      );
    }

    // Hash PIN baru secara kriptografis (HMAC SHA-256)
    const newPinHash = hashPin(new_pin);

    // Update PIN di Supabase & reset status lockout
    const { error: updateError } = await supabaseAdmin
      .from('stores')
      .update({
        pin_hash: newPinHash,
        failed_login_attempts: 0,
        lockout_until: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', store.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Gagal memperbarui PIN keamanan. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `✓ PIN keamanan untuk "${store.store_name}" berhasil direset! Silakan login dengan PIN baru Anda.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan server.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
