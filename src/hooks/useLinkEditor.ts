import { useState } from 'react';

export const useLinkEditor = () => {
  // 메타 폼 수정 모드
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  // 카테고리 입력
  const [isShowCategoryInput, setIsShowCategoryInput] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCategoryInput(value);
  };

  const handleEditStart = () => setIsEditingMeta(true);
  const handleEditCancel = () => setIsEditingMeta(false);
  const handleEditFinish = () => setIsEditingMeta(false);
  const handleShowCategoryInput = () => setIsShowCategoryInput(true);

  return {
    isEditingMeta,
    categoryInput,
    setCategoryInput,
    isShowCategoryInput,
    setIsShowCategoryInput,
    handleEditStart,
    handleEditCancel,
    handleEditFinish,
    handleChangeCategory,
    handleShowCategoryInput,
  };
};
