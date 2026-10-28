'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { kategori, menu, cariItem, warnaRasa, DASAR_BOWL } from '@/lib/data';
import { rupiah } from '@/lib/format';
import { useNampan, pilihanAwal, terpilih, toggleMulti, hitungTambahan, grupKurang } from '@/lib/nampan';
import { Plus, Minus, Cari, Tutup, Centang, Dingin, Hangat, Daun } from './Ikon';
import Lintang, { MeterManis } from './Lintang';
import Ilustrasi from './Ilustrasi';
import FotoMenu, { adaFoto } from './FotoMenu';

const SARING = [
  { id: 'favorit', label: 'Favorit', ikon: Lintang, uji: (m) => m.tag?.includes('favorit') },
  { id: 'dingin', label: 'Dingin', ikon: Dingin, uji: (m) => m.suhu?.includes('dingin') },
  { id: 'hangat', label: 'Hangat', ikon: Hangat, uji: (m) => m.suhu?.includes('hangat') },
  { id: 'nabati', label: 'Tanpa susu', ikon: Daun, uji: (m) => m.nabati },
];

const warnaVar = (k, akhiran = '') => `var(--color-${k.warna}${akhiran})`;

/** Tag Dingin / Hangat / Tanpa susu dengan ikon. */
function TagSuhu({ m, kelas = '' }) {
  return (
    <span className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-bold ${kelas}`}>
      {m.suhu?.includes('dingin') && <span className="inline-flex items-center gap-0.5 text-langit-tua"><Dingin className="h-3.5 w-3.5" />Dingin</span>}
      {m.suhu?.includes('hangat') && <span className="inline-flex items-center gap-0.5 text-persik-tua"><Hangat className="h-3.5 w-3.5" />Hangat</span>}
      {m.nabati && <span className="inline-flex items-center gap-0.5 text-pistasio-tua"><Daun className="h-3.5 w-3.5" />Tanpa susu</span>}
    </span>
  );
}

function Tag({ t }) {
  const gaya = { favorit: 'bg-tinta text-krim', baru: 'bg-white text-stroberi-tua' };
  const teks = { favorit: 'Favorit', baru: 'Baru' };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-display text-[0.68rem] uppercase tracking-wider ${gaya[t]}`}>
      {t === 'favorit' && <Lintang className="h-2.5 w-2.5 text-kuning" />}
      {teks[t]}
    </span>
  );
}

