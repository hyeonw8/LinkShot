import { queryKeys } from '@/constants/queryKeys';
import { getDetailLink } from '@/lib/getDetailLink';
import { useQuery } from '@tanstack/react-query';

export const useLinkDetailQuery = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.links.detail(id),
    queryFn: () => getDetailLink(id),
    enabled: !!id,
    staleTime: 3 * 60 * 1000, // 3분
    gcTime: 15 * 60 * 1000 // 15분
  });

  return {
    data,
    isPending,
    error,
  };
};
