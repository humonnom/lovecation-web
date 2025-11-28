'use client';

import { usePathname } from '@/i18n/navigation';
import { MainHeader } from './MainHeader';

export const HeaderWrapper = () => {
  const pathname = usePathname();

  const hideMainHeader = () => {
    const segments = pathname.split('/').filter(Boolean);

    // /chat/[id] 패턴
    if (segments.length === 2 && segments[0] === 'chat') {
      return true;
    }

    // /user-detail/[id]
    if (segments.length === 2 && segments[0] === 'user-detail') {
      return true;
    }

    return false;
  };

  return hideMainHeader() ? null : <MainHeader />;
};
