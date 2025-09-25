'use client';

import { MetaFetchForm } from './MetaFetchForm';
import { LinkPreviewContent } from './LinkPreviewContent';
import { useLinkMetaData } from '@/hooks/useLinkMetadata';

export const LinkShotManager = () => {
  const linkMetaData = useLinkMetaData();
  const {
    url,
    meta,
    error,
    isLoading,
    handleChangeUrlInput,
    handleFetchMetaData,
  } = linkMetaData;

  return (
    <div className="max-w-md mx-auto px-4 pt-7 pb-5 space-y-4">
      <MetaFetchForm
        url={url}
        isLoading={isLoading}
        onChangeUrl={handleChangeUrlInput}
        onSubmit={handleFetchMetaData}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {meta && <LinkPreviewContent linkMetaData={linkMetaData} />}
    </div>
  );
};
