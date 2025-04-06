'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { LogOutButton } from './LogOutButton';
import ThemeButton from '@/components/ThemeButton';

export const Header = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/signin'); // 로그인 페이지로 이동
  };

  // console.log('user', user)

  return (
    <header className="flex  flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-lg">
      <div className="hidden sm:block">
        <h1 className="text-2xl font-bold">Link Shot</h1>
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
