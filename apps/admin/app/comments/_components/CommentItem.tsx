import React from 'react';
import { CommentData } from '@/app/posts/_models/posts';
import { deleteComment } from 'apis';

interface CommentItemProps {
  postId: number;
  data: CommentData;
}

const CommentItem = ({ postId, data }: CommentItemProps) => {
  const onDelete = async (id: string) => {
    await deleteComment(postId, data.id);
  };
  return (
    <div className={'flex flex-col gap-2 p-2 border border-gray-300 rounded-lg'}>
      <div>
        <div className={'font-bold'}>{data.authorName}({data.authorId})</div>
        <div className={'text-sm text-gray-700'}>{data.createdAt}</div>
      </div>
      <div>
        {data.content.split('\n').map((line, index) => (<p key={`${data.id}-${index}`}>{line}</p>))}
      </div>
      <button className={'text-red-600 border border-red-500 py-1 px-3 text-sm rounded-lg self-end'}>삭제</button>
    </div>
  );
};

export default CommentItem;