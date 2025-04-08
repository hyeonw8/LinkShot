'use client';

import { useEffect, useState } from 'react';
import { CategoryInput } from './CategoryInput';
import { useLinkMetaData } from '@/hooks/useLinkMetadata';
import { useLinkEditor } from '@/hooks/useLinkEditor';
import { useCreateLinkMutation } from '@/hooks/mutation/useCreateLinkMutation';
import { LinkPreviewCard } from './LinkPreviewCard';

interface LinkPreviewCardProps {
  meta?: any;
}

export const LinkPreviewContent = ({ meta }: LinkPreviewCardProps) => {
  const { formattedUrl, editTitle, editDescription, handleEditLinkChageInput } =
    useLinkMetaData();
  const {
    isEditingMeta,
    categoryInput,
    setCategoryInput,
    handleEditStart,
    handleEditCancel,
    handleEditFinish,
  } = useLinkEditor();
  // const [isShowCategoryInput, setIsShowCategoryInput] = useState(false);

  const { createLinkMutation } = useCreateLinkMutation();

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();

    if (!meta || !categoryInput.trim()) return;

    const linkData = {
      title: editTitle,
      description: editDescription,
      image: meta.image,
      url: formattedUrl,
      category: categoryInput.trim(),
    };

    createLinkMutation.mutate(linkData);
  };

  return (
    <div className="border p-4 rounded-md shadow space-y-2">
      <LinkPreviewCard
        meta={meta}
        isEditing={isEditingMeta}
        onEditClick={handleEditStart}
        onCancelEdit={handleEditCancel}
        onFinishEdit={handleEditFinish}
        onChangeLinkEditInput={handleEditLinkChageInput}
      />
{/* 
      {!isShowCategoryInput && meta && (
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-green-300 hover:bg-green-400 rounded-md px-5 py-2 text-black font-semibold"
            onClick={() => setIsShowCategoryInput(true)}
          >
            카테고리 입력하기
          </button>
        </div>
      )} */}

      {meta && (
        <CategoryInput
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          handleSaveLink={handleSaveLink}
          isSaving={createLinkMutation.isPending}
        />
      )}
    </div>
  );
};
