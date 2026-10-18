// Semua isi menu Lintang Manis. Dessert bar ini fiktif: nama, alamat, dan harganya rekaan untuk demo.
// "Lintang" = bintang dalam bahasa Jawa; bintang empat sudut dipakai sebagai tanda, bullet, dan meter manis.

export const site = {
  nama: 'Lintang Manis',
  slug: 'dessert',
  url: 'https://menu-dessert.pintuweb.id',
  judul: 'Menu Lintang Manis: Gelato, Croffle, Kue, Puding',
  deskripsi:
    'Menu digital dessert bar Lintang Manis Bandung: gelato, croffle, kue potong, puding, minuman manis, Rakit Bowl. Pindai QR di meja, pesan lewat WhatsApp.',
  tagline: 'Manisnya seterang lintang.',
  alamat: 'Jl. Cihampelas No. 88, Coblong, Bandung',
  kota: 'Bandung',
  // Jam buka dalam WIB. 0 = Minggu. Buka setiap hari.
  jam: [{ hari: [1, 2, 3, 4, 5, 6, 0], buka: '10.00', tutup: '22.00' }],
  pajak: 'Harga sudah termasuk pajak. Tidak ada biaya layanan.',
  edisi: 'Oktober 2026',
  // Item yang ditonjolkan di hero.
  mingguIni: { id: 'croffle-es-krim', alasan: 'Croffle hangat bertemu gelato pistasio yang baru diputar pagi ini. Renyah di luar, dingin di dalam.' },
};

export const KUNCI = {
  nampan: 'lintang.nampan.v1',
  meja: 'lintang.meja.v1',
  cara: 'lintang.cara.v1',
};

/** Warna pastel tiap kategori: chip jenuh, kartu tint, dan teks aksen (semua teks aksen lolos kontras ≥4,5:1 di atas tint). */
export const kategori = [
  { id: 'gelato', nama: 'Es Krim & Gelato', ringkas: 'Gelato', warna: 'stroberi', catatan: 'Diputar setiap pagi dalam porsi kecil. Rasa berganti mengikuti buah yang sedang bagus di pasar Lembang.' },
  { id: 'croffle', nama: 'Croffle & Waffle', ringkas: 'Croffle', warna: 'kuning', catatan: 'Adonan croissant dipanggang di cetakan waffle sampai renyah. Disajikan hangat, toppingnya kamu yang pilih.' },
  { id: 'kue', nama: 'Kue Potong', ringkas: 'Kue', warna: 'lavender', catatan: 'Dipanggang di dapur belakang, dipotong tebal. Yang habis hari ini, habis.' },
  { id: 'puding', nama: 'Puding & Jelly', ringkas: 'Puding', warna: 'pistasio', catatan: 'Dingin, licin, dan tidak terlalu manis. Cocok sesudah makan besar.' },
  { id: 'minuman', nama: 'Minuman Manis', ringkas: 'Minuman', warna: 'langit', catatan: 'Teman dessert: yang dingin menyegarkan, yang hangat menenangkan.' },
  { id: 'bowl', nama: 'Rakit Bowl Lintang', ringkas: 'Rakit Bowl', warna: 'persik', catatan: 'Pilih dasarnya, pilih sampai tiga topping, kami susun di depanmu.' },
];

// Rasa gelato beserta warnanya (ilustrasi scoop mengikuti rasa yang dipilih di lembar pilihan).
export const RASA = [
  { id: 'vanila', label: 'Vanila', warna: '#fff1c9' },
  { id: 'cokelat', label: 'Cokelat Dampit', warna: '#6b3f2a' },
  { id: 'stroberi', label: 'Stroberi', warna: '#ff9cb8' },
  { id: 'pistasio', label: 'Pistasio', warna: '#b9dba5' },
  { id: 'matcha', label: 'Matcha', warna: '#7fb069' },
  { id: 'mangga', label: 'Mangga', warna: '#ffc45c' },
  { id: 'kelapa', label: 'Kelapa', warna: '#f7f3ea' },
];
export const warnaRasa = (id) => RASA.find((r) => r.id === id)?.warna;

