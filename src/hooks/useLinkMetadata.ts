import { getMeta } from '@/lib/getMeta';
import { extractUrl } from '@/utils/extractUrl';
import { useEffect, useState } from 'react';

export const useLinkMetaData = () => {
  const [url, setUrl] = useState('');
  const [meta, setMeta] = useState<{
    title: string;
    image: string;
    description: string;
  } | null>(null);
  // 메타 데이터 로딩, 에러 처리
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // 저장 전 폼 수정
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleChangeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUrl(value);
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

  useEffect(() => {
    if (meta) {
      setEditTitle(meta.title || '');
      setEditDescription(meta.description || '');
    }
  }, [meta]);

  return {
    url,
    setUrl,
    meta,
    error,
    isLoading,
    formattedUrl,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    handleChangeUrlInput,
    handleEditLinkChageInput,
    handleFetchMetaData,
  };
};
