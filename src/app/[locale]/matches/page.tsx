'use client';

import { useMemo, useState } from 'react';
import { Heart, X } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useProfiles } from '@/hooks/queries/useProfiles';
import userDetailData from '@/data/userDetailDummyData.json';
import { Profile } from '@/types/supabase';
import { MatchModal } from '@/components/matches/MatchModal';
import { ProfileCardFront } from '@/components/matches/ProfileCardFront';
import { ProfileCardBack } from '@/components/matches/ProfileCardBack';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary-light/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">프로필을 불러오는 중...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentProfile && !showMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center p-4">
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
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center p-4">
      {/* Main Content */}
      <div className="w-full max-w-sm relative" style={{ maxHeight: 'min(80vh, 600px)' }}>
        {profiles.slice(currentIndex, currentIndex + 3).map((profile, index) => {
          if (index === 0) return null; // 현재 카드는 따로 렌더링

          const opacity = 1 - index * 0.3;

          return (
            <div
              key={profile.id}
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity,
                zIndex: -index,
                transformOrigin: 'center bottom',
              }}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full aspect-[2/3]">
                <div className="relative h-full">
                  <Image
                    width={500}
                    height={500}
                    src={profile.avatar_url || '/placeholder.svg'}
                    alt={profile.nickname}
                    className="w-full h-full object-cover blur-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Current Card */}
        {currentProfile && (
          <div
            className={`relative transition-all duration-300 z-10 ${
              direction === 'left'
                ? '-translate-x-full opacity-0 rotate-[-30deg]'
                : direction === 'right'
                  ? 'translate-x-full opacity-0 rotate-[30deg]'
                  : ''
            }`}
            style={{ perspective: '1000px' }}
          >
            {/* Card Container with 3D flip */}
            <div
              className={`relative w-full aspect-[2/3] transition-transform duration-700 cursor-pointer`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front Face */}
              <ProfileCardFront
                avatarUrl={currentProfile.avatar_url || '/placeholder.svg'}
                nickname={currentProfile.nickname}
                city={currentProfile.city || ''}
                onPass={() => handleSwipe('left')}
                onLike={() => handleSwipe('right')}
              />

              {/* Back Face */}
              <ProfileCardBack
                bio={currentProfile.bio}
                interests={currentProfile.interests}
                onClose={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {showMatch && matchedProfile && (
        <MatchModal
          matchedProfile={matchedProfile}
          onSendMessage={handleSendMessage}
          onClose={handleMatchClose}
        />
      )}
    </div>
  );
}
