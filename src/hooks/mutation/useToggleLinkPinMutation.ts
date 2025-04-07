import { toggleLink } from '@/lib/\btoggleLink';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleLinkPinMutation = () => {
  const queryClient = useQueryClient();


  // optimistic 처리 필요
  const toggleLinkPinMutation = useMutation({
    mutationFn: ({ id, isPin }: { id: string; isPin: boolean }) =>
      toggleLink(id, isPin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', 'list'] });
    },
    onError: (error) => {
      console.error('Link Shot 카드 고정 중 오류 발생:', error);
      alert('Link Shot 카드 고정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    toggleLinkPinMutation,
  };
};
