interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number, type: 'pinned' | 'unpinned') => void;
  type: 'pinned' | 'unpinned';
  isDisabled?: boolean;
}
export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  type,
  isDisabled = false,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center mt-6 py-3">
      <div className="flex items-center gap-4">
        {/* button 분리 필요 */}
        <button
          onClick={() => onPageChange(page - 1, type)}
          disabled={isDisabled || page === 1}
          className={`px-4 py-2 rounded-md transition-colors ${
            page === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white dark:bg-white dark:text-black hover:bg-gray-500'
          }`}
        >
          이전
        </button>
        <span className="text-sm font-medium">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1, type)}
          disabled={isDisabled || page === totalPages}
          className={`px-4 py-2 rounded-md transition-colors ${
            page === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white dark:bg-white dark:text-black hover:bg-gray-500'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};