// Opsi yang dipakai ulang. `diam: true` = pilihan bawaan yang tidak perlu ditulis di ringkasan.
// Grup `multi: true` menerima beberapa pilihan (nilai berupa array id), paling banyak `maks`, paling sedikit `min`.
const rasaScoop = (n) => ({
  id: 'rasa',
  label: n === 1 ? 'Rasa' : `Rasa, pilih sampai ${n}`,
  keterangan: n === 1 ? 'Satu rasa untuk satu scoop.' : `Boleh ${n} rasa berbeda, boleh juga satu rasa saja (scoop dobel).`,
  multi: true,
  maks: n,
  min: 1,
  pilihan: RASA.map(({ id, label }) => ({ id, label })),
});
const RASA_SATU = { id: 'rasa', label: 'Rasa gelato', pilihan: RASA.map(({ id, label }) => ({ id, label })) };
const WADAH = { id: 'wadah', label: 'Wadah', pilihan: [{ id: 'cup', label: 'Cup kertas', diam: true }, { id: 'cone', label: 'Cone wafel', tambah: 3000 }] };
const TOPPING = {
  id: 'topping',
  label: 'Topping, pilih sampai 3',
  keterangan: 'Harga topping ditambahkan ke harga dasar.',
  multi: true,
  maks: 3,
  pilihan: [
    { id: 'karamel', label: 'Saus karamel', tambah: 3000 },
    { id: 'kacang', label: 'Kacang panggang', tambah: 3000 },
    { id: 'sprinkles', label: 'Sprinkles', tambah: 2000 },
    { id: 'buah', label: 'Buah segar', tambah: 5000 },
    { id: 'keju', label: 'Keju parut', tambah: 4000 },
  ],
};
const SAUS = { id: 'saus', label: 'Saus', pilihan: [{ id: 'cokelat', label: 'Saus cokelat', diam: true }, { id: 'karamel', label: 'Saus karamel' }, { id: 'stroberi', label: 'Saus stroberi' }] };
const UKURAN = { id: 'ukuran', label: 'Ukuran', pilihan: [{ id: 'reguler', label: 'Reguler 300 ml', diam: true }, { id: 'besar', label: 'Besar 450 ml', tambah: 5000 }] };
const SUHU_DINGIN = { id: 'suhu', label: 'Suhu', pilihan: [{ id: 'dingin', label: 'Dingin', diam: true }, { id: 'hangat', label: 'Hangat' }] };
const SUHU_HANGAT = { id: 'suhu', label: 'Suhu', pilihan: [{ id: 'hangat', label: 'Hangat', diam: true }, { id: 'dingin', label: 'Dingin' }] };
const SUHU_RUANG = { id: 'suhu', label: 'Suhu', pilihan: [{ id: 'hangat', label: 'Dihangatkan', diam: true }, { id: 'ruang', label: 'Suhu ruang' }] };
const AIR = { id: 'suhu', label: 'Suhu', pilihan: [{ id: 'dingin', label: 'Dingin', diam: true }, { id: 'ruang', label: 'Suhu ruang' }] };

// Rakit Bowl: satu dasar, sampai tiga topping (sudah termasuk harga), saus pilihan.
export const DASAR_BOWL = {
  id: 'dasar',
  label: 'Dasar bowl',
  pilihan: [
    { id: 'gelato', label: 'Gelato vanila', diam: true, warna: '#fff1c9' },
    { id: 'yogurt', label: 'Yogurt beku', warna: '#fbe9f1' },
    { id: 'puding', label: 'Puding susu', warna: '#ffe3b0' },
  ],
};
export const TOPPING_BOWL = {
  id: 'topping',
  label: 'Topping, pilih 1 sampai 3',
  keterangan: 'Tiga topping pertama sudah termasuk harga bowl.',
  multi: true,
  maks: 3,
  min: 1,
  pilihan: [
    { id: 'buah', label: 'Buah segar' },
    { id: 'kacang', label: 'Kacang panggang' },
    { id: 'sprinkles', label: 'Sprinkles' },
    { id: 'granola', label: 'Granola madu' },
    { id: 'oreo', label: 'Remah oreo' },
    { id: 'karamel', label: 'Saus karamel' },
    { id: 'keju', label: 'Keju parut' },
  ],
};

/**
 * Item menu. manis: 1–5 (meter manis). suhu: ['dingin'] | ['hangat'] | keduanya. nabati: tanpa susu & telur.
 * tag: favorit | baru. gambar: parameter ilustrasi SVG (components/Ilustrasi.js). habis: tidak bisa dipesan hari ini.
 */
