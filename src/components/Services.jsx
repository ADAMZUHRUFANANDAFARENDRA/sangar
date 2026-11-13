import { useState } from 'react';
import conquerorBadge from '../assets/conqueror-badge.jpg';
import { SERVICE_CATEGORIES, SERVICES } from '../data/services.js';

export default function Services({ onSelectPackage }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const visibleServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeCategory);

  const conquerorService = SERVICES.find((service) => service.id === 'pkg-conqueror');

  return (
    <section id="layanan" className="section">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Layanan &amp; Paket Joki</span>
          <h2 className="section-title">Pilih Paket Sesuai Target Tier &amp; Gaya Main Anda.</h2>
          <p className="section-lead">
            Tersedia layanan serah login terjadwal maupun paket Mabar / Gendong tanpa perlu
            membagikan data akun sama sekali.
          </p>
        </header>

        <div className="filter-tabs" role="tablist" aria-label="Filter kategori layanan">
          {SERVICE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              id={`service-filter-${category.id}`}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`filter-tab ${activeCategory === category.id ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="services-grid">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className={`card service-card ${service.featured ? 'is-featured' : ''}`}
            >
              <div className="service-top">
                <span className={`tag ${service.featured ? 'tag-accent' : ''}`}>
                  {service.badge}
                </span>
                <span className="service-duration">{service.durationText}</span>
              </div>

              <div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-subtitle">{service.subtitle}</p>
              </div>

              <div className="service-price">{service.priceText}</div>

              <ul className="service-list">
                {service.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <button
                id={`select-${service.id}`}
                type="button"
                className={`btn btn-sm btn-full ${service.featured ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => onSelectPackage(service.preset)}
              >
                Pilih Paket
              </button>
            </article>
          ))}
        </div>

        {conquerorService && (
          <aside className="card conqueror-banner" aria-label="Informasi slot Conqueror">
            <img
              className="conqueror-thumb"
              src={conquerorBadge}
              alt="Medali emblem taktis kuningan untuk paket push Conqueror"
            />
            <div>
              <h3 className="conqueror-banner-title">
                Slot Terbatas Season Ini: Pendampingan Conqueror Top 500
              </h3>
              <p className="conqueror-banner-copy">
                Untuk menjaga konsistensi poin dan keamanan akun, SANGAR membatasi maksimal 6 akun
                Conqueror aktif per minggu pada Server Asia dan KRJP.
              </p>
            </div>
            <button
              id="banner-conqueror-cta"
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onSelectPackage(conquerorService.preset)}
            >
              Cek Slot &amp; Estimasi
            </button>
          </aside>
        )}
      </div>
    </section>
  );
}
