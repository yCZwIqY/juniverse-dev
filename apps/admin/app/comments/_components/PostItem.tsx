import React from 'react';
import { PostData } from '@/app/posts/_models/posts';
import { useSelectedPost } from '@/app/comments/_store/useSelectedPost';

interface PostItemProps {
  data: PostData;
}

const PostItem = ({ data }: PostItemProps) => {
  const { setSelectedPost } = useSelectedPost();
  return (
    <div className={'flex justify-between gap-2 items-center p-3 border border-gray-300 rounded-lg'}
         onClick={() => setSelectedPost(data)}>
      <div className={'flex flex-col gap-1'}>
        <div className={'font-bold text-md overflow-hidden text-ellipsis line-clamp-1'}>{data.title}</div>
        <div className={'text-gray-800 text-sm'}>{data.createdAt}</div>
      </div>
      <div className={'flex-shrink-0 font-bold bg-primary-100 text-primary-600 size-5 rounded-full flex justify-center items-center'}>
        {data.comments?.length}
      </div>
    </div>
  );
};

export default PostItem;