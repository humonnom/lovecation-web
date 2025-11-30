'use client';

import { useMemo, useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useProfiles } from '@/hooks/queries/useProfiles';
import userDetailData from '@/data/userDetailDummyData.json';
import { Profile } from '@/types/supabase';
import { MatchModal } from '@/components/matches/MatchModal';
import { ProfileCardFront } from '@/components/matches/ProfileCardFront';
import { ProfileCardBack } from '@/components/matches/ProfileCardBack';

const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center p-4">
    {children}
  </div>
);

export default function SwipePage() {
  const locale = useLocale();

  // locale에 따라 gender 결정: ja -> male, ko -> female
  const targetGender = locale === 'ja' ? 'male' : 'female';

  const { profiles: dbProfiles, loading, error } = useProfiles({ gender: targetGender });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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
  const hasMoreProfiles = currentIndex < profiles.length - 1;

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    setIsFlipped(false); // 스와이프 시 flip 상태 초기화

    setTimeout(() => {
      if (swipeDirection === 'right') {
        // 30% 확률로 매치 발생
        const isMatch = Math.random() > 0.7;
        if (isMatch) {
          setMatchedProfile(currentProfile);
          setShowMatch(true);
        } else {
          moveToNext();
        }
      } else {
        moveToNext();
      }
      setDirection(null);
    }, 300);
  };

  const moveToNext = () => {
    if (hasMoreProfiles) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleMatchClose = () => {
    setShowMatch(false);
    setMatchedProfile(null);
    moveToNext();
  };

  const handleSendMessage = () => {
    // 채팅 페이지로 이동하는 로직
    alert('채팅 페이지로 이동합니다!');
    handleMatchClose();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isFlipped) return; // 카드가 뒤집힌 상태에서는 드래그 불가
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStart || isFlipped) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = () => {
    if (!dragStart) return;

    const SWIPE_THRESHOLD = 100;

    if (Math.abs(dragOffset.x) > SWIPE_THRESHOLD) {
      // 스와이프 성공
      if (dragOffset.x > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }

    // 초기화
    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
  };

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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">더 이상 프로필이 없습니다</h2>
          <p className="text-gray-600 mb-6">나중에 다시 확인해주세요!</p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
          >
            처음으로 돌아가기
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Main Content */}
      <div className="w-full max-w-sm relative" style={{ height: 'min(80vh, 600px)' }}>
        {/* Render current and next card */}
        {profiles.slice(currentIndex, currentIndex + 2).map((profile, idx) => {
          const isCurrentCard = idx === 0;
          const isBackgroundCard = idx === 1;

          return (
            <div
              key={profile.id}
              className={`absolute inset-0 transition-all duration-300 ${
                isCurrentCard
                  ? `z-10 ${
                      direction === 'left'
                        ? '-translate-x-full opacity-0 rotate-[-30deg]'
                        : direction === 'right'
                          ? 'translate-x-full opacity-0 rotate-[30deg]'
                          : dragStart
                            ? ''
                            : 'transition-all duration-200'
                    }`
                  : 'z-0'
              }`}
              style={{
                perspective: '1000px',
                transform:
                  isCurrentCard && dragStart
                    ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`
                    : isBackgroundCard
                      ? direction !== null
                        ? 'scale(1)'
                        : 'scale(0.92)'
                      : undefined,
                filter: isBackgroundCard && direction === null ? 'blur(4px)' : 'blur(0px)',
                opacity: isBackgroundCard && direction === null ? 0.6 : 1,
              }}
              onPointerDown={isCurrentCard ? handlePointerDown : undefined}
              onPointerMove={isCurrentCard ? handlePointerMove : undefined}
              onPointerUp={isCurrentCard ? handlePointerUp : undefined}
              onPointerCancel={isCurrentCard ? handlePointerUp : undefined}
            >
              {/* Card Container with 3D flip */}
              <div
                className={`relative w-full aspect-[2/3] transition-transform duration-700 ${
                  isCurrentCard ? 'cursor-pointer touch-none' : 'pointer-events-none'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isCurrentCard && isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onClick={
                  isCurrentCard
                    ? () => {
                        if (Math.abs(dragOffset.x) < 5 && Math.abs(dragOffset.y) < 5) {
                          setIsFlipped(!isFlipped);
                        }
                      }
                    : undefined
                }
              >
                {/* Front Face */}
                <ProfileCardFront
                  avatarUrl={profile.avatar_url || '/placeholder.svg'}
                  nickname={profile.nickname}
                  city={profile.city || ''}
                  onPass={() => handleSwipe('left')}
                  onLike={() => handleSwipe('right')}
                />

                {/* Back Face */}
                <ProfileCardBack
                  bio={profile.bio}
                  interests={profile.interests}
                  onClose={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                />
              </div>
            </div>
          );
        })}
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
