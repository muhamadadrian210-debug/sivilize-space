import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyMidtransSignature, calculateExpirationDate } from '@/lib/midtrans';
import type { Store, Subscription } from '@/types/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      payment_type,
      transaction_id,
      fraud_status,
    } = body;

    if (!order_id || !status_code || !gross_amount || !signature_key) {
      return NextResponse.json(
        { error: 'Payload webhook tidak lengkap.' },
        { status: 400 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-TESTKEY';

    // 1. 🛡️ FW 14 & Micro-Spec 6: Verifikasi Kriptografi SHA512
    const isValidSignature = verifyMidtransSignature(
      order_id,
      status_code,
      gross_amount,
      signature_key,
      serverKey
    );

    if (!isValidSignature && process.env.NODE_ENV === 'production') {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      await supabaseAdmin.from('security_blacklist').insert([
        {
          ip_address: ip,
          violation_type: 'invalid_payment_signature',
          triggered_firewall_layer: 14,
          honeypot_name: 'Payment HMAC Shield',
          evidence_payload: JSON.stringify({ order_id, signature_key }),
        },
      ]);

      return NextResponse.json(
        { error: 'Signature kriptografi tidak valid.' },
        { status: 403 }
      );
    }

    // 2. Cari data tagihan di tabel subscriptions
    const { data: subData, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('order_id', order_id)
      .maybeSingle();

    const subscription = subData as Subscription | null;

    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'Order ID tidak ditemukan di sistem.' },
        { status: 404 }
      );
    }

    // 3. 🛡️ Micro-Spec 7: Idempotensi Webhook (Anti-Doppelganger Activation)
    if (subscription.payment_status === 'settlement') {
      return NextResponse.json({
        status: 'ok',
        message: 'Transaksi sudah diproses sebelumnya (Idempotent OK).',
      });
    }

    // 4. Proses Status Pembayaran Berhasil
    const isSuccess =
      transaction_status === 'settlement' ||
      (transaction_status === 'capture' && fraud_status === 'accept');

    if (isSuccess) {
      // Ambil data toko terkait
      const { data: storeData } = await supabaseAdmin
        .from('stores')
        .select('*')
        .eq('id', subscription.store_id)
        .single();

      const store = storeData as Store | null;

      const newExpirationDate = calculateExpirationDate(
        store?.expired_at || null,
        subscription.billing_cycle
      );

      // Update tabel subscriptions
      await supabaseAdmin
        .from('subscriptions')
        .update({
          payment_status: 'settlement',
          payment_type: payment_type || 'qris',
          midtrans_transaction_id: transaction_id || null,
          paid_at: new Date().toISOString(),
        })
        .eq('id', subscription.id);

      // Auto-Aktivasi Toko & Perpanjang Tanggal Kadaluarsa
      await supabaseAdmin
        .from('stores')
        .update({
          is_active: true,
          expired_at: newExpirationDate,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscription.store_id);

      return NextResponse.json({
        status: 'ok',
        message: 'Pembayaran sukses, toko berhasil diaktifkan otomatis.',
      });
    }

    // 5. Penanganan status kadaluarsa / gagal
    if (['expire', 'cancel', 'deny'].includes(transaction_status)) {
      await supabaseAdmin
        .from('subscriptions')
        .update({
          payment_status: transaction_status,
        })
        .eq('id', subscription.id);
    }

    return NextResponse.json({ status: 'ok', transaction_status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan webhook.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
