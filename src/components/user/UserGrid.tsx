'use client';

import * as React from 'react';
import { Profile } from '@/types';
import { UserCard } from './UserCard';

interface UserGridProps {
  users: Profile[];
}

export const UserGrid = ({ users }: UserGridProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-row flex-wrap px-2.5 pb-5 justify-between">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
