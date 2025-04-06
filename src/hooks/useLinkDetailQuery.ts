import { getDetailLink } from '@/lib/getDetailLink';
import { getLinks } from '@/lib/getLinks';
import { getMeta } from '@/lib/getMeta';
import { useQuery } from '@tanstack/react-query';

export const useLinkDetailQuery = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['links', id],
    queryFn: () => getDetailLink(id),
    // select: (data) => data.links,
  });

  return {
    data,
    isPending,
    error,
  };
};
