import { GoogleLogInButton } from '@/components/GoogleLogInButton';

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg space-y-6">
        <p className="text-xl font-semibold text-center text-gray-800 dark:text-white">
          간편 로그인
        </p>

        <div className="flex flex-col items-center gap-y-4">
          <GoogleLogInButton />
        </div>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          구글 계정으로 간편하게 로그인하세요.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
