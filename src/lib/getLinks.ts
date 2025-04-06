import { LinkQueryParams } from '@/hooks/useLinksQuery';

export const getLinks = async (params?: LinkQueryParams) => {
  try {
    // URL 쿼리 문자열 생성
    const queryParams = new URLSearchParams();

    if (params) {
      if (params.category) queryParams.append('category', params.category);
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.pinned) queryParams.append('pinned', params.pinned.toString());
    }

    // 쿼리 문자열이 있으면 '?'와 함께 추가, 없으면 빈 문자열
    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : '';

    const response = await fetch(`/api/links${queryString}`);

    if (!response.ok) {
      throw new Error('링크 데이터를 불러오는데 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('링크 데이터 조회 중 오류 발생:', error);
    throw error;
  }
};
