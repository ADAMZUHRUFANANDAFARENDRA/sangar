# GEMINI.md — Panduan Pengembangan Website Company Profile Joki Akun PUBG

Dokumen ini menjadi panduan utama bagi AI agent dan developer dalam merancang, membangun, mengamankan, dan memverifikasi website *company profile* untuk layanan joki akun & *push rank* PUBG (**SANGAR** / sesuaikan dengan nama brand yang diminta).

---

## 1. Tujuan & Ruang Lingkup Proyek

- **Tujuan**: Membangun website *company profile* yang sederhana, modern, cepat, responsif, aman, dan meyakinkan untuk layanan jasa joki akun PUBG (fokus utama pasar Indonesia / PUBG Mobile, serta dapat disesuaikan untuk PUBG PC).
- **Target Audiens**: Pemain PUBG Indonesia yang mencari jasa *push rank* (Crown, Ace, Ace Master, Ace Dominator, hingga Conqueror), perbaikan statistik K/D Ratio, atau penyelesaian misi Royale Pass dengan jaminan keamanan akun.
- **Bahasa Konten**: Bahasa Indonesia yang natural, lugas, profesional, dan menggunakan istilah komunitas PUBG Indonesia yang akurat (*Push Rank*, *Tier*, *K/D Ratio*, *Play Pure / No Cheat*, *Mabar / Gendong*, *Server Asia/KRJP*).
- **Prinsip Utama**: Sederhana tetapi berkelas (*less, but better*). Hindari fitur *bloat* atau kerumitan ala dashboard SaaS; fokus pada kejelasan layanan, transparansi harga, keamanan akun, dan kemudahan pemesanan.

---

## 2. Framework, Tech Stack & Pemisahan File Modular

Proyek ini menggunakan **React + Vite (JavaScript ES6+)** dipadukan dengan **Vanilla CSS modular** (tanpa TailwindCSS atau library UI eksternal) agar kode tetap bersih, terstruktur, mudah dirawat, dan menghasilkan *static build* (`dist/`) yang cepat serta aman di-deploy ke Cloudflare Pages, Vercel, Netlify, atau GitHub Pages.

### Alasan Pemilihan Framework (React + Vite)
1. **Pemisahan File yang Rapi (*Separation of Concerns*)**: Setiap bagian halaman (*Navbar*, *Hero*, *About*, *Services*, *Calculator*, *Process*, *Testimonials*, *FAQ*, *OrderContact*, *Footer*), data katalog, logika kalkulator/keamanan, dan stylesheet dipisahkan ke file masing-masing sehingga kode tidak tercampur dalam satu berkas.
2. **Keamanan DOM Bawaan**: React melakukan *auto-escaping* terhadap interpolasi teks di JSX sehingga meminimalkan risiko XSS, dengan aturan ketat dilarang memakai `dangerouslySetInnerHTML`.
3. **Performa & Kompatibilitas CSP**: Vite mengompilasi aset statis ke folder `dist/` tanpa *inline script* pada HTML sehingga kompatibel dengan `Content-Security-Policy` (`script-src 'self'`).

### Struktur Direktori Modular

