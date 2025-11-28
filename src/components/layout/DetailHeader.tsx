'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type Props = {
  loading: boolean;
};

export const DetailHeader = ({ loading }: Props) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center h-14 px-4">
        {loading ? (
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
        )}
      </div>
    </header>
  );
};
