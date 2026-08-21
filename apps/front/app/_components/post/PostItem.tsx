'use client';
import { PostData } from 'apis';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import Link from 'next/link';
import CommentIcon from '@/app/_components/icon/CommentIcon';
import ViewIcon from '@/app/_components/icon/ViewIcon';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const PostItem = ({ id, title, subtitle, menu, createdAt, tags, viewCount, comments }: PostData) => {
  const updateSearchParams = useUpdateSearchParams('posts');
  const { startNavigation } = useNavigationLoading();

  const dateStr = new Date(createdAt)
    .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', formatMatcher: 'basic' })
    .replaceAll('. ', '-')
    .slice(0, 10);

  return (
    <article className="border border-[var(--color-hairline)] rounded-[var(--radius-md)] p-4 flex flex-col gap-3 hover:border-[var(--color-ink)] transition-colors relative cursor-pointer">
      <Link
        href={`/posts/${id}`}
        onClick={() => startNavigation()}
        className="absolute inset-0 rounded-[var(--radius-md)]"
        aria-label={title}
      />
      <div className="flex flex-col gap-1.5 relative z-10">
        <Tag
          className="self-start text-xs"
          onClick={(e) => { e.stopPropagation(); updateSearchParams('category', menu.id.toString()); }}
        >
          {menu.name}
        </Tag>
        <div className="text-base font-bold text-[var(--color-ink)] leading-snug" aria-hidden="true">{title}</div>
        {subtitle && (
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className="flex gap-2 flex-wrap">
          {tags.slice(0, 5).map((tag) => (
            <Tag
              key={tag}
              className="text-xs"
              onClick={(e) => { e.stopPropagation(); updateSearchParams('search', tag); }}
            >
              #{tag}
            </Tag>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs text-[var(--muted-foreground)]">
          <span className="tabular-nums">{dateStr}</span>
          <div className="flex gap-2">
            <span className="flex gap-1 items-center">
              <CommentIcon />
              {comments?.length ?? 0}
            </span>
            <span className="flex gap-1 items-center">
              <ViewIcon />
              {viewCount}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