```text
/
├── .gemini/
│   └── settings.json          # Konfigurasi MCP server proyek (Playwright, Semgrep, Context7)
├── .gitignore                 # Perlindungan agar .env, kunci privat, node_modules & dist tidak ter-commit
├── GEMINI.md                  # Panduan proyek ini
├── README.md                  # Dokumentasi singkat & cara menjalankan proyek
├── index.html                 # Entry HTML5 Vite (lang="id", title, meta description)
├── package.json               # Konfigurasi dependensi & script Vite + React
├── vite.config.js             # Konfigurasi build statis Vite
├── public/
│   └── _headers               # HTTP Security Headers produksi (otomatis tersalin ke dist/_headers)
└── src/
    ├── main.jsx               # Entry point React (mount ke #root)
    ├── App.jsx                # Komposisi utama halaman single-page
    ├── assets/                # Aset gambar lokal terverifikasi (tanpa broken placeholder)
    │   ├── hero-tactical.jpg
    │   ├── squad-studio.jpg
    │   └── conqueror-badge.jpg
    ├── data/                  # Data terpisah dari tampilan UI
    │   ├── tiers.js           # Daftar tier, poin, dan tarif dasar push rank
    │   ├── services.js        # Daftar layanan & paket harga (Reguler, Conqueror, Tambahan)
    │   ├── testimonials.js    # Testimoni klien terkurasi
    │   └── faq.js             # Daftar pertanyaan umum & jawaban
    ├── utils/                 # Logika bisnis & sanitasi input terpisah
    │   ├── calculator.js      # Rumus estimasi biaya (Rp), durasi (hari), & validasi tier
    │   └── whatsapp.js        # Validasi form order, sanitasi karakter, & generator link wa.me
    ├── styles/                # Vanilla CSS modular berbasis CSS Custom Properties
    │   ├── tokens.css         # Token warna, tipografi, spasi, & radius
    │   ├── base.css           # Reset CSS, tipografi global, skip-link, & utilitas layout
    │   ├── components.css     # Komponen tombol, kartu, filter tabs, input, & tombol aksi
    │   └── sections.css       # Styling per section & breakpoint responsif (375px, 768px, 1280px+)
    └── components/            # Komponen UI terpisah per section halaman
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Services.jsx
        ├── Calculator.jsx
        ├── Process.jsx
        ├── Testimonials.jsx
        ├── Faq.jsx
        ├── OrderContact.jsx
        └── Footer.jsx
```

### Aturan Penulisan & Pemisahan Kode
1. **Satu Tanggung Jawab per File**: Dilarang mencampur data statis, rumus perhitungan, CSS global, dan banyak section UI dalam satu file.
2. **HTML5 Semantik dalam JSX**: Gunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>`. Hanya boleh ada **satu `<h1>`** per halaman dengan hierarki `<h2>` dan `<h3>` yang berurutan.
3. **Vanilla CSS Modular**: Definisikan seluruh warna, spasi, dan ukuran font pada `:root` di `src/styles/tokens.css`. Jangan gunakan TailwindCSS atau framework CSS eksternal kecuali diminta pengguna.
4. **JavaScript Bersih (ES6+)**: Pisahkan fungsi murni (*pure functions*) di `src/utils/` dan data di `src/data/`. Pastikan bebas error di console browser dan tidak menggunakan *inline script* di `index.html`.

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

Susun halaman *single-page company profile* secara berurutan melalui komponen-komponen di `src/components/`:

### 1. Navbar (`Navbar.jsx`)
- Logo brand + wordmark (**SANGAR**) dengan ikon SVG taktis sederhana.
- Menu anchor ringkas: `Tentang`, `Layanan`, `Kalkulator`, `Cara Kerja`, `Testimoni`, `FAQ`.
- Satu tombol CTA utama: `Pesan Joki` (mengarah ke `#kontak`).
- Mendukung menu drawer responsif (*hamburger menu*) pada layar mobile dengan `aria-expanded`.

### 2. Hero Section (`Hero.jsx`)
- Label *eyebrow* polos dengan tracking rapi (contoh: `LAYANAN PUSH RANK PROFESIONAL • SEJAK 2021`).
- Headline `<h1>` yang kuat, ringkas, dan jelas (menekankan kecepatan, keamanan, dan 100% manual tanpa cheat).
- Subheadline singkat yang menjelaskan cakupan layanan (Crown, Ace, Conqueror, K/D terjaga).
- 2 tombol aksi: CTA utama (`Hitung Estimasi Biaya`) & CTA sekunder (`Konsultasi WhatsApp`).
- 3 metrik ringkas kepercayaan di bagian bawah hero (`4.200+ Akun Selesai`, `100% Pure Manual`, `Laporan Harian`).

