'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { LogOutButton } from './LogOutButton';
import ThemeButton from '@/components/ThemeButton';

export const Header = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    router.push('/signin'); // 로그인 페이지로 이동
  };

// '/signin' 또는 '/signup' 경로일 경우, 테마 버튼과 로고만 렌더링하되, 높이를 차지하지 않도록 처리
if (pathname === '/signin' || pathname === '/signup') {
  return (
    <header className="absolute top-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 z-10">
      <div
        className="hidden sm:block cursor-pointer"
        onClick={() => router.push('/')}
      >
        <h1 className="text-3xl font-bold">Link Shot .ᐟ</h1>
      </div>

      {/* 테마 토글 버튼만 표시 */}
      <div className="flex items-center space-x-4 flex-col sm:flex-row">
        <ThemeButton />
      </div>
    </header>
  );
}

return (
  <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 border border-b-2 dark:border-none dark:bg-gray-700/50 shadow-lg">
    <div
      className="hidden sm:block cursor-pointer"
      onClick={() => router.push('/')}
    >
      <h1 className="text-3xl font-bold">Link Shot .ᐟ</h1>
    </div>
    
    <div className="flex items-center space-x-4 flex-col sm:flex-row">
      {/* 로그인/로그아웃 */}
      <div>
        {user ? (
          <LogOutButton />
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            로그인
          </button>
        )}
      </div>
      {/* 테마 토글 버튼 */}
      <ThemeButton />
    </div>
  </header>
);
};