import { useState } from "react";

export const useLinkFilters = () => {
  // 필터링 및 정렬 상태
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' 또는 'oldest'
  const [pinnedPage, setPinnedPage] = useState(1);
  const [unpinnedPage, setUnpinnedPage] = useState(1);


  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;

    // 실제 변경이 없을 경우에는 호출하지 않도록
    if (selectedCategory !== newCategory) {
      setSelectedCategory(newCategory);
      setUnpinnedPage(1); // 카테고리 변경 시 페이지 1로 리셋
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;

    if (sortOrder !== newSort) {
      setSortOrder(e.target.value);
      setUnpinnedPage(1); // 정렬 기준 변경 시 페이지 1로 리셋
    }
  };

  const handlePageChange = (newPage: number, type: 'pinned' | 'unpinned') => {
    if (type === 'pinned') {
      setPinnedPage(newPage);
    } else {
      setUnpinnedPage(newPage);
    }
  };

  return {
    filters: {
      selectedCategory,
      sortOrder,
      pinnedPage,
      unpinnedPage
    },
    handlers: {
      handleCategoryChange,
      handleSortChange,
      handlePageChange
    }
  };
}