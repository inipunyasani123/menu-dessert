import Link from 'next/link';
import Lintang, { Tanda } from '@/components/Lintang';

export const metadata = { title: 'Halaman tidak ditemukan', robots: { index: false, follow: true }, alternates: { canonical: null } };

export default function TidakDitemukan() {
  return (
    <main id="isi" className="sprinkles wadah flex min-h-[80vh] flex-col items-center justify-center py-16 text-center" style={{ '--sprinkles-opacity': 0.45 }}>
      <Tanda className="h-20 w-20" />
      <p className="label-manis mt-8 flex items-center gap-1.5 !text-stroberi-tua"><Lintang className="h-3.5 w-3.5" /> 404 · lintangnya belum muncul</p>
      <h1 className="mt-3 text-[3rem] sm:text-[4.5rem]">Halaman ini belum ada di etalase</h1>
      <p className="mt-4 max-w-md text-tinta-2">Alamat yang kamu buka tidak ada di menu. Menu lengkap ada di halaman utama, lengkap dengan nomor mejamu.</p>
      <Link href="/" className="tombol tombol-stroberi mt-8">Kembali ke menu</Link>
    </main>
  );
}