export const menu = [
  // Es krim & gelato
  { id: 'gelato-1', kategori: 'gelato', nama: 'Gelato 1 Scoop', deskripsi: 'Satu scoop besar, pilih satu rasa. Cup kertas atau cone wafel.', harga: 18000, manis: 3, suhu: ['dingin'], gambar: { jenis: 'gelato', scoop: 1, warna: ['#ff9cb8'] }, opsi: [rasaScoop(1), WADAH] },
  { id: 'gelato-2', kategori: 'gelato', nama: 'Gelato 2 Scoop', deskripsi: 'Dua scoop, boleh dua rasa. Paling sering: cokelat Dampit dan pistasio.', harga: 30000, manis: 3, suhu: ['dingin'], tag: ['favorit'], gambar: { jenis: 'gelato', scoop: 2, warna: ['#6b3f2a', '#b9dba5'] }, opsi: [rasaScoop(2), WADAH] },
  { id: 'gelato-3', kategori: 'gelato', nama: 'Gelato 3 Scoop', deskripsi: 'Tiga scoop untuk berbagi, sampai tiga rasa berbeda.', harga: 40000, manis: 3, suhu: ['dingin'], gambar: { jenis: 'gelato', scoop: 3, warna: ['#fff1c9', '#ff9cb8', '#ffc45c'] }, opsi: [rasaScoop(3), WADAH] },
  { id: 'sorbet-mangga', kategori: 'gelato', nama: 'Sorbet Mangga', deskripsi: 'Mangga harum manis, air, sedikit jeruk nipis. Tanpa susu sama sekali.', harga: 20000, manis: 4, suhu: ['dingin'], nabati: true, tag: ['baru'], gambar: { jenis: 'gelato', scoop: 1, warna: ['#ffc45c'], cone: false }, opsi: [WADAH] },
  { id: 'es-krim-goreng', kategori: 'gelato', nama: 'Es Krim Goreng', deskripsi: 'Vanila dibalut roti, digoreng 40 detik. Panas di luar, beku di dalam.', harga: 28000, manis: 4, suhu: ['dingin', 'hangat'], gambar: { jenis: 'goreng' }, opsi: [SAUS] },
  { id: 'affogato', kategori: 'gelato', nama: 'Affogato Lintang', deskripsi: 'Satu scoop vanila diguyur espresso panas dari kedai sebelah. Makan cepat.', harga: 32000, manis: 2, suhu: ['dingin', 'hangat'], gambar: { jenis: 'affogato' }, opsi: [] },

  // Croffle & waffle
  { id: 'croffle-original', kategori: 'croffle', nama: 'Croffle Original', deskripsi: 'Croffle polos dengan taburan gula halus. Tambah topping kalau mau.', harga: 25000, manis: 2, suhu: ['hangat'], gambar: { jenis: 'croffle', topping: 'gula' }, opsi: [TOPPING] },
  { id: 'croffle-lotus', kategori: 'croffle', nama: 'Croffle Lotus', deskripsi: 'Selai biskuit karamel, remah biskuit, sedikit garam laut.', harga: 32000, manis: 5, suhu: ['hangat'], tag: ['baru'], gambar: { jenis: 'croffle', topping: 'lotus' }, opsi: [TOPPING] },
  { id: 'croffle-es-krim', kategori: 'croffle', nama: 'Croffle Es Krim', deskripsi: 'Croffle hangat dengan satu scoop gelato pilihanmu di atasnya.', harga: 35000, manis: 4, suhu: ['hangat', 'dingin'], tag: ['favorit'], gambar: { jenis: 'croffle', topping: 'eskrim', warna: '#b9dba5' }, opsi: [RASA_SATU, TOPPING] },
  { id: 'waffle-pisang', kategori: 'croffle', nama: 'Waffle Pisang Cokelat', deskripsi: 'Waffle tebal, pisang raja bakar, saus cokelat Dampit.', harga: 30000, manis: 4, suhu: ['hangat'], gambar: { jenis: 'croffle', topping: 'pisang' }, opsi: [TOPPING] },

  // Kue potong
  { id: 'lapis-legit', kategori: 'kue', nama: 'Lapis Legit', deskripsi: 'Delapan belas lapis, mentega Wijsman, rempah halus. Potongan tebal.', harga: 28000, manis: 4, suhu: ['hangat'], gambar: { jenis: 'kue', lapis: ['#e9b65c', '#8a5a2b', '#e9b65c', '#8a5a2b', '#e9b65c', '#8a5a2b'], atas: '#e9b65c' }, opsi: [] },
  { id: 'red-velvet', kategori: 'kue', nama: 'Red Velvet', deskripsi: 'Dua lapis merah lembut, krim keju tebal di tengah dan atas.', harga: 30000, manis: 4, suhu: ['dingin'], habis: true, gambar: { jenis: 'kue', lapis: ['#c43b4e', '#fff6f0', '#c43b4e'], atas: '#fff6f0' }, opsi: [] },
  { id: 'cheesecake-lemon', kategori: 'kue', nama: 'Cheesecake Lemon', deskripsi: 'Dasar biskuit, keju lembut, selai lemon buatan sendiri. Asam-manis.', harga: 32000, manis: 3, suhu: ['dingin'], tag: ['favorit'], gambar: { jenis: 'kue', lapis: ['#c9a06a', '#fff3dc', '#fff3dc'], atas: '#ffd66b' }, opsi: [] },
  { id: 'brownies', kategori: 'kue', nama: 'Brownies Panggang', deskripsi: 'Padat dan lengket, cokelat 70%. Enak dihangatkan 20 detik.', harga: 22000, manis: 4, suhu: ['hangat'], gambar: { jenis: 'kue', lapis: ['#4a2b1f', '#4a2b1f'], atas: '#3a2420', retak: true }, opsi: [SUHU_RUANG, TOPPING] },
  { id: 'bolu-pandan', kategori: 'kue', nama: 'Bolu Pandan', deskripsi: 'Pandan asli, santan, tekstur ringan seperti kapas.', harga: 20000, manis: 3, suhu: ['hangat'], gambar: { jenis: 'kue', lapis: ['#9ccf8a', '#9ccf8a', '#9ccf8a'], atas: '#b9dba5' }, opsi: [] },

  // Puding & jelly
  { id: 'puding-cokelat', kategori: 'puding', nama: 'Puding Cokelat', deskripsi: 'Puding susu cokelat dengan vla vanila di atasnya.', harga: 18000, manis: 4, suhu: ['dingin'], gambar: { jenis: 'puding', warna: '#6b3f2a', atas: '#fff1c9' }, opsi: [] },
  { id: 'puding-mangga', kategori: 'puding', nama: 'Puding Mangga', deskripsi: 'Potongan mangga di dalam puding susu, saus mangga di atas.', harga: 20000, manis: 4, suhu: ['dingin'], gambar: { jenis: 'puding', warna: '#ffc45c', atas: '#ffe3b0', buah: '#ff9a3c' }, opsi: [] },
  { id: 'jelly-leci', kategori: 'puding', nama: 'Jelly Leci', deskripsi: 'Jelly bening rasa leci dengan buah leci utuh. Tanpa susu.', harga: 15000, manis: 3, suhu: ['dingin'], nabati: true, gambar: { jenis: 'puding', warna: '#fbe9f1', atas: 'transparent', buah: '#ffffff', bening: true }, opsi: [] },
  { id: 'panna-cotta', kategori: 'puding', nama: 'Panna Cotta Stroberi', deskripsi: 'Krim vanila yang lembut, selai stroberi segar di atasnya.', harga: 25000, manis: 3, suhu: ['dingin'], tag: ['favorit'], gambar: { jenis: 'puding', warna: '#fff6f0', atas: '#ff7aa2', buah: '#e0335f' }, opsi: [] },

  // Minuman manis
  { id: 'es-cokelat', kategori: 'minuman', nama: 'Es Cokelat', deskripsi: 'Cokelat Dampit 60%, susu segar, es. Bisa dibuat hangat.', harga: 25000, manis: 4, suhu: ['dingin', 'hangat'], tag: ['favorit'], gambar: { jenis: 'minuman', warna: '#8a5a3b', busa: '#fff1c9' }, opsi: [SUHU_DINGIN, UKURAN] },
  { id: 'milkshake-stroberi', kategori: 'minuman', nama: 'Milkshake Stroberi', deskripsi: 'Stroberi Lembang, gelato vanila, susu. Kental, pakai sedotan besar.', harga: 28000, manis: 5, suhu: ['dingin'], gambar: { jenis: 'minuman', warna: '#ff9cb8', busa: '#ffffff', ceri: true }, opsi: [UKURAN] },
  { id: 'es-teh-leci', kategori: 'minuman', nama: 'Es Teh Leci', deskripsi: 'Teh hitam dingin, sirup leci buatan sendiri, buah leci. Tanpa susu.', harga: 18000, manis: 3, suhu: ['dingin'], nabati: true, gambar: { jenis: 'minuman', warna: '#e7b26a', bening: true }, opsi: [UKURAN] },
  { id: 'susu-jahe', kategori: 'minuman', nama: 'Susu Jahe Hangat', deskripsi: 'Jahe emprit bakar, susu segar, gula aren. Untuk malam yang dingin di Bandung.', harga: 15000, manis: 2, suhu: ['hangat'], tag: ['baru'], gambar: { jenis: 'minuman', warna: '#f0d7b0', hangat: true }, opsi: [SUHU_HANGAT] },
  { id: 'air', kategori: 'minuman', nama: 'Air Mineral 600 ml', deskripsi: 'Dingin atau suhu ruang.', harga: 6000, manis: 1, suhu: ['dingin'], nabati: true, gambar: { jenis: 'minuman', warna: '#dcf1ff', bening: true, polos: true }, opsi: [AIR] },

  // Rakit Bowl Lintang
  { id: 'bowl-kecil', kategori: 'bowl', nama: 'Bowl Kecil', deskripsi: 'Satu dasar, sampai tiga topping. Pas untuk satu orang.', harga: 30000, manis: 3, suhu: ['dingin'], gambar: { jenis: 'bowl', ukuran: 'kecil', warna: '#fff1c9' }, opsi: [DASAR_BOWL, TOPPING_BOWL, { ...SAUS, pilihan: [{ id: 'tanpa', label: 'Tanpa saus', diam: true }, ...SAUS.pilihan.map((p) => ({ ...p, diam: undefined }))] }] },
  { id: 'bowl-besar', kategori: 'bowl', nama: 'Bowl Besar', deskripsi: 'Dasar dobel, sampai tiga topping. Cukup untuk berdua.', harga: 42000, manis: 3, suhu: ['dingin'], tag: ['favorit'], gambar: { jenis: 'bowl', ukuran: 'besar', warna: '#fff1c9' }, opsi: [DASAR_BOWL, TOPPING_BOWL, { ...SAUS, pilihan: [{ id: 'tanpa', label: 'Tanpa saus', diam: true }, ...SAUS.pilihan.map((p) => ({ ...p, diam: undefined }))] }] },
];

