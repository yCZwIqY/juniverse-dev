import PostTable from '@/app/posts/_components/PostTable';
import Button from '@/app/_components/common/Button';
import Link from 'next/link';
import { getPosts } from 'apis';

interface PostPageProps {
  searchParams: Promise<{
    page: number;
    limit: number;
  }>;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const { page, limit } = await searchParams;
  const data = await getPosts(page ?? 1, limit ?? 10, 0, '');

  return (
    <div className={'py-10 flex flex-col gap-10'}>
      <div className={'flex justify-between items-center'}>
        <div className={'font-bold text-xl'}>{data?.total ?? 0} 개의 포스트</div>
        <Button className={'py-2 px-4 rounded-lg'}>
          <Link href={'/posts/0'}>작성하기</Link>
        </Button>
      </div>
      <PostTable data={data?.items ?? []} page={data?.page ?? 1} limit={data?.limit ?? 10} total={data?.total ?? 0} />
    </div>
  );
};

export default PostPage;
