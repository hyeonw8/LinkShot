import { createClient } from './supabase/client';

export const handleSignInWithGoogle = async () => {
  const supabase = createClient();
  //   console.log(window.origin);
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};
