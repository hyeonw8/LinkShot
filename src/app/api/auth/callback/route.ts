import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';


  if (code) {
    try {
      const supabase = await createClient();

      const { error } = await supabase.auth.exchangeCodeForSession(code);
  

      if (!error) {
        const forwardedHost = request.headers.get('x-forwarded-host');
        const isLocalEnv = process.env.NODE_ENV === 'development';
        const redirectUrl = isLocalEnv
          ? `${origin}${next}`
          : forwardedHost
            ? `https://${forwardedHost}${next}`
            : `${origin}${next}`;

        return NextResponse.redirect(redirectUrl);
      }
    } catch (err) {
      console.error('Error in auth callback:', err);
    }
  }

  return NextResponse.redirect(`${origin}/auth-code-error`);
};
