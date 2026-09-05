import React, { useState } from 'react';
import { TikTokUser, CoinPackage, PaymentMethodId } from '../types';
import { PAYMENT_METHODS } from '../data/mockData';
import { TikTokCoinIcon } from './TikTokCoinIcon';
import {
  CreditCard,
  Wallet,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { playClickSound, playWarningSound, playCoinSelectSound } from '../utils/soundEffects';

interface CheckoutSectionProps {
  user: TikTokUser | null;
  selectedPackage: CoinPackage | null;
  usdBalance: number;
  onOpenBalanceModal: () => void;
  onProcessPayment: (method: PaymentMethodId) => void;
  isProcessing: boolean;
}

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({
  user,
  selectedPackage,
  usdBalance,
  onOpenBalanceModal,
  onProcessPayment,
  isProcessing,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('balance');

  const price = selectedPackage?.priceUSD || 0;
  const isBalanceSufficient = usdBalance >= price;

  const handlePayClick = () => {
    if (!user) {
      playWarningSound();
      alert('Please enter and verify a TikTok username in Step 1 first!');
      const input = document.getElementById('tiktok-username-input');
      input?.focus();
      return;
    }

    if (!selectedPackage) {
      playWarningSound();
      alert('Please choose a coin package in Step 2 first!');
      return;
    }

    if (selectedMethod === 'balance' && !isBalanceSufficient) {
      playWarningSound();
      alert(
        `Your USD balance ($${usdBalance.toFixed(2)}) is insufficient for this purchase ($${price.toFixed(
          2
        )}). Click Top Up to add funds, or choose another payment method.`
      );
      return;
    }

    playClickSound();
    onProcessPayment(selectedMethod);
  };

  return (
    <section id="checkout-section" className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs mb-4 sm:mb-6 text-[#1A1A1A]">
      <div className="mb-4 sm:mb-6">
        <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5 sm:mb-1">
          Payment & Confirmation
        </span>
        <h2 className="text-base sm:text-lg font-extrabold text-[#1A1A1A] flex items-center gap-2">
          <span>Payment Method & Confirmation</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Select your preferred payment method to complete the coin top-up transaction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Payment Methods List */}
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
          <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
            Available Payment Methods:
          </label>

          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod === method.id;
            const isBalanceOption = method.id === 'balance';

            return (
              <div
                key={method.id}
                id={`payment-method-${method.id}`}
                onClick={() => {
                  playCoinSelectSound();
                  setSelectedMethod(method.id);
                }}
                role="button"
                tabIndex={0}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border cursor-pointer transition-all active:scale-[0.99] select-none ${
                  isSelected
                    ? 'bg-gray-50 border-[#FE2C55] ring-2 ring-[#FE2C55]/10 shadow-2xs'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-3.5">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border ${
                      isBalanceOption
                        ? 'bg-emerald-50 text-[#10B981] border-emerald-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {isBalanceOption ? (
                      <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-bold text-sm sm:text-base text-[#1A1A1A]">
                        {method.name}
                      </span>
                      {isBalanceOption && (
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                            isBalanceSufficient
                              ? 'bg-emerald-50 text-[#10B981] border border-emerald-200'
                              : 'bg-rose-50 text-rose-600 border border-rose-200'
                          }`}
                        >
                          ${usdBalance.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500">{method.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center pl-2">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#FE2C55] bg-[#FE2C55]'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Insufficient balance hint with shortcut to add balance */}
          {selectedMethod === 'balance' && !isBalanceSufficient && selectedPackage && (
            <div className="p-3 sm:p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900 gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span className="text-[11px] sm:text-xs leading-tight">
                  Balance short by ${(price - usdBalance).toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onOpenBalanceModal();
                }}
                className="underline font-bold text-amber-800 hover:text-amber-950 shrink-0 text-xs cursor-pointer"
              >
                Top Up USD
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Card (Clean Minimalism signature black card) */}
        <div className="lg:col-span-5 bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-5 pb-2.5 sm:pb-3 border-b border-neutral-800">
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Order Summary
              </span>
              <span className="text-[9px] sm:text-[10px] bg-white/20 px-2 py-0.5 sm:py-1 rounded text-white font-bold tracking-tighter">
                SECURE SSL
              </span>
            </div>

            <div className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400">Recipient:</span>
                <span className="font-semibold text-white truncate max-w-[180px]">
                  {user ? user.username : <em className="text-gray-500">Not selected</em>}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400">Coins Package:</span>
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <TikTokCoinIcon size={16} />
                  <span>
                    {selectedPackage ? selectedPackage.coins.toLocaleString() : '0'} Coins
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400">Package Rate:</span>
                <span className="font-mono text-gray-200">${price.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400">Service Fee:</span>
                <span className="text-[#10B981] font-semibold">$0.00 (Free)</span>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-neutral-800 flex items-baseline justify-between">
                <div>
                  <span className="block font-bold text-white text-base sm:text-lg">Total Cost:</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-400">Includes all taxes & fees</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-2xl sm:text-3xl text-[#FE2C55]">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 block font-semibold">USD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-neutral-800">
            <button
              id="pay-now-btn"
              type="button"
              disabled={isProcessing || !selectedPackage}
              onClick={handlePayClick}
              className="w-full py-3.5 sm:py-4 bg-white text-black font-extrabold text-sm sm:text-base rounded-xl hover:bg-gray-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[48px]"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-black" />
                  <span>Pay ${price.toFixed(2)} USD</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>

            <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>Payments processed via secure encrypted gateway</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
