'use client';

import { LocaleSwitcher } from '../LocaleSwitcher';
import { useHeader } from '@/lib/providers/HeaderProvider';

export const Header = () => {
  const { title, subtitle } = useHeader();

  return (
    <header className="sticky top-0 z-50 flex flex-row justify-between items-start px-5 py-[15px] bg-background border-b border-border">
      <div className="flex-1">
        <h1 className="text-[28px] font-bold text-[#333] mb-1">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-[#666]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="ml-3">
        <LocaleSwitcher />
      </div>
    </header>
  );
};
