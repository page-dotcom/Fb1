import Head from 'next/head';
import { GetServerSideProps } from 'next';
import ogs from 'open-graph-scraper';

interface MetaProps {
  image: string;
  url: string;
}

export default function Pancingan({ image, url }: MetaProps) {
  const blank = "⠀"; // Braille Blank (Invisible)

  return (
    <>
      <Head>
        {/* Menghilangkan Judul & Deskripsi */}
        <title>{blank}</title>
        <meta property="og:title" content={blank} />
        <meta property="og:description" content={blank} />
        
        {/* Mengambil gambar hasil scraping */}
        <meta property="og:image" content={image} />
        
        {/* Memaksa domain target yang muncul */}
        <meta property="og:url" content={url} />
        
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div style={{ background: '#000', height: '100vh' }}></div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const targetUrl = (context.query.url as string) || "https://google.com";
  
  try {
    const options = { url: targetUrl };
    const { result } = await ogs(options);
    
    // Ambil gambar terbaik dari link target secara otomatis
    const scrapedImage = result.ogImage?.[0]?.url || "";

    return {
      props: {
        image: scrapedImage,
        url: targetUrl
      },
    };
  } catch (e) {
    return {
      props: { image: "", url: targetUrl },
    };
  }
};
