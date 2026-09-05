import React, { useState, useEffect } from 'react';
import { TransactionRecord, TikTokUser } from '../types';
import { TikTokCoinIcon } from './TikTokCoinIcon';
import {
  CheckCircle2,
  X,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import { playClickSound, playVerifiedSound, playTransactionSuccessSound } from '../utils/soundEffects';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionRecord | null;
  user: TikTokUser | null;
  onOpenHistory: () => void;
  onTopUpAgain: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  transaction,
  user,
  onOpenHistory,
  onTopUpAgain,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && transaction) {
      playTransactionSuccessSound();
    }
  }, [isOpen, transaction]);

  if (!isOpen || !transaction) return null;

  const formattedDate = new Date(transaction.timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const handleCopyReceipt = () => {
    playVerifiedSound();
    const text = `--- TIKTOK COIN TOP-UP PAYMENT RECEIPT ---
Transaction ID : ${transaction.id}
Date & Time    : ${formattedDate}
TikTok Account : ${transaction.username}
Coins Purchased: +${transaction.coins.toLocaleString()} Coins
Total Paid     : $${transaction.amountUSD.toFixed(2)} USD
Payment Method : ${transaction.paymentMethod}
Status         : COMPLETED / SUCCESS
------------------------------------------`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl text-[#1A1A1A] animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Top Accent Line */}
        <div className="bg-[#FE2C55] h-1.5 w-full" />

        {/* Close Button */}
        <button
          id="close-receipt-modal-btn"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-black p-1.5 rounded-full hover:bg-gray-100 active:scale-95 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-6">
          {/* Animated Success Badge */}
          <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
            <div className="relative mb-2.5 sm:mb-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" />
              </div>
              <div className="absolute -bottom-1 -right-1">
                <TikTokCoinIcon size={22} />
              </div>
            </div>

            <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#10B981] bg-emerald-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-emerald-200">
              Transaction Completed
            </span>

            <h3 className="text-lg sm:text-2xl font-black text-[#1A1A1A] mt-2 leading-tight">
              Coin Top-Up Successful!
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-1 max-w-xs">
              TikTok coins have been credited to the recipient account instantly.
            </p>
          </div>

          {/* Transaction Summary Card */}
          <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 sm:p-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500 text-[11px] sm:text-xs">Transaction ID:</span>
              <span className="font-mono font-bold text-gray-800 text-[11px] sm:text-xs truncate max-w-[170px]">{transaction.id}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500 text-[11px] sm:text-xs">Timestamp:</span>
              <span className="text-gray-700 text-[11px] sm:text-xs">{formattedDate}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500 text-[11px] sm:text-xs">TikTok Account:</span>
              <div className="flex items-center gap-1 font-bold text-[#1A1A1A] text-[11px] sm:text-xs">
                <span>@{transaction.username}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500 text-[11px] sm:text-xs">Coins Added:</span>
              <div className="flex items-center gap-1 text-[#FE2C55] font-black text-sm sm:text-base">
                <TikTokCoinIcon size={16} />
                <span>+{transaction.coins.toLocaleString()} Coins</span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500 text-[11px] sm:text-xs">Payment Method:</span>
              <span className="text-gray-800 font-semibold text-[11px] sm:text-xs capitalize">{transaction.paymentMethod}</span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-bold text-gray-700 text-xs sm:text-sm">Total Amount Paid:</span>
              <span className="text-lg sm:text-xl font-black text-[#10B981]">
                ${transaction.amountUSD.toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5">
            <button
              id="top-up-again-btn"
              onClick={() => {
                playClickSound();
                onTopUpAgain();
              }}
              className="w-full py-3 sm:py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.98] cursor-pointer min-h-[44px]"
            >
              <TikTokCoinIcon size={18} />
              <span>Purchase More Coins</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="copy-receipt-btn"
                onClick={handleCopyReceipt}
                className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-gray-200 cursor-pointer min-h-[40px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#10B981]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy Receipt</span>
                  </>
                )}
              </button>

              <button
                id="view-history-from-receipt-btn"
                onClick={() => {
                  playClickSound();
                  onOpenHistory();
                }}
                className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-gray-200 cursor-pointer min-h-[40px]"
              >
                <span>View History</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
