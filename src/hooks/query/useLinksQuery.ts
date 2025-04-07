import { queryKeys } from '@/constants/queryKeys';
import { getLinks } from '@/lib/getLinks';
import { useQuery } from '@tanstack/react-query';

export interface LinkQueryParams {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  pinned?: boolean; // 고정된 링크 제외 옵션
}

export const useLinksQuery = (params?: LinkQueryParams) => {

  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.links.list(params),
    queryFn: () => getLinks(params),
    enabled: !!params, 
  });

  return {
    data,
    isPending,
    error,
  };
};
