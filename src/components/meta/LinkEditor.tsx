interface LinkEditorProps {
  title: string;
  description: string;
  onChangeInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCancelEdit: () => void;
  onFinishEdit: () => void;
}

export const LinkEditor = ({
  title,
  description,
  onChangeInput,
  onCancelEdit,
  onFinishEdit,
}: LinkEditorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChangeInput}
        className="border p-2 rounded"
      />
      <textarea
        name="description"
        value={description}
        onChange={onChangeInput}
        className="border p-2 rounded resize-none h-32"
      />
      <div className="flex justify-end gap-2  text-black">
        <button
          type="button"
          className="bg-gray-300 hover:bg=gray-400 rounded-md px-4 py-2"
          onClick={onCancelEdit}
        >
          취소
        </button>
        <button
          type="button"
          className="bg-yellow-300 hover:bg-yellow-400 rounded-md px-4 py-2 font-semibold"
          onClick={onFinishEdit}
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};
