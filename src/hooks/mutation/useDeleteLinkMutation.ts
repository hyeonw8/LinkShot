import { queryKeys } from '@/constants/queryKeys';
import { deleteLink } from '@/lib/deleteLink';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();

  const deleteLinkMutation = useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all });
      alert('삭제되었습니다.');
    },
    onError: (error) => {
      console.error('Link Shot 삭제 중 오류 발생:', error);
      alert('Link Shot 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    deleteLinkMutation,
  };
};
