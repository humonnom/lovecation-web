import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface AuthStore {
  session: Session | null;
  user: User | null;
  loading: boolean;
  initialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  user: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    const { initialized } = get();
    if (initialized) return;

    try {
      console.log('Initializing auth store...');

      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth initialization error:', error);
      } else {
        console.log('Initial session loaded:', session?.user?.email || 'No session');
      }

      set({
        session,
        user: session?.user || null,
        loading: false,
        initialized: true
      });

      // Set up auth state listener
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No session');
        set({
          session,
          user: session?.user || null,
          loading: false
        });
      });
    } catch (error) {
      console.error('Auth initialization failed:', error);
      set({ loading: false, initialized: true });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      // onAuthStateChange will handle the state update
    } catch (error) {
      console.error('Sign out error:', error);
      set({ loading: false });
    }
  },

  setSession: (session) => {
    set({
      session,
      user: session?.user || null
    });
  },

  setLoading: (loading) => {
    set({ loading });
  }
}));

// Auto-initialize when store is created
let initPromise: Promise<void> | null = null;

export const initializeAuth = (): Promise<void> => {
  if (!initPromise) {
    initPromise = useAuthStore.getState().initialize();
  }
  return initPromise;
};