### 3. Tentang Kami (`About.jsx` — `#tentang`)
- Penjelasan singkat mengenai identitas tim joki (berpengalaman di tier Ace Dominator–Conqueror, mengutamakan keamanan akun dan etika bermain).
- Gambar pendukung tim esports/tactical studio yang realistis.
- 4 pilar komitmen bernomor (`01`–`04`):
  1. **100% Play Pure (Anti-Banned)**: Murni skill manual tanpa cheat, script, config, atau emulator ilegal.
  2. **Privasi & Keamanan Login**: Login hanya pada jam yang disepakati dan logout permanen setelah selesai.
  3. **Update Progres Harian**: Pengiriman screenshot statistik K/D, poin tier, dan riwayat match setiap hari.
  4. **Garansi Target Tercapai**: Transparansi estimasi durasi serta komitmen penyelesaian sesuai kesepakatan.

### 4. Layanan & Paket Harga (`Services.jsx` — `#layanan`)
Sediakan filter kategori sederhana (`Semua`, `Push Tier`, `Target Spesifik`) dan tampilkan paket secara jelas:
- **Push Rank Reguler (Per Tier)**: Paket bertahap dari Gold/Platinum/Diamond menuju Crown, Ace, Ace Master, hingga Ace Dominator.
- **Paket Conqueror (Season Push)**: Pendampingan intensif menuju Top 500 Server Asia/KRJP (slot terbatas, pengerjaan terstruktur).
- **Layanan Tambahan**: Joki K/D Ratio, penyelesaian misi Royale Pass (RP), serta opsi **Mabar / Gendong** (tanpa perlu serah login akun).
- Setiap kartu paket wajib memiliki tombol **`Pilih Paket`** yang otomatis mengisi data ke bagian Kalkulator / Form Order.

### 5. Kalkulator Estimasi Biaya & Durasi (`Calculator.jsx` — `#kalkulator`)
Fitur utilitas utama untuk transparansi harga:
- **Input**:
  - Tier Awal (Gold V sampai Ace Master)
  - Tier Tujuan (Platinum I sampai Conqueror)
  - Mode Permainan (Squad TPP / Duo TPP / Solo TPP / FPP)
  - Opsi Tambahan (Mabar Tanpa Login / Request Jam Main / Prioritas Ekspres)
- **Validasi**: Cegah atau beri pesan peringatan yang jelas jika `Tier Tujuan` lebih rendah atau sama dengan `Tier Awal`.
- **Output Real-time**: Total estimasi biaya dalam Rupiah (`Rp`), estimasi waktu pengerjaan (hari), dan tombol **`Lanjutkan ke Form Order`** untuk memindahkan ringkasan pilihan ke formulir kontak.

### 6. Alur / Cara Kerja (`Process.jsx` — `#proses`)
Tampilkan 4 langkah berurutan yang mudah dipahami:
1. **Konsultasi & Pilih Paket** — Tentukan rute tier, server, dan sistem pengerjaan (login atau mabar).
2. **Pembayaran Aman** — Pembayaran via QRIS, Transfer Bank (BCA/Mandiri), atau E-Wallet (Dana/GoPay/OVO).
3. **Proses Pengerjaan** — Tim bermain sesuai jadwal dengan pembaruan progres rutin.
4. **Serah Terima & Verifikasi** — Pemilik mengecek hasil akhir, tim logout penuh, pemilik mengganti password.

### 7. Testimoni Klien (`Testimonials.jsx` — `#testimoni`)
- Tampilkan 3–6 testimoni ringkas yang realistis (nama/inisial IGN, rute tier seperti `Diamond II → Ace Dominator`, server, dan ulasan singkat yang autentik).

