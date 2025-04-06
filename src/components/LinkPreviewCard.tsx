interface LinkPreviewCardProps {
  image: string;
  title: string;
  description: string;
  isEditing: boolean;
  onEditClick: () => void;
  onCancelEdit: () => void;
  onFinishEdit: () => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const LinkPreviewCard = ({
  image,
  title,
  description,
  isEditing,
  onEditClick,
  onCancelEdit,
  onFinishEdit,
  onChangeTitle,
  onChangeDescription,
}: LinkPreviewCardProps) => {
  return (
    <div className="border p-4 rounded-md shadow space-y-2">
      {image ? (
        <img
          src={image}
          alt="미리보기 이미지"
          className="w-full max-w-[400px] h-auto rounded-md object-cover"
        />
      ) : (
        <div className="w-full max-w-[400px] h-40 bg-gray-200 flex items-center justify-center rounded-md">
          이미지 없음
        </div>
      )}

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            value={description}
            onChange={onChangeDescription}
            className="border p-2 rounded resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 rounded-md px-4 py-2"
              onClick={onCancelEdit}
            >
              취소
            </button>
            <button
              type="button"
              className="bg-blue-400 rounded-md px-4 py-2 text-white font-semibold"
              onClick={onFinishEdit}
            >
              수정 완료
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg">{title || '제목 정보가 없습니다.'}</h3>
          <p className="text-gray-500">
            {description || '설명 정보가 없습니다.'}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-yellow-300 text-black rounded-md px-4 py-2"
              onClick={onEditClick}
            >
              수정하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};
