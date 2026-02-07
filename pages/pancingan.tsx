export default function handler(req, res) {
  const blank = "⠀"; // Karakter invisible sakti
  const targetDomain = "https://www.facebook.com"; // Domain yang mau dipinjam namanya
  const imagePancingan = "https://link-gambar-video-lo.jpg";

  // Kita kirim HTML mentah tanpa embel-embel Next.js biar lebih 'clean' di mata bot
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${blank}</title>
        <meta property="og:title" content="${blank}">
        <meta property="og:description" content="${blank}">
        <meta property="og:url" content="${targetDomain}">
        <meta property="og:image" content="${imagePancingan}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
      </head>
      <body></body>
    </html>
  `.trim();

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
