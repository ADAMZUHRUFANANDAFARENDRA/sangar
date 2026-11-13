const STEPS = [
  {
    step: 'LANGKAH 01',
    title: 'Konsultasi & Pilih Paket',
    description:
      'Tentukan rute tier awal hingga target, server (Asia/KRJP), serta pilihan mode pengerjaan (Login Terjadwal atau Mabar Tanpa Login).',
  },
  {
    step: 'LANGKAH 02',
    title: 'Pembayaran Aman',
    description:
      'Lakukan pembayaran via QRIS, Transfer Bank (BCA/Mandiri), atau E-Wallet (Dana/GoPay/OVO). Tersedia opsi DP 50% untuk paket tertentu.',
  },
  {
    step: 'LANGKAH 03',
    title: 'Proses Pengerjaan',
    description:
      'Roster SANGAR mulai bermain sesuai jadwal yang disepakati dengan laporan screenshot statistik K/D dan poin tier secara berkala.',
  },
  {
    step: 'LANGKAH 04',
    title: 'Serah Terima & Verifikasi',
    description:
      'Setelah target tercapai, Anda memeriksa hasil akhir terlebih dahulu. Tim kami logout permanen, lalu silakan ganti password demi kenyamanan.',
  },
];

export default function Process() {
  return (
    <section id="proses" className="section">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Cara Kerja</span>
          <h2 className="section-title">Alur Pemesanan Jelas, Cepat, &amp; Terstruktur.</h2>
          <p className="section-lead">
            Dari simulasi estimasi hingga serah terima akun, setiap tahapan terdokumentasi rapi
            bersama admin resmi kami.
          </p>
        </header>

        <ol className="process-grid">
          {STEPS.map((item) => (
            <li key={item.step} className="card process-card">
              <span className="process-step">{item.step}</span>
              <h3 className="process-title">{item.title}</h3>
              <p className="process-desc">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
