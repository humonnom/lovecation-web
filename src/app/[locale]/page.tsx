'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { UserGrid } from '@/components/user';
import { useProfiles } from '@/hooks/queries';
import { useAuthStore } from '@/stores/authStore';
import { useHeader } from '@/lib/providers/HeaderProvider';

export default function ExplorePage() {
  const t = useTranslations();
  const session = useAuthStore((state) => state.session);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!session;

  const { setHeader } = useHeader();
  const homeTitle = t('home.title');
  const homeSubtitle = t('home.subtitle');

  useEffect(() => {
    setHeader(homeTitle, homeSubtitle);
  }, [setHeader, homeTitle, homeSubtitle]);

  // 로그인한 경우: 반대 성별, 비로그인: 모든 성별
  const getGenderFilter = () => {
    if (!isLoggedIn || !user?.user_metadata?.gender) {
      return null; // 모든 성별
    }
    // 반대 성별 반환
    return user.user_metadata.gender === 'male' ? 'female' : 'male';
  };

  const { profiles, loading, error } = useProfiles({ gender: getGenderFilter() });

  return (
    <div className="flex-1 flex flex-col bg-background">
      {error && (
        <div className="flex-1 flex flex-col justify-center items-center px-5 gap-2">
          <p className="text-lg text-[#333] font-semibold text-center">
            {t('home.errorLoadingProfiles')}
          </p>
          <p className="text-sm text-[#666] text-center">{error}</p>
        </div>
      )}
      {!error && <UserGrid isLoading={loading} users={profiles} />}
    </div>
  );
}
