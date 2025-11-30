'use client';

import React from 'react';
import { Profile } from '@/types';
import { UserCard } from './UserCard';
import { UserCardSkeleton } from '@/components/skeletons';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { HintBubble } from '@/components/common/HintBubble';

interface UserGridProps {
  isLoading: boolean;
  users: Profile[];
}

export const UserGrid = ({ isLoading, users }: UserGridProps) => {
  const t = useTranslations('userGrid');
  const locale = useLocale();
  return (
    <div className="flex-1 overflow-y-auto">
      <HintBubble
        text={t('clickToLearnMore')}
        condition={!isLoading}
        position={'bottom'}
        delay={2000}
        className={clsx(
          'absolute z-20',
          locale === 'ja'
            ? 'top-1/2 -translate-y-20 left-1/4 -translate-x-1/2'
            : 'top-[100px] right-1/4 translate-x-1/2'
        )}
      />
      <div className={'flex flex-row flex-wrap px-2.5 pb-5 pt-2.5 justify-between'}>
        <AnimatePresence mode={'popLayout'}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => {
                return (
                  <motion.div
                    key={`skeleton-wrapper-${index}`}
                    className={'w-[48%]'}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <UserCardSkeleton key={`skeleton-${index}`} />
                  </motion.div>
                );
              })
            : users.map((user, index) => {
                return (
                  <motion.div
                    key={`user-wrapper-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                      delay: index * 0.1,
                    }}
                    className={'w-[48%]'}
                  >
                    <UserCard key={user.id} user={user} />
                  </motion.div>
                );
              })}

          {/* Promotional final card */}
          {!isLoading && (
            <motion.div
              key={'promo-card'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut', delay: users.length * 0.1 }}
              className={'w-[48%]'}
            >
              <div className="relative mb-2.5">
                <div className="block rounded-[20px] overflow-hidden relative shadow-lg aspect-[3/4] bg-pink-100">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                    <p className="text-sm font-semibold text-pink-900 mb-4 whitespace-pre-line leading-tight max-w-[14rem]">
                      {t('promoMessage')}
                    </p>
                    <Link
                      href="/my-profile"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#EE9CA7] text-white text-sm font-semibold hover:bg-[#EE9CA7]/90 transition-colors"
                    >
                      {t('signup')}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
