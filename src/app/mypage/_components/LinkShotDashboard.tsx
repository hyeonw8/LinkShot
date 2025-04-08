'use client';

import { PinnedLinkShotSection } from './PinnedLinkShotSection';
import { UnpinnedLinkShotSection } from './UnpinnedLinkShotSection';

interface LinkShotDashboardProps {
  selectedCategory: string;
  sortOrder: string;
  pinnedPage: number;
  unpinnedPage: number;
  onPageChange: (newPage: number, type: 'pinned' | 'unpinned') => void;
}

export const LinkShotDashboard = ({
  selectedCategory,
  sortOrder,
  pinnedPage,
  unpinnedPage,
  onPageChange,
}: LinkShotDashboardProps) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4">
      <PinnedLinkShotSection page={pinnedPage} onPageChange={onPageChange} />
      <UnpinnedLinkShotSection
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        page={unpinnedPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
