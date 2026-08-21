'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from 'components';

const ForbiddenPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) router.push('/');
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4 text-center p-6 bg-[var(--color-canvas)]">
      <div className="eyebrow">Access Denied</div>
      <h1 className="text-2xl font-bold text-[var(--color-ink)]">접근 권한이 없습니다</h1>
      <p className="text-sm text-[var(--muted-foreground)]">관리자 계정으로 로그인해 주세요.</p>
      <Button onClick={() => signIn('google')} variant="default" size="md">
        관리자 로그인
      </Button>
    </div>
  );
};

export default ForbiddenPage;
