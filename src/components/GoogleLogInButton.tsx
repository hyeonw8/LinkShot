'use client';

import { handleSignInWithGoogle } from '@/lib/handleSignInWithGoogle';
import { FcGoogle } from 'react-icons/fc';

export const GoogleLogInButton = () => {
  return (
    <button
      onClick={handleSignInWithGoogle}
      className="flex w-full items-center justify-center rounded-[0.5rem] border border-[#CCC] bg-white px-[2rem] py-[0.75rem] cursor-pointer"
    >
      <FcGoogle className="mr-2 h-[24px] w-[24px]" />
      <p className="text-[0.9375rem] font-medium text-[#697481]">
        Google 로그인
      </p>
    </button>
  );
};