### 8. Pertanyaan Umum / FAQ (`Faq.jsx` — `#faq`)
Gunakan komponen *accordion* yang aksesibel untuk menjawab keraguan calon pelanggan:
- Apakah proses joki aman dari *banned*?
- Apakah pemilik akun boleh login saat proses berlangsung?
- Berapa lama estimasi push ke Ace atau Conqueror?
- Apakah tersedia opsi pembayaran DP / bertahap?
- Apakah bisa pesan jasa mabar/gendong tanpa memberikan email/password?

### 9. Kontak, Form Pemesanan & Footer (`OrderContact.jsx` & `Footer.jsx` — `#kontak`)
- **Informasi Kontak**: Jam operasional (`08.00 – 23.59 WIB`), kontak WhatsApp admin, kanal sosial media, dan daftar metode pembayaran yang diterima.
- **Form Order Cepat**:
  - Input: Nama / Nickname (IGN), Nomor WhatsApp, Server/Mode, Ringkasan Paket/Tier, Catatan / Jadwal Login.
  - Aksi Submit: Validasi input sisi klien, tampilkan pratinjau ringkasan order, dan sediakan tombol kirim langsung ke WhatsApp (`https://wa.me/<nomor>?text=...` dengan `encodeURIComponent`) serta tombol salin pesan order.
- **Footer**: Tautan cepat navigasi, hak cipta, dan **disclaimer wajib** bahwa layanan bersifat independen dan tidak berafiliasi resmi dengan Krafton, Tencent Games, maupun PUBG Mobile.

---

## 5. Keamanan Website & Penggunaan Publik Skala Luas (Security Hardening)

Agar website aman digunakan secara luas oleh publik dan terlindungi dari serangan web umum maupun risiko penyalahgunaan data:

1. **Zero Credential Harvesting (Wajib untuk Layanan Joki)**:
   - Website publik **DILARANG KERAS** menyediakan kolom input untuk email login PUBG, password akun, PIN, atau kode OTP di form web mana pun.
   - Seluruh pengumpulan data di form web hanya mencakup identitas pesanan non-sensitif (Nickname/IGN, kontak WhatsApp, rute tier, dan jadwal main). Penyerahan akses login (bila memilih mode login) hanya dilakukan secara privat setelah verifikasi transaksi via WhatsApp terenkripsi, atau arahkan ke opsi **Mabar/Gendong**.
2. **Anti-XSS & Keamanan React/DOM**:
   - **Dilarang** memakai `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `document.write()`, atau `eval()` saat merender input pengguna. Andalkan *auto-escaping* JSX React dan sanitasi teks di `src/utils/whatsapp.js`.
   - Validasi seluruh input form (batas panjang karakter, pola nomor WhatsApp Indonesia `08xx` / `628xx`, serta pembersihan karakter kontrol) sebelum membentuk tautan `https://wa.me/...` menggunakan `encodeURIComponent()`.
   - Tautan eksternal (`target="_blank"`) wajib menyertakan `rel="noopener noreferrer"` untuk mencegah *tabnabbing*.
3. **HTTP Security Headers Produksi (`public/_headers`)**:
   - Pastikan hosting produksi (Cloudflare Pages / Netlify) mengirimkan header dari `public/_headers` (otomatis disalin ke `dist/_headers` saat build):
     - `Content-Security-Policy` ketat (`script-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`).
     - `Strict-Transport-Security` (HSTS), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, dan `Permissions-Policy`.
4. **Perlindungan Anti-Spam & Backend (Jika Dikembangkan Lebih Lanjut)**:
   - Jika form order nantinya dihubungkan ke webhook, Google Sheets, atau database backend, wajib aktifkan **Cloudflare Turnstile** (verifikasi anti-bot), *rate limiting* per IP, serta validasi ulang di sisi server (*server-side validation*).
5. **Kebersihan Secrets & Dependensi**:
   - **Dilarang** menyimpan API key, token webhook, atau kredensial pribadi di `src/`, `index.html`, maupun `.gemini/settings.json`. Gunakan ekspansi variabel lingkungan (`$VAR_NAME`) dan pastikan `.gitignore` mengecualikan berkas `.env` dan `node_modules/`.

