'use client';

import * as React from 'react';
import { Profile } from '@/types';
import { UserCard } from './UserCard';
import {UserCardSkeleton} from "@/components/skeletons";

interface UserGridProps {
  isLoading: boolean;
  users: Profile[];
}

export const UserGrid = ({ isLoading, users }: UserGridProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-row flex-wrap px-2.5 pb-5 pt-2.5 justify-between">
          {isLoading && Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
          ))}
          {!isLoading && users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

