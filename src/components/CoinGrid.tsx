import React, { useState } from 'react';
import { CoinPackage } from '../types';
import { COIN_PACKAGES } from '../data/mockData';
import { TikTokCoinIcon } from './TikTokCoinIcon';
import { Check, Sliders, Sparkles } from 'lucide-react';

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

  const handleCustomChange = (val: number) => {
    const validVal = Math.max(30, isNaN(val) ? 30 : val);
    setCustomCoins(validVal);
    const customPkg: CoinPackage = {
      id: 'custom-package',
      coins: validVal,
      priceUSD: calculateCustomPrice(validVal),
      badge: 'Kustom',
    };
    onSelectPackage(customPkg);
  };

  const selectCustomMode = () => {
    setIsCustom(true);
    const customPkg: CoinPackage = {
      id: 'custom-package',
      coins: customCoins,
      priceUSD: calculateCustomPrice(customCoins),
      badge: 'Kustom',
    };
    onSelectPackage(customPkg);
  };

  const selectPreset = (pkg: CoinPackage) => {
    setIsCustom(false);
    onSelectPackage(pkg);
  };

  return (
    <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs mb-6 text-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
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
          <div className="text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full self-start sm:self-auto flex items-center gap-1.5 border border-gray-200">
            <span className="text-gray-400">Selected:</span>
            <strong className="text-[#1A1A1A] font-bold">{selectedPackage.coins.toLocaleString()} Coins</strong>
            <span className="text-[#10B981] font-extrabold">(${selectedPackage.priceUSD.toFixed(2)})</span>
          </div>
        )}
      </div>

      {/* Grid of Coin Packages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {COIN_PACKAGES.map((pkg) => {
          const isSelected = !isCustom && selectedPackage?.id === pkg.id;

          return (
            <div
              key={pkg.id}
              id={`package-btn-${pkg.coins}`}
              onClick={() => selectPreset(pkg)}
              role="button"
              tabIndex={0}
              className={`relative cursor-pointer p-5 rounded-2xl flex flex-col items-center gap-3 transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-white border-2 border-[#FE2C55] shadow-md ring-2 ring-[#FE2C55]/10'
                  : 'bg-white border border-gray-100 hover:border-[#FE2C55] hover:shadow-md'
              }`}
            >
              {/* Badge if available */}
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FE2C55] text-white text-[9px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-2xs whitespace-nowrap">
                  {pkg.badge}
                </span>
              )}

              {/* Coin icon container */}
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                <TikTokCoinIcon size={26} />
              </div>

              {/* Coin quantity */}
              <span className={`font-bold text-base ${isSelected ? 'text-[#FE2C55]' : 'text-[#1A1A1A]'}`}>
                {pkg.coins.toLocaleString()} Coins
              </span>

              {/* Price in USD Pill */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
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
          className={`relative cursor-pointer p-5 rounded-2xl flex flex-col items-center gap-3 transition-all duration-200 select-none ${
            isCustom
              ? 'bg-white border-2 border-[#20D5EC] shadow-md ring-2 ring-[#20D5EC]/15'
              : 'bg-white border border-gray-100 hover:border-[#20D5EC] hover:shadow-md'
          }`}
        >
          {isCustom && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#20D5EC] text-cyan-950 text-[9px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-2xs whitespace-nowrap">
              Custom
            </span>
          )}

          <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600">
            <Sliders className="w-5 h-5" />
          </div>

          <span className="font-bold text-base text-[#1A1A1A]">
            Custom Amount
          </span>

          <span
            className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
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
        <div className="mt-5 p-5 rounded-xl bg-gray-50 border border-gray-200 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="w-full sm:w-auto">
              <label htmlFor="custom-coin-input" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Enter Custom Coins (Minimum 30 coins):
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="custom-coin-input"
                  type="number"
                  min="30"
                  max="1000000"
                  step="10"
                  value={customCoins}
                  onChange={(e) => handleCustomChange(parseInt(e.target.value, 10))}
                  className="w-40 px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-[#1A1A1A] font-bold text-base focus:outline-none focus:border-[#20D5EC] shadow-2xs"
                />
                <span className="text-sm font-semibold text-gray-500">Coins</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200">
              <div className="text-right">
                <span className="text-xs text-gray-400 block font-medium">Total Cost:</span>
                <span className="text-xl font-black text-[#10B981]">
                  ${calculateCustomPrice(customCoins).toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>

          {/* Quick preset buttons for custom */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-gray-400 font-medium">Quick amounts:</span>
            {[100, 250, 500, 1000, 2000, 5000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleCustomChange(preset)}
                className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                  customCoins === preset
                    ? 'bg-cyan-50 border-cyan-400 text-cyan-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {preset.toLocaleString()} coins
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
