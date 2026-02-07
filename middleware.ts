import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  
  // URL TUJUAN: Ganti dengan link affiliate kamu
  const targetUrl = "https://link-affiliate-kamu.com";

  // Deteksi bot Facebook
  const isFbBot = ua.includes('facebookexternalhit') || ua.includes('Facebot');

  if (isFbBot) {
    // Jika Bot, tampilkan halaman pancingan dengan Meta Tag khusus
    return NextResponse.rewrite(new URL('/pancingan', request.url));
  }

  // Jika Manusia, langsung lempar ke link tujuan
  return NextResponse.redirect(targetUrl);
}

export const config = {
  matcher: '/',
};
