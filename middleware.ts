import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  
  // TETAP LINK OFFER KAMU
  const linkOffer = "https://link-affiliate-atau-offer-kamu.com";

  const isFbBot = ua.includes('facebookexternalhit') || ua.includes('Facebot');

  if (isFbBot) {
    // Bot dilempar ke halaman pancingan untuk baca Meta Tag
    return NextResponse.rewrite(new URL('/pancingan', request.url));
  }

  // Manusia/User asli langsung ke Link Offer
  return NextResponse.redirect(linkOffer);
}

export const config = {
  matcher: '/',
};
