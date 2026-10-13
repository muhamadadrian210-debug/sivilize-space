import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { updateStoreSchema, checkProhibitedContent } from '@/lib/security';
import { authenticateTenantRequest } from '@/lib/session';
import { registerDomainToVercel } from '@/lib/vercel-domain';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Validasi Skema Zod Ketat (FW 09: Strip Unknown Keys)
    const parsed = updateStoreSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Format data tidak valid.', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 🛡️ FW 12: Autentikasi Tenant & Proteksi IDOR/BOLA
    const auth = authenticateTenantRequest(req, data.id);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Akses ditolak.' }, { status: 403 });
    }

    // 2. 🛡️ FW 19: Scanner Teks Anti-Judol & Anti-Pinjol
    const textToCheck = `${data.store_name} ${data.description || ''}`;
    const judolCheck = checkProhibitedContent(textToCheck);
    if (judolCheck.isViolating) {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      // Log ke security_blacklist
      await supabaseAdmin.from('security_blacklist').insert([
        {
          ip_address: ip,
          violation_type: 'judol_or_pinjol_detected',
          triggered_firewall_layer: 19,
          honeypot_name: 'Gambling Term Indexer Trap',
          evidence_payload: `Kata terlarang: "${judolCheck.matchedWord}" dalam payload: ${textToCheck}`,
        },
      ]);

      return NextResponse.json(
        {
          error: `Pelanggaran Hukum Siber: Konten mengandung istilah terlarang (${judolCheck.matchedWord}). Akun dilaporkan ke tim investigasi.`,
        },
        { status: 403 }
      );
    }

    // 3. Otomatisasi Registrasi Vercel Edge SSL jika custom domain diisi
    if (data.custom_domain) {
      await registerDomainToVercel(data.custom_domain);
    }

    // 4. Update data toko di Supabase
    const { data: updated, error } = await supabaseAdmin
      .from('stores')
      .update({
        store_name: data.store_name,
        description: data.description,
        category: data.category,
        template_type: data.template_type,
        theme_id: data.theme_id,
        opening_hours: data.opening_hours,
        address: data.address,
        google_maps_url: data.google_maps_url,
        banner_url: data.banner_url || null,
        logo_url: data.logo_url || null,
        custom_domain: data.custom_domain || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', data.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, store: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan internal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
