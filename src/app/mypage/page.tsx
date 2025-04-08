import { LinkShotContainer } from '@/components/LinkShotContainer';

const MyPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-2 items-center py-7">
        <h1 className=" text-4xl font-bold">My Page</h1>
        <p className="">저장한 Link Shot을 빠르게 찾아보세요.</p>
      </div>
      <LinkShotContainer />
    </div>
  );
};

export default MyPage;
