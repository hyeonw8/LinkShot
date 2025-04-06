'use client';

import { useEditLinkMutation } from '@/hooks/useEditLinkMutation';
import { DetailLinksResponse } from '@/types/link.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LinkShotEditContainerPros {
  id: string;
  initialData: DetailLinksResponse;
}
export const LinkShotEditContainer = ({
  id,
  initialData,
}: LinkShotEditContainerPros) => {
  const router = useRouter();
  const { image, title, description, category } = initialData.links;
  // const {data, isPending, error } = useLinkDetailQuery(id);
  const [editData, setEditData] = useState({
    title: title ?? '',
    description: description ?? '',
    category: category ?? '',
  });
  const { editLinkMutation } = useEditLinkMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditLink = () => {
    if (typeof id !== 'string') return; // 타입 오류 예외 처리

    const linkData = {
      title: editData.title,
      description: editData.description,
      category: editData.category,
    };

    editLinkMutation.mutate({ id, linkData });
  };

  if (!id) {
    return <div className="text-center text-red-600">잘못된 접근입니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        링크 편집 페이지
      </h1>

      <div className="mb-6">
        {image ? (
          <img
            src={image}
            alt="미리보기 이미지"
            className="w-full max-w-[400px] h-auto rounded-md object-cover mb-4"
          />
        ) : (
          <div className="w-full max-w-[400px] h-40 bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-md mb-4">
            이미지 없음
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            카테고리
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={editData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            설명
          </label>
          <textarea
            id="description"
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-4 py-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-6 py-2 dark:bg-blue-600 dark:hover:bg-blue-500"
            onClick={handleEditLink}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};
