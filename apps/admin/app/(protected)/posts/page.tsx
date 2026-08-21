import Link from 'next/link';

import { getPosts } from 'apis';

export const dynamic = 'force-dynamic';
import { Button } from 'components';
import Pagination from '@/app/(protected)/_components/common/Pagination';
import PostTable from '@/app/(protected)/posts/_components/PostTable';

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="eyebrow mb-1">Content</div>
          <div className="text-2xl font-bold text-[var(--color-ink)]">포스트 관리</div>
          <div className="text-sm text-[var(--muted-foreground)]">{data?.total ?? 0}개의 포스트</div>
        </div>
        <Button asChild variant="default" size="md">
          <Link href="/posts/0">작성하기</Link>
        </Button>
      </div>
      <PostTable data={data?.items ?? []} page={data?.page ?? 1} limit={data?.limit ?? 10} total={data?.total ?? 0} />
      <div className="flex justify-center">
        <Pagination page={data?.page ?? 1} total={data?.total ?? 0} limit={data?.limit ?? 10} />
      </div>
    </div>
  );
};

export default PostPage;
