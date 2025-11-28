'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Z_INDEX } from '@/constants/zIndex';
import { ReactNode } from 'react';

type Props = {
  loading?: boolean;
  centerElement?: ReactNode;
  rightElement?: ReactNode;
  onBackClick?: () => void;
};

export const DetailHeader = ({ loading, centerElement, rightElement, onBackClick }: Props) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className={`sticky top-0 ${Z_INDEX.HEADER} bg-background border-b border-border`}>
      <div className="flex items-center h-14 px-4">
        {loading ? (
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <button
            onClick={handleBackClick}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
        )}
        {centerElement && <div className="flex-1 ml-2">{centerElement}</div>}
        {rightElement && <div className="ml-auto">{rightElement}</div>}
      </div>
    </header>
  );
};
