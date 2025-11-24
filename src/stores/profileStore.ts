import React from 'react';
import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from './authStore';
import type { Profile } from '@/types';

interface ProfileStore {
  profiles: Record<string, Profile | null>; // userId -> profile
  loading: Record<string, boolean>; // userId -> loading state
  errors: Record<string, string | null>; // userId -> error

  // Actions
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<Omit<Profile, 'id' | 'updated_at'>>) => Promise<{ data: Profile | null; error: string | null }>;
  clearProfile: (userId: string) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: {},
  loading: {},
  errors: {},

  fetchProfile: async (userId: string) => {
    if (!userId) return;

    const { loading } = get();
    if (loading[userId]) return; // Already loading

    set((state) => ({
      loading: { ...state.loading, [userId]: true },
      errors: { ...state.errors, [userId]: null }
    }));

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      set((state) => ({
        profiles: { ...state.profiles, [userId]: data || null },
        loading: { ...state.loading, [userId]: false }
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
      set((state) => ({
        errors: { ...state.errors, [userId]: errorMessage },
        loading: { ...state.loading, [userId]: false }
      }));
      console.error('Error fetching profile:', error);
    }
  },

  updateProfile: async (userId: string, updates) => {
    if (!userId) return { error: 'User not authenticated', data: null };

    set((state) => ({
      loading: { ...state.loading, [userId]: true },
      errors: { ...state.errors, [userId]: null }
    }));

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          nickname: updates.nickname || updates.first_name || 'User',
          avatar_url: updates.avatar_url || 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=400&h=400&fit=crop&crop=face',
          name_reading: updates.name_reading || '',
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        profiles: { ...state.profiles, [userId]: data },
        loading: { ...state.loading, [userId]: false }
      }));

      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      set((state) => ({
        errors: { ...state.errors, [userId]: errorMessage },
        loading: { ...state.loading, [userId]: false }
      }));
      return { error: errorMessage, data: null };
    }
  },

  clearProfile: (userId: string) => {
    set((state) => ({
      profiles: { ...state.profiles, [userId]: null },
      loading: { ...state.loading, [userId]: false },
      errors: { ...state.errors, [userId]: null }
    }));
  }
}));

// Custom hook for easier usage
export const useUserProfile = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const profile = useProfileStore((state) => userId ? state.profiles[userId] || null : null);
  const loading = useProfileStore((state) => userId ? state.loading[userId] || false : false);
  const error = useProfileStore((state) => userId ? state.errors[userId] || null : null);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const updateProfile = useProfileStore((state) => state.updateProfile);

  // Auto-fetch profile when user changes
  React.useEffect(() => {
    if (userId && !profile && !loading) {
      fetchProfile(userId);
    }
  }, [userId, profile, loading, fetchProfile]);

  const handleUpdateProfile = async (updates: Partial<Omit<Profile, 'id' | 'updated_at'>>) => {
    if (!userId) return { error: 'User not authenticated', data: null };
    return updateProfile(userId, updates);
  };

  return {
    profile,
    loading,
    error,
    updateProfile: handleUpdateProfile,
    user,
    displayName: profile?.nickname,
    avatarUrl: profile?.avatar_url,
  };
};
