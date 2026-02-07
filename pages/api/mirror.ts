import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const targetUrl = req.query.target as string;

  try {
    // Ambil isi HTML asli dari YouTube
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'facebookexternalhit/1.1' }
    });
    let html = await response.text();

    // TEKNIK HACK: Hapus Title dan Description asli YouTube biar Blank
    html = html.replace(/<title>.*?<\/title>/gi, '<title>⠀</title>');
    html = html.replace(/<meta.*?property="og:title".*?>/gi, '<meta property="og:title" content="⠀">');
    html = html.replace(/<meta.*?property="og:description".*?>/gi, '<meta property="og:description" content="⠀">');
    
    // Kirim HTML hasil modifikasi ke Facebook
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (e) {
    res.status(500).send("Error mirroring");
  }
}
