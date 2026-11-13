import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'nav-tentang', href: '#tentang', label: 'Tentang' },
  { id: 'nav-layanan', href: '#layanan', label: 'Layanan' },
  { id: 'nav-kalkulator', href: '#kalkulator', label: 'Kalkulator' },
  { id: 'nav-proses', href: '#proses', label: 'Cara Kerja' },
  { id: 'nav-testimoni', href: '#testimoni', label: 'Testimoni' },
  { id: 'nav-faq', href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Langsung ke konten utama
      </a>

      <div className="container nav-inner">
        <a className="brand-link" href="#top" aria-label="Beranda SANGAR">
          <svg
            className="brand-mark"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="10" fill="#1D211D" />
            <path
              d="M32 10L50 18V33C50 43.5 42.3 51.2 32 54C21.7 51.2 14 43.5 14 33V18L32 10Z"
              stroke="#E8A838"
              strokeWidth="3"
              fill="#141714"
            />
            <path
              d="M32 21V43M21 32H43"
              stroke="#E8A838"
              strokeWidth="2.5"
              strokeLinecap="square"
            />
            <circle cx="32" cy="32" r="5" stroke="#F2EFE9" strokeWidth="2" />
          </svg>
          <span className="brand-wordmark">
            <span className="brand-name">SANGAR</span>
            <span className="brand-sub">PUBG Boost Studio</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} id={item.id} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a id="nav-order-cta" className="btn btn-primary btn-sm nav-desktop-cta" href="#kontak">
            Pesan Joki
          </a>
          <button
            id="nav-toggle-btn"
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav-drawer"
        className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-label="Navigasi seluler"
      >
        <div className="container">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  className="mobile-nav-link"
                  href={item.href}
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ paddingTop: '0.75rem' }}>
              <a
                id="mobile-order-cta"
                className="btn btn-primary btn-full"
                href="#kontak"
                onClick={handleCloseMenu}
              >
                Pesan Joki
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
