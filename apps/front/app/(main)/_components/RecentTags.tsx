'use client';
import { PostData } from 'apis';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { useMemo } from 'react';

interface RecentTagsProps {
  posts: PostData[];
}

const RecentTags = ({ posts }: RecentTagsProps) => {
  const updateSearchParams = useUpdateSearchParams('posts');
  const tags = useMemo(() => {
    const seen = new Set<string>();
    return posts
      .flatMap((post) => post.tags)
      .filter((tag) => { if (seen.has(tag)) return false; seen.add(tag); return true; })
      .slice(0, 20);
  }, [posts]);

  return (
    <div className="flex flex-col gap-3">
      <div className="eyebrow">Tags</div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Tag
            key={tag}
            onClick={(e) => { e.stopPropagation(); updateSearchParams('search', tag); }}
          >
            #{tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default RecentTags;
