import { queryKeys } from '@/constants/queryKeys';
import { getPinnedLinks } from '@/lib/getPinnedLinks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginatedLinksResponse } from '@/types/link.types';

export const usePinnedLinksQuery = (page: number) => {
  const {
    data: pinnedData,
    isPending: isPinnedPending,
    isFetching: isPinnedFetching,
    isPlaceholderData: isPinnedPlaceholder,
    error: pinnedError,
  } = useQuery<PaginatedLinksResponse, Error>({
    queryKey: queryKeys.links.pinnedList(page),
    queryFn: () => getPinnedLinks(page),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000, // 3분
    gcTime: 15 * 60 * 1000 // 15분
  });

  return {
    pinnedData,
    isPinnedPending,
    isPinnedFetching,
    isPinnedPlaceholder,
    pinnedError,
  };
};
