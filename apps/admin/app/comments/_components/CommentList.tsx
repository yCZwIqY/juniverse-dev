'use client';

import { useSelectedPost } from '@/app/comments/_store/useSelectedPost';
import CommentItem from '@/app/comments/_components/CommentItem';

const CommentList = () => {
  const { selectedPost } = useSelectedPost();
  return (
    <div className={'flex h-full overflow-y-auto flex-col gap-1 border border-gray-300 rounded-lg'}>
      {selectedPost?.comments.map((comment) => (<CommentItem postId={selectedPost.id}
                                                             key={`${selectedPost.id}-${comment.id}`}
                                                             data={comment} />))}
    </div>
  );
};

export default CommentList;