# GEMINI.md — Panduan Pengembangan Website Company Profile Joki Akun PUBG

Dokumen ini menjadi panduan utama bagi AI agent dan developer dalam merancang, membangun, dan memverifikasi website *company profile* untuk layanan joki akun & *push rank* PUBG (**SANGAR** / sesuaikan dengan nama brand yang diminta).

---

## 1. Tujuan & Ruang Lingkup Proyek

- **Tujuan**: Membangun website *company profile* yang sederhana, modern, cepat, responsif, dan meyakinkan untuk layanan jasa joki akun PUBG (fokus utama pasar Indonesia / PUBG Mobile, serta dapat disesuaikan untuk PUBG PC).
- **Target Audiens**: Pemain PUBG Indonesia yang mencari jasa *push rank* (Crown, Ace, Ace Master, Ace Dominator, hingga Conqueror), perbaikan statistik K/D Ratio, atau penyelesaian misi Royale Pass dengan jaminan keamanan akun.
- **Bahasa Konten**: Bahasa Indonesia yang natural, lugas, profesional, dan menggunakan istilah komunitas PUBG Indonesia yang akurat (*Push Rank*, *Tier*, *K/D Ratio*, *Play Pure / No Cheat*, *Mabar / Gendong*, *Server Asia/KRJP*).
- **Prinsip Utama**: Sederhana tetapi berkelas (*less, but better*). Hindari fitur *bloat* atau kerumitan ala dashboard SaaS; fokus pada kejelasan layanan, transparansi harga, keamanan akun, dan kemudahan pemesanan.

---

## 2. Tech Stack & Struktur Direktori

Gunakan arsitektur web statis (*zero-build*) agar ringan, cepat dimuat, dan mudah di-deploy ke GitHub Pages, Netlify, atau Vercel—kecuali pengguna secara eksplisit meminta framework seperti React, Vite, atau Next.js.

```text
/
├── GEMINI.md          # Panduan proyek ini
├── README.md          # Dokumentasi singkat & cara menjalankan proyek
├── index.html         # Struktur halaman utama (HTML5 semantik)
├── styles.css         # Styling utama (Vanilla CSS + CSS Custom Properties)
├── script.js          # Logika interaktif (kalkulator, filter, FAQ, order WA)
└── assets/            # Aset gambar & ikon lokal (tanpa broken placeholder)
    ├── hero-tactical.jpg
    ├── squad-team.jpg
    └── conqueror-badge.jpg
```

### Aturan Teknologi
1. **HTML5 Semantik**: Gunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>`. Hanya boleh ada **satu `<h1>`** per halaman dengan hierarki `<h2>` dan `<h3>` yang berurutan.
2. **Vanilla CSS**: Gunakan CSS Custom Properties pada `:root` untuk token warna, spasi, dan tipografi. Jangan gunakan TailwindCSS atau library UI eksternal kecuali diminta pengguna.
3. **Vanilla JavaScript (ES6+)**: Pisahkan seluruh logika ke `script.js` dengan event listener yang bersih dan bebas error di console browser.

---

## 3. Sistem Desain & Estetika Visual

Website harus memiliki nuansa **Tactical Battleground** yang tegas, dewasa, dan premium—bukan tampilan generik atau norak.

### Palet Warna (Disarankan)
- **Background Utama**: Deep Charcoal / Gunmetal Olive (`#111311`)
- **Surface / Kartu**: Dark Slate (`#181B18` dan `#202420`)
- **Border Halus**: `rgba(242, 239, 233, 0.10)`
- **Teks Utama**: Warm Alabaster (`#F2EFE9`)
- **Teks Sekunder / Muted**: Muted Stone (`#A3A199`)
- **Aksen Utama (CTA & Sorotan)**: Tactical Flare Amber / Desert Gold (`#E8A838`, hover `#F2B84B`)
- **Aksen Sekunder**: Military Olive (`#5C6B4D`)
- **Status Terverifikasi / Aman**: Tactical Green (`#48A868`)

### Tipografi
- **Heading**: Font tegas bernuansa taktis/modern (misalnya `Chakra Petch`, `Barlow Condensed`, atau `Space Grotesk`) dengan `letter-spacing: -0.02em` pada judul besar dan `letter-spacing: 0.12em` pada label *eyebrow* huruf kapital.
- **Body**: Font bersih dengan keterbacaan tinggi (`Plus Jakarta Sans` atau `Inter`), ukuran dasar `16px` (`14px` minimum untuk teks pendukung), dan `line-height: 1.6`.
- Sediakan *fallback* font sistem yang aman apabila koneksi Google Fonts terbatas.

