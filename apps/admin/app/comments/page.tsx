import React from 'react';
import { getPosts } from 'apis';
import PostList from '@/app/comments/_components/PostList';
import CommentList from '@/app/comments/_components/CommentList';

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
    <div className={'flex flex-col gap-6 md:gap-10 h-full overflow-hidden'}>
      <div className={'text-2xl font-bold text-white tracking-tight'}>댓글 관리</div>
      <div className={'flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1000px] m-auto w-full'}>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4">
          <PostList data={data?.items ?? []}
                    page={page ?? 1}
                    limit={limit ?? 10}
                    total={data?.total ?? 0} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4">
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
