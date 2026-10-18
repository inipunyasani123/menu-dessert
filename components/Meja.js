'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMeja, useTerpasang } from '@/lib/nampan';
import { Meja as IkonMeja } from './Ikon';

/** Membaca ?meja= dari tautan QR dan menyimpannya; dibungkus Suspense karena useSearchParams. */
function BacaTautan() {
  const params = useSearchParams();
  const [, setMeja] = useMeja();
  useEffect(() => {
    const m = params.get('meja');
    if (m && /^[0-9A-Za-z-]{1,6}$/.test(m)) setMeja(m.toUpperCase());
  }, [params, setMeja]);
  return null;
}

export const bukaNampan = () => window.dispatchEvent(new CustomEvent('lintang:nampan'));
/** Membuka lembar pilihan sebuah item dari luar komponen Menu (mis. kartu "Lintang minggu ini"). */
export const pilihItem = (id) => window.dispatchEvent(new CustomEvent('lintang:pilih', { detail: id }));

/** Lencana nomor meja di header. Menekannya membuka nampan, tempat nomor meja bisa diubah. */
export default function Meja({ className = '' }) {
  const [meja] = useMeja();
  const terpasang = useTerpasang();
  const ada = terpasang && meja;
  return (
    <>
      <Suspense fallback={null}>
        <BacaTautan />
      </Suspense>
      <button
        type="button"
        onClick={bukaNampan}
        className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-2 px-3.5 font-display text-[0.95rem] tracking-wide transition ${ada ? 'border-tinta bg-tinta text-krim' : 'border-garis bg-white text-tinta-2 hover:border-tinta'} ${className}`}
        aria-label={ada ? `Meja ${meja}, buka nampan untuk mengubah` : 'Isi nomor meja'}
      >
        <IkonMeja className="h-4 w-4" />
        {ada ? `Meja ${meja}` : 'Nomor meja'}
      </button>
    </>
  );
}
