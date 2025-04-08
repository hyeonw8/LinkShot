export const getCategories = async () => {
  const response = await fetch('/api/categories', {
    next: {
      revalidate: 3600, // 1시간마다 재검증
    },
  });

  if (!response.ok) {
    throw new Error('카테고리를 불러오는데 실패했습니다');
  }

  const data = await response.json();
  return data.categories; // '전체' 카테고리를 기본값으로 추가
};
