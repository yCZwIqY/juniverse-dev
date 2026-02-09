'use client';
import { PostData } from 'apis';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { useMemo } from 'react';

interface MyInfoProps {
  posts: PostData[];
}

const MyInfo = ({ posts }: MyInfoProps) => {
  const updateSearchParams = useUpdateSearchParams('posts');
  const tags = useMemo(() => {
    const set = new Set<string>();
    posts
      .flatMap((post) => post.tags)
      .map((tag) => {
        if (!set.has(tag)) set.add(tag);
      });
    return [...set].slice(0, 20);
  }, [posts]);
  return (
    <section className={'border border-border bg-card rounded-lg p-4 h-[800px]'}>
      <div className={'flex justify-between items-center pb-[10px] border-b-2 border-border'}>
        <span className={'font-bold'}>Profile</span>
      </div>
      <div className={'p-3'}>
        <div className={'flex flex-col gap-4 items-center'}>
          <div className={'border border-border size-40 rounded-md'}></div>
          <div className={'font-semibold text-lg'}>이지윤</div>
          <div className={'break-keep text-center'}>삽질하면서 배운 걸 정리합니다. 프론트엔드, 배포, 구조 설계에 관심 많아요.</div>
        </div>
        {/*<div>*/}
        {/*  <div>Github</div>*/}
        {/*  <div>Email</div>*/}
        {/*</div>*/}
      </div>
      <div>
        <div className={'flex justify-between items-center pb-[10px] border-b-2 border-border mb-2'}>
          <span className={'font-bold'}>Recent tags</span>
        </div>
        <div className={'flex gap-2 flex-wrap'}>
          {tags.map((tag: string) => (
            <Tag
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                updateSearchParams('search', tag);
              }}
            >
              #{tag}
            </Tag>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyInfo;
