'use client';

import React, { ReactNode } from 'react';
import { Profile } from '@/types';
import { UserCard } from './UserCard';
import { UserCardSkeleton } from '@/components/skeletons';
import { AnimatePresence, Easing, motion } from 'framer-motion';

interface UserGridProps {
  isLoading: boolean;
  users: Profile[];
}

export const UserGrid = ({ isLoading, users }: UserGridProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
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
        </AnimatePresence>
      </div>
    </div>
  );
};
// <AnimatePresence mode="wait">
//   <motion.div
//     key={`${title}-${subtitle}`}
//     initial={{ opacity: 0, y: -10 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: 10 }}
//     transition={{ duration: 0.3, ease: 'easeInOut' }}
//   >
//     <h1 className="text-[24px] font-bold text-[#333] leading-[28px] mb-0.5 line-clamp-1">
//       {title}
//     </h1>
//     <p className="text-sm text-[#666] leading-[20px] line-clamp-1">
//       {subtitle || '\u00A0'}
//     </p>
//   </motion.div>
// </AnimatePresence>
