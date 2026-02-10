import React from 'react';
import { CommentData } from 'apis';
import { deleteComment } from 'apis';

interface CommentItemProps {
  postId: number;
  data: CommentData;
}

const CommentItem = ({ postId, data }: CommentItemProps) => {
  const onDelete = async () => {
    await deleteComment(postId, data.id);
  };
  return (
    <div className={'flex flex-col gap-2 p-3 border border-white/10 bg-white/5 rounded-xl text-white'}>
      <div>
        <div className={'font-bold'}>{data.authorName}({data.authorId})</div>
        <div className={'text-sm text-gray-300'}>{data.createdAt}</div>
      </div>
      <div className="text-sm text-gray-100">
        {data.content.split('\n').map((line, index) => (<p key={`${data.id}-${index}`}>{line}</p>))}
      </div>
      <button type={'button'}
              className={'text-red-200 border border-red-400/70 py-1 px-3 text-sm rounded-lg self-end hover:bg-red-500/20'}
              onClick={onDelete}>삭제
      </button>
    </div>
  );
};

export default CommentItem;
