import { ADDON_OPTIONS, GAME_MODES, TIERS } from '../data/tiers.js';
import { calculateEstimate } from '../utils/calculator.js';

export default function Calculator({ config, onChangeConfig, onProceedToOrder }) {
  const estimate = calculateEstimate(config);

  const handleTierChange = (field, value) => {
    onChangeConfig({
      ...config,
      [field]: value,
      packageLabel: '',
    });
  };

  const handleAddonToggle = (addonId) => {
    const exists = config.addons.includes(addonId);
    const nextAddons = exists
      ? config.addons.filter((item) => item !== addonId)
      : [...config.addons, addonId];

    onChangeConfig({
      ...config,
      addons: nextAddons,
      packageLabel: '',
    });
  };

  return (
    <section id="kalkulator" className="section section-muted">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Kalkulator Estimasi</span>
          <h2 className="section-title">Hitung Biaya &amp; Durasi Push Rank Secara Transparan.</h2>
          <p className="section-lead">
            Simulasikan rute tier awal hingga target rank Anda. Hasil estimasi bisa langsung
            dikirimkan ke formulir pemesanan tanpa biaya tambahan tersembunyi.
          </p>
        </header>

        <div className="calculator-layout">
          <div className="card calculator-panel">
            <div className="calculator-fields">
              <div className="field-group">
                <label className="field-label" htmlFor="calc-start-tier">
                  Tier Awal Akun
                </label>
                <select
                  id="calc-start-tier"
                  className="field-control"
                  value={config.startTierId}
                  onChange={(event) => handleTierChange('startTierId', event.target.value)}
                >
                  {TIERS.slice(0, -1).map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="calc-target-tier">
                  Tier Tujuan
                </label>
                <select
                  id="calc-target-tier"
                  className="field-control"
                  value={config.targetTierId}
                  onChange={(event) => handleTierChange('targetTierId', event.target.value)}
                >
                  {TIERS.slice(1).map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group calculator-mode-group">
                <label className="field-label" htmlFor="calc-game-mode">
                  Mode Permainan
                </label>
                <select
                  id="calc-game-mode"
                  className="field-control"
                  value={config.modeId}
                  onChange={(event) => handleTierChange('modeId', event.target.value)}
                >
                  {GAME_MODES.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="addons-heading">Opsi Tambahan (Opsional)</p>
              <div className="addons-list">
                {ADDON_OPTIONS.map((addon) => {
                  const checked = config.addons.includes(addon.id);
                  return (
                    <label key={addon.id} className="addon-option" htmlFor={`addon-${addon.id}`}>
                      <input
                        id={`addon-${addon.id}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleAddonToggle(addon.id)}
                      />
                      <span>
                        <span className="addon-title">{addon.label}</span>
                        <span className="addon-desc">{addon.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="card calculator-summary" aria-live="polite">
            <span className="summary-label">Ringkasan Estimasi</span>

            {estimate.valid ? (
              <>
                <div className="summary-route">
                  {estimate.startLabel} → {estimate.targetLabel}
                </div>
                <div id="calc-price-output" className="summary-price">
                  {estimate.formattedCost}
                </div>

                <div className="summary-meta-list">
                  <div className="summary-meta-row">
                    <span>Estimasi Waktu</span>
                    <strong id="calc-duration-output">{estimate.durationText}</strong>
                  </div>
                  <div className="summary-meta-row">
                    <span>Mode Permainan</span>
                    <strong>{estimate.modeLabel}</strong>
                  </div>
                  <div className="summary-meta-row">
                    <span>Tahap Kenaikan</span>
                    <strong>{estimate.stepsCount} tingkat tier</strong>
                  </div>
                  <div className="summary-meta-row">
                    <span>Opsi Tambahan</span>
                    <strong>
                      {estimate.addonLabels.length > 0
                        ? estimate.addonLabels.join(', ')
                        : 'Tidak ada (Standar)'}
                    </strong>
                  </div>
                </div>

                <p className="summary-note">
                  Harga sudah termasuk garansi keamanan manual dan laporan progres harian. Tersedia
                  opsi DP 50% untuk paket nominal di atas Rp 200.000.
                </p>

                <button
                  id="calc-proceed-btn"
                  type="button"
                  className="btn btn-primary btn-full"
                  onClick={() => onProceedToOrder(estimate)}
                >
                  Lanjutkan ke Form Order
                </button>
              </>
            ) : (
              <div id="calc-error-message" className="alert-box alert-danger" role="alert">
                {estimate.error}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
