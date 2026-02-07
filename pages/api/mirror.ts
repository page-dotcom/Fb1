import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const target = req.query.target as string;

  if (!target) return res.status(400).send('No target');

  try {
    // 1. Curi HTML dari YouTube seolah-olah kita adalah Bot Facebook
    const response = await fetch(target, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      },
    });

    let html = await response.text();

    // 2. MODIFIKASI HTML (Hapus Judul & Deskripsi, ganti pake Invisible Char)
    const blank = "&#x2800;"; // Braille Pattern Blank

    // Timpa Title
    html = html.replace(/<title>.*?<\/title>/g, `<title>${blank}</title>`);
    html = html.replace(/<meta\s+property="og:title"\s+content=".*?"/g, `<meta property="og:title" content="${blank}">`);
    
    // Timpa Deskripsi
    html = html.replace(/<meta\s+property="og:description"\s+content=".*?"/g, `<meta property="og:description" content="${blank}">`);

    // Pastikan Gambar Tetap Ada (YouTube biasanya aman, tapi kita pastiin og:url ngarah ke target)
    // Trik ini mencoba memaksa domain, TAPI Facebook sekarang sering mengabaikannya jika SSL beda.
    html = html.replace(/<meta\s+property="og:url"\s+content=".*?"/g, `<meta property="og:url" content="${target}">`);

    // 3. Kirim balik ke Facebook
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    res.status(200).send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal mengambil data target');
  }
}
