import React, { useState } from 'react';
import { X, Wallet, PlusCircle, Check } from 'lucide-react';

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

  if (!isOpen) return null;

  const quickPresets = [50, 100, 250, 500, 1000, 2500];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(balanceInput);
    if (!isNaN(parsed) && parsed >= 0) {
      onSaveBalance(parsed);
      onClose();
    } else {
      alert('Please enter a valid dollar amount!');
    }
  };

  const handleQuickAdd = (amount: number) => {
    const current = parseFloat(balanceInput) || 0;
    const next = current + amount;
    setBalanceInput(next.toFixed(2));
  };

  const handleSetPreset = (amount: number) => {
    setBalanceInput(amount.toFixed(2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl p-6 shadow-xl text-[#1A1A1A]">
        {/* Close Button */}
        <button
          id="close-balance-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] border border-emerald-100 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#1A1A1A]">Top Up USD Balance</h3>
            <p className="text-xs text-gray-500">
              Customize or top up your available USD wallet funds for coin orders.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
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
                onChange={(e) => setBalanceInput(e.target.value)}
                placeholder="0.00"
                autoFocus
                className="w-full pl-9 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#1A1A1A] font-extrabold text-xl focus:outline-none focus:border-[#10B981] focus:bg-white shadow-2xs"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400 text-xs font-semibold">
                USD
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <span className="block text-xs font-semibold text-gray-400 mb-2">Quick Presets:</span>
            <div className="grid grid-cols-3 gap-2">
              {quickPresets.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleSetPreset(amount)}
                  className="py-2 px-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-200 transition cursor-pointer"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Quick add */}
          <div>
            <span className="block text-xs font-semibold text-gray-400 mb-2">Or Add to Balance:</span>
            <div className="flex gap-2">
              {[+10, +50, +100].map((add) => (
                <button
                  key={add}
                  type="button"
                  onClick={() => handleQuickAdd(add)}
                  className="flex-1 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>+${add}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="save-balance-btn"
              type="submit"
              className="flex-1 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-extrabold text-sm transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
