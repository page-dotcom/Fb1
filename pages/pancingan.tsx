import Head from 'next/head';

export default function Pancingan() {
  const blank = "⠀"; // Karakter invisible
  const fakeDomain = "facebook.com"; // Domain pancingan di deskripsi
  const imgUrl = "https://your-image-link.com/photo.jpg"; // URL Gambar kamu

  return (
    <>
      <Head>
        <title>{blank}</title>
        <meta property="og:title" content={blank} />
        <meta property="og:url" content={blank} />
        <meta property="og:description" content={fakeDomain} />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div style={{ background: 'white', height: '100vh' }}></div>
    </>
  );
}
