'use client';

import { MarketingPage } from '@/components/MarketingPage';
import { useTranslations } from 'next-intl';

export default function Matches() {
  const t = useTranslations('tabs');

  return <MarketingPage featureName={t('match')} />;
}
