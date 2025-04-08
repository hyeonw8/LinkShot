'use client';

import { Pagination } from '@/components/Pagination';
import { usePinnedLinksQuery } from '@/hooks/query/usePinnedLinksQuery';
import { LinkShotList } from './LinkShotList';
import { SkeletonListSection } from '@/components/skeleton/SkeletonListSection';

interface PinnedLinksSectionProps {
  page: number;
  onPageChange: (newPage: number, type: 'pinned' | 'unpinned') => void;
}

export const PinnedLinkShotSection = ({
  page,
  onPageChange,
}: PinnedLinksSectionProps) => {
  const {
    pinnedData,
    isPinnedPending,
    isPinnedFetching,
    pinnedError,
    isPinnedPlaceholder,
  } = usePinnedLinksQuery(page);

  const links = pinnedData?.links || [];
  const pagination = pinnedData?.pagination;

  // 초기 로딩 중
  if (isPinnedPending) {
    return <SkeletonListSection title="📌 고정된 링크" count={4} />;
  }

  // 에러
  if (pinnedError) {
    return <p>고정된 링크 로딩 중 에러 발생: {pinnedError.message}</p>;
  }

  // 데이터가 없는 경우
  if (links.length === 0) {
    return (
      <div className="rounded-lg flex flex-col gap-y-5">
        <h2 className="text-lg font-bold mb-3 pl-1">📌 고정된 링크</h2>
        <p className="text-center  text-black dark:text-gray-200">
          아직 고정 Link Shot이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      <LinkShotList
        title="📌 고정된 링크"
        type="pinned"
        links={links}
        isPinned={true}
        page={page}
        onPageChange={onPageChange}
        currentPageLinkCount={pinnedData?.links.length ?? 0} // 기본값 제공
      />

      {/* 페이지네이션 */}
      {pagination && pagination.totalPages > 1 && (
        <>
          <Pagination
            type="pinned"
            page={page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            isDisabled={isPinnedPlaceholder}
          />
          {isPinnedPlaceholder && (
            <div className="text-center text-xs text-gray-400 mt-1">
              다음 페이지 불러오는 중...
            </div>
          )}
        </>
      )}
    </>
  );
};
