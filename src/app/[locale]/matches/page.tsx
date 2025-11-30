'use client';

import { useEffect, useMemo, useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useProfiles } from '@/hooks/queries/useProfiles';
import { useHeader } from '@/lib/providers/HeaderProvider';
import userDetailData from '@/data/userDetailDummyData.json';
import { Profile } from '@/types/supabase';
import { MatchModal } from '@/components/matches/MatchModal';
import { ProfileCardFront } from '@/components/matches/ProfileCardFront';
import { ProfileCardBack } from '@/components/matches/ProfileCardBack';
import { HintBubble } from '@/components/common/HintBubble';
import { useRouter } from '@/i18n/navigation';
import { SwipeCard } from '@/components/matches/SwipeCard';

const PageContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <div
    className="fixed inset-0 bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center px-4"
    onClick={onClick}
  >
    {children}
  </div>
);

export default function SwipePage() {
  const locale = useLocale();
  const { setHeader } = useHeader();
  const t = useTranslations('match');

  // locale에 따라 gender 결정: ja -> male, ko -> female
  const targetGender = locale === 'ja' ? 'male' : 'female';

  const { profiles: dbProfiles, loading, error } = useProfiles({ gender: targetGender });

  const [currentIndex, setCurrentIndex] = useState(() => {
    // 페이지 로드 시 저장된 인덱스 복원
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('matchesCurrentIndex');
      if (saved) {
        localStorage.removeItem('matchesCurrentIndex');
        return parseInt(saved, 10);
      }
    }
    return 0;
  });
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();

  // userDetailData와 결합하여 최종 프로필 생성
  const profiles = useMemo(() => {
    return dbProfiles.map((profile) => {
      const detailData = userDetailData[profile.id as keyof typeof userDetailData];
      const currentLocale = locale as 'ko' | 'ja';
      return {
        ...profile,
        bio: detailData?.descriptions[currentLocale] || detailData?.descriptions.ko || '',
        interests: detailData?.interests || [],
      };
    });
  }, [dbProfiles, locale]);

  const currentProfile = profiles[currentIndex];

  useEffect(() => {
    setHeader(t('title'), t('subtitle'));
  }, [setHeader, t]);

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    setIsFlipped(false); // 스와이프 시 flip 상태 초기화

    setTimeout(() => {
      if (swipeDirection === 'right') {
        // 무조건 매치되도록
        setMatchedProfile(currentProfile);
        setShowMatch(true);
      } else {
        moveToNext();
      }
      setDirection(null);
    }, 300);
  };

  const moveToNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleMatchClose = () => {
    setShowMatch(false);
    setMatchedProfile(null);
    moveToNext();
  };

  const handleSendMessage = () => {
    handleMatchClose();
    router.push('/chat/1');
  };

  // drag handlers are now provided by useSwipeCard

  if (loading) {
    return (
      <PageContainer>
        <div className="text-center">
          <div className="w-24 h-24 bg-primary-light/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">프로필을 불러오는 중...</h2>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </PageContainer>
    );
  }

  if (!currentProfile && !showMatch) {
    return (
      <PageContainer>
        <div className="text-center">
          <div className="w-24 h-24 bg-primary-light/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 whitespace-pre-line">
            {t('emptyTitle')}
          </h2>
          <p className="text-gray-600 mb-6">{t('emptySubtitle')}</p>
          <div className={'flex flex-col gap-4'}>
            <button
              onClick={() => router.push('/chat')}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
            >
              {t('goToChat')}
            </button>
            <button
              onClick={() => setCurrentIndex(0)}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
            >
              {t('restart')}
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Main Content */}
      <div className="w-full flex flex-col items-center" style={{ height: '100dvh' }}>
        <div className="flex-1" />
        <div className="w-full max-w-sm relative" style={{ height: 'min(75dvh, 640px)' }}>
          {/* Flip Hint */}
          <HintBubble
            condition={currentIndex === 0 && !loading && profiles.length > 0}
            dismissCondition={isFlipped}
            delay={1000}
            text={t('flipCardHint')}
            position="bottom"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20"
          />

          {/* Second Card Hints: swipe right + heart click */}
          <HintBubble
            condition={currentIndex === 1 && !loading && profiles.length > 1}
            dismissCondition={isFlipped}
            delay={1000}
            text={t('swipeRightHint')}
            position="right"
            className="absolute right-1/6 top-0 translate-y-10 translate-x-2 z-20"
          />
          <HintBubble
            condition={currentIndex === 1 && !loading && profiles.length > 1}
            dismissCondition={isFlipped}
            delay={1000}
            text={t('heartActionHint')}
            position="bottom-right"
            className="absolute bottom-1/5 right-9 z-20"
          />

          {/* Render current and next card; while swiping, only render current card to prevent flicker */}
          {profiles.slice(currentIndex, currentIndex + (direction ? 1 : 2)).map((profile, idx) => {
            const isCurrentCard = idx === 0;
            const isBackgroundCard = idx === 1;

            return (
              <SwipeCard
                key={profile.id}
                isCurrent={isCurrentCard}
                isBackground={isBackgroundCard}
                direction={direction}
                flipped={isFlipped}
                onToggleFlip={() => setIsFlipped(!isFlipped)}
                onSwipe={(dir) => handleSwipe(dir)}
                front={
                  <ProfileCardFront
                    avatarUrl={profile.avatar_url || '/placeholder.svg'}
                    nickname={profile.nickname}
                    city={profile.city || ''}
                    onPass={() => handleSwipe('left')}
                    onLike={() => handleSwipe('right')}
                    imagePriority={isCurrentCard || isBackgroundCard}
                  />
                }
                back={
                  <ProfileCardBack
                    bio={profile.bio}
                    interests={profile.interests}
                    profileId={profile.id}
                    currentIndex={currentIndex}
                    onClose={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                  />
                }
              />
            );
          })}
        </div>
        <div className="flex-1" />
      </div>

      {showMatch && matchedProfile && (
        <MatchModal
          matchedProfile={matchedProfile}
          onSendMessage={handleSendMessage}
          onClose={handleMatchClose}
        />
      )}
    </PageContainer>
  );
}
