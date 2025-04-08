import { Pagination } from '@/components/Pagination';
import { LinkShotList } from './LinkShotList';
import { SkeletonListSection } from '@/components/skeleton/SkeletonListSection';
import { useLinksQuery } from '@/hooks/query/useLinksQuery';

interface UnpinnedLinkShotSectionProps {
  selectedCategory: string;
  sortOrder: string;
  page: number;
  limit?: number;
  onPageChange: (newPage: number, type: 'pinned' | 'unpinned') => void;
}

export const UnpinnedLinkShotSection = ({
  selectedCategory,
  sortOrder,
  page,
  limit,
  onPageChange,
}: UnpinnedLinkShotSectionProps) => {
  const {
    regularData,
    isRegularPending,
    isRegularFetching,
    regularError,
    isRegularPlaceholder,
  } = useLinksQuery({
    category: selectedCategory === '전체' ? undefined : selectedCategory,
    sort: sortOrder,
    page,
    limit: 8,
    pinned: false,
  });

  const links = regularData?.links || [];
  const pagination = regularData?.pagination;

  // 초기 로딩 중
  if (isRegularPending) {
    return <SkeletonListSection title="📝 일반 링크" />;
  }

  // // 페이지 변경 중 (이미 데이터가 있는 경우)
  // if (isRegularFetching && regularData) {
  //   return <SkeletonListSection title="📝 일반 링크" />;
  // }

  // 에러
  if (regularError) {
    return <p>일반 링크 로딩 중 에러 발생: {regularError.message}</p>;
  }

  // 데이터가 없는 경우
  if (!regularData || links.length === 0) {
    return (
      <div className="py-12 rounded-lg flex flex-col gap-y-10">
        <h2 className="text-lg font-bold mb-3 pl-1">📝 일반 링크</h2>
        <p className="text-center  text-black dark:text-gray-200">
          저장한 Link Shot이 없습니다.
        </p>
      </div>
    );
  }

  // 데이터가 있는 경우
  return (
    <>
      <LinkShotList
        title="📝 일반 링크"
        type="unpinned"
        links={links}
        isPinned={false}
        page={page}
        onPageChange={onPageChange}
        currentPageLinkCount={regularData?.links.length ?? 0} // 기본값 제공
      />

      {/* 페이지네이션 */}
      {pagination && pagination.totalPages > 1 && (
        <>
          <Pagination
            type="unpinned"
            page={page}
            totalPages={pagination.totalPages}
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
    </>
  );
};
