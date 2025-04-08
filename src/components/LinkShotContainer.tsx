'use client';

import { useLinkFilters } from '@/hooks/useLinkFilters';
import { useCategoryQuery } from '@/hooks/query/useCategoryQuery';
import { Filter } from './Filter';
import { LinkShotDashboard } from './LinkShotDashboard';
import { useState } from 'react';

export const LinkShotContainer = () => {
  const { filters, handlers } = useLinkFilters();
  const { selectedCategory, sortOrder, pinnedPage, unpinnedPage } = filters;
  const { categories, isCategoriesPending, categoriesError } = useCategoryQuery();

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4">
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        isLoading={isCategoriesPending}
        onCategoryChange={handlers.handleCategoryChange}
        onSortChange={handlers.handleSortChange}
      />
      <LinkShotDashboard
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        pinnedPage={pinnedPage}
        unpinnedPage={unpinnedPage}
        onPageChange={handlers.handlePageChange}
      />
    </div>
  );
};
