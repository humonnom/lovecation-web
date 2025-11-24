import { useUserProfile } from '@/stores/profileStore';
import { useUserProfileQuery } from './useUserProfileQuery';
import { useAuthStore } from '@/stores/authStore';

// Hybrid hook that provides both Zustand (immediate) and TanStack Query (cache management) approaches
export const useHybridProfile = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id ?? null;

  // Zustand for immediate state management
  const zustandProfile = useUserProfile();

  // TanStack Query for advanced caching and background updates
  const queryProfile = useUserProfileQuery(userId);

  return {
    // Zustand data (immediate, local state)
    profile: zustandProfile.profile,
    loading: zustandProfile.loading,
    error: zustandProfile.error,
    updateProfile: zustandProfile.updateProfile,
    displayName: zustandProfile.displayName,
    avatarUrl: zustandProfile.avatarUrl,
    user: zustandProfile.user,

    // TanStack Query data (advanced caching features)
    queryData: queryProfile.data,
    queryLoading: queryProfile.isLoading,
    queryError: queryProfile.error,
    refetch: queryProfile.refetch,
    isStale: queryProfile.isStale,
    isFetching: queryProfile.isFetching,

    // Combined states for convenience
    isLoading: zustandProfile.loading || queryProfile.isLoading,
    hasError: !!zustandProfile.error || !!queryProfile.error,
    combinedProfile: queryProfile.data || zustandProfile.profile,
  };
};
