'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { useHeader } from '@/lib/providers/HeaderProvider';
import { Z_INDEX } from '@/constants/zIndex';

export const Header = () => {
  const { title, subtitle } = useHeader();

  return (
    <header className={`sticky top-0 ${Z_INDEX.HEADER} flex flex-row justify-between items-start px-5 py-[15px] bg-background border-b border-border`}>
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${title}-${subtitle}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h1 className="text-[28px] font-bold text-[#333] mb-1 line-clamp-1">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base text-[#666] line-clamp-1">
                {subtitle}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="ml-3 flex-shrink-0">
        <LocaleSwitcher />
      </div>
    </header>
  );
};
