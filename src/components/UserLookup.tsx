import React, { useState } from 'react';
import { Search, CheckCircle2, RefreshCw } from 'lucide-react';
import { TikTokUser } from '../types';
import { getTikTokAvatarUrl, getFallbackAvatar } from '../data/mockData';
import { playKeyStrokeSound, playClickSound, playVerifiedSound } from '../utils/soundEffects';

interface UserLookupProps {
  user: TikTokUser | null;
  onUserChange: (user: TikTokUser | null) => void;
}

export const UserLookup: React.FC<UserLookupProps> = ({ user, onUserChange }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Quick suggestions for easy testing with real TikTok handles
  const quickSuggestions = ['tiktok', 'mrbeast', 'khaby.lame', 'bellapoarch', 'charlidamelio'];

  const handleLookup = (customName?: string) => {
    const rawName = (customName !== undefined ? customName : usernameInput).trim();
    if (!rawName) return;

    const cleanedUsername = rawName.replace(/^@+/, '').trim();
    if (!cleanedUsername) return;

    playClickSound();
    setIsSearching(true);
    setAvatarError(false);

    // Realistic lookup delay
    setTimeout(() => {
      // Deterministic stats for learning and demonstration
      let hash = 0;
      for (let i = 0; i < cleanedUsername.length; i++) {
        hash = (hash << 5) - hash + cleanedUsername.charCodeAt(i);
      }
      const absHash = Math.abs(hash);
      const followersNum = ((absHash % 950) + 50) / 10;
      const initialCoins = (absHash % 12) * 45;

      const formattedDisplayName = cleanedUsername
        .split(/[._-]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      // Live TikTok profile avatar via TikTok CDN / unavatar
      const liveAvatarUrl = getTikTokAvatarUrl(cleanedUsername);

      const newUser: TikTokUser = {
        username: `@${cleanedUsername}`,
        displayName: formattedDisplayName || cleanedUsername,
        avatarUrl: liveAvatarUrl,
        currentCoins: initialCoins,
        isVerified: absHash % 2 === 0,
        followers: `${followersNum.toFixed(1)}M Followers`,
      };

      onUserChange(newUser);
      setIsSearching(false);
      playVerifiedSound();
    }, 450);
  };

  const handleClear = () => {
    playClickSound();
    setUsernameInput('');
    setAvatarError(false);
    onUserChange(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playKeyStrokeSound();
    setUsernameInput(e.target.value);
  };

  return (
    <section className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs mb-4 sm:mb-6 text-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5 sm:mb-1">
            Recipient Account
          </span>
          <h2 className="text-base sm:text-lg font-extrabold text-[#1A1A1A] flex items-center gap-2">
            <span>TikTok Recipient Account</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Coins will be credited directly to this TikTok profile once the order is placed.
          </p>
        </div>

        {user && (
          <button
            id="change-account-btn"
            onClick={handleClear}
            className="self-start sm:self-auto text-xs text-gray-500 hover:text-black flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition font-bold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Account</span>
          </button>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLookup();
        }}
        className="flex flex-col sm:flex-row gap-2 sm:gap-2.5"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <span className="font-semibold text-sm">@</span>
          </div>
          <input
            id="tiktok-username-input"
            type="text"
            value={usernameInput}
            onChange={handleInputChange}
            placeholder="Enter TikTok username (e.g. mrbeast)"
            className="w-full pl-8 pr-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#1A1A1A] placeholder-gray-400 font-medium focus:outline-none focus:border-[#FE2C55] focus:bg-white transition text-sm sm:text-base"
          />
        </div>

        <button
          id="search-user-btn"
          type="submit"
          disabled={isSearching || !usernameInput.trim()}
          className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-black hover:bg-neutral-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-white text-sm flex items-center justify-center gap-2 transition shadow-xs cursor-pointer min-h-[44px]"
        >
          {isSearching ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Verify Account</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Suggestions Chips */}
      {!user && (
        <div className="mt-2.5 sm:mt-3 flex items-center flex-wrap gap-1.5 text-xs">
          <span className="text-gray-400 mr-1 font-medium text-[11px] sm:text-xs">Suggestions:</span>
          {quickSuggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                playClickSound();
                setUsernameInput(item);
                handleLookup(item);
              }}
              className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 transition font-medium text-[11px] sm:text-xs cursor-pointer"
            >
              <span>@{item}</span>
            </button>
          ))}
        </div>
      )}

      {/* Profile Card Preview (Clean Minimalism style: only photo and username) */}
      {user && (
        <div
          id="tiktok-user-card"
          className="mt-3.5 sm:mt-4 p-3.5 sm:p-4 bg-[#F8FAFC] rounded-xl sm:rounded-2xl border border-gray-200/90 flex items-center justify-between gap-3 animate-in fade-in duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="relative shrink-0">
              <img
                src={avatarError ? getFallbackAvatar(user.username) : user.avatarUrl}
                alt={user.username}
                onError={() => setAvatarError(true)}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-white object-cover shadow-2xs ring-2 ring-gray-100"
              />
              <span
                className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"
                title="Active TikTok Profile"
              />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-sm sm:text-base text-[#1A1A1A]">
                {user.username}
              </span>
              {user.isVerified && (
                <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-[#20D5EC]/15 rounded-full text-[10px] sm:text-[11px] font-bold text-cyan-800">
                  <CheckCircle2 className="w-3 h-3 text-cyan-600 stroke-[2.5]" />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
