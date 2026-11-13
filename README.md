# SANGAR — Company Profile Joki & Push Rank PUBG

Website *company profile* resmi **SANGAR PUBG Boost Studio**, dibangun menggunakan **React + Vite** dengan **Vanilla CSS modular** sesuai panduan pada [GEMINI.md](GEMINI.md).

## Fitur Utama
- **Arsitektur Modular**: Pemisahan file yang rapi untuk data (`src/data/`), logika kalkulasi & sanitasi (`src/utils/`), styling (`src/styles/`), dan komponen UI per section (`src/components/`).
- **Kalkulator Estimasi Biaya & Durasi**: Menghitung biaya push rank (Rp) dan estimasi hari secara *real-time* berdasarkan tier awal, tier tujuan, mode, dan opsi tambahan (termasuk mode Mabar tanpa serah login).
- **Katalog Paket & Filter**: Pemilihan paket otomatis mengisi kalkulator dan formulir pemesanan.
- **Keamanan Siap Produksi**:
  - *Zero Credential Harvesting* (tanpa kolom email login, password, atau OTP PUBG di web).
  - *Auto-escaping* JSX React tanpa `dangerouslySetInnerHTML`.
  - Validasi input & sanitasi URL WhatsApp (`encodeURIComponent`).
  - Header keamanan produksi (`public/_headers` → otomatis disalin ke `dist/_headers` saat build).

## Cara Menjalankan di Lokal

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Validasi lint & build produksi
npm run lint
npm run build
```

## Konfigurasi Nomor WhatsApp Admin
Ubah konstanta `ADMIN_WHATSAPP_NUMBER` di `src/utils/whatsapp.js` sebelum deployment produksi.
