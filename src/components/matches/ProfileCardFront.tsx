import Image from 'next/image';
import { SwipeActionButtons } from './SwipeActionButtons';
import React from 'react';

interface ProfileCardFrontProps {
  avatarUrl: string;
  nickname: string;
  city: string;
  onPass: () => void;
  onLike: () => void;
  imagePriority?: boolean;
  hint?: React.ReactNode;
}

export function ProfileCardFront({
  avatarUrl,
  nickname,
  city,
  onPass,
  onLike,
  imagePriority = false,
  hint,
}: ProfileCardFrontProps) {
  return (
    <div
      className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div className="relative h-full">
        {hint}
        <Image
          width={500}
          height={500}
          src={avatarUrl || '/placeholder.svg'}
          alt={nickname}
          className="w-full h-full object-cover"
          priority={imagePriority}
          loading={imagePriority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        {/* Profile Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between">
          <div className="text-white -mb-1">
            <div className="flex flex-col items-baseline gap-2">
              <h2 className="text-3xl font-bold">{nickname}</h2>
              <div className="flex items-center gap-1 text-sm">
                <span>📍</span>
                <span>{city}</span>
              </div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SwipeActionButtons onPass={onPass} onLike={onLike} disabled={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
