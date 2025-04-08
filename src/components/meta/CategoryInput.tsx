interface CategoryInputProps {
  categoryInput: string;
  setCategoryInput: (value: string) => void;
  handleSaveLink: (e: React.FormEvent) => void;
  isSaving: boolean;
}

export const CategoryInput = ({
  categoryInput,
  setCategoryInput,
  handleSaveLink,
  isSaving,
}: CategoryInputProps) => {
  return (
    <form
      onSubmit={handleSaveLink}
      className="flex flex-row  justify-between w-full"
    >
      <label className=" w-3/4">
        <input
          type="text"
          name="category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="카테고리를 입력하세요"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </label>

      <button
        type="submit"
        disabled={!categoryInput.trim() || isSaving}
        className={`px-4 py-2 rounded-md font-semibold  transition text-black
        ${
          isSaving || !categoryInput.trim()
            ? 'bg-gray-300  cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 '
        }`}
      >
        {isSaving ? '저장 중..' : '저장하기'}
      </button>
    </form>
  );
};
