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
    <div>
      <div>
        <div>{data.authorName}({data.authorId})</div>
        <div>{data.createdAt}</div>
      </div>
      <div>
        {data.content.split('\n').map((line, index) => (<p key={`${data.id}-${index}`}>{line}</p>))}
      </div>
      <div>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default CommentItem;