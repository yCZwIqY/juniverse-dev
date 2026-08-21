'use client';

import CommentItem from '@/app/(protected)/comments/_components/CommentItem';
import { useSelectedPost } from '@/app/(protected)/comments/_store/useSelectedPost';

const CommentList = () => {
  const { selectedPost } = useSelectedPost();

  if (!selectedPost) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-[var(--muted-foreground)]">
        포스트를 선택하면 댓글이 표시됩니다
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold text-[var(--muted-foreground)] mb-1">
        {selectedPost.title} 댓글
      </div>
      {selectedPost.comments.length > 0 ? (
        selectedPost.comments.map((comment) => (
          <CommentItem postId={selectedPost.id} key={`${selectedPost.id}-${comment.id}`} data={comment} />
        ))
      ) : (
        <div className="text-sm text-[var(--muted-foreground)]">댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default CommentList;
