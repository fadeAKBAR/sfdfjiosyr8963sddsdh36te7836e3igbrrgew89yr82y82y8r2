import React, { useState } from 'react';
import { CoinPackage } from '../types';
import { COIN_PACKAGES } from '../data/mockData';
import { TikTokCoinIcon } from './TikTokCoinIcon';
import { Sliders } from 'lucide-react';
import { playCoinSelectSound, playKeyStrokeSound } from '../utils/soundEffects';

interface CoinGridProps {
  selectedPackage: CoinPackage | null;
  onSelectPackage: (pkg: CoinPackage) => void;
}

export const CoinGrid: React.FC<CoinGridProps> = ({
  selectedPackage,
  onSelectPackage,
}) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customCoins, setCustomCoins] = useState<number>(500);

  // Custom rate: ~0.01057 USD per coin, min 30 coins
  const calculateCustomPrice = (coins: number) => {
    return Number((coins * 0.01057).toFixed(2));
  };

  const handleCustomChange = (val: number, isTyping = false) => {
    if (isTyping) {
      playKeyStrokeSound();
    } else {
      playCoinSelectSound();
    }
    const validVal = Math.max(30, isNaN(val) ? 30 : val);
    setCustomCoins(validVal);
    const customPkg: CoinPackage = {
      id: 'custom-package',
      coins: validVal,
      priceUSD: calculateCustomPrice(validVal),
      badge: 'Custom',
    };
    onSelectPackage(customPkg);
  };

  const selectCustomMode = () => {
    playCoinSelectSound();
    setIsCustom(true);
    const customPkg: CoinPackage = {
      id: 'custom-package',
      coins: customCoins,
      priceUSD: calculateCustomPrice(customCoins),
      badge: 'Custom',
    };
    onSelectPackage(customPkg);
  };

  const selectPreset = (pkg: CoinPackage) => {
    playCoinSelectSound();
    setIsCustom(false);
    onSelectPackage(pkg);
  };

  return (
    <section className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs mb-4 sm:mb-6 text-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
        <div>
          <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5 sm:mb-1">
            Coin Packages
          </span>
          <h2 className="text-base sm:text-lg font-extrabold text-[#1A1A1A] flex items-center gap-2">
            <span>Select Coin Package</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Choose your preferred coin top-up denomination in US Dollars ($).
          </p>
        </div>

        {selectedPackage && (
          <div className="text-[11px] sm:text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full self-start sm:self-auto flex items-center gap-1.5 border border-gray-200">
            <span className="text-gray-400">Selected:</span>
            <strong className="text-[#1A1A1A] font-bold">{selectedPackage.coins.toLocaleString()} Coins</strong>
            <span className="text-[#10B981] font-extrabold">(${selectedPackage.priceUSD.toFixed(2)})</span>
          </div>
        )}
      </div>

      {/* Grid of Coin Packages - 2 columns on mobile, 3-4 on larger screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {COIN_PACKAGES.map((pkg) => {
          const isSelected = !isCustom && selectedPackage?.id === pkg.id;

          return (
            <div
              key={pkg.id}
              id={`package-btn-${pkg.coins}`}
              onClick={() => selectPreset(pkg)}
              role="button"
              tabIndex={0}
              className={`relative cursor-pointer p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col items-center gap-2 sm:gap-3 transition-all duration-150 select-none active:scale-[0.98] ${
                isSelected
                  ? 'bg-white border-2 border-[#FE2C55] shadow-xs ring-2 ring-[#FE2C55]/10'
                  : 'bg-white border border-gray-100 hover:border-[#FE2C55]/60 hover:shadow-xs'
              }`}
            >
              {/* Badge if available */}
              {pkg.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#FE2C55] text-white text-[8px] sm:text-[9px] font-black px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-2xs whitespace-nowrap">
                  {pkg.badge}
                </span>
              )}

              {/* Coin icon container */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                <TikTokCoinIcon size={22} className="sm:w-6 sm:h-6" />
              </div>

              {/* Coin quantity */}
              <span className={`font-black text-sm sm:text-base leading-tight ${isSelected ? 'text-[#FE2C55]' : 'text-[#1A1A1A]'}`}>
                {pkg.coins.toLocaleString()} Coins
              </span>

              {/* Price in USD Pill */}
              <span
                className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold transition-colors ${
                  isSelected
                    ? 'bg-[#FE2C55] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                ${pkg.priceUSD.toFixed(2)}
              </span>
            </div>
          );
        })}

        {/* Custom Amount Option */}
        <div
          id="custom-coin-package-card"
          onClick={selectCustomMode}
          role="button"
          tabIndex={0}
          className={`relative cursor-pointer p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col items-center gap-2 sm:gap-3 transition-all duration-150 select-none active:scale-[0.98] ${
            isCustom
              ? 'bg-white border-2 border-[#20D5EC] shadow-xs ring-2 ring-[#20D5EC]/15'
              : 'bg-white border border-gray-100 hover:border-[#20D5EC]/60 hover:shadow-xs'
          }`}
        >
          {isCustom && (
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#20D5EC] text-cyan-950 text-[8px] sm:text-[9px] font-black px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-2xs whitespace-nowrap">
              Custom
            </span>
          )}

          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600 shrink-0">
            <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <span className="font-black text-sm sm:text-base text-[#1A1A1A] leading-tight">
            Custom Amount
          </span>

          <span
            className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold transition-colors ${
              isCustom
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isCustom ? `${customCoins} Coins` : 'Custom'}
          </span>
        </div>
      </div>

      {/* Custom Input slider/number field if Custom is active */}
      {isCustom && (
        <div className="mt-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="w-full sm:w-auto">
              <label htmlFor="custom-coin-input" className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Enter Custom Coins (Min 30 coins):
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="custom-coin-input"
                  type="number"
                  min="30"
                  max="1000000"
                  step="10"
                  value={customCoins}
                  onChange={(e) => handleCustomChange(parseInt(e.target.value, 10), true)}
                  className="w-36 sm:w-40 px-3 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-xl text-[#1A1A1A] font-bold text-base focus:outline-none focus:border-[#20D5EC] shadow-2xs"
                />
                <span className="text-sm font-semibold text-gray-500">Coins</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2.5 sm:pt-0 border-gray-200">
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-gray-400 block font-medium">Total Cost:</span>
                <span className="text-lg sm:text-xl font-black text-[#10B981]">
                  ${calculateCustomPrice(customCoins).toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>

          {/* Quick preset buttons for custom */}
          <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs">
            <span className="text-gray-400 font-medium text-[11px]">Quick amounts:</span>
            {[100, 250, 500, 1000, 2000, 5000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleCustomChange(preset, false)}
                className={`px-2.5 py-1 sm:py-1.5 rounded-lg border font-semibold text-[11px] sm:text-xs transition-colors cursor-pointer active:scale-95 ${
                  customCoins === preset
                    ? 'bg-cyan-50 border-cyan-400 text-cyan-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
