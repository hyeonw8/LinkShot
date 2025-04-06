'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export const LogOutButton = () => {
  const { signOut } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    alert('로그아웃 되었습니다!');

    router.replace('/signin');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center justify-center rounded-[0.5rem] border border-[#CCC] bg-black dark:bg-white  hover:gray-300 px-[2rem] py-[0.75rem]"
    >
      <p className="text-[0.9375rem] font-medium dark:text-black text-white ">
        로그아웃
      </p>
    </button>
  );
};
