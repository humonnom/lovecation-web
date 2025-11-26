import React from 'react';

export const UserCardSkeleton = () => {
  return (
    <div className="relative mb-2.5">
      <div className="rounded-[20px] overflow-hidden relative shadow-lg aspect-[3/4]">
        {/* Main image skeleton */}
        <div className="w-full h-full bg-gray-200 animate-pulse" />

        {/* Heart button skeleton */}
        <div className="absolute top-3 right-3 z-10">
          <div className="w-10 h-10 rounded-full bg-gray-300/70 shadow-md animate-pulse" />
        </div>

        {/* Bottom overlay skeleton */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-3 flex flex-row justify-between items-end">
          <div className="flex-1">
            {/* Name skeleton */}
            <div className="w-3/5 h-4 bg-white/60 rounded mb-1.5 animate-pulse" />
            {/* City skeleton */}
            <div className="w-2/5 h-3 bg-white/40 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
