export const TIERS = [
  { id: 'gold-5', label: 'Gold V', bracket: 'Gold', stepPrice: 5000, stepDays: 0.2 },
  { id: 'gold-1', label: 'Gold I', bracket: 'Gold', stepPrice: 6000, stepDays: 0.25 },
  { id: 'platinum-5', label: 'Platinum V', bracket: 'Platinum', stepPrice: 7000, stepDays: 0.25 },
  { id: 'platinum-3', label: 'Platinum III', bracket: 'Platinum', stepPrice: 7000, stepDays: 0.25 },
  { id: 'platinum-1', label: 'Platinum I', bracket: 'Platinum', stepPrice: 8000, stepDays: 0.3 },
  { id: 'diamond-5', label: 'Diamond V', bracket: 'Diamond', stepPrice: 9000, stepDays: 0.3 },
  { id: 'diamond-4', label: 'Diamond IV', bracket: 'Diamond', stepPrice: 9000, stepDays: 0.3 },
  { id: 'diamond-3', label: 'Diamond III', bracket: 'Diamond', stepPrice: 9000, stepDays: 0.3 },
  { id: 'diamond-2', label: 'Diamond II', bracket: 'Diamond', stepPrice: 9000, stepDays: 0.3 },
  { id: 'diamond-1', label: 'Diamond I', bracket: 'Diamond', stepPrice: 9000, stepDays: 0.3 },
  { id: 'crown-5', label: 'Crown V', bracket: 'Crown', stepPrice: 14000, stepDays: 0.35 },
  { id: 'crown-4', label: 'Crown IV', bracket: 'Crown', stepPrice: 15000, stepDays: 0.4 },
  { id: 'crown-3', label: 'Crown III', bracket: 'Crown', stepPrice: 15000, stepDays: 0.4 },
  { id: 'crown-2', label: 'Crown II', bracket: 'Crown', stepPrice: 15000, stepDays: 0.4 },
  { id: 'crown-1', label: 'Crown I', bracket: 'Crown', stepPrice: 16000, stepDays: 0.45 },
  { id: 'ace', label: 'Ace (4.200+)', bracket: 'Ace', stepPrice: 25000, stepDays: 0.5 },
  { id: 'ace-master', label: 'Ace Master (4.700+)', bracket: 'Ace Master', stepPrice: 110000, stepDays: 1.5 },
  { id: 'ace-dominator', label: 'Ace Dominator (5.200+)', bracket: 'Ace Dominator', stepPrice: 150000, stepDays: 2.0 },
  { id: 'conqueror', label: 'Conqueror (Top 500)', bracket: 'Conqueror', stepPrice: 240000, stepDays: 3.5 },
];

export const GAME_MODES = [
  { id: 'squad-tpp', label: 'Squad TPP (Rekomendasi)', multiplier: 1.0 },
  { id: 'duo-tpp', label: 'Duo TPP', multiplier: 1.15 },
  { id: 'solo-tpp', label: 'Solo TPP', multiplier: 1.25 },
  { id: 'fpp', label: 'FPP (Squad / Solo)', multiplier: 1.3 },
];

export const ADDON_OPTIONS = [
  {
    id: 'mabar',
    label: 'Mode Mabar / Gendong (Tanpa Serah Login)',
    description: 'Main bareng tim pro kami dari akun Anda sendiri (+35% biaya)',
    priceRate: 0.35,
    extraDays: 1,
  },
  {
    id: 'schedule',
    label: 'Request Jam Login Khusus',
    description: 'Pengerjaan hanya pada rentang jam pilihan pemilik akun (+15% biaya)',
    priceRate: 0.15,
    extraDays: 0.5,
  },
  {
    id: 'express',
    label: 'Prioritas Ekspres',
    description: 'Antrean prioritas dengan rotasi tim penuh (+30% biaya, estimasi lebih cepat)',
    priceRate: 0.3,
    extraDays: -1,
  },
];
