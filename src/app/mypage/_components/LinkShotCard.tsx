import { memo } from 'react';
import { ShareLinkButton } from '../../../components/ShareLinkButton';
import Link from 'next/link';
import { LinkResponse } from '@/types/link.types';
import { getDateTime } from '@/utils/getDateTime';

interface LinkShotCardProps {
  link: LinkResponse;
  isPin: boolean;
  onToggleCardPin: (id: string, isPin: boolean) => void;
  onDeleteLink: (id: string) => void;
  onGoToPage: (url: string) => void;
}

export const LinkShotCard = memo(
  ({ link, onToggleCardPin, onDeleteLink, onGoToPage }: LinkShotCardProps) => {
    const { id, title, image, created_at, description, category, isPin, url } =
      link;
    return (
      <div className="border border-gray-200  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        {/* 이미지 섹션 - 높이 조정 */}
        <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
          {image ? (
            <img
              src={image}
              alt="미리보기 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 ">이미지 없음</span>
            </div>
          )}
          {/* 카테고리 배지 */}
          <div className="absolute top-2 w-full flex justify-between px-2">
            {/* 고정 아이콘 */}
            {isPin ? (
              <div>
                <p className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  📌 고정됨
                </p>
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <p className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {category || '카테고리 없음'}
              </p>
            </div>
          </div>
        </div>

        {/* 콘텐츠 섹션 */}
        <div className="p-4 flex-grow flex flex-col">
          {/* 날짜 */}
          <p className="text-xs text-gray-500 dark:text-white mb-1">
            {getDateTime(created_at)}
          </p>

          {/* 제목 */}
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
            {title || '제목 정보가 없습니다.'}
          </h3>

          {/* 설명 */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {description || '설명 정보가 없습니다.'}
          </p>

          {/* 버튼 그룹 */}
          <div className="mt-auto flex flex-wrap gap-2 justify-end">
            <button
              onClick={() => onToggleCardPin(id, isPin)}
              className={`text-sm px-3 py-1.5 rounded-md ${
                isPin
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {isPin ? '고정해제' : '고정하기'}
            </button>

            <button
              type="button"
              onClick={() => onGoToPage(url || '')}
              className="text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              바로가기
            </button>

            <ShareLinkButton url={url || ''} />

            <Link
              href={`/links/${id}`}
              className="flex items-center text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
            >
              <div>
                <img
                  src="/assets/svg/edit-alt.svg"
                  alt="목표 수정 버튼"
                  className="h-5 w-5"
                />
              </div>
            </Link>

            <button
              type="button"
              className="text-xs px-3 py-1.5 rounded-md bg-red-50 hover:bg-red-100"
              onClick={() => onDeleteLink(id)}
            >
              <img
                src="/assets/svg/trash-alt.svg"
                alt="링크 삭제 버튼"
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
      </div>
    );
  },
  // 커스텀 비교 함수로 불필요한 리렌더링 방지
  (prevProps, nextProps) => {
    const isSameId = prevProps.link.id === nextProps.link.id;
    const isSameCreatedAt =
      prevProps.link.created_at === nextProps.link.created_at;
    const isSameTitle = prevProps.link.title === nextProps.link.title;
    const isSameDescription =
      prevProps.link.description === nextProps.link.description;
    const isSameCategory = prevProps.link.category === nextProps.link.category;
    const isSameIspin = prevProps.link.isPin === nextProps.link.isPin;

    const isEqual =
      isSameId &&
      isSameCreatedAt &&
      isSameTitle &&
      isSameDescription &&
      isSameCategory &&
      isSameIspin;

    return isEqual;
  }
);

LinkShotCard.displayName = 'LinkShotCard';
