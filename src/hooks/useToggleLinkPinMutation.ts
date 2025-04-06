import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleLinkPinMutation = () => {
  const queryClient = useQueryClient();

  const toggleLinkPin = async (id: string, isPin: boolean) => {
    try {
      const res = await fetch('/api/links', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isPin }),
      });

      if (!res.ok) throw new Error('Link Shot 카드 고정 요청 실패');

      const data = await res.json();
      // console.log('저장 결과:', data);
    } catch (err) {
      console.error('Link Shot 카드 고정 실패:', err);
    }
  };

  // optimistic 처리 필요
  const toggleLinkPinMutation = useMutation({
    mutationFn: async ({ id, isPin }: { id: string; isPin: boolean }) =>
      await toggleLinkPin(id, isPin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      queryClient.invalidateQueries({ queryKey: ['pinnedLinks'] });
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
