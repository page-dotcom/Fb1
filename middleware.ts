import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  
  // 1. LINK DUIT (AFFILIATE) LO - Pastikan link ini HIDUP
  const linkOffer = "https://link-affiliate-lo.com"; 

  // 2. LINK YOUTUBE (Target Gambar)
  const targetYT = "https://youtu.be/apkf6gfVpiA?si=9PQhyhi4gaRsa8tP";

  // Cek apakah yang datang itu Bot Facebook / Twitter / WhatsApp
  const isBot = /facebookexternalhit|Facebot|Twitterbot|WhatsApp/i.test(ua);

  if (isBot) {
    // Kalau Bot, kita arahkan ke API Mirror buat nyolong gambar YT
    const url = req.nextUrl.clone();
    url.pathname = '/api/mirror';
    url.searchParams.set('target', targetYT);
    return NextResponse.rewrite(url);
  }

  // Kalau Manusia, TENDANG ke Link Offer
  return NextResponse.redirect(linkOffer);
}

export const config = {
  matcher: '/',
};
