import './globals.css';
import { Lilita_One, Figtree } from 'next/font/google';
import { site, kategori, itemKategori } from '@/lib/data';

const lilita = Lilita_One({ weight: '400', subsets: ['latin'], variable: '--font-lilita', display: 'swap' });
const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });

const HARI = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const jam24 = (j) => j.replace('.', ':');

// IceCreamShop (subtipe FoodEstablishment) + Menu/MenuSection/MenuItem: struktur menu terbaca mesin pencari.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'IceCreamShop',
  name: site.nama,
  url: site.url,
  description: site.deskripsi,
  servesCuisine: ['Dessert'],
  priceRange: 'Rp6.000–Rp42.000',
  address: { '@type': 'PostalAddress', streetAddress: 'Jl. Cihampelas No. 88, Coblong', addressLocality: 'Bandung', addressRegion: 'Jawa Barat', addressCountry: 'ID' },
  openingHoursSpecification: site.jam.map((j) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: j.hari.map((h) => HARI[h]), opens: jam24(j.buka), closes: jam24(j.tutup) })),
  hasMenu: {
    '@type': 'Menu',
    name: `Menu ${site.nama}`,
    inLanguage: 'id-ID',
    hasMenuSection: kategori.map((k) => ({
      '@type': 'MenuSection',
      name: k.nama,
      description: k.catatan,
      hasMenuItem: itemKategori(k.id).map((m) => ({
        '@type': 'MenuItem',
        name: m.nama,
        description: m.deskripsi,
        ...(m.nabati ? { suitableForDiet: 'https://schema.org/VeganDiet' } : {}),
        offers: { '@type': 'Offer', price: m.harga, priceCurrency: 'IDR', availability: m.habis ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' },
      })),
    })),
  },
};

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.judul, template: `%s · ${site.nama}` },
  description: site.deskripsi,
  applicationName: site.nama,
  keywords: ['menu digital', 'qr menu', 'menu dessert', 'menu gelato', 'menu croffle', 'demo menu digital'],
  authors: [{ name: 'PintuWeb', url: 'https://www.pintuweb.id' }],
  creator: 'PintuWeb',
  publisher: 'PintuWeb',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: site.url,
    siteName: site.nama,
    title: site.judul,
    description: site.deskripsi,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `Menu digital ${site.nama}: gelato, croffle, kue potong, dan puding dengan harga` }],
  },
  twitter: { card: 'summary_large_image', title: site.judul, description: site.deskripsi, images: ['/og.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport = { themeColor: '#fff7ee', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${lilita.variable} ${figtree.variable}`}>
      <body className="antialiased">
        <a href="#isi" className="sr-only-fokus fixed left-3 top-3 z-[70] rounded-full bg-tinta px-4 py-2 text-krim">
          Langsung ke menu
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href={`https://www.pintuweb.id/kontak?demo=${site.slug}`} style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
      </body>
    </html>
  );
}
