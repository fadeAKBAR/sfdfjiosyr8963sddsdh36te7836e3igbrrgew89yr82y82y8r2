export interface CoinPackage {
  id: string;
  coins: number;
  priceUSD: number;
  badge?: string;
  isPopular?: boolean;
  bonusCoins?: number;
}

export interface TikTokUser {
  username: string;
  displayName: string;
  avatarUrl: string;
  currentCoins: number;
  isVerified: boolean;
  followers: string;
}

export type PaymentMethodId = 'balance' | 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  iconType: 'wallet' | 'card' | 'paypal' | 'apple' | 'google';
  subtitle?: string;
}

export interface TransactionRecord {
  id: string;
  timestamp: number;
  username: string;
  coins: number;
  amountUSD: number;
  paymentMethod: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}
