const dasar = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Svg = ({ children, className = '', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...dasar} {...p}>{children}</svg>
);

export const Plus = (p) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>;
export const Minus = (p) => <Svg {...p}><path d="M5 12h14" /></Svg>;
export const Tutup = (p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const Cari = (p) => <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>;
export const Centang = (p) => <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>;
export const Panah = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const Nampan = (p) => <Svg {...p}><path d="M4 11h16l-1.5 8h-13L4 11Z" /><path d="M7 11a5 5 0 0 1 10 0" /><path d="M12 4v2" /></Svg>;
export const Sampah = (p) => <Svg {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></Svg>;
export const Salin = (p) => <Svg {...p}><rect x="9" y="9" width="11" height="11" rx="3" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></Svg>;
export const Pindai = (p) => <Svg {...p}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16" /></Svg>;
export const Meja = (p) => <Svg {...p}><path d="M3 8h18M6 8v10M18 8v10M6 13h12" /></Svg>;
export const Jam = (p) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>;
export const Daun = (p) => <Svg {...p}><path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14Z" /><path d="M5 19 13 11" /></Svg>;

/** Kepingan salju: tag Dingin */
export const Dingin = (p) => <Svg {...p}><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /><path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2M5 10.5l1-3-3-1M19 13.5l-1 3 3 1M5 13.5l1 3-3 1M19 10.5l-1-3 3-1" /></Svg>;
/** Uap: tag Hangat */
export const Hangat = (p) => <Svg {...p}><path d="M7 15c-1.5-1.8-1.5-3.6 0-5.4S8.5 6 7 4M12 15c-1.5-1.8-1.5-3.6 0-5.4S13.5 6 12 4M17 15c-1.5-1.8-1.5-3.6 0-5.4S18.5 6 17 4" /><path d="M5 19h14" /></Svg>;
