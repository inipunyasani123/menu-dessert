/**
 * Ilustrasi SVG parametrik per item (tanpa foto). Semua memakai viewBox 0 0 120 120 dan dipilih lewat `gambar.jenis`:
 * gelato (jumlah scoop + warna rasa), goreng, affogato, croffle (topping), kue (lapisan), puding (gelas), minuman (gelas/mug), bowl.
 */
const TINTA = '#3a2420';
const sudut = (i, n) => 60 + (i - (n - 1) / 2) * 24;

function Sprinkle({ x, y, r = 30, c }) {
  return <rect x={x} y={y} width="7" height="2.4" rx="1.2" fill={c} transform={`rotate(${r} ${x} ${y})`} />;
}
const WARNA_SPRINKLE = ['#ff7aa2', '#ffd66b', '#5b3fa8', '#2f6b3a', '#bfe6ff'];
function Taburan({ cx = 60, cy = 40, lebar = 30, n = 6 }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <Sprinkle key={i} x={cx - lebar / 2 + (i * lebar) / (n - 1) + (i % 2) * 3} y={cy + ((i * 7) % 9) - 4} r={(i * 47) % 180} c={WARNA_SPRINKLE[i % WARNA_SPRINKLE.length]} />
      ))}
    </g>
  );
}

/** Cup kertas atau cone wafel dengan 1–3 scoop; warna tiap scoop mengikuti rasa. */
export function Gelato({ scoop = 1, warna = ['#ff9cb8'], cone = true }) {
  const n = Math.min(3, Math.max(1, scoop));
  const w = Array.from({ length: n }, (_, i) => warna[i] ?? warna[warna.length - 1] ?? '#ff9cb8');
  // scoop ditumpuk dari bawah ke atas, sedikit bergeser supaya hidup
  const posisi = n === 1 ? [[60, 58]] : n === 2 ? [[60, 62], [60, 38]] : [[60, 66], [60, 44], [60, 24]];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      {cone ? (
        <>
          <path d="M38 74 L60 116 L82 74 Z" fill="#e9b65c" />
          <path d="M44 80 L76 80 M47 88 L73 88 M51 96 L69 96 M55 104 L65 104 M50 74 L62 108 M70 74 L58 108" stroke="#b9843a" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M34 74 Q60 70 86 74 L80 112 Q60 116 40 112 Z" fill="#fff" stroke={TINTA} strokeWidth="2.5" />
          <path d="M44 90 L76 90" stroke="#ff7aa2" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {posisi.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="19" fill={w[i]} stroke={TINTA} strokeWidth="2.5" />
          <path d={`M${x - 9} ${y + 12} q9 7 18 0`} stroke={TINTA} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
          <circle cx={x - 7} cy={y - 7} r="3" fill="#fff" opacity="0.8" />
        </g>
      ))}
      {n > 1 && <Taburan cx={60} cy={posisi[n - 1][1] - 6} lebar={26} n={5} />}
    </svg>
  );
}

/** Es krim goreng: bola roti keemasan dengan remah, scoop vanila tampak dari belahan. */
export function Goreng() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="100" rx="40" ry="7" fill="#fff" stroke={TINTA} strokeWidth="2.5" />
      <circle cx="60" cy="62" r="32" fill="#e9b65c" stroke={TINTA} strokeWidth="2.5" />
      <path d="M60 30 A32 32 0 0 1 92 62 L60 62 Z" fill="#fff1c9" stroke={TINTA} strokeWidth="2.5" />
      <path d="M62 36 Q78 40 86 56" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
      {[[36, 50], [44, 76], [58, 86], [74, 84], [40, 62], [52, 44]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill="#b9843a" />)}
      <path d="M40 90 q10 8 24 4" stroke="#6b3f2a" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Affogato: gelas pendek, scoop vanila, espresso dituang dari atas. */
export function Affogato() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M34 50 L40 108 Q60 112 80 108 L86 50 Z" fill="#fff" stroke={TINTA} strokeWidth="2.5" />
      <path d="M37 78 L42 106 Q60 110 78 106 L83 78 Q60 86 37 78 Z" fill="#6b3f2a" />
      <circle cx="60" cy="62" r="20" fill="#fff1c9" stroke={TINTA} strokeWidth="2.5" />
      <path d="M60 14 Q64 30 62 46" stroke="#6b3f2a" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M62 46 q-10 6 -10 10 q4 4 12 2 q6 -4 2 -12 Z" fill="#6b3f2a" />
      <path d="M50 20 c-3 -5 3 -8 0 -13 M70 24 c-3 -5 3 -8 0 -13" stroke="#8c746c" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Croffle: bentuk croissant dengan pola kisi waffle; topping: gula | lotus | eskrim | pisang. */
