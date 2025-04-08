import { LinkShotCard } from './LinkShotCard';
import { LinkResponse } from '@/types/link.types';

interface LinkShotListProps {
  title: string;
  links: LinkResponse[];
  isPinned: boolean;
  onToggleCardPin: (id: string, isPin: boolean) => void;
  onDeleteLink: (id: string) => void;
  onGoToPage: (url: string) => void;
}

export const LinkShotList = ({
  title,
  links,
  isPinned,
  onToggleCardPin,
  onDeleteLink,
  onGoToPage,
}: LinkShotListProps) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-3 pl-1">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {links.map((link) => (
          <div key={link.id}>
            <LinkShotCard
              link={link}
              isPin={isPinned}
              onToggleCardPin={onToggleCardPin}
              onDeleteLink={onDeleteLink}
              onGoToPage={onGoToPage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};