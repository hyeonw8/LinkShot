import { queryKeys } from '@/constants/queryKeys';
import { createLink } from '@/lib/createLink';
import { CreateLinkInput } from '@/types/link.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateLinkMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createLinkMutation = useMutation({
    mutationFn: (linkData: CreateLinkInput) => createLink(linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', 'list'] });
      alert('저장되었습니다! 보관함으로 이동합니다.');
      router.push('/mypage');
    },
    onError: (error) => {
      console.error('Link Shot 저장 중 오류 발생:', error);

      if (error.message === 'AUTH_REQUIRED') {
        alert('로그인이 필요합니다. 로그인 후 저장할 수 있습니다.');
      } else if (error.message === 'NETWORK_ERROR') {
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert(error.message || 'Link Shot 저장에 실패했습니다.');
      }
    },
  });

  return {
    createLinkMutation,
  };
};
