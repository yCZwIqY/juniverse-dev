import PostTable from '@/app/(protected)/posts/_components/PostTable';
import Button from '@/app/(protected)/_components/common/Button';
import Link from 'next/link';
import { getPosts } from 'apis';
import Pagination from '@/app/(protected)/_components/common/Pagination';

interface PostPageProps {
  searchParams: Promise<{
    page: number;
    limit: number;
  }>;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const { page, limit } = await searchParams;
  const data = await getPosts(page ?? 1, limit ?? 10, 0, '', true);

  return (
    <div className={'py-10 flex flex-col gap-10'}>
      <div className={'flex justify-between items-center'}>
        <div className={'font-bold text-xl text-white'}>{data?.total ?? 0} 개의 포스트</div>
        <Button className={'py-2 px-4 rounded-lg'}>
          <Link href={'/posts/0'}>작성하기</Link>
        </Button>
      </div>
      <PostTable data={data?.items ?? []} page={data?.page ?? 1} limit={data?.limit ?? 10} total={data?.total ?? 0} />
      <div className={'flex justify-center'}>
        <Pagination page={data?.page ?? 1} total={data?.total ?? 0} limit={data?.limit ?? 10} />
      </div>
    </div>
  );
};

export default PostPage;
