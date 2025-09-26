import { queryKeys } from '@/constants/queryKeys';
import { editLink } from '@/lib/editLink';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useEditLinkMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const editLinkMutation = useMutation({
    mutationFn: ({ id, linkData }: { id: string; linkData: any }) =>
      editLink(id, linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all });
      alert('Link Shot이 수정되었습니다.');
      router.replace('/mypage');
    },
    onError: (error) => {
      console.error('링크 저장 중 오류 발생:', error);

      if (error.message === 'AUTH_REQUIRED') {
        alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
        router.push('/signin');
      } else if (error.message === 'NETWORK_ERROR') {
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert(error.message || 'Link Shot 수정에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  return {
    editLinkMutation,
  };
};
