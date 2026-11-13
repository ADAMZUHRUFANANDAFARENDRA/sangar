const COPYRIGHT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="brand-wordmark">
            <span className="brand-name">SANGAR</span>
            <span className="brand-sub">Layanan Joki &amp; Push Rank PUBG Indonesia</span>
          </div>

          <nav className="footer-links" aria-label="Navigasi footer">
            <a href="#tentang">Tentang</a>
            <a href="#layanan">Layanan</a>
            <a href="#kalkulator">Kalkulator</a>
            <a href="#proses">Cara Kerja</a>
            <a href="#faq">FAQ</a>
            <a href="#kontak">Order</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>&copy; {COPYRIGHT_YEAR} SANGAR PUBG Boost Studio. Seluruh hak cipta dilindungi.</p>
          <p>
            Disclaimer: SANGAR merupakan penyedia layanan pendampingan dan push rank independen
            yang tidak berafiliasi resmi dengan Krafton, Inc., Tencent Games, LightSpeed Studios,
            maupun PUBG Mobile.
          </p>
        </div>
      </div>
    </footer>
  );
}
