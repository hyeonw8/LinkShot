'use client';

import { LinkPreviewImage } from './LinkPreviewImage';
import { LinkEditor } from './LinkEditor';

interface LinkPreviewCardProps {
  meta: any;
  isEditing: boolean;
  onEditClick: () => void;
  onCancelEdit: () => void;
  onFinishEdit: () => void;
  onChangeLinkEditInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  editTitle: string;
  editDescription: string;
}

export const LinkPreviewCard = ({
  meta,
  isEditing,
  onEditClick,
  onCancelEdit,
  onFinishEdit,
  onChangeLinkEditInput,
  editTitle,
  editDescription,
}: LinkPreviewCardProps) => {
  const { title, image, description } = meta;
  return (
    <>
      <LinkPreviewImage image={image} />
      {isEditing ? (
        <LinkEditor
          title={editTitle}
          description={editDescription}
          onChangeInput={onChangeLinkEditInput}
          onCancelEdit={onCancelEdit}
          onFinishEdit={onFinishEdit}
        />
      ) : (
        <>
          <h3 className="text-lg">{editTitle || title || '제목 정보가 없습니다.'}</h3>
          <p className="text-gray-500">
            {editDescription || description || '설명 정보가 없습니다.'}
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
    </>
  );
};
