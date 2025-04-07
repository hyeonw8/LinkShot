import { queryKeys } from '@/constants/queryKeys';
import { toggleLink } from '@/lib/\btoggleLink';
import { LinkResponse } from '@/types/link.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ToggleLinkStatusParams {
  id: string;
  isPin: boolean;
}
type ToggleLinkStatusContext = {
  prevLinks: LinkResponse[];
};

export const useToggleLinkMutation = () => {
  const queryClient = useQueryClient();

  // 기존 캐시된 데이터를 가져오기 위한 함수
  const getExistingLinks = () => {
    return queryClient.getQueryData<LinkResponse[]>(queryKeys.links.all) ?? [];
  };

  // optimistic 처리 필요
  const toggleLinkMutation = useMutation<
    void,
    Error,
    ToggleLinkStatusParams,
    ToggleLinkStatusContext
  >({
    mutationFn: ({ id, isPin }: ToggleLinkStatusParams) =>
      toggleLink(id, isPin),
    onMutate: async ({ id, isPin }) => {
      // 진행 중인 refetch들을 취소
      await queryClient.cancelQueries({ queryKey: queryKeys.links.all });
      // 이전 데이터 백업
      const prevLinks = getExistingLinks();
      // 캐시 낙관적 업데이트
      queryClient.setQueryData<LinkResponse[]>(
        queryKeys.links.all,
        (old = []) => {
          return old.map((link) =>
            link.id === id ? { ...link, isPin } : link
          );
        }
      );

      // 롤백을 위해 이전 상태 반환
      return { prevLinks };
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.prevLinks) {
        queryClient.setQueryData(queryKeys.links.all, context.prevLinks);
      }
      console.error('Link Shot 카드 고정 중 오류 발생:', error);
      alert('Link Shot 카드 고정에 실패했습니다. 다시 시도해주세요.');
    },
    // mutation이 성공하든 실패하든 상관없이 항상 실행되는 콜백
    onSettled: () => {
      // 서버 데이터와 동기화를 위해 refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.links.all,
      });
    },
  });

  return {
    toggleLinkMutation,
  };
};
