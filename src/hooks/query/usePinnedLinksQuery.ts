import { queryKeys } from '@/constants/queryKeys';
import { getPinnedLinks } from '@/lib/getPinnedLinks';
import { useQuery } from '@tanstack/react-query';
import { LinkQueryParams } from './useLinksQuery';

export const usePinnedLinksQuery = (params?: LinkQueryParams) => {
  // 고정된 링크만 별도로 가져오는 쿼리
  const {
    data: pinnedData,
    isPending: isPinnedPending,
    error: pinnedError,
  } = useQuery({
    queryKey: queryKeys.links.list(params),
    queryFn: getPinnedLinks,
    // queryFn: () => getLinks(params),
  });

  return {
    pinnedData,
    isPinnedPending,
    pinnedError,
  };
};
