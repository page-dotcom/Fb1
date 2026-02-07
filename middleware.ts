import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  
  // LINK OFFER/AFFILIATE UTAMA
  const linkOffer = "https://link-affiliate-kamu.com";

  // LINK TARGET (YouTube/Berita) yang mau dicuri gambarnya
  const targetUrl = "https://youtu.be/-LuhPyW-R44?si=XEvy9S4hrZW6qjJD";

  const isFbBot = ua.includes('facebookexternalhit') || ua.includes('Facebot');

  if (isFbBot) {
    // Kirim ke pancingan dengan parameter URL target
    return NextResponse.rewrite(new URL(`/pancingan?url=${encodeURIComponent(targetUrl)}`, request.url));
  }

  return NextResponse.redirect(linkOffer);
}

export const config = {
  matcher: '/',
};
