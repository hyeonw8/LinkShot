'use client';

import { useCreateLinkMutation } from '@/hooks/mutation/useCreateLinkMutation';
import { MetaFetchForm } from './MetaFetchForm';
import { LinkPreviewCard } from './LinkPreviewCard';
import { LinkPreviewContent } from './LinkPreviewContent';
import { useLinkMetaData } from '@/hooks/useLinkMetadata';

export const LinkShotManager = () => {
  const {
    url,
    meta,
    error,
    isLoading,
    handleChangeUrlInput,
    handleFetchMetaData,
  } = useLinkMetaData();

  return (
    <div className="max-w-md mx-auto px-4 pt-7 pb-5 space-y-4">
      <MetaFetchForm
        url={url}
        isLoading={isLoading}
        onChangeUrl={handleChangeUrlInput}
        onSubmit={handleFetchMetaData}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {meta && meta.title && <LinkPreviewContent meta={meta} />}
    </div>
  );
};
