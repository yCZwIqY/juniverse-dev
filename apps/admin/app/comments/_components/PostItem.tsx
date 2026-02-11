import React from 'react';
import { PostData } from 'apis';
import { useSelectedPost } from '@/app/comments/_store/useSelectedPost';

interface PostItemProps {
  data: PostData;
}

const PostItem = ({ data }: PostItemProps) => {
  const { setSelectedPost } = useSelectedPost();
  return (
    <div
      className={'flex justify-between gap-2 items-center p-3 border border-white/10 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors'}
      onClick={() => setSelectedPost(data)}
    >
      <div className={'flex flex-col gap-1'}>
        <div className={'font-bold text-md overflow-hidden text-ellipsis line-clamp-1'}>{data.title}</div>
        <div className={'text-gray-300 text-sm'}>{data.createdAt}</div>
      </div>
      <div className={'flex-shrink-0 font-bold bg-cyan-400/20 text-cyan-200 size-6 rounded-full flex justify-center items-center border border-cyan-300/40'}>
        {data.comments?.length}
      </div>
    </div>
  );
};

export default PostItem;
