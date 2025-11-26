'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Lock } from 'lucide-react';
import type { Profile } from '@/types';

interface UserCardProps {
  user: Profile;
  onLikeToggle?: (userId: string, isLiked: boolean) => void;
}

export const UserCard = ({ user, onLikeToggle }: UserCardProps) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const isLoggedIn = true; // !!session;

  const handleLikePress = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();

    if (isLiked) return; // Prevent action if already liked

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLikeToggle?.(user.id, newLikedState);
  };

  return (
    <div className="relative mb-2.5 w-[48%]">
      <Link
        href={`/users/${user.id}`}
        className="block rounded-[20px] overflow-hidden relative shadow-lg aspect-[3/4] active:opacity-90 transition-opacity"
      >
        <Image
          src={user.avatar_url || '/placeholder-avatar.jpg'}
          alt={user.nickname || 'User'}
          fill
          className={`object-cover ${!isLoggedIn ? 'opacity-10' : ''}`}
          sizes="(max-width: 768px) 48vw, 24vw"
        />

        {!isLoggedIn && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center gap-2">
            <Lock size={24} className="text-white/80" />
            <span className="text-white/80 text-xs font-medium">로그인하세요</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-3 flex flex-row justify-between items-end">
          <div className="flex-1">
            <p className="text-white text-base font-semibold mb-0.5">{user.nickname}</p>
            <p className="text-white/80 text-xs">{user.city}</p>
          </div>
        </div>
      </Link>

      <button
        onClick={handleLikePress}
        className="absolute top-3 right-3 z-10 transition-transform active:scale-95"
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
            isLiked ? 'bg-primary/95 border-0' : 'bg-black/30 border border-white/30'
          }`}
        >
          <Heart
            size={20}
            className={isLiked ? 'text-white fill-white' : 'text-white/90'}
            fill={isLiked ? 'currentColor' : 'none'}
          />
        </div>
      </button>
    </div>
  );
};
