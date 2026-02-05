'use client';
import { CommentData } from 'apis';
import PostAddComment from '@/app/(main)/posts/[id]/_components/PostAddComment';
import { SessionProvider } from 'next-auth/react';
import CommentIcon from '@/app/_components/icon/CommentIcon';
import PostCommentItem from '@/app/(main)/posts/[id]/_components/PostCommentItem';

interface PostCommentsProps {
  comments: CommentData[];
}

const PostComments = ({ comments }: PostCommentsProps) => {
  return (
    <SessionProvider>
      <div className={'flex flex-col items-center'}>
        <div className={'flex items-center justify-start w-full'}>
          <CommentIcon size={30} color={'var(--border)'} />
          <span className={'pl-1 font-bold'}>댓글</span>
          <span className={'px-[2px] text-sm'}>({comments.length})</span>
        </div>
        <div className={'lg:px-20 flex flex-col w-full items-center'}>
          <PostAddComment />
          <div className={'w-full flex flex-col gap-10 my-10'}>
            {comments && comments.length > 0 ? (
              <>
                {comments.map((comment: CommentData) => (
                  <PostCommentItem key={comment.id} comment={comment} />
                ))}
              </>
            ) : (
              <div className={'w-full flex flex-col gap-2 text-center text-lg text-gray-500 border py-10 rounded-lg'}>
                <p> 아직 등록된 댓글이 없습니다.</p>
                <p className={'font-semibold'}> 첫번째 댓글을 달아주세요!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default PostComments;
