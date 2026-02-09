'use client';

import Pagination from '@/app/_components/common/Pagination';
import { PostData } from '@/app/posts/_models/posts';
import PostItem from '@/app/comments/_components/PostItem';

interface PostListProps {
  page: number;
  limit: number;
  total: number;
  data: PostData[];
}

const PostList = ({ page, limit, total, data }: PostListProps) => {
  return (
    <div className={'h-full flex flex-col items-center gap-2'}>
      <div className={'border border-gray-300 rounded-lg flex flex-col gap-1 p-2 flex-1'}>
        {data.map((post: PostData) => (<PostItem data={post}
                                                 key={post.id} />))}
      </div>
      <Pagination page={page}
                  limit={limit}
                  total={total} />
    </div>
  );
};

export default PostList;