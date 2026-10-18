import { site } from '@/lib/data';
import { labelHari } from '@/lib/format';
import { Tanda } from './Lintang';

export default function Footer() {
  return (
    <footer className="gelap gelombang sprinkles mt-20 bg-tinta text-krim" style={{ '--gel': 'var(--color-tinta)', '--sprinkles-opacity': 0.28 }}>
      <div className="wadah grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Tanda className="h-11 w-11" />
            <p className="font-display text-[1.6rem]">{site.nama}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-krim/75">{site.tagline} Dessert bar kecil di {site.kota} yang memutar gelatonya sendiri tiap pagi dan menulis menunya di halaman ini supaya rasa baru bisa langsung muncul.</p>
        </div>
        <div className="text-sm">
          <p className="label-manis !text-kuning">Jam buka</p>
          <ul className="mt-3 space-y-1.5">
            {site.jam.map((j) => (
              <li key={j.buka + j.hari.join()} className="flex justify-between gap-4 border-b border-krim/15 pb-1.5">
                <span>{labelHari(j.hari)}</span>
                <span className="font-semibold">{j.buka}–{j.tutup} WIB</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="label-manis !text-kuning">Alamat</p>
          <p className="mt-3 leading-relaxed">{site.alamat}</p>
          <p className="mt-3 text-krim/75">Menu edisi {site.edisi}. {site.pajak}</p>
        </div>
      </div>
      <div className="border-t border-krim/15">
        <p className="wadah py-4 text-xs text-krim/70">© 2026 {site.nama}. Usaha fiktif untuk demo menu digital.</p>
      </div>
    </footer>
  );
}
