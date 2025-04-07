import { LinkQueryParams } from "@/hooks/query/useLinksQuery";

export const queryKeys = {
  links: {
    all: ['links'],
    list: (params?: LinkQueryParams) => ['links', 'list', params],
    detail: (id: string) => ['links', id],
    // pinnedList: ['links', 'pinned'],
  },
};
