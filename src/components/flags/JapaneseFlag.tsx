import * as React from 'react';

interface FlagProps {
  size?: number;
}

export const JapaneseFlag = ({ size = 24 }: FlagProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="rounded-xl overflow-hidden">
      <circle cx="12" cy="12" r="12" fill="white" />
      <circle cx="12" cy="12" r="5" fill="#BC002D" />
    </svg>
  );
};
