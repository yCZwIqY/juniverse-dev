'use client';
import { getRecentPosts, PostData } from 'apis';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { useEffect, useMemo, useState } from 'react';


const RecentTags = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
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

  useEffect(() => {
    (async () => {
      const posts = await getRecentPosts();
      setPosts(posts ?? []);
    })();
  }, []);
  return (
    <section className={'glass-card w-full p-4 lg:p-8 flex flex-col gap-6 reveal'}>
      <div className={'flex justify-between'}>
        <div className={'text-xl font-bold'}>최근에 사용된 태그</div>
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
    </section>
  );
};

export default RecentTags;
