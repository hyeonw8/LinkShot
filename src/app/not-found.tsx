import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center p-6">
      <h1 className="text-3xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="text-gray-500 dark:text-gray-300">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
      </p>
      <Link
        href="/"
        className="bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded-md font-semibold"
      >
        홈으로 가기
      </Link>
    </main>
  );
}
