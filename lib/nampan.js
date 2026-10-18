'use client';

// Nampan (pesanan sementara) disimpan di localStorage browser pengunjung. Tidak ada server: demo ini
// menyusun pesanan lalu meneruskannya sebagai teks WhatsApp.
//
// Pilihan sebuah item berbentuk { [idGrup]: idPilihan } untuk grup tunggal (radio), atau
// { [idGrup]: [idPilihan, ...] } untuk grup `multi: true` yang dibatasi `maks` dan `min` (mis. 3 topping, 2 rasa).
import { useCallback, useSyncExternalStore } from 'react';
import { KUNCI, cariItem } from './data';

const KOSONG = Object.freeze([]);
const cadangan = new Map();
const cache = new Map();
const pendengar = new Set();

function ambil(kunci) {
  try {
    const v = window.localStorage.getItem(kunci);
    if (v !== null) return v;
  } catch {
    /* penyimpanan diblokir: pakai cadangan memori */
  }
  return cadangan.has(kunci) ? cadangan.get(kunci) : null;
}

function simpan(kunci, mentah) {
  cadangan.set(kunci, mentah);
  try {
    if (mentah === null) window.localStorage.removeItem(kunci);
    else window.localStorage.setItem(kunci, mentah);
  } catch {
    /* tetap jalan dari cadangan */
  }
  pendengar.forEach((fn) => fn());
}

function baca(kunci, awal) {
  const mentah = typeof window === 'undefined' ? null : ambil(kunci);
  const c = cache.get(kunci);
  if (c && c.mentah === mentah) return c.nilai;
  let nilai = awal;
  if (mentah) {
    try {
      nilai = JSON.parse(mentah);
    } catch {
      nilai = awal;
    }
  }
  cache.set(kunci, { mentah, nilai });
  return nilai;
}

function langgan(fn) {
  pendengar.add(fn);
  const onStorage = (e) => {
    if (!e.key || Object.values(KUNCI).includes(e.key)) fn();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    pendengar.delete(fn);
    window.removeEventListener('storage', onStorage);
  };
}

/** true setelah komponen terpasang di browser (hindari selisih render server/klien). */
export function useTerpasang() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/* ---------- Pilihan: grup tunggal & grup multi-pilih ---------- */

/** Nilai pilihan awal sebuah item: grup tunggal = pilihan pertama, grup multi = kosong. */
export function pilihanAwal(item) {
  const awal = {};
  for (const o of item?.opsi || []) awal[o.id] = o.multi ? [] : o.pilihan[0].id;
  return awal;
}

/** Daftar pilihan yang terpilih dalam satu grup (selalu array, urut sesuai daftar grup). */
export function terpilih(grup, nilai) {
  const ids = Array.isArray(nilai) ? nilai : nilai != null ? [nilai] : [];
  return grup.pilihan.filter((p) => ids.includes(p.id));
}

/** Toggle satu id di grup multi; menolak melebihi `maks`. Mengembalikan array baru. */
export function toggleMulti(grup, nilai, id) {
  const ada = Array.isArray(nilai) ? nilai : [];
  if (ada.includes(id)) return ada.filter((x) => x !== id);
  if (grup.maks && ada.length >= grup.maks) return ada;
  return [...ada, id];
}

/** Tambahan harga dari semua pilihan (tunggal maupun multi). */
export function hitungTambahan(item, pilihan = {}) {
  return (item?.opsi || []).reduce((n, o) => n + terpilih(o, pilihan[o.id]).reduce((m, p) => m + (p.tambah || 0), 0), 0);
}

/** Grup yang belum memenuhi `min` (mis. gelato tanpa rasa). Kosong = pilihan lengkap. */
export function grupKurang(item, pilihan = {}) {
  return (item?.opsi || []).filter((o) => o.multi && o.min && terpilih(o, pilihan[o.id]).length < o.min);
}

/** Kunci baris nampan: item + kombinasi pilihan (array diurutkan), supaya pilihan beda jadi baris beda. */
export const kunciBaris = (id, pilihan = {}) =>
  `${id}|${Object.keys(pilihan)
    .sort()
    .map((k) => {
      const v = pilihan[k];
      return `${k}:${Array.isArray(v) ? [...v].sort().join('+') : v}`;
    })
    .join(',')}`;

/** Harga satu baris: harga dasar + tambahan tiap pilihan. */
export function hargaBaris(baris) {
  const item = cariItem(baris.id);
  if (!item) return 0;
  return item.harga + hitungTambahan(item, baris.pilihan);
}

/** Label pilihan untuk ditampilkan: "Cokelat Dampit + Pistasio · Cone wafel · Saus karamel, Kacang panggang". */
export function labelPilihan(baris) {
  const item = cariItem(baris.id);
  if (!item) return '';
  return (item.opsi || [])
    .map((o) => {
      const dipilih = terpilih(o, baris.pilihan?.[o.id]).filter((p) => !p.diam);
      if (!dipilih.length) return '';
      return dipilih.map((p) => p.label).join(o.id === 'rasa' ? ' + ' : ', ');
    })
    .filter(Boolean)
    .join(' · ');
}

/* ---------- Store ---------- */

export function useNampan() {
  const baris = useSyncExternalStore(langgan, () => baca(KUNCI.nampan, KOSONG), () => KOSONG);
  const tulis = useCallback((next) => simpan(KUNCI.nampan, next.length ? JSON.stringify(next) : null), []);

  const tambah = useCallback(
    (id, pilihan = {}, qty = 1, catatan = '') => {
      const sekarang = baca(KUNCI.nampan, KOSONG);
      const kunci = kunciBaris(id, pilihan);
      const ada = sekarang.find((b) => b.kunci === kunci && (b.catatan || '') === (catatan || ''));
      if (ada) tulis(sekarang.map((b) => (b === ada ? { ...b, qty: Math.min(20, b.qty + qty) } : b)));
      else tulis([...sekarang, { kunci, id, pilihan, qty, catatan }]);
    },
    [tulis],
  );

  const ubahQty = useCallback(
    (kunci, catatan, qty) => {
      const sekarang = baca(KUNCI.nampan, KOSONG);
      const cocok = (b) => b.kunci === kunci && (b.catatan || '') === (catatan || '');
      if (qty <= 0) tulis(sekarang.filter((b) => !cocok(b)));
      else tulis(sekarang.map((b) => (cocok(b) ? { ...b, qty: Math.min(20, qty) } : b)));
    },
    [tulis],
  );

  const kosongkan = useCallback(() => tulis([]), [tulis]);

  const jumlah = baris.reduce((n, b) => n + b.qty, 0);
  const total = baris.reduce((n, b) => n + hargaBaris(b) * b.qty, 0);
  return { baris, jumlah, total, tambah, ubahQty, kosongkan };
}

/** Nomor meja (dari ?meja= di tautan QR, atau diketik tamu) dan cara makan. */
export function useMeja() {
  const meja = useSyncExternalStore(langgan, () => baca(KUNCI.meja, ''), () => '');
  const setMeja = useCallback((m) => simpan(KUNCI.meja, m ? JSON.stringify(String(m).slice(0, 6)) : null), []);
  return [meja, setMeja];
}

/** 'sini' = makan di sini, 'bungkus' = bungkus (dibekukan). */
export function useCaraMakan() {
  const cara = useSyncExternalStore(langgan, () => baca(KUNCI.cara, 'sini'), () => 'sini');
  const setCara = useCallback((c) => simpan(KUNCI.cara, JSON.stringify(c)), []);
  return [cara, setCara];
}
