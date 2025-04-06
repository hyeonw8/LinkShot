export const getPinnedLinks = async () => {
  try {
    const response = await fetch('/api/links?pinned=true');

    if (!response.ok) {
      throw new Error('고정된 링크를 불러오는데 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('고정된 링크 조회 중 오류 발생:', error);
    throw error;
  }
};
