import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format angka ke mata uang Rupiah Indonesia (Rp xx.xxx)
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Normalizer nomor WhatsApp Indonesia (Micro-Spec 5)
 * Mengubah format: 08..., +628..., 8... -> 628...
 */
export function normalizeWhatsAppPhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

/**
 * Validasi format slug toko (Micro-Spec 9 & Database Constraint)
 * Wajib: huruf kecil, angka, strip tunggal di tengah, panjang 3-30 karakter
 */
export function isValidSlug(slug: string): boolean {
  if (slug.length < 3 || slug.length > 30) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Membentuk URL pesan WhatsApp checkout otomatis
 */
export function generateWhatsAppOrderUrl(
  phone: string,
  storeName: string,
  items: { name: string; quantity: number; price: number }[],
  totalAmount: number,
  customerNotes?: string
): string {
  const normalizedPhone = normalizeWhatsAppPhone(phone);
  
  let text = `Halo *${storeName}*, saya mau pesan melalui website:\n\n`;
  items.forEach((item, index) => {
    text += `${index + 1}. *${item.name}* (${item.quantity}x) = ${formatRupiah(item.price * item.quantity)}\n`;
  });
  text += `\n*Total Tagihan:* ${formatRupiah(totalAmount)}\n`;
  
  if (customerNotes && customerNotes.trim()) {
    text += `*Catatan:* ${customerNotes.trim()}\n`;
  }
  text += `\nMohon konfirmasi ketersediaan pesanan saya ya, terima kasih!`;

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`;
}
