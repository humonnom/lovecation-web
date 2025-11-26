'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Construction } from 'lucide-react';
import { InterestSection } from './InterestSection';
import Image from 'next/image';
import { useHeader } from '@/lib/providers/HeaderProvider';
import { useEffect } from 'react';

interface MarketingPageProps {
  featureName: string;
}

export const MarketingPage = ({ featureName }: MarketingPageProps) => {
  const t = useTranslations();
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader(featureName, '');
  }, [setHeader, featureName]);

  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="px-5 pb-5 overflow-y-auto">
        {/* Development Banner */}
        <div className="flex flex-row items-center justify-center bg-[#FFF3E0] py-3 px-5 mt-2.5 rounded-xl gap-2">
          <Construction className="text-[#FF9800]" size={24} />
          <span className="text-sm text-[#FF9800] font-semibold">{t('common.inDevelopment')}</span>
        </div>

        {/* Main Content */}
        <div className="pt-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/lovecation-icon.png"
              alt="Lovecation Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">
            {t('common.featureInProgress', { feature: featureName })}
          </h2>

          {/* Subtitle */}
          <p className="text-base text-text-secondary text-center mb-10">
            {t('common.pleaseWait')}
          </p>

          {/* Interest Section */}
          <InterestSection />
        </div>
      </div>
    </div>
  );
};
