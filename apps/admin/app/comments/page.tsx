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
    <div className={'flex flex-col gap-10 h-full overflow-hidden'}>
      <div className={'text-2xl font-bold '}>댓글 관리</div>
      <div className={'flex-1 grid grid-cols-2 gap-8 max-w-[1000px] m-auto'}>
        <PostList data={data?.items ?? []}
                  page={page ?? 1}
                  limit={limit ?? 10}
                  total={data?.total ?? 0} />
        <CommentList />
      </div>
    </div>
  );
};

export default CommentPage;