import { queryKeys } from '@/constants/queryKeys';
import { deleteLink } from '@/lib/deleteLink';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteLinkParams {
  id: string;
  currentPage: number;
  currentPageLinkCount: number;
  type: string;
  onPageChange: (newPage: number, type: 'pinned' | 'unpinned') => void;
}

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();

  const deleteLinkMutation = useMutation({
    // payload 객체를 받도록 수정
    mutationFn: (payload: DeleteLinkParams) => deleteLink(payload.id),

    onSuccess: (_, payload) => {
      const { id, currentPage, currentPageLinkCount, type, onPageChange } = payload;

      // 현재 페이지의 마지막 항목인지 확인
      const isLastItemOnPage = currentPageLinkCount === 1;
      const isNotFirstPage = currentPage > 1;


      // 마지막 항목이면서 첫 페이지가 아니면 이전 페이지로 이동
      if (isLastItemOnPage && isNotFirstPage) {
        // console.log('Moving to previous page:', currentPage - 1);
        onPageChange(currentPage - 1, type as 'pinned' | 'unpinned');
      } else {
        // 현재 페이지 유지하고 데이터 갱신
        queryClient.invalidateQueries({
          queryKey:
            type === 'pinned'
              ? queryKeys.links.pinnedList(currentPage)
              : queryKeys.links.list({ page: currentPage }),
        });
      }

      alert('링크가 삭제되었습니다.');
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