---

## 6. MCP Servers & Connectors yang Dibutuhkan

Proyek ini mengandalkan kombinasi **MCP (Model Context Protocol) Servers** dan **Connectors** agar pengembangan, audit keamanan, pengujian, serta operasional bisnis berjalan profesional dan aman.

### A. MCP Servers (Terdaftar di `.gemini/settings.json`)

Konfigurasi standar proyek sudah disimpan di `.gemini/settings.json` dengan prinsip *least privilege* (`"trust": false`, tanpa underscore pada nama server, dan tanpa *hardcoded secrets*).

| Nama MCP | Paket / Endpoint | Fungsi Utama | Prasyarat Lokal / Aktivasi |
| :--- | :--- | :--- | :--- |
| **`playwright`** | `npx -y @playwright/mcp@latest` | Pengujian E2E otomatis di browser nyata (desktop `1280px`, tablet `768px`, mobile `375px`), validasi kalkulator rank, cek zero console error & gambar tampil utuh. | Node.js ≥ 18 & `npx playwright install chromium` |
| **`semgrep`** | `semgrep mcp` | Pemindaian SAST (*Static Application Security Testing*) otomatis terhadap kerentanan JSX/JS seperti `dangerouslySetInnerHTML`, DOM XSS, maupun kebocoran token sebelum kode dirilis. | Python & CLI `semgrep` (`pip install semgrep` atau `brew install semgrep`) |
| **`context7`** | `npx -y @upstash/context7-mcp@latest` | Mengambil dokumentasi teknis terkini (React/Vite best practices, CSP/OWASP headers, konfigurasi Cloudflare/Vercel) agar implementasi tidak memakai pola usang. | Node.js ≥ 18 |
| **`github`** *(Opsional di lokal / Plugin aktif di cloud)* | Remote GitHub MCP / `gh` CLI | Mengelola repository, Pull Request, GitHub Actions CI, Dependabot, dan CodeQL security alerts. | Sudah aktif via plugin `github` di workspace ini |
| **`cloudflare`** *(Opsional produksi)* | `https://mcp.cloudflare.com/mcp` (Streamable HTTP + OAuth) | Mengelola deployment Cloudflare Pages, proteksi WAF, DDoS mitigation, Rate Limiting, dan aturan SSL/TLS Strict untuk trafik publik luas. | `gemini mcp add --transport http cloudflare https://mcp.cloudflare.com/mcp` |

### B. Connectors Operasional & Layanan Publik

| Kategori | Connector | Status & Cara Kerja | Tujuan Profesional & Keamanan |
| :--- | :--- | :--- | :--- |
| **Workspace / Repo** | **GitHub (`github`)** | Aktif di environment proyek. | Version control, review PR, hosting statis (GitHub Pages), dan CI/CD. |
| **Operasional Internal** *(Opsional)* | **Google Sheets (`gsheets`)** | Perlu otorisasi OAuth pengguna melalui panel Connectors/Plugins. | Mencatat order masuk, rute tier, status progres, dan rekap pembayaran secara privat tanpa mengekspos database ke publik. |
| **Penjadwalan** *(Opsional)* | **Google Calendar (`gcalendar`)** | Perlu otorisasi OAuth pengguna melalui panel Connectors/Plugins. | Mengatur slot jam main tim joki agar tidak bentrok dengan jadwal pemilik akun. |
| **Dokumen & Arsip** *(Opsional)* | **Google Drive (`gdrive`)** | Perlu otorisasi OAuth pengguna melalui panel Connectors/Plugins. | Menyimpan SOP keamanan tim dan arsip screenshot bukti progres harian klien. |
| **Konversi Publik** | **WhatsApp Business (`wa.me`)** | Client-side deep link tervalidasi & ter-encode (`encodeURIComponent`). | Konsultasi & konfirmasi order langsung tanpa memproses kredensial login akun PUBG di web. |
| **Proteksi & Pembayaran** *(Skala Lanjut)* | **Cloudflare Turnstile + Payment Gateway Resmi (Midtrans/Xendit/QRIS)** | Diaktifkan bila situs beralih dari web statis ke sistem order otomatis ber-backend. | Mencegah spam bot pada formulir dan menjamin transaksi pembayaran berstandar PCI-DSS. |

