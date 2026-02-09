'use client';
import CommentIcon from '@/app/_components/icon/CommentIcon';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { createComment } from '@/app/_libs/comment';
import { useParams } from 'next/navigation';

const PostAddComment = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const [comment, setComment] = useState('');

  const onSubmit = async () => {
    if (!session || !session.user || !id) return;

    setComment('');
    await createComment(id.toString(), {
      content: comment,
      authorId: session.user.email!,
      authorName: session.user.name!,
    });
  };

  if (session) {
    return (
      <div className={'w-full flex flex-col gap-2 items-stretch'}>
        <div className={'self-end flex gap-2'}>
          <div className={'font-bold'}>{session.user?.name}</div>
          <button className={'text-sm text-gray-400 hover:underline'} type={'button'} onClick={() => signOut()}>
            로그아웃
          </button>
        </div>
        <textarea
          placeholder={'댓글을 작성해 주세요'}
          className={'w-full h-[150px] resize-none border border-border rounded-md bg-background p-4'}
          value={comment}
          onChange={(e) => {
            if (e.target.value.length >= 500) return;
            setComment(e.target.value);
          }}
        />
        <button
          onClick={onSubmit}
          disabled={!comment}
          className={`bg-accent px-3 py-1 text-white font-bold self-end rounded-sm ${comment ? 'hover:opacity-70 active:opacity-50' : 'opacity-30'}`}
        >
          등록하기
        </button>
      </div>
    );
  }

  return (
    <div className={'max-w-[800px] p-4 flex flex-col items-center gap-2 rounded-sm'}>
      <CommentIcon color={'var(--color-gray-400)'} size={60} />
      <div className={'px-10 text-gray-400'}>댓글을 작성하려면 로그인이 필요해요</div>
      <button
        onClick={() => signIn('google')}
        type={'button'}
        className={'text-white px-4 py-2 rounded-sm mt-2 bg-gray-400 font-bold hover:bg-gray-500 active:bg-gray-600'}
      >
        Google 로그인
      </button>
    </div>
  );
};

export default PostAddComment;
