'use client';

import { PostData } from 'apis';

import Pagination from '@/app/(protected)/_components/common/Pagination';
import PostItem from '@/app/(protected)/comments/_components/PostItem';

interface PostListProps {
  page: number;
  limit: number;
  total: number;
  data: PostData[];
}

const PostList = ({ page, limit, total, data }: PostListProps) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="text-xs font-semibold text-[var(--muted-foreground)] mb-1">포스트 선택</div>
      <div className="flex flex-col gap-1 flex-1">
        {data.map((post: PostData) => (
          <PostItem data={post} key={post.id} />
        ))}
      </div>
      <div className="flex justify-center pt-2">
        <Pagination page={page} limit={limit} total={total} />
      </div>
    </div>
  );
};

export default PostList;