/** Kartu bento: pastel sesuai kategori, ilustrasi di atas, nama, meter manis, label harga bulat. Favorit melebar 2 kolom. */
function Kartu({ m, k, onPilih }) {
  const lebar = m.tag?.includes('favorit');
  return (
    <li
      className={`relative flex flex-col gap-2 rounded-[var(--radius-kartu)] p-3 shadow-[var(--shadow-lembut)] transition hover:shadow-[var(--shadow-angkat)] ${lebar ? 'lebar sm:flex-row sm:items-stretch sm:gap-4 sm:p-4' : ''} ${m.habis ? 'saturate-50' : ''}`}
      style={{ background: warnaVar(k, '-muda') }}
    >
      {(m.tag?.length || m.habis) && (
        <div className="absolute left-3 top-3 z-10 flex gap-1">
          {m.habis ? <span className="rounded-full bg-tinta px-2 py-0.5 font-display text-[0.68rem] uppercase tracking-wider text-krim">Habis</span> : m.tag.map((t) => <Tag key={t} t={t} />)}
        </div>
      )}
      {adaFoto(m.id) ? (
        <FotoMenu id={m.id} sizes={lebar ? '(min-width: 640px) 160px, 90vw' : '(min-width: 640px) 240px, 45vw'} className={`rounded-[18px] ${lebar ? 'h-44 sm:h-auto sm:min-h-40 sm:w-40 sm:shrink-0' : 'aspect-square'} ${m.habis ? 'opacity-60 grayscale' : ''}`} />
      ) : (
        <div className={`grid place-items-center rounded-[18px] bg-white/70 ${lebar ? 'h-36 sm:h-auto sm:w-40 sm:shrink-0' : 'h-28'} ${m.habis ? 'opacity-60' : ''}`}>
          <Ilustrasi gambar={m.gambar} className={lebar ? 'h-32 w-32 sm:h-36 sm:w-36' : 'h-24 w-24'} />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[1.08rem] leading-[1.1] sm:text-[1.2rem]">{m.nama}</h3>
        <p className={`mt-1 text-[0.8rem] leading-snug text-tinta-2 ${lebar ? '' : 'line-clamp-2'}`}>{m.deskripsi}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <MeterManis n={m.manis} />
          <TagSuhu m={m} />
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="harga">{rupiah(m.harga)}</span>
          <button
            type="button"
            onClick={() => onPilih(m)}
            disabled={m.habis}
            aria-label={m.habis ? `${m.nama} habis hari ini` : `Tambah ${m.nama}${m.opsi?.length ? ', pilih opsi' : ''}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tinta text-krim shadow-[var(--shadow-lembut)] transition hover:bg-tinta-2 disabled:cursor-not-allowed disabled:bg-tinta/30"
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </li>
  );
}

/** Bagian khusus Rakit Bowl Lintang: langkah rakit + dua ukuran bowl. */
function BagianBowl({ k, daftar, onPilih }) {
  return (
    <div className="rounded-[var(--radius-kartu)] p-4 shadow-[var(--shadow-lembut)] sm:p-6" style={{ background: warnaVar(k, '-muda') }}>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {[
              ['Pilih dasar', 'Gelato vanila, yogurt beku, atau puding susu.'],
              ['Pilih topping', 'Satu sampai tiga, sudah termasuk harga.'],
              ['Pilih saus', 'Cokelat, karamel, stroberi, atau tanpa saus.'],
            ].map(([j, d], i) => (
              <li key={j} className="rounded-[18px] bg-white/70 p-3">
                <p className="flex items-center gap-2 font-display text-[1.05rem]"><span className="grid h-7 w-7 place-items-center rounded-full bg-persik font-display text-sm">{i + 1}</span>{j}</p>
                <p className="mt-1 text-[0.82rem] leading-snug text-tinta-2">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[0.82rem] text-tinta-2">Dasar: {DASAR_BOWL.pilihan.map((p) => p.label.toLowerCase()).join(', ')}. Pilihannya dibuat di lembar saat kamu menekan Rakit.</p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {daftar.map((m) => (
            <li key={m.id} className={`relative flex flex-col rounded-[var(--radius-kartu)] bg-white p-3 shadow-[var(--shadow-lembut)] ${m.habis ? 'saturate-50' : ''}`}>
              {m.tag?.includes('favorit') && <div className="absolute left-3 top-3 z-10"><Tag t="favorit" /></div>}
              <FotoMenu id={m.id} sizes="(min-width: 640px) 240px, 45vw" className="mb-2 aspect-square rounded-[14px]">
                <div className="grid h-32 place-items-center">
                  <Ilustrasi gambar={m.gambar} className="h-28 w-28" />
                </div>
              </FotoMenu>
              <h3 className="text-[1.15rem]">{m.nama}</h3>
              <p className="mt-1 text-[0.8rem] leading-snug text-tinta-2">{m.deskripsi}</p>
              <div className="mt-1.5"><MeterManis n={m.manis} /></div>
              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                <span className="harga bg-persik-muda">{rupiah(m.harga)}</span>
                <button type="button" onClick={() => onPilih(m)} disabled={m.habis} aria-label={`Rakit ${m.nama}, pilih dasar dan topping`} className="tombol tombol-tinta min-h-11 px-4 text-[0.95rem]">Rakit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Ubahan ilustrasi di lembar pilihan: scoop mengikuti rasa, cone mengikuti wadah, bowl mengikuti dasar/topping/saus. */
function ubahanGambar(item, pilihan) {
  const g = item.gambar || {};
  const u = {};
  if (g.jenis === 'gelato') {
    const rasa = Array.isArray(pilihan.rasa) ? pilihan.rasa : pilihan.rasa ? [pilihan.rasa] : [];
    if (rasa.length) {
      const w = rasa.map(warnaRasa);
      u.warna = Array.from({ length: g.scoop || 1 }, (_, i) => w[i % w.length]);
    }
    if (pilihan.wadah) u.cone = pilihan.wadah === 'cone';
  }
  if (g.jenis === 'croffle' && g.topping === 'eskrim' && pilihan.rasa) u.warna = warnaRasa(pilihan.rasa);
  if (g.jenis === 'bowl') {
    const dasar = DASAR_BOWL.pilihan.find((p) => p.id === pilihan.dasar);
    if (dasar) u.warna = dasar.warna;
    if (Array.isArray(pilihan.topping)) u.topping = pilihan.topping;
    if (pilihan.saus) u.saus = pilihan.saus;
  }
  return u;
}

/** Lembar pilihan: grup tunggal (radio) dan grup multi-pilih berbatas maks (checkbox), catatan, jumlah, tambah ke nampan. */
function LembarPilihan({ item, onTutup, onTambah }) {
  const ref = useRef(null);
  const [pilihan, setPilihan] = useState({});
  const [qty, setQty] = useState(1);
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (!item) return;
    setPilihan(pilihanAwal(item));
    setQty(1);
    setCatatan('');
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, [item]);

  if (!item) return null;
  const k = kategori.find((x) => x.id === item.kategori);
  const harga = (item.harga + hitungTambahan(item, pilihan)) * qty;
  const kurang = grupKurang(item, pilihan);

  return (
    <dialog ref={ref} className="lembar" onClose={onTutup} aria-labelledby="judul-pilihan">
      <form
        method="dialog"
        className="flex max-h-[92dvh] flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          if (kurang.length) return;
          onTambah(item, pilihan, qty, catatan.trim());
          ref.current?.close();
        }}
      >
        <div className="relative rounded-t-[28px] px-5 pb-4 pt-5" style={{ background: warnaVar(k, '-muda') }}>
          <button type="button" onClick={() => ref.current?.close()} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white shadow-[var(--shadow-lembut)]" aria-label="Tutup">
            <Tutup className="h-5 w-5" />
          </button>
          <div className="flex items-end gap-4">
            <FotoMenu id={item.id} sizes="112px" className="h-28 w-28 shrink-0 rounded-[22px]">
              <div className="grid h-28 w-28 shrink-0 place-items-center rounded-[22px] bg-white/80">
                <Ilustrasi gambar={item.gambar} ubahan={ubahanGambar(item, pilihan)} className="h-24 w-24" />
              </div>
            </FotoMenu>
            <div className="min-w-0 pb-1 pe-10">
              <p className="label-manis" style={{ color: warnaVar(k, '-tua') }}>{k?.nama}</p>
              <h2 id="judul-pilihan" className="mt-1 text-[1.6rem] leading-none">{item.nama}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1"><MeterManis n={item.manis} /><TagSuhu m={item} /></div>
            </div>
          </div>
          <p className="mt-3 text-sm text-tinta-2">{item.deskripsi}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {(item.opsi || []).map((o) => {
            const dipilih = terpilih(o, pilihan[o.id]);
            const penuh = o.multi && o.maks && dipilih.length >= o.maks;
            return (
              <fieldset key={o.id} className="mb-5">
                <legend className="mb-2 flex w-full items-baseline justify-between gap-3">
                  <span className="label-manis">{o.label}</span>
                  {o.multi && <span className="text-xs font-semibold text-tinta-3" aria-live="polite">{dipilih.length}/{o.maks} dipilih</span>}
                </legend>
                {o.keterangan && <p className="mb-2 text-xs text-tinta-3">{o.keterangan}</p>}
                <div className={`grid gap-2 ${o.pilihan.length > 4 ? 'sm:grid-cols-2' : ''}`} role={o.multi ? 'group' : 'radiogroup'} aria-label={o.label}>
                  {o.pilihan.map((p) => {
                    const on = o.multi ? (pilihan[o.id] || []).includes(p.id) : pilihan[o.id] === p.id;
                    const mati = o.multi && penuh && !on;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role={o.multi ? 'checkbox' : 'radio'}
                        aria-checked={on}
                        disabled={mati}
                        onClick={() => setPilihan((s) => ({ ...s, [o.id]: o.multi ? toggleMulti(o, s[o.id], p.id) : p.id }))}
                        className="pil-opsi"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className={`grid h-5 w-5 place-items-center border-2 ${o.multi ? 'rounded-[6px]' : 'rounded-full'} ${on ? 'border-tinta bg-tinta text-krim' : 'border-tinta/30'}`} aria-hidden="true">
                            {on && <Centang className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                          <span className="flex items-center gap-2">
                            {o.id === 'rasa' && <span className="h-3.5 w-3.5 rounded-full border border-tinta/30" style={{ background: warnaRasa(p.id) }} aria-hidden="true" />}
                            {p.label}
                          </span>
                        </span>
                        {p.tambah ? <span className="text-sm font-semibold text-tinta-2">+{rupiah(p.tambah)}</span> : null}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
          <label className="block">
            <span className="label-manis mb-2 block">Catatan untuk dapur</span>
            <input value={catatan} onChange={(e) => setCatatan(e.target.value)} maxLength={80} placeholder="Mis. saus dipisah, tanpa kacang" className="isian" />
          </label>
        </div>

        <div className="border-t border-garis bg-krim-2 px-5 py-4">
          {kurang.length > 0 && <p className="mb-2 text-sm font-semibold text-stroberi-tua" role="status">Pilih {kurang.map((g) => g.label.split(',')[0].toLowerCase()).join(' dan ')} dulu, ya.</p>}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border-2 border-garis bg-white" role="group" aria-label="Jumlah">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center rounded-full" aria-label="Kurangi"><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center font-display" aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid h-11 w-11 place-items-center rounded-full" aria-label="Tambah"><Plus className="h-4 w-4" /></button>
            </div>
            <button type="submit" aria-disabled={kurang.length > 0} className={`tombol tombol-tinta min-h-12 flex-1 justify-between px-5 ${kurang.length ? 'opacity-50' : ''}`}>
              <span className="whitespace-nowrap">Masuk nampan</span>
              <span>{rupiah(harga)}</span>
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}

export default function Menu() {
  const [cari, setCari] = useState('');
  const [saring, setSaring] = useState(null);
  const [dipilih, setDipilih] = useState(null);
  const [toast, setToast] = useState('');
  const { tambah } = useNampan();

  const q = cari.trim().toLowerCase();
  const lolos = useMemo(() => {
    const uji = saring ? SARING.find((s) => s.id === saring).uji : () => true;
    return menu.filter((m) => uji(m) && (!q || `${m.nama} ${m.deskripsi}`.toLowerCase().includes(q)));
  }, [q, saring]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  // Kartu "Lintang minggu ini" di hero membuka lembar pilihan lewat event.
  useEffect(() => {
    const buka = (e) => {
      const m = cariItem(e.detail);
      if (!m || m.habis) return;
      if (m.opsi?.length) setDipilih(m);
      else {
        tambah(m.id, {}, 1, '');
        setToast(`${m.nama} masuk nampan`);
      }
    };
    window.addEventListener('lintang:pilih', buka);
    return () => window.removeEventListener('lintang:pilih', buka);
  }, [tambah]);

  const pilih = (m) => {
    if (m.opsi?.length) setDipilih(m);
    else {
      tambah(m.id, {}, 1, '');
      setToast(`${m.nama} masuk nampan`);
    }
  };
  const tambahDariLembar = (item, pilihan, qty, catatan) => {
    tambah(item.id, pilihan, qty, catatan);
    setToast(`${qty}× ${item.nama} masuk nampan`);
  };

  const adaSaring = q || saring;

  return (
    <section id="isi" aria-labelledby="judul-menu" className="wadah min-w-0 scroll-mt-32 pt-6">
      <h2 id="judul-menu" className="sr-only">Daftar menu</h2>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Cari menu</span>
          <Cari className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-tinta-3" />
          <input type="search" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari: pistasio, croffle, puding…" className="isian min-h-11 rounded-full py-2.5 pl-11 pr-4" />
        </label>
        <div className="sembunyi-gulir flex gap-2 overflow-x-auto" role="group" aria-label="Saring">
          {SARING.map((s) => {
            const I = s.ikon;
            return (
              <button key={s.id} type="button" aria-pressed={saring === s.id} onClick={() => setSaring(saring === s.id ? null : s.id)} className="chip">
                <I className="h-3.5 w-3.5" />{s.label}
              </button>
            );
          })}
        </div>
      </div>

      {adaSaring && (
        <p className="mt-3 text-sm text-tinta-2" role="status">
          {lolos.length ? `${lolos.length} item cocok.` : 'Tidak ada yang cocok.'}{' '}
          <button type="button" onClick={() => { setCari(''); setSaring(null); }} className="font-semibold text-stroberi-tua underline underline-offset-4">Tampilkan semua</button>
        </p>
      )}

      {kategori.map((k) => {
        const daftar = lolos.filter((m) => m.kategori === k.id);
        if (adaSaring && !daftar.length) return null;
        return (
          <section key={k.id} id={`k-${k.id}`} className="scroll-mt-32 pt-10" aria-labelledby={`judul-${k.id}`}>
            <div className="gelombang mt-3 rounded-b-[var(--radius-kartu)] px-5 pb-4 pt-3 sm:px-7" style={{ background: warnaVar(k), '--gel': warnaVar(k) }}>
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                <h2 id={`judul-${k.id}`} className="text-[2rem] sm:text-[2.5rem]">{k.nama}</h2>
                <p className="font-display text-sm tracking-wide text-tinta/90">{daftar.length} pilihan</p>
              </div>
              <p className="mt-1.5 max-w-2xl text-[0.9rem] leading-snug text-tinta/90">{k.catatan}</p>
            </div>
            <div className="mt-4">
              {k.id === 'bowl' ? (
                <BagianBowl k={k} daftar={daftar} onPilih={pilih} />
              ) : (
                <ul className="bento">
                  {daftar.map((m) => <Kartu key={m.id} m={m} k={k} onPilih={pilih} />)}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      <LembarPilihan item={dipilih} onTutup={() => setDipilih(null)} onTambah={tambahDariLembar} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
        {toast && (
          <p className="muncul inline-flex items-center gap-2 rounded-full bg-tinta px-4 py-2.5 font-display text-sm tracking-wide text-krim shadow-[var(--shadow-angkat)]">
            <Lintang className="h-3.5 w-3.5 text-kuning" />{toast}
          </p>
        )}
      </div>
    </section>
  );
}
