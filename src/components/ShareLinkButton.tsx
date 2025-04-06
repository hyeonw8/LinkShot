export const ShareLinkButton = ({ url }: { url: string }) => {
  const handleShare = async () => {
    try {
      // navigator.share API 지원 여부와 실제 공유 기능 가능 여부 확인 ==> ✅ 안드로이드 해결 필요
      // if (
      //   navigator.share &&
      //   typeof navigator.share === 'function' &&
      //   navigator.canShare &&
      //   navigator.canShare({ url })
      // ) {
      //   await navigator.share({
      //     title: 'LinkShot 공유',
      //     text: '이 링크를 확인해보세요!',
      //     url,
      //   });
      //   console.log('공유 성공');
      // } else {
      // navigator.share API를 사용할 수 없는 경우 클립보드에 복사
      await navigator.clipboard.writeText(url);
      alert('링크가 클립보드에 복사됐어요!');
      // }
    } catch (err) {
      console.error('공유 실패:', err);

      // 에러 발생 시에도 클립보드 복사 시도
      try {
        await navigator.clipboard.writeText(url);
        alert('링크가 클립보드에 복사됐어요!');
      } catch (clipboardErr) {
        console.error('클립보드 복사 실패:', clipboardErr);
        alert('링크 공유에 실패했습니다. 수동으로 URL을 복사해주세요.');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="bg-green-200 hover:bg-green-300 text-sm text-black px-4 py-2 rounded-md"
    >
      공유하기
    </button>
  );
};
