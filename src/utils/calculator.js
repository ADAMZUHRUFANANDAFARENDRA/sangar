import { ADDON_OPTIONS, GAME_MODES, TIERS } from '../data/tiers.js';

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateEstimate({ startTierId, targetTierId, modeId, addons = [] }) {
  const startIndex = TIERS.findIndex((tier) => tier.id === startTierId);
  const targetIndex = TIERS.findIndex((tier) => tier.id === targetTierId);

  if (startIndex === -1 || targetIndex === -1) {
    return {
      valid: false,
      error: 'Pilihan tier tidak ditemukan. Silakan pilih ulang tier awal dan tujuan.',
    };
  }

  if (targetIndex <= startIndex) {
    return {
      valid: false,
      error: 'Tier tujuan harus lebih tinggi daripada tier awal agar estimasi dapat dihitung.',
    };
  }

  const mode = GAME_MODES.find((item) => item.id === modeId) || GAME_MODES[0];

  // Akumulasi biaya dasar dan durasi dari tiap langkah tier yang dilewati
  let baseCost = 0;
  let baseDays = 0;
  for (let index = startIndex + 1; index <= targetIndex; index += 1) {
    baseCost += TIERS[index].stepPrice;
    baseDays += TIERS[index].stepDays;
  }

  const modeAdjustedCost = baseCost * mode.multiplier;

  let addonRateSum = 0;
  let extraDays = 0;
  const activeAddonLabels = [];

  addons.forEach((addonId) => {
    const found = ADDON_OPTIONS.find((opt) => opt.id === addonId);
    if (found) {
      addonRateSum += found.priceRate;
      extraDays += found.extraDays;
      activeAddonLabels.push(found.label);
    }
  });

  // Pembulatan rapi ke kelipatan Rp 5.000
  const rawTotal = modeAdjustedCost * (1 + addonRateSum);
  const totalCost = Math.round(rawTotal / 5000) * 5000;

  const estimatedMinDays = Math.max(1, Math.round(baseDays + extraDays));
  const estimatedMaxDays = Math.max(estimatedMinDays + 1, Math.ceil(estimatedMinDays * 1.45));

  return {
    valid: true,
    error: '',
    startLabel: TIERS[startIndex].label,
    targetLabel: TIERS[targetIndex].label,
    modeLabel: mode.label,
    addonLabels: activeAddonLabels,
    stepsCount: targetIndex - startIndex,
    totalCost,
    formattedCost: formatRupiah(totalCost),
    durationText: `${estimatedMinDays} – ${estimatedMaxDays} Hari`,
  };
}
