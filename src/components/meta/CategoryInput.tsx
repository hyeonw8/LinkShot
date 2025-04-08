interface CategoryInputProps {
  categoryInput: string;
  setCategoryInput: (value: string) => void;
  handleSaveLink: (e: React.FormEvent) => void;
  isSaving: boolean;
}


export const CategoryInput = ({categoryInput, setCategoryInput, handleSaveLink, isSaving}: CategoryInputProps) => {
  return (
    <form
      onSubmit={handleSaveLink}
      className="flex flex-col gap-2 items-end w-full"
    >
      <input
        type="text"
        name="category"
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
        placeholder="카테고리를 입력하세요"
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={!categoryInput.trim() || isSaving}
        className="bg-green-400 rounded-md px-5 py-2 text-black font-semibold disabled:bg-gray-300"
      >
        {isSaving ? '저장 중...' : '저장하기'}
      </button>
    </form>
  );
}