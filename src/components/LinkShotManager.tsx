'use client';

import { useCreateLinkMutation } from '@/hooks/useCreateLinkMutation';
import { getMeta } from '@/lib/getMeta';
import { extractUrl } from '@/utils/extractUrl';
import { useEffect, useState } from 'react';
import { MetaFetchForm } from './MetaFetchForm';
import { LinkPreviewCard } from './LinkPreviewCard';

export const LinkShotManager = () => {
  const [url, setUrl] = useState('');
  const [meta, setMeta] = useState<{
    title: string;
    image: string;
    description: string;
  } | null>(null);
  // 카테고리 수정
  const [categoryInput, setCategoryInput] = useState('');
  const [isShowCategoryInput, setIsShowCategoryInput] = useState(false);
  // 메타 폼 수정 모드
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  // 저장 전 폼 수정
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  // 메타 데이터 로딩, 에러 처리
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // supabase에 저장
  const { createLinkMutation } = useCreateLinkMutation();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'url') {
      setUrl(value);
    } else if (name === 'category') {
      setCategoryInput(value);
    }
  };

  const handleEditLinkChageInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setEditTitle(value);
    } else if (name === 'description') {
      setEditDescription(value);
    }
  };

  const extracted = extractUrl(url.trim());
  const formattedUrl = extracted?.startsWith('http')
    ? extracted
    : `https://${extracted}`;

  const handleFetchMetaData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('링크를 입력해주세요.');
      return;
    }

    if (!extracted) {
      setError('유효한 링크를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const metadata = await getMeta(formattedUrl);
      setMeta(metadata);
    } catch (err) {
      console.error('메타데이터 불러오기 실패:', err);
      setError('유효하지 않은 링크이거나, 메타데이터를 불러오지 못했어요.');
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    if (meta) {
      setEditTitle(meta.title || '');
      setEditDescription(meta.description || '');
    }
  }, [meta]);

  return (
    <div className="max-w-md mx-auto px-4 pt-7 pb-5 space-y-4">
      <MetaFetchForm
        url={url}
        isLoading={isLoading}
        onChangeUrl={handleChangeInput}
        onSubmit={handleFetchMetaData}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {meta && meta.title && (
        <LinkPreviewCard
          image={meta.image}
          title={editTitle}
          description={editDescription}
          isEditing={isEditingMeta}
          onEditClick={() => setIsEditingMeta(true)}
          onCancelEdit={() => setIsEditingMeta(false)}
          onFinishEdit={() => setIsEditingMeta(false)}
          onChangeTitle={handleEditLinkChageInput}
          onChangeDescription={handleEditLinkChageInput}
        />
      )}
      {!isShowCategoryInput ? (
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-green-300 rounded-md px-5 py-2 text-black font-semibold"
            onClick={() => setIsShowCategoryInput(true)}
          >
            저장
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSaveLink}
          className="flex flex-col gap-2 items-end w-full"
        >
          <input
            type="text"
            name="category"
            value={categoryInput}
            onChange={handleChangeInput}
            placeholder="카테고리를 입력하세요"
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            disabled={!categoryInput.trim() || createLinkMutation.isPending}
            className="bg-green-400 rounded-md px-5 py-2 text-black font-semibold disabled:bg-gray-300"
          >
            {createLinkMutation.isPending ? '저장 중...' : '저장하기'}
          </button>
        </form>
      )}
    </div>
  );
};
