import { Tables } from './supabase';

// 링크 생성 시 클라이언트 → 서버로 보내는 데이터
export type CreateLinkInput = {
  url: string;
  category: string;
  title: string;
  image: string;
  description: string;
};

export type LinkResponse = Tables<'links'>;

export type DetailLinksResponse = {
  links: LinkResponse;
};

export type PaginatedLinksResponse = {
  links: LinkResponse[];
  sort: string;
  category: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
