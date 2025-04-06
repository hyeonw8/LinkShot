// src/components/AuthInitializer.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase/client';

const AuthInitializer = () => {
  const { checkAuth, setUser, initialized } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      checkAuth();
    }

    // Supabase 인증 상태 변경 리스너 설정
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuth, setUser, initialized]);

  return null;
};

export default AuthInitializer;
