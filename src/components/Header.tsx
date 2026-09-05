import React from 'react';
import { Wallet, History, Plus } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 text-[#1A1A1A] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* TikTok Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#000000] rounded-lg flex items-center justify-center shadow-xs">
            {/* Custom TikTok stylized note */}
            <svg
              className="w-6 h-6"
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
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                CoinHub<span className="text-[#FE2C55]">.</span>
              </span>
              <span className="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-gray-200">
                TikTok Recharge
              </span>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">
              Official Web Coin Recharge Portal
            </p>
          </div>
        </div>

        {/* Action Controls & Dollar Balance */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Current Wallet / USD Balance Badge with Wallet Icon and Top Up Action */}
          <div
            id="usd-balance-badge"
            className="flex items-center gap-3 bg-gray-50 border border-gray-200/80 rounded-2xl pl-3 pr-2 py-1.5 shadow-2xs"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Wallet Balance
              </span>
              <span className="text-base sm:text-lg font-bold text-[#10B981]">
                ${usdBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Direct TopUp Button replacing the pencil */}
            <button
              id="top-up-balance-header-btn"
              type="button"
              onClick={onOpenBalanceModal}
              className="flex items-center gap-1 bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-2xs cursor-pointer ml-1"
              title="Top Up USD Balance"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Top Up</span>
            </button>
          </div>

          {/* Transaction History Button */}
          <button
            id="transaction-history-btn"
            onClick={onOpenHistoryModal}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
            title="View Transaction History"
          >
            <History className="w-4 h-4 sm:w-5 sm:h-5" />
            {transactionCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FE2C55] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {transactionCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
