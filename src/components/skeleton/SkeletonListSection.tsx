interface SkeletonListSectionProps {
  title: string;
  count?: number;
}

export const SkeletonListSection = ({
  title,
  count = 8,
}: SkeletonListSectionProps) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-3 pl-1">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="border border-gray-200  rounded-lg animate-pulse shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
            {/* 이미지 섹션 */}
            <div className="h-32 bg-gray-100 "></div>
            {/* 콘텐츠 섹션 */}
            <div className="p-4 flex-grow flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-2">
                {/* 날짜 */}
                <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
                {/* 제목 */}
                <div className="h-5 w-full bg-gray-300 rounded"></div>
                <div className="h-5 w-full bg-gray-300 rounded"></div>
                {/* 설명 */}
                <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
              </div>
              {/* 버튼 그룹 */}
              <div className="flex flex-col gap-y-2 ">
                <div className="flex flex-row gap-2 justify-end">
                  {/* 고정 버튼 */}
                  <div className="h-9 w-2/6 bg-gray-300 rounded-md" />
                  {/* 수정 버튼 */}
                  <div className="h-9 w-1/6 bg-gray-300 rounded-md" />
                  {/* 삭제 버튼 */}
                  <div className="h-9 w-1/6 bg-gray-300 rounded-md" />
                </div>
                <div className="flex flex-row gap-2 justify-end">
                  {/* 바로가기 버튼*/}
                  <div className="h-9 w-2/6 bg-gray-300 rounded-md" />
                  {/* 공유하기 버튼 */}
                  <div className="h-9 w-2/6 bg-gray-300 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
