# Lintang Manis — Menu digital (QR menu)

Demo menu digital untuk dessert bar: satu halaman ringan yang dibuka dari kartu QR di meja. Tamu memindai, memilih rasa dan topping, merakit bowl sendiri, lalu mengirim pesanannya lewat WhatsApp bersama nomor meja. Lintang Manis adalah dessert bar fiktif di Bandung ("lintang" = bintang dalam bahasa Jawa).

**Demo live:** https://menu-dessert.pintuweb.id — coba dengan nomor meja: https://menu-dessert.pintuweb.id/?meja=3

> Nama usaha, alamat, dan harga semuanya rekaan. Tidak ada data yang dikirim ke server: nampan dan nomor meja disimpan di `localStorage` browser pengunjung, dan tombol WhatsApp membuka WhatsApp tanpa nomor tujuan.

## Yang diperlihatkan

- **Nomor meja dari QR.** Tautan `?meja=3` dibaca sekali lalu disimpan; lencana meja di header dan pesan WhatsApp ikut menyebutnya. Nomor bisa diketik sendiri di nampan.
- **Chip kategori berwarna dengan scrollspy.** Tiap chip memakai pastel kategorinya; yang sedang dibaca berubah jenuh dan diberi bintang.
- **Opsi multi-pilih berbatas.** Gelato 2 dan 3 scoop memilih rasa sampai sejumlah scoop, croffle memilih sampai 3 topping berbayar, Rakit Bowl memilih 1 sampai 3 topping termasuk harga. Grup yang penuh mengunci pilihan lain; grup wajib (`min`) menahan tombol tambah. Nilai disimpan sebagai array di `lib/nampan.js`, jadi kombinasi topping berbeda menjadi baris nampan berbeda.
- **Ilustrasi ikut pilihan.** Di lembar pilihan, scoop gelato berganti warna sesuai rasa, cup berganti cone, dan bowl memperlihatkan dasar, topping, serta saus yang dipilih.
- **Meter manis 1–5 bintang** di setiap item, tag Dingin/Hangat/Tanpa susu, saringan Favorit, Dingin, Hangat, Tanpa susu, plus pencarian.
- **Nampan ke WhatsApp.** Jumlah per baris, makan di sini atau bungkus (dibekukan), atas nama, catatan, lalu pesan tersusun otomatis (`wa.me/?text=`) atau disalin.
- **Jam buka WIB.** Status buka/tutup dihitung di perangkat tamu dalam WIB dan diperbarui tiap menit.
- **Kode QR sungguhan.** Dibuat saat build dengan paket `qrcode` sebagai SVG inline, dipasang di kartu meja bergelombang yang siap dicetak.
- **SEO menu.** JSON-LD `IceCreamShop` + `Menu` → `MenuSection` → `MenuItem` dengan harga dan ketersediaan, plus `FAQPage`.

## Identitas visual

- **Huruf:** Lilita One (judul, huruf display bulat) dan Figtree (teks, variabel), lewat `next/font`.
- **Warna:** krim `#fff7ee`, tinta cokelat `#3a2420`, dan pastel per kategori: stroberi `#ff7aa2`, kuning `#ffd66b`, lavender `#ddd0ff`, pistasio `#bfe3b4`, langit `#bfe6ff`, persik `#ffc9b0`; tiap pastel punya tint untuk kartu dan versi tua untuk teks aksen (kontras ≥4,5:1).
- **Motif:** tepi bergelombang (scallop) di band kategori, kartu unggulan, bagian QR, dan footer; taburan sprinkles sebagai tekstur hero, 404, dan footer; bintang empat sudut sebagai tanda, bullet, dan meter manis; kartu bersudut 24 px dengan bayangan lembut berlapis; label harga bulat.
- **Ilustrasi:** SVG parametrik per item (cup/cone gelato dengan jumlah scoop dan warna rasa, croffle dengan topping, potongan kue berlapis, gelas puding, gelas atau mug minuman, bowl rakitan).

## Struktur

| Berkas | Isi |
| --- | --- |
| `lib/data.js` | Profil usaha, jam buka, 6 kategori, 26 item, rasa gelato, opsi bowl, FAQ, alergen |
| `lib/format.js` | Rupiah, status buka WIB |
| `lib/nampan.js` | Nampan, nomor meja, cara makan di `localStorage` (`lintang.*.v1`); pilihan tunggal dan multi-pilih berbatas `maks`/`min` |
| `components/Menu.js` | Cari, saring, band kategori, bento kartu, bagian Rakit Bowl, lembar pilihan |
| `components/Ilustrasi.js` | Ilustrasi SVG parametrik per jenis item |
| `components/Nampan.js` | Bilah lengket, lembar nampan, pesan WhatsApp |
| `components/Lintang.js` | Bintang empat sudut, tanda, meter manis |
| `components/QR.js` | Kode QR SVG dari `qrcode` |

Satu rute (`/`), halaman 404 bergaya, `sitemap.xml`, `robots.txt`, Open Graph, dan ikon SVG.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000/?meja=3.

---

Dibuat oleh [PintuWeb](https://www.pintuweb.id), jasa pembuatan website.
