/** Bintang empat sudut: tanda Lintang Manis, bullet, dan satuan meter manis. Warna lewat currentColor. */
export const JALUR_LINTANG = 'M12 1.5c.9 6.2 4.3 9.6 10.5 10.5-6.2.9-9.6 4.3-10.5 10.5C11.1 16.3 7.7 12.9 1.5 12 7.7 11.1 11.1 7.7 12 1.5Z';

export default function Lintang({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...p}>
      <path d={JALUR_LINTANG} fill="currentColor" />
    </svg>
  );
}

/** Tanda lengkap: lingkaran krim dengan bintang stroberi dan kilau kecil. */
export function Tanda({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="var(--color-tinta)" />
      <path d={JALUR_LINTANG} transform="translate(12 12) scale(1.65)" fill="var(--color-stroberi)" />
      <path d={JALUR_LINTANG} transform="translate(40 10) scale(0.5)" fill="var(--color-kuning)" />
    </svg>
  );
}

const LABEL_MANIS = ['', 'Hampir tidak manis', 'Sedikit manis', 'Manis sedang', 'Manis', 'Sangat manis'];

/** Meter manis 1–5 bintang. */
export function MeterManis({ n = 3, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-[2px] ${className}`} title={`Meter manis ${n} dari 5: ${LABEL_MANIS[n]}`}>
      <span className="sr-only">Meter manis {n} dari 5, {LABEL_MANIS[n].toLowerCase()}</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <Lintang key={i} className={`h-3 w-3 ${i <= n ? 'text-stroberi-tua' : 'text-tinta/20'}`} />
      ))}
    </span>
  );
}
