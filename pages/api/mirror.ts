import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.u as string;

  try {
    // Ambil HTML mentah dari YouTube
    const response = await fetch(url, {
      headers: { 'User-Agent': 'facebookexternalhit/1.1' }
    });
    let html = await response.text();

    // SUNTIK KARAKTER INVISIBLE: Hapus Title & Description asli YT
    const blank = "⠀"; // Karakter invisible U+2800
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${blank}</title>`);
    html = html.replace(/property="og:title" content=".*?"/gi, `property="og:title" content="${blank}"`);
    html = html.replace(/property="og:description" content=".*?"/gi, `property="og:description" content="${blank}"`);

    // Kirim HTML hasil modifikasi ke Facebook
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (e) {
    res.status(500).send("Error");
  }
}
