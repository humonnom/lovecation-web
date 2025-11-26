'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, User } from 'lucide-react';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';
import Image from 'next/image';
import { motion } from 'motion/react';

interface InterestedUser {
  id: number;
  image: string;
}

const mockInterestedUsers: InterestedUser[] = [
  { id: 1, image: '/profiles/profile2.jpg' },
  { id: 2, image: '/profiles/profile3.jpg' },
  { id: 3, image: '/profiles/profile4.jpg' },
  { id: 4, image: '/profiles/profile5.jpg' },
  { id: 5, image: '/profiles/profile6.jpg' },
];

const TOTAL_DISPLAYED = 3;

const StackedAvatars = () => {
  const displayUsers = mockInterestedUsers.slice(0, TOTAL_DISPLAYED);
  const remainingCount = Math.max(0, mockInterestedUsers.length - TOTAL_DISPLAYED);

  return (
    <motion.div
      className="relative w-[120px] h-[50px] mr-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {displayUsers.map((user, index) => (
        <div
          key={user.id}
          className="absolute w-[50px] h-[50px] rounded-full border-2 border-white overflow-hidden"
          style={{ left: `${index * 20}px` }}
        >
          <Image
            src={user.image}
            alt={`User ${user.id}`}
            width={50}
            height={50}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="absolute w-[50px] h-[50px] rounded-full border-2 border-white bg-primary flex items-center justify-center"
          style={{ left: `${displayUsers.length * 20}px` }}
        >
          <span className="text-white text-xs font-semibold">+{remainingCount}</span>
        </div>
      )}
    </motion.div>
  );
};

export const InterestSection = () => {
  const t = useTranslations();
  const locale = useLocale();

  const handleTypeformPress = () => {
    const typeformUrl = 'https://form.typeform.com/to/GD1xzjd6';
    window.open(typeformUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-md">
      <div className="flex flex-row justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-foreground">{t('interest.title')}</h3>
      </div>

      <div className="flex flex-row items-center">
        <StackedAvatars />
        <div className="flex-1">
          <p className="text-base text-foreground mb-2 font-medium">
            {t('interest.earlyBirdTitle')}
          </p>
          <p className="text-sm text-text-secondary leading-5">{t('interest.benefit1')}</p>
          <p className="text-sm text-text-secondary leading-5">{t('interest.benefit2')}</p>
          <p className="text-sm text-text-secondary leading-5">{t('interest.benefit3')}</p>
        </div>
      </div>

      <div className="w-full h-[30px] flex items-center justify-center my-1.5">
        <PrivacyPolicyLink />
      </div>

      <button
        onClick={handleTypeformPress}
        className="flex flex-row items-center justify-center bg-primary text-white py-4 px-6 rounded-xl gap-2 w-full hover:opacity-90 transition-opacity"
      >
        <User size={20} />
        <span className={`text-base font-semibold ${locale === 'ko' ? '' : 'max-w-[17ch]'}`}>
          {t('interest.buttonText')}
        </span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
