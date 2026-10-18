'use client';

import { pilihItem } from './Meja';

/** Tombol di komponen server (hero) yang membuka lembar pilihan item lewat event `lintang:pilih`. */
export default function TombolPilih({ id, className = '', children, ...p }) {
  return (
    <button type="button" onClick={() => pilihItem(id)} className={className} {...p}>
      {children}
    </button>
  );
}
