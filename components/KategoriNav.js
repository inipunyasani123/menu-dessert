'use client';

import { useEffect, useRef, useState } from 'react';
import { kategori } from '@/lib/data';
import Lintang from './Lintang';

/**
 * Bilah chip kategori: tiap chip berwarna pastel kategorinya, yang sedang dibaca berubah jenuh (scrollspy).
 * Lengket di bawah header pada semua lebar layar; di ponsel bisa digulir mendatar, di desktop rata tengah.
 */
export default function KategoriNav() {
  const [aktif, setAktif] = useState(kategori[0].id);
  const wadah = useRef(null);

  useEffect(() => {
    const bagian = kategori.map((k) => document.getElementById(`k-${k.id}`)).filter(Boolean);
    if (!bagian.length) return;
    const terlihat = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) terlihat.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        const pertama = bagian.find((b) => (terlihat.get(b.id) || 0) > 0);
        if (pertama) setAktif(pertama.id.slice(2));
      },
      { rootMargin: '-130px 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    );
    bagian.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = wadah.current?.querySelector(`[data-id="${aktif}"]`);
    const w = wadah.current;
    if (!el || !w || w.scrollWidth <= w.clientWidth) return;
    const kiri = el.offsetLeft - (w.clientWidth - el.offsetWidth) / 2;
    w.scrollTo({ left: kiri, behavior: 'smooth' });
  }, [aktif]);

  return (
    <nav aria-label="Kategori menu" className="sticky top-14 z-30 bg-krim/92 backdrop-blur sm:top-16">
      <ul ref={wadah} className="sembunyi-gulir flex gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:justify-center">
        {kategori.map((k) => (
          <li key={k.id} className="shrink-0">
            <a
              href={`#k-${k.id}`}
              data-id={k.id}
              aria-current={k.id === aktif ? 'true' : undefined}
              className="chip-kategori"
              style={{ '--chip': `var(--color-${k.warna}-muda)`, '--chip-on': `var(--color-${k.warna})` }}
            >
              {k.id === aktif && <Lintang className="h-3 w-3" />}
              {k.ringkas}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
