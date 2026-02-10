'use client';

import { useSelectedPost } from '@/app/comments/_store/useSelectedPost';
import CommentItem from '@/app/comments/_components/CommentItem';

const CommentList = () => {
  const { selectedPost } = useSelectedPost();
  return (
    <div className={'flex h-full overflow-y-auto flex-col gap-2 border border-white/10 bg-white/5 rounded-xl p-2 text-white'}>
      {selectedPost?.comments.map((comment) => (
        <CommentItem
          postId={selectedPost.id}
          key={`${selectedPost.id}-${comment.id}`}
          data={comment}
        />
      ))}
    </div>
  );
};

export default CommentList;
