import React from 'react';
import { TransactionRecord } from '../types';
import { TikTokCoinIcon } from './TikTokCoinIcon';
import { X, History, Trash2, CheckCircle2, ArrowDownLeft } from 'lucide-react';
import { playClickSound, playWarningSound } from '../utils/soundEffects';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: TransactionRecord[];
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  transactions,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl text-[#1A1A1A] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#1A1A1A]">Coin Transaction History</h3>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Records of your completed coin purchases
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {transactions.length > 0 && (
              <button
                onClick={() => {
                  playWarningSound();
                  onClearHistory();
                }}
                className="text-xs text-rose-600 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 active:scale-95 flex items-center gap-1 transition font-bold cursor-pointer"
                title="Clear history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Clear</span>
              </button>
            )}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 active:scale-95 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 space-y-2.5 sm:space-y-3">
          {transactions.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <History className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-semibold text-gray-600">No transaction records found</p>
              <p className="text-xs text-gray-400 mt-1">
                Make your first coin top-up purchase today.
              </p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-gray-300 transition"
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <TikTokCoinIcon size={18} />
                    <span className="font-extrabold text-[#1A1A1A] text-sm sm:text-base">
                      +{tx.coins.toLocaleString()} Coins
                    </span>
                  </div>
                  <span className="font-black text-[#10B981] text-sm sm:text-base">
                    ${tx.amountUSD.toFixed(2)} USD
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-gray-800 font-bold">@{tx.username}</span>
                    <span>•</span>
                    <span className="capitalize">{tx.paymentMethod}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-gray-400">
                    {new Date(tx.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] sm:text-[11px]">
                  <span className="font-mono text-gray-400 truncate max-w-[150px]">{tx.id}</span>
                  <span className="text-[#10B981] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                    <span>SUCCESS</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 font-medium">
          Total Completed Orders: {transactions.length}
        </div>
      </div>
    </div>
  );
};
