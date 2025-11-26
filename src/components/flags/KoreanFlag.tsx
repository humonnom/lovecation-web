import * as React from 'react';

interface FlagProps {
  size?: number;
}

export const KoreanFlag = ({ size = 24 }: FlagProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="rounded-xl overflow-hidden">
      <circle cx="12" cy="12" r="12" fill="white" />

      {/* 태극 - blue */}
      <path
        transform="rotate(120 12 12)"
        d="M 12 7 A 5 5 0 0 1 12 17 A 2.5 2.5 0 0 0 12 12 A 2.5 2.5 0 0 1 12 7 Z"
        fill="#003478"
      />

      {/* 태극 - red */}
      <path
        transform="rotate(-60 12 12)"
        d="M 12 7 A 5 5 0 0 1 12 17 A 2.5 2.5 0 0 0 12 12 A 2.5 2.5 0 0 1 12 7 Z"
        fill="#C60C30"
      />
    </svg>
  );
};
