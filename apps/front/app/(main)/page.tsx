import BlogInfo from '@/app/(main)/_components/BlogInfo';
import LatestPosts from '@/app/(main)/_components/LatestPosts';
import { getRecentPosts } from 'apis';
import MyInfo from '@/app/(main)/_components/MyInfo';

const MainPage = async () => {
  const data = await getRecentPosts();
  return (
    <div className={'py-4 flex flex-col gap-4'}>
      <BlogInfo lastPostId={data?.[0].id} />
      <div className={'lg:grid grid-cols-[5fr_2fr] flex flex-col gap-4'}>
        <LatestPosts posts={data ?? []} />
        <MyInfo posts={data ?? []} />
      </div>
    </div>
  );
};

export default MainPage;
