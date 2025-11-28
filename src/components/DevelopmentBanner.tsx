'use client';

import { Construction } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const DevelopmentBanner = () => {
  const t = useTranslations('common');

  return (
    <div className="flex flex-row items-center justify-center bg-[#FFF3E0] py-3 px-5 mt-2.5 rounded-xl gap-2">
      <Construction className="text-[#FF9800]" size={24} />
      <span className="text-sm text-[#FF9800] font-semibold">{t('inDevelopment')}</span>
    </div>
  );
};
