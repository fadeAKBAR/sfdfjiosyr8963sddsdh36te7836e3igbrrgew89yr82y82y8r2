import React, { useState } from 'react';
import { TransactionRecord, TikTokUser } from '../types';
import { TikTokCoinIcon } from './TikTokCoinIcon';
import {
  CheckCircle2,
  X,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

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

  if (!isOpen || !transaction) return null;

  const formattedDate = new Date(transaction.timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const handleCopyReceipt = () => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xl text-[#1A1A1A] animate-in zoom-in-95 duration-200">
        {/* Top Accent Line */}
        <div className="bg-[#FE2C55] h-1.5 w-full" />

        {/* Close Button */}
        <button
          id="close-receipt-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Animated Success Badge */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>
              <div className="absolute -bottom-1 -right-1">
                <TikTokCoinIcon size={24} />
              </div>
            </div>

            <span className="text-xs uppercase font-extrabold tracking-widest text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Transaction Completed
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mt-2">
              Coin Top-Up Successful!
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              TikTok coins have been credited to the recipient account instantly.
            </p>
          </div>

          {/* Transaction Summary Card */}
          <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-4 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-mono font-bold text-gray-800">{transaction.id}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Timestamp:</span>
              <span className="text-gray-700">{formattedDate}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">TikTok Account:</span>
              <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                <span>{transaction.username}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Coins Added:</span>
              <div className="flex items-center gap-1 text-[#FE2C55] font-extrabold text-sm sm:text-base">
                <TikTokCoinIcon size={18} />
                <span>+{transaction.coins.toLocaleString()} Coins</span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Payment Method:</span>
              <span className="text-gray-800 font-semibold">{transaction.paymentMethod}</span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-bold text-gray-700">Total Amount Paid:</span>
              <span className="text-xl font-black text-[#10B981]">
                ${transaction.amountUSD.toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5">
            <button
              id="top-up-again-btn"
              onClick={onTopUpAgain}
              className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.99] cursor-pointer"
            >
              <TikTokCoinIcon size={18} />
              <span>Purchase More Coins</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="copy-receipt-btn"
                onClick={handleCopyReceipt}
                className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-gray-200 cursor-pointer"
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
                onClick={onOpenHistory}
                className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-gray-200 cursor-pointer"
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
