/**
 * -----------------------------------------------------------------------------
 * VERCEL DOMAIN PROVISIONING CONNECTOR (MICRO-SPEC 4)
 * PT SIVILIZE CORP INDONESIA — AUTOMATED ANYCAST EDGE SSL
 * -----------------------------------------------------------------------------
 * Mendaftarkan domain kustom milik merchant secara otomatis ke project Vercel
 * sehingga sertifikat SSL (HTTPS) Let's Encrypt dapat terbit secara instan.
 */

export interface VercelDomainResult {
  success: boolean;
  apexName?: string;
  verified?: boolean;
  error?: string;
}

export async function registerDomainToVercel(domain: string): Promise<VercelDomainResult> {
  const vercelToken = process.env.VERCEL_TOKEN || process.env.VERCEL_AUTH_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!vercelToken || !projectId) {
    // Jika belum diset di environment, tetap izinkan update di database tanpa error fatal
    return {
      success: true,
      verified: false,
      error: 'Vercel API credentials not configured. Domain saved to database only.',
    };
  }

  const cleanDomain = domain.toLowerCase().trim();
  const url = `https://api.vercel.com/v10/projects/${projectId}/domains${teamId ? `?teamId=${teamId}` : ''}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: cleanDomain }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Jika domain sudah pernah didaftarkan sebelumnya, anggap sukses
      if (data.error?.code === 'domain_already_in_use' || data.error?.code === 'domain_taken') {
        return { success: true, verified: true };
      }
      return { success: false, error: data.error?.message || 'Gagal mendaftarkan domain ke Vercel.' };
    }

    return {
      success: true,
      apexName: data.apexName,
      verified: data.verified,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Koneksi Vercel gagal.';
    return { success: false, error: message };
  }
}
