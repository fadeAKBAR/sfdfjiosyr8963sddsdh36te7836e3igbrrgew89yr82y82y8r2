import { CoinPackage, PaymentMethod } from '../types';

export const COIN_PACKAGES: CoinPackage[] = [
  { id: 'pkg-70', coins: 70, priceUSD: 0.74 },
  { id: 'pkg-350', coins: 350, priceUSD: 3.70 },
  { id: 'pkg-700', coins: 700, priceUSD: 7.40, badge: 'Popular' },
  { id: 'pkg-1400', coins: 1400, priceUSD: 14.80, badge: 'Save 2%' },
  { id: 'pkg-3500', coins: 3500, priceUSD: 37.00 },
  { id: 'pkg-7000', coins: 7000, priceUSD: 74.00, badge: 'Best Value' },
  { id: 'pkg-17500', coins: 17500, priceUSD: 185.00, badge: 'Super Saver' },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'balance',
    name: 'USD Wallet Balance (Your Funds)',
    iconType: 'wallet',
    subtitle: 'Pay directly using your USD wallet balance',
  },
  {
    id: 'credit_card',
    name: 'Credit / Debit Card',
    iconType: 'card',
    subtitle: 'Visa, Mastercard, JCB, American Express',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    iconType: 'paypal',
    subtitle: 'Fast and secure checkout via PayPal',
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    iconType: 'google',
    subtitle: 'Instant one-touch verification',
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    iconType: 'apple',
    subtitle: 'Biometric Face ID & Touch ID security',
  },
];

/**
 * Returns the live TikTok profile picture from TikTok's CDN via unavatar.
 */
export function getTikTokAvatarUrl(username: string): string {
  const clean = username.trim().toLowerCase().replace(/^@+/, '') || 'tiktok';
  return `https://unavatar.io/tiktok/${encodeURIComponent(clean)}`;
}

/**
 * Reliable fallback avatar if an account doesn't exist or is unreachable.
 */
export function getFallbackAvatar(username: string): string {
  const clean = username.trim().toLowerCase().replace(/^@+/, '') || 'user';
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(clean)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffe8ec`;
}

// Backwards compatibility alias
export const getAvatarUrl = getTikTokAvatarUrl;