export const faq = [
  { q: 'Bagaimana cara memesan dari menu ini?', a: 'Tambah item ke nampan, lalu tekan "Pesan via WhatsApp". Pesanan tersusun otomatis bersama nomor mejamu. Di demo ini WhatsApp terbuka tanpa nomor tujuan.' },
  { q: 'Ada dessert tanpa susu?', a: 'Ada empat: Sorbet Mangga, Jelly Leci, Es Teh Leci, dan Air Mineral. Pakai saringan "Tanpa susu". Gelato lainnya memakai susu sapi.' },
  { q: 'Bisa dibawa pulang tanpa meleleh?', a: 'Bisa. Pilih "Bungkus (dibekukan)" di nampan: gelato dan bowl dikemas dalam cup bertutup dengan es kering kecil, tahan sekitar 45 menit perjalanan.' },
  { q: 'Apa itu meter manis?', a: 'Deretan bintang 1 sampai 5 di tiap item. Satu bintang berarti hampir tidak manis (Air Mineral, Susu Jahe), lima bintang berarti sangat manis (Croffle Lotus, Milkshake Stroberi).' },
];

export const alergen = [
  'Gelato, puding susu, croffle, dan kue memakai susu sapi. Sorbet dan jelly tidak.',
  'Croffle, waffle, lapis legit, red velvet, bolu, dan brownies mengandung telur dan gluten.',
  'Topping kacang panggang dan gelato pistasio mengandung kacang-kacangan; alat sajinya dipakai bersama.',
  'Semua menu tanpa alkohol dan tanpa babi.',
];

export const cariItem = (id) => menu.find((m) => m.id === id);
export const itemKategori = (id) => menu.filter((m) => m.kategori === id);
export const warnaKategori = (id) => kategori.find((k) => k.id === id)?.warna ?? 'stroberi';
