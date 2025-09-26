'use client';

import { CategoryInput } from './CategoryInput';
import { useLinkEditor } from '@/hooks/useLinkEditor';
import { useCreateLinkMutation } from '@/hooks/mutation/useCreateLinkMutation';
import { LinkPreviewCard } from './LinkPreviewCard';
import { useAuthStore } from '@/store/authStore';

interface LinkPreviewCardProps {
  linkMetaData: any; // 타입 수정 필요
}

export const LinkPreviewContent = ({ linkMetaData }: LinkPreviewCardProps) => {
  const { user } = useAuthStore();

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

    if (!user) {
      alert('로그인이 필요합니다. 로그인 후 저장할 수 있습니다.');
      return;
    }

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
        editTitle={editTitle}
        editDescription={editDescription}
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
