import Link from 'next/link';
import { PostData } from 'apis';
import PostItem from '@/app/_components/post/PostItem';

interface LatestPostsProps {
  posts: PostData[];
}

const LatestPosts = async ({ posts }: LatestPostsProps) => {
  return (
    <section className={'border border-border rounded-xl p-4 bg-card'}>
      <div className={'flex justify-between items-center pb-[10px] border-b-2 border-border'}>
        <span className={'font-bold'}>Latest</span>
        <Link className={'text-sm text-accent'} href={'/posts'}>
          전체 보기 →
        </Link>
      </div>
      <div className={'py-4 flex flex-col gap-2'}>{posts?.map((post) => <PostItem key={post.id} {...post} />)}</div>
    </section>
  );
};

export default LatestPosts;
