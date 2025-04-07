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
      alert('Link Shot 저장에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    createLinkMutation,
  };
};
