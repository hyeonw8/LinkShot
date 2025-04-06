import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import { User } from '@/types/user.types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  initialized: false,
  
  setUser: (user) => set({ user }),
  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
  checkAuth: async () => {
    set({ isLoading: true });
    
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        set({ 
          user: session.user,
          isLoading: false,
          initialized: true 
        });
      } else {
        set({ 
          user: null,
          isLoading: false,
          initialized: true 
        });
      }
    } catch (error: any) {
      set({ 
        error,
        isLoading: false,
        initialized: true
      });
    }
  }
}));