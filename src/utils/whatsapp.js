// Nomor WhatsApp resmi admin (format internasional tanpa tanda +)
export const ADMIN_WHATSAPP_NUMBER = '6281234567890';

const WHATSAPP_ID_REGEX = /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/;

function stripControlChars(input) {
  let result = '';
  for (let i = 0; i < input.length; i += 1) {
    const code = input.charCodeAt(i);
    if (code >= 32 && code !== 127) {
      result += input[i];
    } else {
      result += ' ';
    }
  }
  return result;
}

/**
 * Membersihkan karakter kontrol dan membatasi panjang teks sebelum diproses.
 */
export function sanitizeText(value, maxLength = 120) {
  if (typeof value !== 'string') {
    return '';
  }
  return stripControlChars(value).replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

/**
 * Menormalkan nomor WhatsApp Indonesia (08xx -> 628xx) untuk validasi.
 */
export function normalizeWhatsAppNumber(rawPhone) {
  const digitsOnly = sanitizeText(rawPhone, 24).replace(/[\s()-]/g, '');
  if (!WHATSAPP_ID_REGEX.test(digitsOnly)) {
    return null;
  }
  if (digitsOnly.startsWith('0')) {
    return `62${digitsOnly.slice(1)}`;
  }
  if (digitsOnly.startsWith('+')) {
    return digitsOnly.slice(1);
  }
  return digitsOnly;
}

/**
 * Validasi seluruh kolom formulir pemesanan tanpa mengumpulkan data sensitif (password/OTP).
 */
export function validateOrderForm(rawForm) {
  const ign = sanitizeText(rawForm.ign, 32);
  const whatsappInput = sanitizeText(rawForm.whatsapp, 24);
  const normalizedPhone = normalizeWhatsAppNumber(whatsappInput);
  const server = sanitizeText(rawForm.server, 40);
  const playSystem = sanitizeText(rawForm.playSystem, 40);
  const routeSummary = sanitizeText(rawForm.routeSummary, 140);
  const scheduleNote = sanitizeText(rawForm.scheduleNote, 240);

  const errors = {};

  if (ign.length < 2) {
    errors.ign = 'Masukkan Nickname (IGN) atau ID PUBG minimal 2 karakter.';
  }

  if (!normalizedPhone) {
    errors.whatsapp = 'Masukkan nomor WhatsApp Indonesia yang valid (contoh: 081234567890).';
  }

  if (routeSummary.length < 3) {
    errors.routeSummary = 'Pilih paket atau ringkasan rute rank terlebih dahulu.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      ign,
      whatsapp: normalizedPhone || whatsappInput,
      server: server || 'Asia • Squad TPP',
      playSystem: playSystem || 'Joki Login Terjadwal',
      routeSummary,
      scheduleNote: scheduleNote || 'Fleksibel mengikuti jadwal tim',
    },
  };
}

export function formatOrderMessage(order) {
  return [
    'Halo Admin SANGAR, saya ingin memesan jasa joki PUBG:',
    `- Nickname / ID: ${order.ign}`,
    `- Nomor WA Saya: ${order.whatsapp}`,
    `- Server / Mode: ${order.server}`,
    `- Sistem Pengerjaan: ${order.playSystem}`,
    `- Paket / Rute Tier: ${order.routeSummary}`,
    `- Catatan / Jadwal: ${order.scheduleNote}`,
    '',
    'Mohon info ketersediaan slot dan instruksi pembayaran selanjutnya. Terima kasih!',
  ].join('\n');
}

export function buildWhatsAppOrderUrl(order) {
  const text = formatOrderMessage(order);
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildQuickConsultUrl() {
  const message =
    'Halo Admin SANGAR, saya ingin konsultasi mengenai paket push rank / mabar PUBG.';
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
