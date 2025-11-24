import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Profile } from '@/types';

interface UseProfilesOptions {
  gender?: string | null;
  limit?: number;
}

export const useProfiles = (options: UseProfilesOptions = {}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('profiles')
        .select('*');

      // Apply gender filter if provided
      if (options.gender) {
        query = query.eq('gender', options.gender);
      }

      // Apply limit if provided
      if (options.limit) {
        query = query.limit(options.limit);
      }

      // Order by creation date (newest first)
      query = query.order('updated_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setProfiles(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profiles';
      setError(errorMessage);
      console.error('Error fetching profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [options.gender, options.limit]);

  return {
    profiles,
    loading,
    error,
    refetch: fetchProfiles
  };
};
