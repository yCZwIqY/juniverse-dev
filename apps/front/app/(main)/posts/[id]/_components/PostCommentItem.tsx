'use client';
import { CommentData } from 'apis';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { deleteComment } from '@/app/_libs/comment';
import { useParams } from 'next/navigation';

interface PostCommentItemProps {
  comment: CommentData;
}

const PostCommentItem = ({ comment }: PostCommentItemProps) => {
  const { id } = useParams();
  const { data: session } = useSession();

  const onDelete = async () => {
    if (!id || !comment.id) return;
    await deleteComment(id.toString(), comment.id);
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
        <button onClick={onDelete} className={'absolute top-10 -right-8 text-red-700 hover:underline text-sm'}>
          삭제
        </button>
      )}
    </div>
  );
};

export default PostCommentItem;
