const AuthCodeErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold mb-2">인증 오류</h1>
      <p className="text-gray-600 mb-4">
        로그인 도중 문제가 발생했어요. 다시 시도해주세요.
      </p>
      <a
        href="/auth/login"
        className="text-blue-500 underline hover:text-blue-700"
      >
        로그인 페이지로 돌아가기
      </a>
    </div>
  );
};

export default AuthCodeErrorPage;