### Aturan Ketat Anti-Cliché (Wajib Dihindari)
- **Dilarang** memakai palet ungu/violet di atas latar gelap (*purple-on-dark*).
- **Dilarang** membuat tampilan *dashboard* admin atau kotak *bento* penuh ikon yang tidak relevan.
- **Dilarang** menempatkan *pill badge* dengan titik animasi berkedip (*pulsing dot*) tepat di atas `<h1>`.
- **Dilarang** memakai teks gradient warna-warni pada kata kunci headline.
- **Dilarang** memakai latar pola garis grid (*grid-line background*) atau *particle mesh*.
- **Dilarang** memakai *glowing neon border* di sekeliling kartu atau menumpuk kartu bersarang terlalu dalam (*over-nested cards*).
- **Dilarang** memakai gambar *placeholder* kosong atau gambar yang tidak sesuai tema PUBG/tactical esports.

---

## 4. Struktur Halaman & Konten Wajib

Susun halaman *single-page company profile* secara berurutan agar alur baca pengunjung mengalir menuju konversi pemesanan:

### 1. Navbar (`<header>`)
- Logo brand + wordmark (misal **SANGAR**) dengan ikon SVG taktis sederhana.
- Menu anchor ringkas: `Tentang`, `Layanan`, `Kalkulator`, `Cara Kerja`, `Testimoni`, `FAQ`.
- Satu tombol CTA utama: `Pesan Joki` (mengarah ke `#kontak` atau `#kalkulator`).
- Mendukung menu drawer responsif (*hamburger menu*) pada layar mobile.

### 2. Hero Section
- Label *eyebrow* polos dengan tracking rapi (contoh: `LAYANAN PUSH RANK PROFESIONAL • SEJAK 2021`).
- Headline `<h1>` yang kuat, ringkas, dan jelas (menekankan kecepatan, keamanan, dan 100% manual tanpa cheat).
- Subheadline singkat yang menjelaskan cakupan layanan (Crown, Ace, Conqueror, K/D terjaga).
- 2 tombol aksi: CTA utama (`Hitung Estimasi Biaya`) & CTA sekunder (`Konsultasi WhatsApp`).
- 3 metrik ringkas kepercayaan di bagian bawah/samping hero (contoh: `4.200+ Akun Selesai`, `100% Pure Manual`, `Laporan Harian`).

### 3. Tentang Kami (`#tentang`)
- Penjelasan singkat mengenai identitas tim joki (berpengalaman di tier Ace Dominator–Conqueror, mengutamakan keamanan akun dan etika bermain).
- Gambar pendukung tim esports/tactical studio yang realistis.
- 4 pilar komitmen bernomor (`01`–`04`):
  1. **100% Play Pure (Anti-Banned)**: Murni skill manual tanpa cheat, script, config, atau emulator ilegal.
  2. **Privasi & Keamanan Login**: Login hanya pada jam yang disepakati dan logout permanen setelah selesai.
  3. **Update Progres Harian**: Pengiriman screenshot statistik K/D, poin tier, dan riwayat match setiap hari.
  4. **Garansi Target Tercapai**: Transparansi estimasi durasi serta komitmen penyelesaian sesuai kesepakatan.

### 4. Layanan & Paket Harga (`#layanan`)
Sediakan filter kategori sederhana (`Semua`, `Push Tier`, `Target Spesifik`) dan tampilkan paket secara jelas:
- **Push Rank Reguler (Per Tier)**: Paket bertahap dari Gold/Platinum/Diamond menuju Crown, Ace, Ace Master, hingga Ace Dominator.
- **Paket Conqueror (Season Push)**: Pendampingan intensif menuju Top 500 Server Asia/KRJP (slot terbatas, pengerjaan terstruktur).
- **Layanan Tambahan**: Joki K/D Ratio, penyelesaian misi Royale Pass (RP), serta opsi **Mabar / Gendong** (tanpa perlu serah login akun).
- Setiap kartu paket wajib memiliki tombol **`Pilih Paket`** yang otomatis mengisi data ke bagian Kalkulator / Form Order.

### 5. Kalkulator Estimasi Biaya & Durasi (`#kalkulator`)
Fitur utilitas utama untuk transparansi harga:
- **Input**:
  - Tier Awal (misal: Gold V sampai Ace Master)
  - Tier Tujuan (misal: Platinum I sampai Conqueror)
  - Mode Permainan (Squad TPP / Duo TPP / Solo TPP / FPP)
  - Opsi Tambahan (Mabar Tanpa Login / Request Jam Main / Prioritas Ekspres)
- **Validasi**: Cegah atau beri pesan peringatan yang jelas jika `Tier Tujuan` lebih rendah atau sama dengan `Tier Awal`.
- **Output Real-time**: Total estimasi biaya dalam Rupiah (`Rp`), estimasi waktu pengerjaan (hari), dan tombol **`Lanjutkan ke Form Order`** untuk memindahkan ringkasan pilihan ke formulir kontak.

