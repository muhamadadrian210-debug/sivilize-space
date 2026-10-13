'use client';

/**
 * -----------------------------------------------------------------------------
 * CLIENT-SIDE DEVICE FINGERPRINT ENGINE (BAB XIV & FW 11)
 * PT SIVILIZE CORP INDONESIA — HARDWARE-LEVEL ZERO TRUST IDENTITY
 * -----------------------------------------------------------------------------
 * Menghasilkan sidik jari perangkat unik (hardware hash) tanpa membutuhkan izin
 * kamera/lokasi. Tetap konsisten meskipun pengguna berganti IP, VPN, atau Incognito.
 */

export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return 'server_side_device';

  // 1. Cek cache lokal jika sudah pernah dibuat
  const cached = localStorage.getItem('sivilize_device_fp');
  if (cached && cached.startsWith('dev_fp_') && cached.length > 20) {
    return cached;
  }

  try {
    const components: string[] = [];

    // A. Layar & GPU pixel ratio
    components.push(`${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`);
    components.push(`dpr:${window.devicePixelRatio || 1}`);

    // B. Arsitektur Perangkat Keras
    components.push(`cores:${navigator.hardwareConcurrency || 4}`);
    components.push(`tz:${Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'}`);
    components.push(`lang:${navigator.language || 'id-ID'}`);
    components.push(`platform:${navigator.platform || 'web'}`);

    // C. WebGL GPU Renderer & Vendor
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl && gl instanceof WebGLRenderingContext) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
          components.push(`gpu:${vendor}~${renderer}`);
        }
      }
    } catch {
      components.push('gpu:fallback');
    }

    // D. Canvas 2D Fingerprint (Rendering teks & geometri tersembunyi)
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#059669';
        ctx.fillRect(0, 0, 100, 30);
        ctx.fillStyle = '#10b981';
        ctx.fillText('SivilizeCorp-AntiFraud-2026', 2, 15);
        components.push(`canvas:${canvas.toDataURL().slice(-40)}`);
      }
    } catch {
      components.push('canvas:fallback');
    }

    // E. Gabungkan & Hash dengan Web Crypto SHA-256
    const combinedString = components.join('|||');
    const encoder = new TextEncoder();
    const data = encoder.encode(combinedString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    const fingerprint = `dev_fp_${hashHex.slice(0, 32)}`;
    localStorage.setItem('sivilize_device_fp', fingerprint);
    return fingerprint;
  } catch (err) {
    // Fallback ID acak persisten
    const fallbackId = `dev_fp_fb_${Math.random().toString(36).slice(2, 18)}`;
    localStorage.setItem('sivilize_device_fp', fallbackId);
    return fallbackId;
  }
}
