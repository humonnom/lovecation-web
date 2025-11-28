'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { InterestSection } from './InterestSection';
import { DevelopmentBanner } from './DevelopmentBanner';
import Image from 'next/image';
import { useHeader } from '@/lib/providers/HeaderProvider';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import AnimatedText from '@/components/AnimatedText';

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
        <DevelopmentBanner />

        {/* Main Content */}
        <div className="pt-10">
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Image
              src="/lovecation-icon.png"
              alt="Lovecation Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </motion.div>

          {/* Title */}
          <AnimatedText as={'h2'} className={'text-2xl font-bold text-foreground text-center mb-2'}>
            {t('common.featureInProgress', { feature: featureName })}
          </AnimatedText>

          {/* Subtitle */}
          <AnimatedText className="text-base text-text-secondary text-center mb-10">
            {t('common.pleaseWait')}
          </AnimatedText>

          <InterestSection />
        </div>
      </div>
    </div>
  );
};
