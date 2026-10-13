import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createSuperAdminToken } from '@/lib/session';

function safeCompare(a: string, b: string): boolean {
  if (!a || !b) return false;
  const hashA = crypto.createHash('sha256').update(String(a)).digest();
  const hashB = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export async function POST(req: NextRequest) {
  try {
    const { username, master_key } = await req.json();

    const expectedKey = process.env.SUPER_ADMIN_MASTER_KEY || 'sivilize-ceo-master-2026';
    const validUsers = ['ceo', 'admin', 'sivilize'];
    const isUserValid = validUsers.includes(username);
    const isKeyValid = safeCompare(master_key, expectedKey);

    if (!isUserValid || !isKeyValid) {
      return NextResponse.json(
        { error: 'Kredensial Super Admin tidak valid.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Autentikasi Super Admin berhasil.',
      role: 'SUPER_ADMIN_CEO',
    });

    const token = createSuperAdminToken(username);
    response.cookies.set('sivilize_super_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 3, // 3 hari
      path: '/',
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Kesalahan server.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logout berhasil.' });
  response.cookies.delete('sivilize_super_admin_session');
  return response;
}
