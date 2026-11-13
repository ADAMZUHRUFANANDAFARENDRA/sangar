import { useState } from 'react';
import {
  buildWhatsAppOrderUrl,
  formatOrderMessage,
  validateOrderForm,
} from '../utils/whatsapp.js';

const PAYMENT_METHODS = ['QRIS', 'BCA', 'Mandiri', 'Dana', 'GoPay', 'OVO'];

export default function OrderContact({ orderForm, onChangeOrderForm }) {
  const [errors, setErrors] = useState({});
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (field, value) => {
    onChangeOrderForm({ ...orderForm, [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submittedOrder) {
      setSubmittedOrder(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateOrderForm(orderForm);
    if (!result.isValid) {
      setErrors(result.errors);
      setSubmittedOrder(null);
      return;
    }

    setErrors({});
    setCopied(false);
    setSubmittedOrder(result.sanitized);
  };

  const previewMessage = submittedOrder ? formatOrderMessage(submittedOrder) : '';
  const whatsappUrl = submittedOrder ? buildWhatsAppOrderUrl(submittedOrder) : '#';

  const handleCopyMessage = async () => {
    if (!previewMessage) return;
    try {
      await navigator.clipboard.writeText(previewMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="kontak" className="section section-muted">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Pemesanan &amp; Kontak</span>
          <h2 className="section-title">Kirim Detail Order Anda ke Admin SANGAR.</h2>
          <p className="section-lead">
            Isi data pesanan di bawah untuk mengecek slot aktif dan melanjutkan konfirmasi langsung
            melalui WhatsApp resmi kami.
          </p>
        </header>

        <div className="contact-grid">
          <aside className="card contact-info-card">
            <div className="contact-detail-list">
              <div className="contact-detail-item">
                <span className="contact-detail-label">Studio &amp; Operasional</span>
                <span className="contact-detail-value">SANGAR Gaming Studio — Surabaya</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Jam Layanan Admin</span>
                <span className="contact-detail-value">Setiap Hari, 08.00 – 23.59 WIB</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">WhatsApp Resmi</span>
                <span className="contact-detail-value">+62 812-3456-7890 (Admin Order)</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Kanal Komunitas</span>
                <span className="contact-detail-value">@sangar.pubgboost (Instagram &amp; TikTok)</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Metode Pembayaran</span>
                <div className="payment-badges">
                  {PAYMENT_METHODS.map((method) => (
                    <span key={method} className="tag">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="alert-box alert-warning">
              <strong>Aturan Privasi Wajib:</strong> Website ini tidak pernah meminta email login,
              password akun, maupun kode OTP. Penyerahan akses (khusus paket non-mabar) hanya
              dilakukan langsung ke WhatsApp admin setelah jadwal dikonfirmasi.
            </div>
          </aside>

          <div className="card order-form-card">
            <form id="order-form" className="order-form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label className="field-label" htmlFor="order-ign">
                  Nickname (IGN) / ID PUBG
                </label>
                <input
                  id="order-ign"
                  name="ign"
                  type="text"
                  maxLength={32}
                  className="field-control"
                  placeholder="Contoh: SANGAR_Bayu"
                  value={orderForm.ign}
                  onChange={(event) => handleFieldChange('ign', event.target.value)}
                  required
                />
                {errors.ign && <span className="field-error">{errors.ign}</span>}
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="order-whatsapp">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  id="order-whatsapp"
                  name="whatsapp"
                  type="tel"
                  maxLength={24}
                  className="field-control"
                  placeholder="Contoh: 081234567890"
                  value={orderForm.whatsapp}
                  onChange={(event) => handleFieldChange('whatsapp', event.target.value)}
                  required
                />
                {errors.whatsapp && <span className="field-error">{errors.whatsapp}</span>}
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="order-server">
                  Server &amp; Mode
                </label>
                <select
                  id="order-server"
                  name="server"
                  className="field-control"
                  value={orderForm.server}
                  onChange={(event) => handleFieldChange('server', event.target.value)}
                >
                  <option value="Asia • Squad TPP">Asia • Squad TPP</option>
                  <option value="Asia • Duo TPP">Asia • Duo TPP</option>
                  <option value="Asia • Solo TPP">Asia • Solo TPP</option>
                  <option value="KRJP • Squad TPP">KRJP • Squad TPP</option>
                  <option value="Asia • FPP Mode">Asia • FPP Mode</option>
                </select>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="order-system">
                  Sistem Pengerjaan
                </label>
                <select
                  id="order-system"
                  name="playSystem"
                  className="field-control"
                  value={orderForm.playSystem}
                  onChange={(event) => handleFieldChange('playSystem', event.target.value)}
                >
                  <option value="Joki Login Terjadwal">Joki Login Terjadwal</option>
                  <option value="Mabar / Gendong (Tanpa Login)">Mabar / Gendong (Tanpa Login)</option>
                </select>
              </div>

              <div className="field-group order-form-full">
                <label className="field-label" htmlFor="order-route">
                  Paket / Rute Tier Tujuan
                </label>
                <input
                  id="order-route"
                  name="routeSummary"
                  type="text"
                  maxLength={140}
                  className="field-control"
                  placeholder="Contoh: Diamond III → Ace Dominator"
                  value={orderForm.routeSummary}
                  onChange={(event) => handleFieldChange('routeSummary', event.target.value)}
                  required
                />
                {errors.routeSummary && <span className="field-error">{errors.routeSummary}</span>}
              </div>

              <div className="field-group order-form-full">
                <label className="field-label" htmlFor="order-notes">
                  Catatan / Preferensi Jam Main (Jangan isi password/OTP)
                </label>
                <textarea
                  id="order-notes"
                  name="scheduleNote"
                  rows={3}
                  maxLength={240}
                  className="field-control"
                  placeholder="Contoh: Akun kosong pukul 22.00 - 06.00 WIB, atau pilih mode mabar jam 20.00 WIB."
                  value={orderForm.scheduleNote}
                  onChange={(event) => handleFieldChange('scheduleNote', event.target.value)}
                />
              </div>

              <div className="order-form-full">
                <button id="order-submit-btn" type="submit" className="btn btn-primary btn-full">
                  Buat Ringkasan &amp; Siapkan Pesan WhatsApp
                </button>
              </div>
            </form>

            {submittedOrder && (
              <div id="order-preview-box" className="order-preview" role="status" aria-live="polite">
                <span className="order-preview-title">
                  Ringkasan Order Siap Dikirim ke Admin WhatsApp
                </span>
                <pre className="order-preview-text">{previewMessage}</pre>
                <div className="order-preview-actions">
                  <a
                    id="order-wa-send-link"
                    className="btn btn-primary btn-sm"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buka &amp; Kirim ke WhatsApp
                  </a>
                  <button
                    id="order-copy-btn"
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleCopyMessage}
                  >
                    {copied ? 'Tersalin!' : 'Salin Pesan Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
