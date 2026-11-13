import heroImage from '../assets/hero-tactical.jpg';
import { buildQuickConsultUrl } from '../utils/whatsapp.js';

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="container hero-grid">
        <div>
          <p className="hero-eyebrow">LAYANAN PUSH RANK PROFESIONAL • SEJAK 2021</p>
          <h1 className="hero-title">
            Push Rank PUBG Lebih Cepat, Aman, &amp;{' '}
            <span className="hero-title-accent">100% Pure Manual.</span>
          </h1>
          <p className="hero-subtitle">
            Tim pro-player SANGAR membantu akun Anda menembus Crown, Ace, Ace Dominator, hingga
            Conqueror tanpa cheat, tanpa script, dengan K/D ratio terjaga serta laporan progres
            harian yang transparan.
          </p>

          <div className="hero-cta-row">
            <a id="hero-calc-cta" className="btn btn-primary" href="#kalkulator">
              Hitung Estimasi Biaya
            </a>
            <a
              id="hero-wa-cta"
              className="btn btn-secondary"
              href={buildQuickConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi WhatsApp
            </a>
          </div>

          <div className="hero-metrics" aria-label="Statistik layanan SANGAR">
            <div>
              <strong className="metric-value">4.200+</strong>
              <span className="metric-label">Akun Selesai Push</span>
            </div>
            <div>
              <strong className="metric-value">100% Manual</strong>
              <span className="metric-label">Anti-Cheat &amp; Anti-Banned</span>
            </div>
            <div>
              <strong className="metric-value">Update Harian</strong>
              <span className="metric-label">Laporan Statistik &amp; Poin</span>
            </div>
          </div>
        </div>

        <figure className="hero-visual-frame">
          <img
            className="hero-visual-img"
            src={heroImage}
            alt="Ilustrasi operator taktis SANGAR mengawasi zona tempur saat senja"
          />
          <figcaption className="hero-visual-caption">
            <span>
              <strong>PLAY PURE GUARANTEE</strong> — Perangkat resmi &amp; rotasi squad terukur
            </span>
            <span className="tag tag-verified">Slot Buka</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
