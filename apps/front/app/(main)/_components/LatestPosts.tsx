import Link from 'next/link';
import { getRecentPosts } from 'apis';
import SimplePostItem from '@/app/_components/post/SimplePostItem';

const LatestPosts = async () => {
  const posts = await getRecentPosts();

  return (
    <section className={'glass-card w-full p-8 md:p-10 bg-card flex flex-col gap-6 reveal'}>
      <div className={'flex justify-between'}>
        <div className={'text-xl font-bold'}>최근에 올라온 글</div>
        <Link className={'text-sm text-accent'} href={'/posts'}>
          전체글 보기 →
        </Link>
      </div>
      <div className={'py-4 flex flex-col gap-2'}>{posts?.map((post) =>
        <SimplePostItem key={post.id} {...post} />)}</div>
    </section>
  );
};

export default LatestPosts;
