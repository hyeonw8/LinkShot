import { queryKeys } from '@/constants/queryKeys';
import { getDetailLink } from '@/lib/getDetailLink';
import { useQuery } from '@tanstack/react-query';

export const useLinkDetailQuery = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.links.detail(id),
    queryFn: () => getDetailLink(id),
    // select: (data) => data.links,
  });

  return {
    data,
    isPending,
    error,
  };
};
