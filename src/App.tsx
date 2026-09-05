import React, { useState, useEffect } from 'react';
import { TikTokUser, CoinPackage, TransactionRecord, PaymentMethodId } from './types';
import { COIN_PACKAGES, getAvatarUrl, PAYMENT_METHODS } from './data/mockData';
import { Header } from './components/Header';
import { UserLookup } from './components/UserLookup';
import { CoinGrid } from './components/CoinGrid';
import { CheckoutSection } from './components/CheckoutSection';
import { BalanceEditModal } from './components/BalanceEditModal';
import { ReceiptModal } from './components/ReceiptModal';
import { HistoryModal } from './components/HistoryModal';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { TikTokCoinIcon } from './components/TikTokCoinIcon';
import { ShieldAlert, Sparkles, HelpCircle, Info } from 'lucide-react';

export default function App() {
  // Free editable dollar balance (stored in localStorage or default $150.00)
  const [usdBalance, setUsdBalance] = useState<number>(() => {
    const saved = localStorage.getItem('tiktok_sim_usd_balance');
    return saved ? parseFloat(saved) : 150.0;
  });

  // Active TikTok user (null by default so user inputs their username)
  const [user, setUser] = useState<TikTokUser | null>(null);

  // Selected coin package (default to 700 coins)
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(
    () => COIN_PACKAGES[2] || COIN_PACKAGES[0]
  );

  // Transaction history
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    const saved = localStorage.getItem('tiktok_sim_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Modals state
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<TransactionRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Persist USD balance
  useEffect(() => {
    localStorage.setItem('tiktok_sim_usd_balance', usdBalance.toString());
  }, [usdBalance]);

  // Persist transactions
  useEffect(() => {
    localStorage.setItem('tiktok_sim_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handle payment processing with biometric Face ID authentication
  const handleProcessPayment = (methodId: PaymentMethodId) => {
    if (!user || !selectedPackage) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Deduct from dollar balance if user chose 'balance'
      if (methodId === 'balance') {
        setUsdBalance((prev) => Math.max(0, Number((prev - selectedPackage.priceUSD).toFixed(2))));
      }

      // Update current coins on the user account
      const updatedUser: TikTokUser = {
        ...user,
        currentCoins: user.currentCoins + selectedPackage.coins,
      };
      setUser(updatedUser);

      // Find method label
      const methodObj = PAYMENT_METHODS.find((m) => m.id === methodId);
      const methodName = methodObj ? methodObj.name : 'USD Wallet Balance';

      // Create transaction record
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const newTx: TransactionRecord = {
        id: `TKC-${randomNum}`,
        timestamp: Date.now(),
        username: user.username,
        coins: selectedPackage.coins,
        amountUSD: selectedPackage.priceUSD,
        paymentMethod: methodName,
        status: 'SUCCESS',
      };

      setTransactions((prev) => [newTx, ...prev]);
      setLastTransaction(newTx);
      setIsReceiptModalOpen(true);
    }, 2600);
  };

  const handleTopUpAgain = () => {
    setIsReceiptModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-[#FE2C55] selection:text-white pb-16">
      {/* Top Navigation Bar with Editable USD Balance */}
      <Header
        usdBalance={usdBalance}
        onOpenBalanceModal={() => setIsBalanceModalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        transactionCount={transactions.length}
      />

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-3.5 sm:px-6 pt-4 sm:pt-8">
        {/* Banner Notice / Quick Guide */}
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-gray-100 flex items-center justify-between gap-2.5 sm:gap-3 shadow-2xs">
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <TikTokCoinIcon size={20} className="sm:w-5 sm:h-5" />
            </div>
            <div className="text-xs sm:text-sm">
              <p className="font-extrabold text-[#1A1A1A] leading-tight">
                Get TikTok Coins at Better Rates via Web
              </p>
              <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5 leading-snug">
                Save up to 31% on processing fees compared to in-app mobile store purchases.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBalanceModalOpen(true)}
            className="shrink-0 text-[11px] sm:text-xs font-bold text-[#10B981] hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition active:scale-95 cursor-pointer"
          >
            Top Up USD
          </button>
        </div>

        {/* Step 1: Input TikTok Username & Profile Display */}
        <UserLookup user={user} onUserChange={setUser} />

        {/* Step 2: Coin Package Selection (Nominal Koin dalam USD) */}
        <CoinGrid
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
        />

        {/* Step 3: Checkout & Payment Process */}
        <CheckoutSection
          user={user}
          selectedPackage={selectedPackage}
          usdBalance={usdBalance}
          onOpenBalanceModal={() => setIsBalanceModalOpen(true)}
          onProcessPayment={handleProcessPayment}
          isProcessing={isProcessing}
        />

        {/* Informational FAQ / Security Note */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/80 text-xs text-gray-500 space-y-1.5 sm:space-y-2 text-center sm:text-left px-1">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-gray-700 font-bold text-xs">
            <Info className="w-3.5 h-3.5 text-[#FE2C55]" />
            <span>About TikTok Coins:</span>
          </div>
          <p className="leading-relaxed text-[11px] sm:text-xs">
            TikTok Coins allow you to send virtual gifts to your favorite creators during LIVE streams or on video comments. All transactions are securely processed with official USD rates.
          </p>
        </div>
      </main>

      {/* Processing Animation Modal */}
      <ProcessingOverlay
        isProcessing={isProcessing}
        username={user?.username || ''}
        coins={selectedPackage?.coins || 0}
        amountUSD={selectedPackage?.priceUSD || 0}
      />

      {/* Modal 1: Edit USD Balance */}
      <BalanceEditModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        currentBalance={usdBalance}
        onSaveBalance={(val) => setUsdBalance(val)}
      />

      {/* Modal 2: Success Receipt */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        transaction={lastTransaction}
        user={user}
        onOpenHistory={() => {
          setIsReceiptModalOpen(false);
          setIsHistoryModalOpen(true);
        }}
        onTopUpAgain={handleTopUpAgain}
      />

      {/* Modal 3: Transaction History Log */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        transactions={transactions}
        onClearHistory={() => setTransactions([])}
      />
    </div>
  );
}
