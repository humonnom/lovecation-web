'use client';

import { MarketingPage } from '@/components/MarketingPage';
import { useTranslations } from 'next-intl';

export default function MyProfile() {
  const t = useTranslations('tabs');

  return <MarketingPage featureName={t('profile')} />;
}
