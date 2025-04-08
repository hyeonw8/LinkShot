'use client';

import { useEffect, useState } from 'react';
import { CategoryInput } from './CategoryInput';
import { useLinkMetaData } from '@/hooks/useLinkMetadata';
import { useLinkEditor } from '@/hooks/useLinkEditor';
import { useCreateLinkMutation } from '@/hooks/mutation/useCreateLinkMutation';
import { LinkPreviewCard } from './LinkPreviewCard';

interface LinkPreviewCardProps {
  linkMetaData: any; // 타입 수정 필요
}

export const LinkPreviewContent = ({ linkMetaData }: LinkPreviewCardProps) => {
  const { 
    meta,
    formattedUrl, 
    editTitle, 
    editDescription, 
    handleEditLinkChageInput 
  } = linkMetaData;

  const {
    isEditingMeta,
    categoryInput,
    setCategoryInput,
    handleEditStart,
    handleEditCancel,
    handleEditFinish,
  } = useLinkEditor();

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
