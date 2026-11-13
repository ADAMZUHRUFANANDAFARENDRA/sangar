import { TESTIMONIALS } from '../data/testimonials.js';

export default function Testimonials() {
  return (
    <section id="testimoni" className="section section-muted">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Testimoni Klien</span>
          <h2 className="section-title">Dipercaya Pemain Kasual hingga Pemburu Conqueror.</h2>
          <p className="section-lead">
            Sebagian catatan kepuasan klien dari berbagai server yang telah menyelesaikan target
            tier bersama roster SANGAR.
          </p>
        </header>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <article key={item.id} className="card testimonial-card">
              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
              <footer className="testimonial-footer">
                <strong className="testimonial-ign">{item.ign}</strong>
                <span className="testimonial-meta">
                  {item.route} • {item.server}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