export function Croffle({ topping = 'gula', warna = '#b9dba5' }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="104" rx="42" ry="6" fill="#fff" stroke={TINTA} strokeWidth="2.5" />
      <path d="M22 86 Q20 60 44 54 Q60 50 76 54 Q100 60 98 86 Q80 92 60 92 Q40 92 22 86 Z" fill="#e9b65c" stroke={TINTA} strokeWidth="2.5" />
      <g stroke="#b9843a" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M36 60 L34 86 M48 56 L48 90 M60 54 L60 91 M72 56 L72 90 M84 60 L86 86" />
        <path d="M26 72 L94 72 M30 82 L90 82 M34 62 L86 62" />
      </g>
      {topping === 'gula' && [[40, 58], [58, 52], [78, 58], [50, 66], [68, 64], [86, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" fill="#fff" />)}
      {topping === 'lotus' && (
        <>
          <path d="M30 68 Q60 48 90 68 Q80 76 60 74 Q40 76 30 68 Z" fill="#c47a2c" />
          <path d="M44 62 q8 10 18 2 q8 -8 20 4" stroke="#8a4a14" strokeWidth="3" fill="none" strokeLinecap="round" />
          {[[50, 58], [66, 56], [74, 66]].map(([x, y], i) => <rect key={i} x={x} y={y} width="6" height="4" rx="1" fill="#8a4a14" />)}
        </>
      )}
      {topping === 'eskrim' && (
        <>
          <circle cx="60" cy="42" r="18" fill={warna} stroke={TINTA} strokeWidth="2.5" />
          <path d="M51 52 q9 8 18 0" stroke={TINTA} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
          <circle cx="54" cy="36" r="3" fill="#fff" opacity="0.85" />
          <path d="M46 56 q6 8 12 0 q6 8 12 0" stroke="#6b3f2a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <Taburan cx={60} cy={24} lebar={22} n={4} />
        </>
      )}
      {topping === 'pisang' && (
        <>
          {[[40, 58], [60, 54], [80, 58]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="9" ry="6" fill="#ffe9a8" stroke="#c9a040" strokeWidth="2" />
          ))}
          <path d="M34 50 q12 20 26 8 q14 -12 26 8" stroke="#6b3f2a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/** Potongan kue berlapis: `lapis` dari bawah ke atas, `atas` = krim/glasir; `retak` untuk brownies. */
export function Kue({ lapis = ['#e9b65c', '#8a5a2b', '#e9b65c'], atas = '#fff', retak = false }) {
  const tinggi = 56;
  const t = tinggi / lapis.length;
  const dasarY = 100;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="104" rx="44" ry="7" fill="#fff" stroke={TINTA} strokeWidth="2.5" />
      {/* sisi depan potongan (trapesium), lapisan diurut dari bawah */}
      {lapis.map((c, i) => {
        const y1 = dasarY - t * (i + 1);
        const y2 = dasarY - t * i;
        return <path key={i} d={`M28 ${y2} L28 ${y1} L92 ${y1} L92 ${y2} Z`} fill={c} />;
      })}
      {/* sisi miring (kedalaman) */}
      <path d={`M92 ${dasarY} L92 ${dasarY - tinggi} L104 ${dasarY - tinggi - 10} L104 ${dasarY - 10} Z`} fill={TINTA} opacity="0.18" />
      {/* bidang atas */}
      <path d={`M28 ${dasarY - tinggi} L40 ${dasarY - tinggi - 10} L104 ${dasarY - tinggi - 10} L92 ${dasarY - tinggi} Z`} fill={atas} />
      <path d={`M28 ${dasarY} L28 ${dasarY - tinggi} L40 ${dasarY - tinggi - 10} L104 ${dasarY - tinggi - 10} L104 ${dasarY - 10} L92 ${dasarY} Z`} fill="none" stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={`M92 ${dasarY} L92 ${dasarY - tinggi} L28 ${dasarY - tinggi}`} fill="none" stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
      {retak ? (
        <path d="M44 38 l8 -3 l6 4 l9 -5 l8 3 l10 -4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
      ) : (
        <>
          <circle cx="70" cy={dasarY - tinggi - 12} r="7" fill="#fff" stroke={TINTA} strokeWidth="2" />
          <circle cx="70" cy={dasarY - tinggi - 15} r="3.5" fill="#e0335f" />
        </>
      )}
    </svg>
  );
}

/** Gelas puding: isi `warna`, lapisan `atas`, titik `buah`, `bening` untuk jelly. */
export function Puding({ warna = '#6b3f2a', atas = '#fff1c9', buah, bening = false }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M32 30 L40 108 Q60 112 80 108 L88 30 Z" fill="#fff" stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M35 56 L41 104 Q60 108 79 104 L85 56 Q60 62 35 56 Z" fill={warna} opacity={bening ? 0.7 : 1} />
      {atas !== 'transparent' && <path d="M35 56 Q60 44 85 56 Q60 66 35 56 Z" fill={atas} />}
      {buah && (
        <>
          <circle cx="52" cy="72" r="5" fill={buah} stroke={TINTA} strokeWidth={bening ? 1.5 : 0} opacity="0.95" />
          <circle cx="68" cy="86" r="4" fill={buah} stroke={TINTA} strokeWidth={bening ? 1.5 : 0} opacity="0.95" />
          <circle cx="62" cy="50" r="5.5" fill={buah} stroke={TINTA} strokeWidth="2" />
        </>
      )}
      <path d="M40 40 L44 92" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M30 30 L90 30" stroke={TINTA} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M94 42 q10 -2 10 8 q0 10 -12 10" stroke={TINTA} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Minuman: gelas tinggi dengan sedotan (dingin) atau mug dengan uap (hangat). */
export function Minuman({ warna = '#8a5a3b', busa, bening = false, ceri = false, hangat = false, polos = false }) {
  if (hangat) {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <path d="M30 46 L34 104 Q60 110 86 104 L90 46 Z" fill="#fff" stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M33 52 L37 100 Q60 106 83 100 L87 52 Q60 58 33 52 Z" fill={warna} />
        <path d="M90 58 q16 -4 16 10 q0 16 -18 18" stroke={TINTA} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M46 36 c-3 -6 3 -9 0 -16 M60 32 c-3 -6 3 -9 0 -16 M74 36 c-3 -6 3 -9 0 -16" stroke="#8c746c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M44 72 q8 6 16 0 q8 6 16 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M36 22 L42 108 Q60 112 78 108 L84 22 Z" fill="#fff" stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 44 L43 104 Q60 108 77 104 L82 44 Q60 50 38 44 Z" fill={warna} opacity={bening ? 0.55 : 1} />
      {busa && <path d="M38 44 Q60 32 82 44 Q60 54 38 44 Z" fill={busa} />}
      {bening && !polos && [[52, 64], [66, 80], [58, 94]].map(([x, y], i) => <rect key={i} x={x - 6} y={y - 6} width="12" height="12" rx="3" fill="#fff" stroke={TINTA} strokeWidth="1.5" opacity="0.9" />)}
      {!polos && <path d="M66 30 L78 4" stroke="#ff7aa2" strokeWidth="6" strokeLinecap="round" />}
      {!polos && <path d="M66 30 L78 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />}
      {ceri && (
        <>
          <circle cx="52" cy="34" r="6" fill="#e0335f" stroke={TINTA} strokeWidth="2" />
          <path d="M52 28 q2 -8 8 -10" stroke={TINTA} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      {polos && <path d="M44 56 L76 56" stroke="#bfe6ff" strokeWidth="4" strokeLinecap="round" />}
      <path d="M44 34 L48 96" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

/** Bowl rakitan: mangkuk dengan dasar berwarna, topping ditampilkan sesuai jumlah yang dipilih. */
export function Bowl({ ukuran = 'kecil', warna = '#fff1c9', topping = [], saus }) {
  const besar = ukuran === 'besar';
  const r = besar ? 44 : 38;
  const WARNA_TOPPING = { buah: '#e0335f', kacang: '#b9843a', sprinkles: null, granola: '#d5a24f', oreo: '#3a2420', karamel: '#c47a2c', keju: '#ffd66b' };
  const daftar = topping.length ? topping : ['buah', 'kacang', 'sprinkles'];
  const n = daftar.length;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="106" rx={r + 4} ry="6" fill="#fff" stroke={TINTA} strokeWidth="2.5" />
      <path d={`M${60 - r} 62 Q60 ${62 + r * 1.3} ${60 + r} 62 Z`} fill="#fff" stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={`M${60 - r + 4} 62 Q60 ${62 + r * 1.1} ${60 + r - 4} 62 Z`} fill="#ffc9b0" opacity="0.6" />
      {/* gundukan dasar */}
      <path d={`M${60 - r} 62 Q${60 - r / 2} ${62 - r * 0.8} 60 ${62 - r * 0.7} Q${60 + r / 2} ${62 - r * 0.85} ${60 + r} 62 Z`} fill={warna} stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
      {besar && <path d={`M${60 - r * 0.55} 50 Q60 ${50 - r * 0.6} ${60 + r * 0.55} 50`} fill={warna} stroke={TINTA} strokeWidth="2.5" />}
      {saus && saus !== 'tanpa' && <path d={`M${60 - r * 0.5} 48 q8 10 16 2 q8 -8 16 4 q6 6 10 -2`} stroke={{ cokelat: '#6b3f2a', karamel: '#c47a2c', stroberi: '#e0335f' }[saus] || '#6b3f2a'} strokeWidth="3.5" fill="none" strokeLinecap="round" />}
      {daftar.map((t, i) => {
        const x = sudut(i, n);
        const y = 44 - (i % 2) * 6;
        if (t === 'sprinkles') return <Taburan key={t} cx={x} cy={y} lebar={16} n={3} />;
        if (t === 'buah') return <circle key={t} cx={x} cy={y} r="6" fill={WARNA_TOPPING.buah} stroke={TINTA} strokeWidth="2" />;
        if (t === 'oreo') return <circle key={t} cx={x} cy={y} r="6" fill={WARNA_TOPPING.oreo} stroke="#fff" strokeWidth="1.5" />;
        if (t === 'keju') return <path key={t} d={`M${x - 7} ${y - 3} l4 4 l4 -5 l4 4 l3 -5`} stroke={WARNA_TOPPING.keju} strokeWidth="3" fill="none" strokeLinecap="round" />;
        if (t === 'karamel') return <path key={t} d={`M${x - 8} ${y} q4 6 8 0 q4 6 8 0`} stroke={WARNA_TOPPING.karamel} strokeWidth="3" fill="none" strokeLinecap="round" />;
        return <ellipse key={t} cx={x} cy={y} rx="6" ry="4" fill={WARNA_TOPPING[t] || '#b9843a'} stroke={TINTA} strokeWidth="1.5" />;
      })}
      <path d={`M${60 - r + 8} 70 q6 10 18 8`} stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

/** Pemilih ilustrasi berdasarkan `gambar.jenis`; `ubahan` menimpa parameter (mis. warna rasa dari pilihan tamu). */
export default function Ilustrasi({ gambar, ubahan = {}, className = '' }) {
  const p = { ...gambar, ...ubahan };
  let isi = null;
  switch (p.jenis) {
    case 'gelato': isi = <Gelato scoop={p.scoop} warna={p.warna} cone={p.cone} />; break;
    case 'goreng': isi = <Goreng />; break;
    case 'affogato': isi = <Affogato />; break;
    case 'croffle': isi = <Croffle topping={p.topping} warna={p.warna} />; break;
    case 'kue': isi = <Kue lapis={p.lapis} atas={p.atas} retak={p.retak} />; break;
    case 'puding': isi = <Puding warna={p.warna} atas={p.atas} buah={p.buah} bening={p.bening} />; break;
    case 'minuman': isi = <Minuman warna={p.warna} busa={p.busa} bening={p.bening} ceri={p.ceri} hangat={p.hangat} polos={p.polos} />; break;
    case 'bowl': isi = <Bowl ukuran={p.ukuran} warna={p.warna} topping={p.topping} saus={p.saus} />; break;
    default: isi = null;
  }
  return <div className={`[&>svg]:h-full [&>svg]:w-full ${className}`}>{isi}</div>;
}
