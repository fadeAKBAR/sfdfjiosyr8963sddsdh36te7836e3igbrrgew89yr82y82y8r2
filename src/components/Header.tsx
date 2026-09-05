import React from 'react';
import { Wallet, History, Plus } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

interface HeaderProps {
  usdBalance: number;
  onOpenBalanceModal: () => void;
  onOpenHistoryModal: () => void;
  transactionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  usdBalance,
  onOpenBalanceModal,
  onOpenHistoryModal,
  transactionCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 text-[#1A1A1A] shadow-2xs">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* TikTok Brand Logo */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#000000] rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xs shrink-0">
            {/* Custom TikTok stylized note */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.893 2.893 0 0 1 2.308-4.639c.319 0 .628.052.917.147V9.428a6.34 6.34 0 0 0-.917-.067c-3.527 0-6.388 2.861-6.388 6.389 0 3.527 2.861 6.388 6.388 6.388 3.528 0 6.389-2.861 6.389-6.388V9.117a8.214 8.214 0 0 0 4.719 1.484V7.156a4.836 4.836 0 0 1-1-.47z"
                fill="#FE2C55"
              />
              <path
                d="M18.589 5.686a4.793 4.793 0 0 1-3.77-4.245V1h-1.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.893 2.893 0 0 1 2.308-4.639c.319 0 .628.052.917.147V8.428a6.34 6.34 0 0 0-.917-.067c-3.527 0-6.388 2.861-6.388 6.389 0 3.527 2.861 6.388 6.388 6.388 3.528 0 6.389-2.861 6.389-6.388V8.117a8.214 8.214 0 0 0 4.719 1.484V6.156a4.836 4.836 0 0 1-1-.47z"
                fill="#25F4EE"
                style={{ mixBlendMode: 'screen' }}
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#1A1A1A]">
                CoinHub<span className="text-[#FE2C55]">.</span>
              </span>
              <span className="bg-gray-100 text-gray-700 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border border-gray-200">
                Recharge
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden md:block">
              Official Web Coin Recharge Portal
            </p>
          </div>
        </div>

        {/* Action Controls & Dollar Balance */}
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          {/* Current Wallet / USD Balance Badge with Wallet Icon and Top Up Action */}
          <div
            id="usd-balance-badge"
            className="flex items-center gap-1.5 sm:gap-2.5 bg-gray-50 border border-gray-200/90 rounded-xl sm:rounded-2xl pl-2 sm:pl-3 pr-1.5 sm:pr-2 py-1 sm:py-1.5 shadow-2xs"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100 shrink-0">
              <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-bold hidden sm:inline">
                Wallet Balance
              </span>
              <span className="text-sm sm:text-lg font-black text-[#10B981]">
                ${usdBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Direct TopUp Button */}
            <button
              id="top-up-balance-header-btn"
              type="button"
              onClick={() => {
                playClickSound();
                onOpenBalanceModal();
              }}
              className="flex items-center gap-1 bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl transition shadow-2xs cursor-pointer ml-0.5 min-h-[32px]"
              title="Top Up USD Balance"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden xs:inline">Top Up</span>
            </button>
          </div>

          {/* Transaction History Button */}
          <button
            id="transaction-history-btn"
            onClick={() => {
              playClickSound();
              onOpenHistoryModal();
            }}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors active:scale-95 cursor-pointer shrink-0"
            title="View Transaction History"
            aria-label="Transaction History"
          >
            <History className="w-4 h-4 sm:w-5 sm:h-5" />
            {transactionCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FE2C55] text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {transactionCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
