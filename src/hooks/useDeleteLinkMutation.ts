import { useMutation, useQueryClient } from '@tanstack/react-query';


export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();

  const deleteLinkShot = async (id: string) => {
    try {
      const res = await fetch('/api/links', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      if (!res.ok) throw new Error('Link Shot 삭제 요청 실패');

      const data = await res.json();
      // console.log('저장 결과:', data);
      // return data;
    } catch (err) {
      console.error('Link Shot 삭제 실패:', err);
    }
  };

  const deleteLinkMutation = useMutation({
    mutationFn:  (id: string) => deleteLinkShot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
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
