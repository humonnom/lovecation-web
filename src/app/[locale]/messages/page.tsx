'use client';

import { MarketingPage } from '@/components/MarketingPage';
import {useTranslations} from "next-intl";

export default function Message() {
  const t = useTranslations('tabs');

  return (
    <MarketingPage
      featureName={t('message')}
      icon="favorite"
    />
  );
}
