import { getDetailLink } from '@/lib/getDetailLink';
import { LinkShotEditContainer } from '../_components/LinkShotEditContainer';

const LinkShotEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // params를 먼저 await
  const id = (await params).id;
  const data = await getDetailLink(id);

  return (
    data && (
      <div className="pt-10">
      <LinkShotEditContainer id={id} initialData={data} />
      </div>
    )
  );
};

export default LinkShotEditPage;
