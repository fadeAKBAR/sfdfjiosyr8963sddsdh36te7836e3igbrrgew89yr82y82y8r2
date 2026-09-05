import React, { useState } from 'react';
import { X, Wallet, PlusCircle, Check } from 'lucide-react';
import {
  playKeyStrokeSound,
  playCoinSelectSound,
  playClickSound,
  playVerifiedSound,
  playWarningSound,
} from '../utils/soundEffects';

interface BalanceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSaveBalance: (newBalance: number) => void;
}

export const BalanceEditModal: React.FC<BalanceEditModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onSaveBalance,
}) => {
  const [balanceInput, setBalanceInput] = useState<string>(currentBalance.toString());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPresets = [50, 100, 250, 500, 1000, 2500];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(balanceInput);
    if (!isNaN(parsed) && parsed >= 0) {
      playVerifiedSound();
      onSaveBalance(parsed);
      setErrorMessage(null);
      onClose();
    } else {
      playWarningSound();
      setErrorMessage('Please enter a valid positive dollar amount.');
    }
  };

  const handleQuickAdd = (amount: number) => {
    playCoinSelectSound();
    const current = parseFloat(balanceInput) || 0;
    const next = current + amount;
    setBalanceInput(next.toFixed(2));
    setErrorMessage(null);
  };

  const handleSetPreset = (amount: number) => {
    playCoinSelectSound();
    setBalanceInput(amount.toFixed(2));
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl text-[#1A1A1A] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="close-balance-modal-btn"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-gray-400 hover:text-black p-1.5 rounded-full hover:bg-gray-100 active:scale-95 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4 sm:mb-5 pr-8">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#10B981] border border-emerald-100 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg text-[#1A1A1A]">Top Up USD Balance</h3>
            <p className="text-[11px] sm:text-xs text-gray-500 leading-tight">
              Customize or top up your available USD wallet funds for coin orders.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              Wallet Balance (USD):
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#10B981] font-bold text-lg">
                $
              </div>
              <input
                id="usd-balance-input"
                type="number"
                step="0.01"
                min="0"
                value={balanceInput}
                onChange={(e) => {
                  playKeyStrokeSound();
                  setBalanceInput(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="0.00"
                autoFocus
                className="w-full pl-9 pr-14 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1A1A1A] font-extrabold text-lg sm:text-xl focus:outline-none focus:border-[#10B981] focus:bg-white shadow-2xs"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400 text-xs font-semibold">
                USD
              </div>
            </div>
            {errorMessage && (
              <p className="text-xs text-rose-600 font-medium mt-1">{errorMessage}</p>
            )}
          </div>

          {/* Quick presets */}
          <div>
            <span className="block text-[11px] sm:text-xs font-semibold text-gray-400 mb-1.5">Quick Presets:</span>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {quickPresets.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleSetPreset(amount)}
                  className="py-2 px-2 bg-gray-50 hover:bg-gray-100 active:scale-95 text-gray-700 text-xs font-bold rounded-lg border border-gray-200 transition cursor-pointer min-h-[38px]"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Quick add */}
          <div>
            <span className="block text-[11px] sm:text-xs font-semibold text-gray-400 mb-1.5">Or Add to Balance:</span>
            <div className="flex gap-1.5 sm:gap-2">
              {[+10, +50, +100].map((add) => (
                <button
                  key={add}
                  type="button"
                  onClick={() => handleQuickAdd(add)}
                  className="flex-1 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+${add}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-gray-100 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 sm:py-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-bold text-xs sm:text-sm transition cursor-pointer min-h-[44px]"
            >
              Cancel
            </button>
            <button
              id="save-balance-btn"
              type="submit"
              className="flex-1 py-2.5 sm:py-3 rounded-xl bg-black hover:bg-neutral-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Confirm Top Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
