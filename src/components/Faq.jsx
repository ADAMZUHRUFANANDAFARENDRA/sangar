import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq.js';

export default function Faq() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Pertanyaan Umum</span>
          <h2 className="section-title">Jawaban Mengenai Keamanan Akun &amp; Pengerjaan.</h2>
          <p className="section-lead">
            Masih ragu sebelum memesan? Berikut ringkasan hal yang paling sering ditanyakan oleh
            calon pelanggan kami.
          </p>
        </header>

        <div className="faq-list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <article key={item.id} className="faq-item">
                <h3>
                  <button
                    id={`${item.id}-trigger`}
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-indicator" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} className="faq-panel" role="region" aria-labelledby={`${item.id}-trigger`}>
                    {item.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
