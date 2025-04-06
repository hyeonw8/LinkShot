import { GoogleLogInButton } from '@/components/GoogleLogInButton';

const SignInPage = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center">
      <p className="text-black dark:text-white">간편 로그인</p>
      <div>
        <GoogleLogInButton />
      </div>
    </div>
  );
};

export default SignInPage;
