'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Cake,
  Cigarette,
  Dumbbell,
  Heart,
  Home,
  Info,
  Languages,
  MapPin,
  PawPrint,
  Plane,
  Wine,
} from 'lucide-react';
import { UserDetailSkeleton } from '@/components/skeletons';
import userDetailData from '@/data/userDetailDummyData.json';
import { supabase } from '@/lib/supabase/client';
import type { Profile } from '@/types/supabase';
import type { UserDetailDataMap } from '@/types/userDetail';
import { DetailHeader } from '@/components/layout/DetailHeader';

export default function UserDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const t = useTranslations();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isKR, setIsKR] = useState(locale === 'ko');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = params.id as string;

      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;

        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        // Add slight delay for skeleton UX
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    fetchUserProfile();
  }, [params.id]);

  const userDetails = user?.id ? (userDetailData as UserDetailDataMap)[user.id] : null;

  const photos = [
    '/placeholder.svg?height=500&width=400',
    '/placeholder.svg?height=500&width=400',
    '/placeholder.svg?height=500&width=400',
    '/placeholder.svg?height=500&width=400',
  ];

  const getLevelText = (level: number) => {
    const levelMap: Record<number, string> = {
      1: t('userDetail.levels.beginner'),
      2: t('userDetail.levels.beginner'),
      3: t('userDetail.levels.intermediate'),
      4: t('userDetail.levels.advanced'),
      5: t('userDetail.levels.native'),
    };
    return levelMap[level] || t('userDetail.levels.beginner');
  };

  const languageSkillsConfig = [
    { key: 'korean', labelKey: 'userDetail.languages.korean' },
    { key: 'japanese', labelKey: 'userDetail.languages.japanese' },
    { key: 'english', labelKey: 'userDetail.languages.english' },
  ];

  const lifestyleConfig = [
    { key: 'drinking', icon: Wine, labelKey: 'userDetail.lifestyleLabels.drinking' },
    { key: 'smoking', icon: Cigarette, labelKey: 'userDetail.lifestyleLabels.smoking' },
    { key: 'exercise', icon: Dumbbell, labelKey: 'userDetail.lifestyleLabels.exercise' },
    { key: 'pet', icon: PawPrint, labelKey: 'userDetail.lifestyleLabels.pet' },
  ];

  const futurePlansIcons: Record<string, any> = {
    long_distance_ok: Heart,
    visit_often: Plane,
    relocation_considering: Home,
    long_distance_serious: Heart,
    visit_regularly: Plane,
    relocation_possible: Home,
    interested_in_life: Home,
    date_in_city: Heart,
    weekend_travel: Plane,
    settled: Home,
    serious_relationship: Heart,
    travel_together: Plane,
    stable_life: Home,
    long_distance_want: Heart,
    visit_korea_often: Plane,
    working_holiday: Home,
    visit_japan_often: Plane,
    life_in_japan: Home,
    get_to_know_slowly: Heart,
    plan_to_visit: Plane,
    want_to_experience: Home,
    welcome_visit: Plane,
    living_in_kyoto: Home,
  };

  const getCulturalPreferenceLabels = (nationality: string) => {
    if (nationality === 'JP') {
      return [
        { key: 'food', emoji: '🍗', labelKey: 'userDetail.culturalLabels.korean_food' },
        { key: 'entertainment', emoji: '🎵', labelKey: 'userDetail.culturalLabels.kpop_drama' },
        {
          key: 'culture',
          emoji: '🇰🇷',
          labelKey: 'userDetail.culturalLabels.korean_culture_understanding',
        },
      ];
    } else {
      return [
        { key: 'food', emoji: '🍜', labelKey: 'userDetail.culturalLabels.japanese_food' },
        { key: 'entertainment', emoji: '🎬', labelKey: 'userDetail.culturalLabels.anime_manga' },
        {
          key: 'culture',
          emoji: '🇯🇵',
          labelKey: 'userDetail.culturalLabels.japanese_culture_understanding',
        },
      ];
    }
  };

  if (isLoading) {
    return <UserDetailSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FDFDFD]">
        <DetailHeader loading={false} />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">{t('userDetail.errorLoadingUser')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <DetailHeader loading={false} />
      {/* Photo Gallery */}
      <div className="relative w-full h-[500px]">
        <Image
          src={user.avatar_url.startsWith('http') ? user.avatar_url : photos[currentPhotoIndex]}
          alt={user.nickname || 'User photo'}
          loading={'eager'}
          fill
          className="object-cover"
        />

        {/* Demo Badge */}
        <div className="absolute top-5 right-5 bg-orange-500 px-3 py-1.5 rounded-xl">
          <span className="text-white text-xs font-bold">{t('userDetail.demo').toUpperCase()}</span>
        </div>

        {/* Online Status */}
        {user.is_online && (
          <div className="absolute bottom-5 left-5 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-white text-xs font-semibold">{t('userDetail.online')}</span>
          </div>
        )}

        {/* Photo Indicators */}
        <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                currentPhotoIndex === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Basic Info */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="mb-3">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.nickname}
          </h1>
          <p className="text-base text-gray-500">{user.name_reading}</p>
        </div>
        <div className="space-y-2">
          {user.age && (
            <div className="flex items-center gap-2">
              <Cake size={18} className="text-gray-500" />
              <span className="text-base text-gray-600">
                {user.age}
                {t('userDetail.age')}
              </span>
            </div>
          )}
          {user.city && user.nationality && (
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              <span className="text-base text-gray-600">
                {user.city}, {user.nationality}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* About Me */}
      {userDetails?.descriptions && (
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-800">{t('userDetail.aboutMe')}</h2>
            <button onClick={() => setIsKR(!isKR)} className="flex items-center gap-1 px-2 py-1">
              <Languages size={16} className="text-[#EE9CA7]" />
              <span className="text-sm text-[#EE9CA7] font-semibold">{isKR ? 'JP' : 'KR'}</span>
            </button>
          </div>
          <p className="text-base text-gray-800 leading-6 mb-2">
            {isKR ? userDetails.descriptions.ko : userDetails.descriptions.ja}
          </p>
          <p className="text-xs text-gray-400 italic flex items-center gap-1">
            <Info size={12} /> {t('userDetail.translationNote')}
          </p>
        </div>
      )}

      {/* Interests */}
      {userDetails?.interests && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t('userDetail.interests')}</h2>
          <div className="flex flex-wrap gap-2">
            {userDetails.interests.map((interest, index) => (
              <div key={index} className="bg-[#FFCBD2] px-3 py-1.5 rounded-full">
                <span className="text-sm text-[#EE9CA7] font-semibold">
                  #
                  {t(`userDetail.interestsList.${interest}`) !==
                  `userDetail.interestsList.${interest}`
                    ? t(`userDetail.interestsList.${interest}`)
                    : interest}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Language Skills */}
      {userDetails?.languageSkills && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t('userDetail.languageSkills')}</h2>
          {languageSkillsConfig.map((langConfig) => {
            const level =
              userDetails.languageSkills[langConfig.key as keyof typeof userDetails.languageSkills];
            if (!level) return null;

            const levelText = getLevelText(level);

            return (
              <div key={langConfig.key} className="flex items-center mb-3">
                <span className="text-base text-gray-800 w-20">{t(langConfig.labelKey)}</span>
                <div className="flex gap-0.5 mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${star <= level ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{levelText}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Cultural Preferences */}
      {userDetails?.culturalPreferences && user?.nationality && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            {t('userDetail.culturalPreferences')}
          </h2>
          {getCulturalPreferenceLabels(user.nationality).map((item) => {
            const preferences =
              userDetails.culturalPreferences[
                user.nationality as keyof typeof userDetails.culturalPreferences
              ];
            const percentage = preferences?.[item.key as keyof typeof preferences];
            if (percentage === undefined) return null;

            return (
              <div key={item.key} className="mb-4">
                <p className="text-base text-gray-800 mb-2">
                  {item.emoji} {t(item.labelKey)}
                </p>
                <div className="h-2 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-[#EE9CA7] rounded transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lifestyle */}
      {userDetails?.lifestyle && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t('userDetail.lifestyle')}</h2>
          <div className="flex flex-wrap gap-3">
            {lifestyleConfig.map((config) => {
              const value = userDetails.lifestyle[config.key as keyof typeof userDetails.lifestyle];
              if (!value) return null;

              const IconComponent = config.icon;

              return (
                <div
                  key={config.key}
                  className="w-[calc(50%-6px)] bg-[#FAFAFA] p-4 rounded-xl flex flex-col items-center"
                >
                  <IconComponent size={24} className="text-gray-600 mb-2" />
                  <span className="text-sm text-gray-600 mb-1">{t(config.labelKey)}</span>
                  <span className="text-base text-gray-800 font-semibold">
                    {t(`userDetail.lifestyleValues.${value}`) !==
                    `userDetail.lifestyleValues.${value}`
                      ? t(`userDetail.lifestyleValues.${value}`)
                      : value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Future Plans */}
      {userDetails?.futurePlans && user?.nationality && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t('userDetail.futurePlans')}</h2>
          {userDetails.futurePlans[user.nationality as keyof typeof userDetails.futurePlans]?.map(
            (planKey, index) => {
              const IconComponent = futurePlansIcons[planKey] || Heart;

              return (
                <div key={index} className="flex items-center gap-2 mb-3">
                  <IconComponent size={20} className="text-[#EE9CA7]" />
                  <span className="text-base text-gray-800">
                    {t(`userDetail.futurePlansList.${user.nationality}.${planKey}`)}
                  </span>
                </div>
              );
            }
          )}
        </div>
      )}

      {/* Ideal Type */}
      {userDetails?.idealType && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t('userDetail.idealType')}</h2>
          <p className="text-base text-gray-800 leading-6 mb-2">
            • {t('userDetail.idealTypeLabels.ageRange')}: {userDetails.idealType.ageRange}
            {t('userDetail.age')}
          </p>
          <p className="text-base text-gray-800 leading-6 mb-2">
            • {t('userDetail.idealTypeLabels.personality')}:{' '}
            {t(`userDetail.idealTypeData.personalities.${userDetails.idealType.personality}`) !==
            `userDetail.idealTypeData.personalities.${userDetails.idealType.personality}`
              ? t(`userDetail.idealTypeData.personalities.${userDetails.idealType.personality}`)
              : userDetails.idealType.personality}
          </p>
          <p className="text-base text-gray-800 leading-6">
            • {t('userDetail.idealTypeLabels.dateStyle')}:{' '}
            {t(`userDetail.idealTypeData.dateStyles.${userDetails.idealType.dateStyle}`) !==
            `userDetail.idealTypeData.dateStyles.${userDetails.idealType.dateStyle}`
              ? t(`userDetail.idealTypeData.dateStyles.${userDetails.idealType.dateStyle}`)
              : userDetails.idealType.dateStyle}
          </p>
        </div>
      )}

      {/* Demo Notice */}
      <div className="flex items-start gap-3 bg-orange-50 p-4 mx-5 my-4 rounded-xl">
        <Info size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
        <p className="flex-1 text-sm text-orange-500 leading-5">{t('userDetail.demoNotice')}</p>
      </div>

      <div className="h-24" />
    </div>
  );
}
