'use client';

import { useDeleteLinkMutation } from '@/hooks/mutation/useDeleteLinkMutation';
import { useToggleLinkMutation } from '@/hooks/mutation/useToggleLinkMutation';
import { LinkShotCard } from './LinkShotCard';
import { LinkResponse } from '@/types/link.types';
import { useCallback } from 'react';

interface LinkShotListProps {
  title: string;
  links: LinkResponse[];
  isPinned: boolean;
}

export const LinkShotList = ({
  title,
  links,
  isPinned,
}: LinkShotListProps) => {
  const { deleteLinkMutation } = useDeleteLinkMutation();
  const { toggleLinkMutation } = useToggleLinkMutation();

  const handleToggleCardPin = useCallback(
    (id: string, isPin: boolean) => {
      toggleLinkMutation.mutate({ id, isPin });
    },
    [toggleLinkMutation]
  );

  const handleDeleteLink = useCallback(
    (id: string) => {
      deleteLinkMutation.mutate(id);
    },
    [deleteLinkMutation]
  );

  const handleGoToPage = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-3 pl-1">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {links.map((link) => (
          <div key={link.id}>
            <LinkShotCard
              link={link}
              isPin={isPinned}
              onToggleCardPin={handleToggleCardPin}
              onDeleteLink={handleDeleteLink}
              onGoToPage={handleGoToPage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};