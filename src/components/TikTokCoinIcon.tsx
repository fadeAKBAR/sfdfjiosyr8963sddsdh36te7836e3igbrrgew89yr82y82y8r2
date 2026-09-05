import React from 'react';

interface TikTokCoinIconProps {
  className?: string;
  size?: number;
}

export const TikTokCoinIcon: React.FC<TikTokCoinIconProps> = ({
  className = 'w-6 h-6',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
    >
      <circle cx="24" cy="24" r="23" fill="url(#coin_gold_grad_outer)" stroke="#B37D00" strokeWidth="2" />
      <circle cx="24" cy="24" r="18.5" fill="url(#coin_gold_grad_inner)" stroke="#FFD850" strokeWidth="1.5" />
      
      {/* Embossed inner star and stylized T */}
      <path
        d="M24 12L27.2 19.5L35 20.3L29.2 25.5L30.8 33.2L24 29.2L17.2 33.2L18.8 25.5L13 20.3L20.8 19.5L24 12Z"
        fill="url(#coin_star_grad)"
        stroke="#A77400"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3.5" fill="#FFEAA5" />

      <defs>
        <linearGradient id="coin_gold_grad_outer" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE066" />
          <stop offset="0.5" stopColor="#F5B301" />
          <stop offset="1" stopColor="#B37400" />
        </linearGradient>
        <linearGradient id="coin_gold_grad_inner" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1AA" />
          <stop offset="0.45" stopColor="#FFC820" />
          <stop offset="1" stopColor="#D98A00" />
        </linearGradient>
        <linearGradient id="coin_star_grad" x1="16" y1="14" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDE6" />
          <stop offset="0.6" stopColor="#F5B505" />
          <stop offset="1" stopColor="#A86E00" />
        </linearGradient>
      </defs>
    </svg>
  );
};
