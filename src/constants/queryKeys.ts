import { LinkQueryParams } from '@/hooks/query/useLinksQuery';

const linksKey = ['links']

export const queryKeys = {
  links: {
    all: linksKey,
    list: (params?: LinkQueryParams) => [
      ...linksKey,
      'list',
      params,
    ],
    detail: (id: string) => [...linksKey, id],
    pinnedList: (page: number) => [...linksKey, 'pinned', page],
    category: [...linksKey, 'category']
  },
};
