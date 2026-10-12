import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyMayarSignature } from '@/lib/mayar';
import { calculateExpirationDate } from '@/lib/midtrans';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-mayar-signature') || '';
    const webhookSecret = process.env.MAYAR_WEBHOOK_SECRET || 'sandbox_secret';

    // Verifikasi signature jika di environment production
    if (process.env.NODE_ENV === 'production' && process.env.MAYAR_WEBHOOK_SECRET) {
      const isValid = verifyMayarSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json({ error: 'Signature webhook tidak valid.' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event || payload.status;
    const data = payload.data || payload;

    // Cek apakah pembayaran sukses
    if (event === 'payment.received' || event === 'invoice.paid' || data.status === 'PAID') {
      const metadata = data.metadata || {};
      const storeId = metadata.storeId;

      if (storeId) {
        if (metadata.paymentType === 'store_subscription') {
          // 1. Aktivasi Toko Otomatis 100%
          const { data: store } = await supabaseAdmin
            .from('stores')
            .select('expired_at')
            .eq('id', storeId)
            .single();

          const newExpiredAt = calculateExpirationDate(
            store?.expired_at || null,
            metadata.billingCycle || 'tahunan'
          );

          await supabaseAdmin
            .from('stores')
            .update({
              is_active: true,
              expired_at: newExpiredAt,
              updated_at: new Date().toISOString(),
            })
            .eq('id', storeId);

          // Insert riwayat subscription
          await supabaseAdmin.from('subscriptions').insert([
            {
              store_id: storeId,
              order_id: data.id || `MYR-${Date.now()}`,
              amount: data.amount || 0,
              plan_tier: metadata.planTier || 'pro',
              billing_cycle: metadata.billingCycle || 'tahunan',
              payment_status: 'settlement',
              payment_type: 'mayar_qris',
              paid_at: new Date().toISOString(),
            },
          ]);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
