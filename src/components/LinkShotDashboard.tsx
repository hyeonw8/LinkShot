'use client';

import { useLinksQuery } from '@/hooks/query/useLinksQuery';
import { SkeletonListSection } from './skeleton/SkeletonListSection';
import { useDeleteLinkMutation } from '@/hooks/mutation/useDeleteLinkMutation';
import { useCallback } from 'react';
import { usePinnedLinksQuery } from '@/hooks/query/usePinnedLinksQuery';
import { LinkShotList } from './LinkShotList';
import { Pagination } from './Pagination';
import { useToggleLinkMutation } from '@/hooks/mutation/useToggleLinkMutation';

interface LinkShotDashboardProps {
  selectedCategory: string;
  sortOrder: string;
  pinnedPage: number;
  unpinnedPage: number;
  onPageChange: (newPage: number, type: 'pinned' | 'unpinned') => void;
}

export const LinkShotDashboard = ({
  selectedCategory,
  sortOrder,
  pinnedPage,
  unpinnedPage,
  onPageChange,
}: LinkShotDashboardProps) => {
  const limit = 8; // 페이지당 보여줄 항목 수

  // 고정된 링크만 별도로 가져오는 쿼리
  const {
    pinnedData,
    isPinnedPending,
    isPinnedFetching,
    pinnedError,
    isPinnedPlaceholder,
  } = usePinnedLinksQuery(pinnedPage);
  // 일반 링크를 가져오는 쿼리 (고정되지 않은 링크만)
  const {
    regularData,
    isRegularPending,
    isRegularFetching,
    regularError,
    isRegularPlaceholder,
  } = useLinksQuery({
    category: selectedCategory === '전체' ? undefined : selectedCategory,
    sort: sortOrder,
    page: unpinnedPage,
    limit,
    pinned: false,
  });

  const { deleteLinkMutation } = useDeleteLinkMutation();
  const { toggleLinkMutation } = useToggleLinkMutation();

  // 고정된 링크와 일반 링크
  const pinned = pinnedData?.links || [];
  const unpinned = regularData?.links || [];
  const pinnedPagination = pinnedData?.pagination;
  const unpinnedPagination = regularData?.pagination;

  const handleToggleCardPin = useCallback(
    (id: string, isPin: boolean) => {
      toggleLinkMutation.mutate({ id, isPin });
    },
    [toggleLinkMutation]
  );

  const handleDeleteLink = useCallback(
    (id: string) => {
      deleteLinkMutation.mutate(id);
    },
    [deleteLinkMutation]
  );

  const handleGoToPage = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  if (isRegularPending || isPinnedPending)
    return (
      <div className="space-y-8">
        <SkeletonListSection title="📌 고정된 링크" count={4} />
        <SkeletonListSection title="📝 일반 링크" />
      </div>
    );

  if (isPinnedFetching) {
    return <SkeletonListSection title="📌 고정된 링크" count={4} />;
  }
  if (isRegularFetching) {
    return <SkeletonListSection title="📝 일반 링크" />;
  }
  // 에러 처리
  if (pinnedError)
    return <p>고정된 링크 로딩 중 에러 발생: {pinnedError.message}</p>;
  if (regularError)
    return <p>일반 링크 로딩 중 에러 발생: {regularError.message}</p>;
  if (!regularData) return <p>데이터 없음</p>;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4">
      {/* 고정된 링크 리스트 */}
      {pinned.length > 0 && (
        <LinkShotList
          title="📌 고정된 링크"
          links={pinned}
          isPinned={true}
          onToggleCardPin={handleToggleCardPin}
          onDeleteLink={handleDeleteLink}
          onGoToPage={handleGoToPage}
        />
      )}

      {/* 페이지네이션 */}
      {pinnedPagination && pinnedPagination.totalPages > 1 && (
        <>
          <Pagination
            type="pinned"
            page={pinnedPage}
            totalPages={pinnedPagination.totalPages}
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

      {/* 일반 링크 리스트 */}
      {unpinned.length > 0 && (
        <LinkShotList
          title="📝 일반 링크"
          links={unpinned}
          isPinned={false}
          onToggleCardPin={handleToggleCardPin}
          onDeleteLink={handleDeleteLink}
          onGoToPage={handleGoToPage}
        />
      )}

      {unpinned.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">표시할 일반 링크가 없습니다.</p>
        </div>
      )}

      {/* 페이지네이션 */}
      {unpinnedPagination && unpinnedPagination.totalPages > 1 && (
        <>
          <Pagination
            type="unpinned"
            page={unpinnedPage}
            totalPages={unpinnedPagination.totalPages}
            onPageChange={onPageChange}
            isDisabled={isRegularPlaceholder}
          />
          {isRegularPlaceholder && (
            <div className="text-center text-xs text-gray-400 mt-1">
              다음 페이지 불러오는 중...
            </div>
          )}
        </>
      )}
    </div>
  );
};
