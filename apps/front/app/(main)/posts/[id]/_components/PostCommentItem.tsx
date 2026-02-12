'use client';
import { CommentData } from 'apis';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import { deleteComment } from '@/app/_libs/comment';
import { useParams, useRouter } from 'next/navigation';

interface PostCommentItemProps {
  comment: CommentData;
}

const PostCommentItem = ({ comment }: PostCommentItemProps) => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    if (!id || !comment.id || isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteComment(id.toString(), comment.id);
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={'w-full flex flex-col items-start gap-3 relative'}>
      <div className={'flex gap-2 items-end'}>
        <span className={'font-semibold'}>{comment.authorName}</span>
        <span className={'text-sm text-gray-400'}>
          {new Date(comment.createdAt).toLocaleDateString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className={'border border-border p-5 rounded-sm w-full'}>
        {comment.content.split('\n').map((content: string, index: number) => (
          <Fragment key={`${comment.id}-${index}`}>
            <div>{content}</div>
          </Fragment>
        ))}
      </div>
      {comment.authorId === session?.user?.email && (
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className={'absolute top-10 -right-8 text-red-700 hover:underline text-sm disabled:opacity-50 disabled:no-underline'}
        >
          {isDeleting ? (
            <span
              className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-700/40 border-t-red-700 align-middle"
              aria-label="댓글 삭제 중"
            />
          ) : (
            '삭제'
          )}
        </button>
      )}
    </div>
  );
};

export default PostCommentItem;
