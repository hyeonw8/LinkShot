import { queryKeys } from '@/constants/queryKeys';
import { getCategories } from '@/lib/getCategories';
import { useQuery } from '@tanstack/react-query';

export const useCategoryQuery = () => {
  const {
    data: categories = ['전체'], // 기본값 설정
    isPending: isCategoriesPending,
    error: categoriesError,
  } = useQuery({
    queryKey: queryKeys.links.category,
    queryFn: getCategories,
  });

  return { categories, isCategoriesPending, categoriesError };
};
