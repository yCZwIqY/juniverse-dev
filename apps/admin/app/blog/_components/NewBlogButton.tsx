'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';

const NewBlogButton = () => {
  const router = useRouter();
  return (
    <div className={'w-full flex justify-end'}>
      <Button variant="outline" onClick={() => router.push('/blog/0')}>
        새 글 작성
      </Button>
    </div>
  );
};

export default NewBlogButton;
