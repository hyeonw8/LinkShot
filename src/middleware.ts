// src/middleware.ts 파일

import { type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/mypage/:path*',
    '/links/:path*',
    '/signin', // 로그인 상태에서 /signin 접근 시 홈으로 리다이렉트 처리용
    '/api/links',
  ],
};
