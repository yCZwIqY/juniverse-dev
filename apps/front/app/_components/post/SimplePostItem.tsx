'use client';
import Link from 'next/link';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { PostData } from 'apis';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const SimplePostItem = ({ id, title, menu, createdAt }: PostData) => {
  const updateSearchParams = useUpdateSearchParams('posts');
  const { startNavigation } = useNavigationLoading();

  const dateStr = new Date(createdAt)
    .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', formatMatcher: 'basic' })
    .replaceAll('. ', '-')
    .slice(0, 10);

  return (
    <article className="border border-[var(--color-hairline)] bg-[var(--color-canvas)] rounded-[var(--radius-md)] px-4 py-3 flex justify-between items-center gap-3 hover:border-[var(--color-ink)] transition-colors cursor-pointer relative">
      <Link
        href={`/posts/${id}`}
        onClick={() => startNavigation()}
        className="absolute inset-0 rounded-[var(--radius-md)]"
        aria-label={title}
      />
      <div className="flex gap-3 items-center flex-1 min-w-0 relative z-10">
        <Tag
          className="shrink-0 text-xs"
          onClick={(e) => { e.stopPropagation(); updateSearchParams('category', menu.id.toString()); }}
        >
          {menu.name}
        </Tag>
        <span className="text-sm font-semibold text-[var(--color-ink)] flex-1 truncate" aria-hidden="true">{title}</span>
      </div>
      <span className="text-xs text-[var(--muted-foreground)] shrink-0 tabular-nums relative z-10">{dateStr}</span>
    </article>
  );
};

export default SimplePostItem;
