interface MetaFetchFormProps {
  url: string;
  isLoading: boolean;
  onChangeUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const MetaFetchForm = ({
  url,
  isLoading,
  onChangeUrl,
  onSubmit,
}: MetaFetchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <input
        name="url"
        type="text"
        placeholder="링크를 입력하세요"
        className="w-full border border-black dark:border-white px-3 py-2 rounded-md"
        value={url}
        onChange={onChangeUrl}
      />
      <button
        type="submit"
        className="w-full bg-green-300 hover:bg-green-400 rounded-md px-3 py-2 text-black font-semibold cursor-pointer"
      >
        {isLoading ? '불러오는 중...' : '불러오기'}
      </button>
    </form>
  );
};
