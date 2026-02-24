'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ForbiddenPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) router.push('/');
  }, [session]);

  return (
    <div className='gap-10 flex flex-col justify-center items-center h-dvh w-dvw bg-[radial-gradient(900px_circle_at_20%_10%,rgba(20,120,160,0.25),rgba(10,10,30,0.1)) radial-gradient(1200px_circle_at_80%_90%,rgba(40,60,140,0.25),rgba(10,10,30,0.1)),linear-gradient(135deg,#0b0f1f_0%,#101727_45%,#0b0f1f_100%)] text-gray-100'>
      <h1 className='text-2xl'>Juniverse Dev 관리자 페이지</h1>
      <div className='text-gray-300'>접근 권한이 없습니다.</div>
      <button
        onClick={() => signIn('google')}
        type='button'
        className='text-white px-4 py-2 rounded-sm mt-2 underline hover:bg-gray-500 active:bg-gray-600'
      >
        관리자 로그인
      </button>
    </div>
  );
};

export default ForbiddenPage;
