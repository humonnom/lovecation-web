import { Tables, Database } from './supabase';

export type Profile = Tables<'profiles'>;

export type AuthUser = Database['auth']['Tables']['users']['Row'];

// Lucide React icon names (replacing MaterialIcons from mobile)
export type IconName =
  | 'Compass'
  | 'Heart'
  | 'MessageCircle'
  | 'User'
  | 'Home'
  | 'Settings'
  | 'LogOut';
