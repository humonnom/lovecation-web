'use client';

import { LocaleSwitcher } from '../LocaleSwitcher';
import { useHeader } from '@/lib/providers/HeaderProvider';
import { Z_INDEX } from '@/constants/zIndex';
import {AnimatePresence, motion} from "motion/react";
import {usePathname} from "@/i18n/navigation";

const getBasePath = (pathname: string) => {
    return pathname.split('/')[1];
}

export const Header = () => {
  const { title, subtitle } = useHeader();
  const pathname  = usePathname();

  if (['user-detail'].includes(getBasePath(pathname))) {
      return null;
  }

  return (
    <header
      className={`sticky top-0 ${Z_INDEX.HEADER} flex flex-row justify-between items-start px-5 pt-3 pb-0 bg-background border-b border-border`}
    >
      <div className="flex-1 min-w-0 h-[60px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${title}-${subtitle}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h1 className="text-[24px] font-bold text-[#333] leading-[28px] mb-0.5 line-clamp-1">
              {title}
            </h1>
            <p className="text-sm text-[#666] leading-[20px] line-clamp-1">
              {subtitle || '\u00A0'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="ml-3 flex-shrink-0">
        <LocaleSwitcher />
      </div>
    </header>
  );
};
