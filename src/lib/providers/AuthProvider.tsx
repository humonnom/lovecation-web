'use client';

import React, { useEffect } from 'react';
import { useAuthStore, initializeAuth } from '@/stores/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize auth when provider mounts
    initializeAuth();
  }, []);

  return <>{children}</>;
};

// Export a hook that uses Zustand store
export const useAuth = () => {
  const session = useAuthStore((state) => state.session);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const signOut = useAuthStore((state) => state.signOut);

  return {
    session,
    user,
    loading,
    signOut,
  };
};
