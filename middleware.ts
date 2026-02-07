import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  
  // 1. LINK DUIT (OFFER) - Tujuan pas orang klik
  const linkOffer = "https://link-affiliate-lo.com"; 

  // 2. LINK YOUTUBE - Tujuan buat Bot Facebook (Biar previewnya YT asli)
  const linkPalsu = "https://youtu.be/IHPqKMqraVw?si=rnnPaTM_YIjaC1Ws";

  // Deteksi Bot Facebook (Crawler)
  const isFacebook = /facebookexternalhit|Facebot/i.test(ua);

  if (isFacebook) {
    // Kalo Bot, LEMPAR dia ke YouTube.
    // Facebook bakal baca ini sebagai redirect, lalu dia akan scrape halaman YouTube itu.
    // Hasilnya: Gambar YT, Judul YT, Domain YT.
    return NextResponse.redirect(linkPalsu, 302); 
  }

  // Kalo Manusia, LEMPAR ke Link Offer
  return NextResponse.redirect(linkOffer, 302);
}

// Config biar jalan di halaman utama
export const config = {
  matcher: '/',
};
