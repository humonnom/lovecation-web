'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { UserGrid } from '@/components/user';
import { UserCardSkeleton } from '@/components/skeletons';
import { useProfiles } from '@/hooks/queries';
import { useAuthStore } from '@/stores/authStore';

export default function ExplorePage() {
  const t = useTranslations();
  const session = useAuthStore((state) => state.session);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!session;

  // 로그인한 경우: 반대 성별, 비로그인: 모든 성별
  const getGenderFilter = () => {
    if (!isLoggedIn || !user?.user_metadata?.gender) {
      return null; // 모든 성별
    }
    // 반대 성별 반환
    return user.user_metadata.gender === 'male' ? 'female' : 'male';
  };

  const { profiles, loading, error } = useProfiles({ gender: getGenderFilter() });

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-background">
        <Header title={t('home.title')} subtitle={t('home.subtitle')} />
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-row flex-wrap px-2.5 pb-5 justify-between">
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col bg-background">
        <Header title={t('home.title')} subtitle={t('home.subtitle')} />
        <div className="flex-1 flex flex-col justify-center items-center px-5 gap-2">
          <p className="text-lg text-[#333] font-semibold text-center">
            {t('home.errorLoadingProfiles')}
          </p>
          <p className="text-sm text-[#666] text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <Header title={t('home.title')} subtitle={t('home.subtitle')} />
      <UserGrid users={profiles} />
    </div>
  );
}
