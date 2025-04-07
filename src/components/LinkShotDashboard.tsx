'use client';

import { useLinksQuery } from '@/hooks/useLinksQuery';
import { SkeletonListSection } from './skeleton/SkeletonListSection';
import { useDeleteLinkMutation } from '@/hooks/useDeleteLinkMutation';
import { useToggleLinkPinMutation } from '@/hooks/useToggleLinkPinMutation';
import { useState, useEffect, useCallback } from 'react';
import { usePinnedLinksQuery } from '@/hooks/usePinnedLinksQuery';
import { Filter } from './Filter';
import { LinkShotList } from './LinkShotList';
import { Pagination } from './Pagination';

export const LinkShotDashboard = () => {
  // 필터링 및 정렬 상태
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' 또는 'oldest'
  const [page, setPage] = useState(1);
  const limit = 8; // 페이지당 보여줄 항목 수

  // 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetch('/api/categories', {
          next: {
            revalidate: 3600, // 1시간마다 재검증
          },
        });
        if (!response.ok) {
          throw new Error('카테고리를 불러오는데 실패했습니다');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('카테고리 로딩 중 오류:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // 고정된 링크만 별도로 가져오는 쿼리
  const { pinnedData, isPinnedPending, pinnedError } = usePinnedLinksQuery();
  // 일반 링크를 가져오는 쿼리 (고정되지 않은 링크만)
  const {
    data: regularData,
    isPending: isRegularLoading,
    error: regularError,
  } = useLinksQuery({
    category: selectedCategory === '전체' ? undefined : selectedCategory,
    sort: sortOrder,
    page,
    limit,
    pinned: false, // 고정된 링크 제외하는 옵션 추가
  });
  const { deleteLinkMutation } = useDeleteLinkMutation();
  const { toggleLinkPinMutation } = useToggleLinkPinMutation();

  // 고정된 링크와 일반 링크
  const pinned = pinnedData?.links || [];
  const unpinned = regularData?.links || [];
  const pagination = regularData?.pagination;

  const handleToggleCardPin = useCallback(
    (id: string, isPin: boolean) => {
      toggleLinkPinMutation.mutate({ id, isPin });
    },
    [toggleLinkPinMutation]
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;

    // 실제 변경이 없을 경우에는 호출하지 않도록
    if (selectedCategory !== newCategory) {
      setSelectedCategory(newCategory);
      setPage(1); // 카테고리 변경 시 페이지 1로 리셋
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;

    if (sortOrder !== newSort) {
      setSortOrder(e.target.value);
      setPage(1); // 정렬 기준 변경 시 페이지 1로 리셋
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isRegularLoading || isPinnedPending)
    return (
      <div className="space-y-8">
        <SkeletonListSection title="📌 고정된 링크" />
        <SkeletonListSection title="📝 일반 링크" />
      </div>
    );
  // 에러 처리
  if (pinnedError)
    return <p>고정된 링크 로딩 중 에러 발생: {pinnedError.message}</p>;
  if (regularError)
    return <p>일반 링크 로딩 중 에러 발생: {regularError.message}</p>;
  if (!regularData) return <p>데이터 없음</p>;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4">
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

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
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};