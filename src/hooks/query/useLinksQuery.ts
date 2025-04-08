import { queryKeys } from '@/constants/queryKeys';
import { getLinks } from '@/lib/getLinks';
import { PaginatedLinksResponse } from '@/types/link.types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface LinkQueryParams {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  pinned?: boolean; // 고정된 링크 제외 옵션
}

export const useLinksQuery = (params?: LinkQueryParams) => {
  const {
    data: regularData,
    isPending: isRegularPending,
    isFetching: isRegularFetching,
    isPlaceholderData: isRegularPlaceholder,
    error: regularError,
  } = useQuery<PaginatedLinksResponse, Error>({
    queryKey: queryKeys.links.list(params),
    queryFn: () => getLinks(params),
    placeholderData: keepPreviousData,
    enabled: !!params,
  });

  return {
    regularData,
    isRegularPending,
    isRegularFetching,
    isRegularPlaceholder,
    regularError,
  };
};
