import { site, faq, alergen, menu, kategori, cariItem, RASA } from '@/lib/data';
import { rupiah, labelHari } from '@/lib/format';
import Lintang, { Tanda, MeterManis } from '@/components/Lintang';
import Ilustrasi from '@/components/Ilustrasi';
import FotoMenu from '@/components/FotoMenu';
import TombolPilih from '@/components/TombolPilih';
import Meja from '@/components/Meja';
import StatusBuka from '@/components/StatusBuka';
import KategoriNav from '@/components/KategoriNav';
import Menu from '@/components/Menu';
import Nampan from '@/components/Nampan';
import QR from '@/components/QR';
import Footer from '@/components/Footer';
import { Pindai, Dingin, Hangat } from '@/components/Ikon';

export const metadata = { alternates: { canonical: '/' } };

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const CONTOH_MEJA = '3';

export default function Halaman() {
  const unggulan = cariItem(site.mingguIni.id);
  const kUnggulan = kategori.find((k) => k.id === unggulan.kategori);
  const jumlahMenu = menu.length;
  const nabati = menu.filter((m) => m.nabati).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 shadow-[0_1px_0_rgb(58_36_32_/_0.06),0_8px_24px_-16px_rgb(58_36_32_/_0.25)] backdrop-blur">
        <div className="wadah flex h-14 items-center gap-3 sm:h-16">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.nama}, ke atas`}>
            <Tanda className="h-9 w-9" />
            <span className="whitespace-nowrap font-display text-[1.3rem] leading-none sm:text-[1.5rem]">{site.nama}</span>
          </a>
          <div className="ms-auto flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:block"><StatusBuka /></span>
            <Meja />
          </div>
        </div>
      </header>

      <main id="top" className="pb-24">
        {/* Hero: judul raksasa + kartu lebar "Lintang minggu ini" bergelombang */}
        <section className="sprinkles overflow-hidden pb-10 pt-8 sm:pt-12 lg:pb-14 lg:pt-16" style={{ '--sprinkles-opacity': 0.5 }}>
          <div className="wadah">
            <p className="flex items-center gap-2 font-display text-[0.95rem] tracking-wide text-stroberi-tua">
              <Lintang className="h-4 w-4" /> Dessert bar · {site.kota} · menu edisi {site.edisi}
            </p>
            <h1 className="mt-3 text-[3.1rem] leading-[0.95] sm:text-[4.5rem] lg:text-[6.2rem]">
              Manisnya seterang <span className="text-stroberi-tua">lintang</span>.
            </h1>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-[1.05rem] leading-relaxed text-tinta-2">
                {jumlahMenu} dessert dan minuman manis, {RASA.length} rasa gelato yang diputar tiap pagi, dan satu bowl yang kamu rakit sendiri. Tandai yang kamu mau, kirim dari meja tanpa antre.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#isi" className="tombol tombol-stroberi">Lihat menu</a>
                <a href="#k-bowl" className="tombol tombol-garis">Rakit bowl</a>
              </div>
            </div>
            <p className="mt-4 sm:hidden"><StatusBuka /></p>

            <article className="gelombang mt-12 rounded-b-[var(--radius-kartu)] bg-stroberi-muda px-5 pb-6 pt-5 shadow-[var(--shadow-lembut)] sm:px-8 sm:pb-8 sm:pt-6" style={{ '--gel': 'var(--color-stroberi-muda)', '--gel-r': '14px' }} aria-labelledby="judul-minggu-ini">
              <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
                <div className="mx-auto grid h-44 w-44 place-items-center rounded-full bg-white/80 shadow-[inset_0_0_0_6px_var(--color-stroberi)] sm:h-52 sm:w-52">
                  <FotoMenu id="hero" alt={`${unggulan.nama}: croffle hangat dengan satu scoop es krim`} priority sizes="(min-width: 640px) 176px, 144px" className="h-36 w-36 rounded-full ring-4 ring-white sm:h-44 sm:w-44">
                    <Ilustrasi gambar={unggulan.gambar} className="h-36 w-36 sm:h-44 sm:w-44" />
                  </FotoMenu>
                </div>
                <div>
                  <p className="label-manis flex items-center gap-1.5 !text-stroberi-tua"><Lintang className="h-3.5 w-3.5" /> Lintang minggu ini</p>
                  <h2 id="judul-minggu-ini" className="mt-2 text-[2.2rem] leading-none sm:text-[3rem]">{unggulan.nama}</h2>
                  <p className="mt-3 max-w-lg text-[0.98rem] leading-relaxed text-tinta-2">{site.mingguIni.alasan}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.75rem] font-bold">
                    <MeterManis n={unggulan.manis} />
                    {unggulan.suhu.includes('hangat') && <span className="inline-flex items-center gap-0.5 text-persik-tua"><Hangat className="h-3.5 w-3.5" />Hangat</span>}
                    {unggulan.suhu.includes('dingin') && <span className="inline-flex items-center gap-0.5 text-langit-tua"><Dingin className="h-3.5 w-3.5" />Dingin</span>}
                    <span className="text-tinta-3">{kUnggulan?.nama}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="harga text-[1.1rem]">{rupiah(unggulan.harga)}</span>
                    <TombolPilih id={unggulan.id} className="tombol tombol-tinta" aria-label={`Pilih rasa gelatonya untuk ${unggulan.nama}`}>Pilih rasa gelatonya</TombolPilih>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <KategoriNav />
        <Menu />

        {/* Pindai di meja */}
        <section id="pindai" aria-labelledby="judul-pindai" className="gelombang mt-20 bg-pistasio-muda pb-12 pt-10 sm:pb-16 sm:pt-14" style={{ '--gel': 'var(--color-pistasio-muda)', '--gel-r': '14px' }}>
          <div className="wadah grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="label-manis !text-pistasio-tua">Cara memesan</p>
              <h2 id="judul-pindai" className="mt-3 text-[2.4rem] sm:text-[3.2rem]">Pindai, pilih, kirim. Tanpa antre di kasir.</h2>
              <ol className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ['Pindai kartu QR di meja', 'Tautannya membawa nomor mejamu, jadi kami tahu ke mana mengantar.'],
                  ['Isi nampan', 'Pilih rasa, topping, dan ukuran. Rakit bowl kalau mau.'],
                  ['Kirim lewat WhatsApp', 'Pesanan tersusun rapi sebagai pesan. Bayar di kasir atau lewat QRIS saat diantar.'],
                ].map(([j, d], i) => (
                  <li key={j} className="rounded-[18px] bg-white/70 p-4">
                    <p className="flex items-start gap-2 font-display text-[1.1rem] leading-tight"><Lintang className="mt-0.5 h-4 w-4 shrink-0 text-pistasio-tua" /> {i + 1}. {j}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-tinta-2">{d}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 flex items-start gap-2 text-sm text-tinta-2"><Dingin className="mt-0.5 h-4 w-4 shrink-0 text-langit-tua" />Pilih &quot;Bungkus (dibekukan)&quot; di nampan kalau mau dibawa pulang: gelato dan bowl dikemas dengan es kering kecil.</p>
            </div>
            <div className="flex items-center justify-center py-4 lg:col-span-5">
              {/* Kartu meja: tiket bergelombang atas-bawah */}
              <div className="gelombang gelombang-bawah w-64 bg-white px-6 pb-6 pt-5 text-center shadow-[var(--shadow-angkat)] sm:w-72" style={{ '--gel': '#fff', '--gel-r': '10px' }}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm tracking-wide text-tinta-3">{site.nama}</span>
                  <Pindai className="h-4 w-4 text-stroberi-tua" />
                </div>
                <p className="mt-3 font-display text-[3.4rem] leading-none">Meja {CONTOH_MEJA}</p>
                <div className="mx-auto mt-4 w-fit rounded-[18px] bg-krim p-3">
                  <QR url={`${site.url}/?meja=${CONTOH_MEJA}`} className="h-40 w-40 text-tinta sm:h-44 sm:w-44" label={`Kode QR contoh untuk meja ${CONTOH_MEJA}`} />
                </div>
                <p className="mt-3 flex items-center justify-center gap-1 font-display text-sm text-stroberi-tua"><Lintang className="h-3 w-3" /> Pindai untuk memesan <Lintang className="h-3 w-3" /></p>
                <p className="mt-1 text-[0.7rem] text-tinta-3">menu-dessert.pintuweb.id/?meja={CONTOH_MEJA}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Info & FAQ */}
        <section id="info" aria-labelledby="judul-info" className="wadah mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-manis !text-stroberi-tua">Perlu diketahui</p>
            <h2 id="judul-info" className="mt-3 text-[2.2rem] sm:text-[2.8rem]">Alergen & catatan dapur</h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem] text-tinta-2">
              {alergen.map((a) => (
                <li key={a} className="flex gap-2.5"><Lintang className="mt-[0.3em] h-3.5 w-3.5 shrink-0 text-stroberi" />{a}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-tinta-2">{nabati} pilihan tanpa susu; pakai saringan &quot;Tanpa susu&quot; di menu.</p>
            <dl className="mt-6 divide-y divide-garis border-y border-garis text-sm">
              {site.jam.map((j) => (
                <div key={j.buka + j.hari.join()} className="flex justify-between py-2.5"><dt className="text-tinta-2">{labelHari(j.hari)}</dt><dd className="font-bold">{j.buka}–{j.tutup} WIB</dd></div>
              ))}
              <div className="flex justify-between gap-6 py-2.5"><dt className="text-tinta-2">Alamat</dt><dd className="text-end font-bold">{site.alamat}</dd></div>
            </dl>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-[2.2rem] sm:text-[2.8rem]">Yang sering ditanya</h2>
            <div className="mt-5 space-y-2.5">
              {faq.map((f, i) => (
                <details key={f.q} name="faq" open={i === 0} className="group kartu overflow-hidden">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 font-display text-[1.15rem] leading-snug [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-stroberi-muda text-lg leading-none text-stroberi-tua transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-4 text-[0.95rem] leading-relaxed text-tinta-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </main>

      <Footer />
      <Nampan />
    </>
  );
}
