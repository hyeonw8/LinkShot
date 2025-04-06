import { getPinnedLinks } from "@/lib/getPinnedLinks";
import { useQuery } from "@tanstack/react-query";

export const usePinnedLinksQuery = () => {


  // 고정된 링크만 별도로 가져오는 쿼리
  const { data: pinnedData, isPending: isPinnedPending, error: pinnedError } = useQuery({
    queryKey: ['pinnedLinks'],
    queryFn: getPinnedLinks
  })

  return {
    pinnedData,
    isPinnedPending,
    pinnedError,
  };
};
