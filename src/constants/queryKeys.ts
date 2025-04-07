import { LinkQueryParams } from '@/hooks/query/useLinksQuery';

export const queryKeys = {
  links: {
    all: ['links'],
    list: (params?: LinkQueryParams) => [
      ...queryKeys.links.all,
      'list',
      params,
    ],
    detail: (id: string) => [...queryKeys.links.all, id],
    // pinnedList: ['links', 'pinned'],
  },
};