---

## 7. Standar SEO, Aksesibilitas, & Responsivitas

- **SEO**:
  - Sertakan `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<title>` yang deskriptif, dan `<meta name="description">` yang relevan dengan kata kunci *joki akun PUBG*.
  - Gunakan atribut `lang="id"` pada tag `<html>`.
- **Aksesibilitas (A11y)**:
  - Semua elemen gambar wajib memiliki atribut `alt` yang bermakna.
  - Elemen interaktif seperti menu mobile dan FAQ accordion wajib memperbarui atribut `aria-expanded` dan dapat dioperasikan via keyboard (`Enter`/`Space`, `Tab`).
  - Pastikan rasio kontras teks terhadap latar belakang memenuhi standar keterbacaan (minimal setara WCAG AA).
  - Berikan `id` unik dan deskriptif pada tombol, input, dan form untuk memudahkan pengujian otomatis (termasuk lewat Playwright MCP).
- **Responsivitas**:
  - Layout harus tampil rapi tanpa *horizontal scroll* pada lebar layar `375px` (mobile), `768px` (tablet), dan `1280px+` (desktop).

---

## 8. Alur Kerja Eksekusi & Checklist Verifikasi

Saat mengembangkan atau memperbarui website berdasarkan panduan ini, ikuti urutan kerja berikut:

1. **Verifikasi MCP & Connectors**: Pastikan `.gemini/settings.json` aktif di lingkungan kerja (`playwright`, `semgrep`, `context7`) dan connector `github` (serta `gsheets`/`gcalendar` bila dibutuhkan) telah terhubung.
2. **Inisialisasi Framework & Aset**: Pastikan dependensi React + Vite terpasang (`npm install`), pindahkan `_headers` ke `public/_headers`, dan simpan seluruh aset visual valid di `src/assets/`.
3. **Bangun Fondasi Styling Modular (`src/styles/`)**: Definisikan `tokens.css`, `base.css`, `components.css`, dan `sections.css`.
4. **Pisahkan Data & Logika (`src/data/` & `src/utils/`)**: Isi data tier, layanan, testimoni, FAQ, rumus kalkulator, serta validator & generator URL WhatsApp yang aman.
5. **Implementasikan Komponen UI Terpisah (`src/components/`)**: Bangun setiap section di file komponennya masing-masing lalu rakit di `src/App.jsx`.
6. **Audit Keamanan, Build & Pengujian Akhir (Definition of Done)**:
   - [ ] Jalankan `npm run build` dan pastikan build produksi berhasil tanpa error serta `dist/_headers` ikut terbuat.
   - [ ] Pemindaian keamanan (`semgrep` / audit manual): nol `dangerouslySetInnerHTML`/`innerHTML` untuk input pengguna, nol hardcoded secrets, nol form permintaan password/OTP PUBG.
   - [ ] Pengujian browser (`playwright` / manual): semua gambar tampil sempurna, tidak ada error di JavaScript console.
   - [ ] Kalkulator menghitung akurat dan menangani kasus `Tier Awal >= Tier Tujuan` dengan rapi.
   - [ ] Semua tautan navigasi anchor (`#tentang`, `#layanan`, `#kalkulator`, dll.) dan tautan `wa.me` berjalan mulus.
   - [ ] Tampilan responsif teruji di mobile (`375px`), tablet (`768px`), dan desktop (`1280px+`) tanpa *horizontal scroll*.
