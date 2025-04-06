import { CreateLinkInput } from '@/types/link.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateLinkMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createLinkShot = async (linkData: CreateLinkInput) => {
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: linkData }),
      });

      if (!res.ok) throw new Error('Link Shot 저장 요청 실패');

      const data = await res.json();
      // console.log('저장 결과:', data);
    } catch (err) {
      console.error('Link Shot 저장 실패:', err);
    }
  };

  const createLinkMutation = useMutation({
    mutationFn: (linkData: CreateLinkInput) => createLinkShot(linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      alert('저장되었습니다! 보관함으로 이동합니다.');
      router.push('/mypage');
    },
    onError: (error) => {
      console.error('Link Shot 저장 중 오류 발생:', error);
      alert('Link Shot 저장에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    createLinkMutation,
  };
};
