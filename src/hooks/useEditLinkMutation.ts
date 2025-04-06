import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useEditLinkMutation = () => {
  const queryClient = useQueryClient();
const router = useRouter();

  const editLinkShot = async (id: string, linkData: any) => {
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: linkData }),
      });

      if (!res.ok) throw new Error('Link Shot 삭제 요청 실패');

      const data = await res.json();
      // console.log('저장 결과:', data);
      return data;
    } catch (err) {
      console.error('Link Shot 삭제 실패:', err);
    }
  };

  const editLinkMutation = useMutation({
    mutationFn: ({id, linkData}: {id: string, linkData: any}) => editLinkShot(id, linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      alert('Link Shot이 수정되었습니다.');
      router.replace('/mypage')
    },
    onError: (error) => {
      console.error('링크 저장 중 오류 발생:', error);
      alert('Link Shot 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    editLinkMutation
  }
};
