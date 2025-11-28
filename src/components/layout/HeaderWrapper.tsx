'use client';

import { usePathname } from '@/i18n/navigation';
import { Header } from './Header';

export const HeaderWrapper = () => {
  const pathname = usePathname();

  // chat/[id] 또는 user-detail/[id] 페이지인지 확인
  const isSimpleHeaderPage = () => {
    const segments = pathname.split('/').filter(Boolean);

    // /chat/[id] 패턴 (locale 제외됨)
    if (segments.length === 2 && segments[0] === 'chat') {
      return 'custom';
    }

    // /user-detail/[id] 패턴 (locale 제외됨)
    if (segments.length === 2 && segments[0] === 'user-detail') {
      return 'custom';
    }

    return 'default';
  };

  return isSimpleHeaderPage() === 'custom' ? null : <Header />;
};