### 6. Alur / Cara Kerja (`#proses`)
Tampilkan 4 langkah berurutan yang mudah dipahami:
1. **Konsultasi & Pilih Paket** — Tentukan rute tier, server, dan sistem pengerjaan (login atau mabar).
2. **Pembayaran Aman** — Pembayaran via QRIS, Transfer Bank (BCA/Mandiri), atau E-Wallet (Dana/GoPay/OVO).
3. **Proses Pengerjaan** — Tim bermain sesuai jadwal dengan pembaruan progres rutin.
4. **Serah Terima & Verifikasi** — Pemilik mengecek hasil akhir, tim logout penuh, pemilik mengganti password.

### 7. Testimoni Klien (`#testimoni`)
- Tampilkan 3–6 testimoni ringkas yang realistis (nama/inisial IGN, rute tier seperti `Diamond II → Ace Dominator`, server, dan ulasan singkat yang autentik).

### 8. Pertanyaan Umum / FAQ (`#faq`)
Gunakan komponen *accordion* yang aksesibel untuk menjawab keraguan calon pelanggan:
- Apakah proses joki aman dari *banned*?
- Apakah pemilik akun boleh login saat proses berlangsung?
- Berapa lama estimasi push ke Ace atau Conqueror?
- Apakah tersedia opsi pembayaran DP / bertahap?
- Apakah bisa pesan jasa mabar/gendong tanpa memberikan email/password?

### 9. Kontak, Form Pemesanan & Footer (`#kontak`)
- **Informasi Kontak**: Jam operasional (misal `08.00 – 23.59 WIB`), kontak WhatsApp admin, kanal sosial media, dan daftar metode pembayaran yang diterima.
- **Form Order Cepat**:
  - Input: Nama / Nickname (IGN), Nomor WhatsApp, Server/Mode, Ringkasan Paket/Tier, Catatan / Jadwal Login.
  - Aksi Submit: Validasi input sisi klien, tampilkan pratinjau ringkasan order, dan sediakan tombol kirim langsung ke WhatsApp (`https://wa.me/<nomor>?text=...` dengan `encodeURIComponent`) serta tombol salin pesan order.
- **Footer**: Tautan cepat navigasi, hak cipta, dan **disclaimer wajib** bahwa layanan bersifat independen dan tidak berafiliasi resmi dengan Krafton, Tencent Games, maupun PUBG Mobile.

---

## 5. Standar SEO, Aksesibilitas, & Responsivitas

- **SEO**:
  - Sertakan `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<title>` yang deskriptif, dan `<meta name="description">` yang relevan dengan kata kunci *joki akun PUBG*.
  - Gunakan atribut `lang="id"` pada tag `<html>`.
- **Aksesibilitas (A11y)**:
  - Semua elemen gambar wajib memiliki atribut `alt` yang bermakna.
  - Elemen interaktif seperti menu mobile dan FAQ accordion wajib memperbarui atribut `aria-expanded` dan dapat dioperasikan via keyboard (`Enter`/`Space`, `Tab`).
  - Pastikan rasio kontras teks terhadap latar belakang memenuhi standar keterbacaan (minimal setara WCAG AA).
  - Berikan `id` unik dan deskriptif pada tombol, input, dan form untuk memudahkan pengujian otomatis.
- **Responsivitas**:
  - Layout harus tampil rapi tanpa *horizontal scroll* pada lebar layar `375px` (mobile), `768px` (tablet), dan `1280px+` (desktop).

---

## 6. Alur Kerja Eksekusi & Checklist Verifikasi

Saat mengembangkan atau memperbarui website berdasarkan panduan ini, ikuti urutan kerja berikut:

1. **Siapkan Aset Visual**: Pastikan seluruh file gambar berada di folder `assets/` dan dimuat dengan path relatif yang valid.
2. **Bangun Fondasi Styling (`styles.css`)**: Definisikan variabel warna, tipografi, grid layout, dan komponen dasar terlebih dahulu.
3. **Susun Struktur HTML (`index.html`)**: Implementasikan seluruh section secara semantik dengan konten Bahasa Indonesia yang lengkap (tanpa *Lorem Ipsum*).
4. **Implementasikan Logika (`script.js`)**:
   - Perhitungan harga & estimasi hari pada kalkulator.
   - Sinkronisasi tombol `Pilih Paket` ke kalkulator dan form order.
   - Filter kategori layanan, FAQ accordion, mobile nav drawer, dan generator URL WhatsApp.
5. **Verifikasi Akhir (Definition of Done)**:
   - [ ] Semua gambar tampil sempurna (tidak ada *broken image* atau *placeholder*).
   - [ ] Kalkulator menghitung akurat dan menangani kasus tier awal >= tier tujuan dengan rapi.
   - [ ] Semua tautan navigasi anchor (`#tentang`, `#layanan`, `#kalkulator`, dll.) berjalan mulus.
   - [ ] Form pemesanan memvalidasi input dan menghasilkan teks pesan WhatsApp yang rapi.
   - [ ] Tampilan responsif teruji di mobile dan desktop tanpa elemen terpotong atau bertumpuk.
   - [ ] Tidak ada error di JavaScript console.
