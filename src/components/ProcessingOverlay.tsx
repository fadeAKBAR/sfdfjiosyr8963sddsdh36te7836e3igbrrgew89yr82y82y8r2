import React, { useEffect, useState } from 'react';
import { TikTokCoinIcon } from './TikTokCoinIcon';
import { CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { playScanBeepSound, playVerifiedSound } from '../utils/soundEffects';

interface ProcessingOverlayProps {
  isProcessing: boolean;
  username: string;
  coins: number;
  amountUSD: number;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  isProcessing,
  username,
  coins,
  amountUSD,
}) => {
  const [phase, setPhase] = useState<number>(0);

  const phases = [
    { title: 'Detecting Face ID...', subtitle: 'Position face within the biometric frame', verified: false },
    { title: 'Analyzing Facial Biometrics...', subtitle: 'Mapping 30,000+ infrared depth points', verified: false },
    { title: 'Authenticating Biometrics...', subtitle: 'Secure Enclave token verification', verified: false },
    { title: 'Face ID Verified ✓', subtitle: `Crediting +${coins.toLocaleString()} Coins to ${username}`, verified: true },
  ];

  useEffect(() => {
    if (!isProcessing) {
      setPhase(0);
      return;
    }

    playScanBeepSound(800);

    const t1 = setTimeout(() => {
      setPhase(1);
      playScanBeepSound(1050);
    }, 600);

    const t2 = setTimeout(() => {
      setPhase(2);
      playScanBeepSound(1300);
    }, 1400);

    const t3 = setTimeout(() => {
      setPhase(3);
      playVerifiedSound();
    }, 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isProcessing, coins, username]);

  if (!isProcessing) return null;

  const currentPhase = phases[phase] || phases[0];
  const isVerified = currentPhase.verified;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-sm w-full text-center text-[#1A1A1A] shadow-2xl animate-in zoom-in-95 max-h-[95vh] overflow-y-auto">
        {/* Face ID Viewfinder Frame */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-5 flex items-center justify-center">
          {/* Scanner Corner Brackets */}
          <div
            className={`absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-t-4 border-l-4 rounded-tl-xl transition-colors duration-300 ${
              isVerified ? 'border-[#10B981]' : 'border-[#20D5EC]'
            }`}
          />
          <div
            className={`absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-t-4 border-r-4 rounded-tr-xl transition-colors duration-300 ${
              isVerified ? 'border-[#10B981]' : 'border-[#20D5EC]'
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-b-4 border-l-4 rounded-bl-xl transition-colors duration-300 ${
              isVerified ? 'border-[#10B981]' : 'border-[#20D5EC]'
            }`}
          />
          <div
            className={`absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-b-4 border-r-4 rounded-br-xl transition-colors duration-300 ${
              isVerified ? 'border-[#10B981]' : 'border-[#20D5EC]'
            }`}
          />

          {/* Central Target Face Mesh Graphic */}
          <div
            className={`w-22 h-22 sm:w-26 sm:h-26 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
              isVerified ? 'bg-emerald-50 text-[#10B981]' : 'bg-gray-50 text-gray-400'
            }`}
          >
            {/* Animated Laser Scanning Beam */}
            {!isVerified && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#20D5EC] to-transparent shadow-[0_0_8px_#20D5EC] animate-bounce" />
            )}

            {isVerified ? (
              <div className="flex flex-col items-center justify-center animate-in zoom-in-75 duration-200">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-[#10B981] stroke-[2.5]" />
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center">
                {/* SVG Biometric Face Wireframe */}
                <svg
                  className="w-12 h-12 sm:w-14 sm:h-14 text-gray-700 animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 10h.01" />
                  <path d="M15 10h.01" />
                  <path d="M10 14a2 2 0 0 0 4 0" />
                  <path d="M8 3a5 5 0 0 0-5 5v1a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5z" />
                  <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
                </svg>

                {/* Radar ring pulse */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping" />
              </div>
            )}
          </div>
        </div>

        {/* Biometric Title & Subtitle */}
        <div className="mb-3.5 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-1.5 sm:mb-2 bg-gray-100 text-gray-700">
            <Lock className="w-3 h-3 text-[#10B981]" />
            <span>Biometric Face Recognition</span>
          </div>

          <h3
            className={`font-black text-base sm:text-xl transition-colors duration-200 leading-tight ${
              isVerified ? 'text-[#10B981]' : 'text-[#1A1A1A]'
            }`}
          >
            {currentPhase.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">{currentPhase.subtitle}</p>
        </div>

        {/* Order Details Briefing */}
        <div className="p-3 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 text-left mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-xs text-gray-500">
          <div className="flex justify-between items-center text-[11px] sm:text-xs">
            <span>Payment Total:</span>
            <span className="font-extrabold text-[#10B981]">${amountUSD.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between items-center text-[11px] sm:text-xs">
            <span>Coins Package:</span>
            <span className="font-extrabold text-[#1A1A1A] flex items-center gap-1">
              <TikTokCoinIcon size={14} />+{coins.toLocaleString()} Coins
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px] sm:text-xs">
            <span>TikTok Recipient:</span>
            <span className="font-bold text-[#1A1A1A]">@{username}</span>
          </div>
        </div>

        {/* Trust & Encryption Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span>FIDO2 / Biometric 256-bit Encrypted</span>
        </div>
      </div>
    </div>
  );
};
