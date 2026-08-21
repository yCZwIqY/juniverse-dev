import { getPosts } from 'apis';

import CommentList from '@/app/(protected)/comments/_components/CommentList';
import PostList from '@/app/(protected)/comments/_components/PostList';

export const dynamic = 'force-dynamic';

interface CommentPageProps {
  searchParams: Promise<{
    page: number;
    limit: number;
  }>;
}

const CommentPage = async ({ searchParams }: CommentPageProps) => {
  const { page, limit } = await searchParams;
  const data = await getPosts(page ?? 1, limit ?? 10, 0, '');

  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <div className="eyebrow mb-1">Moderation</div>
        <div className="text-2xl font-bold text-[var(--color-ink)]">댓글 관리</div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
        <div className="glass-card p-4 overflow-y-auto">
          <PostList
            data={data?.items ?? []}
            page={page ?? 1}
            limit={limit ?? 10}
            total={data?.total ?? 0}
          />
        </div>
        <div className="glass-card p-4 overflow-y-auto">
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
