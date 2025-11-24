'use client';

import { LocaleSwitcher } from '../LocaleSwitcher';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="flex flex-row justify-between items-start px-5 py-[15px] bg-background">
      <div className="flex-1">
        <h1 className="text-[28px] font-bold text-[#333] mb-1">
          {title}
        </h1>
        <p className="text-base text-[#666]">
          {subtitle}
        </p>
      </div>

      <div className="ml-3">
        <LocaleSwitcher />
      </div>
    </header>
  );
};
