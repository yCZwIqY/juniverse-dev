'use client';
import { useRouter } from 'next/navigation';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { PostData } from 'apis';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const SimplePostItem = ({ id, title, menu, createdAt }: PostData) => {
  const updateSearchParams = useUpdateSearchParams('posts');
  const router = useRouter();
  const { startNavigation } = useNavigationLoading();

  const dateStr = new Date(createdAt)
    .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', formatMatcher: 'basic' })
    .replaceAll('. ', '-')
    .slice(0, 10);

  return (
    <div
      className="border border-[var(--color-hairline)] bg-[var(--color-canvas)] rounded-[var(--radius-md)] px-4 py-3 flex justify-between items-center gap-3 hover:border-[var(--color-ink)] transition-colors cursor-pointer"
      onClick={() => { startNavigation(); router.push(`/posts/${id}`); }}
    >
      <div className="flex gap-3 items-center flex-1 min-w-0">
        <Tag
          className="shrink-0 text-xs"
          onClick={(e) => { e.stopPropagation(); updateSearchParams('category', menu.id.toString()); }}
        >
          {menu.name}
        </Tag>
        <span className="text-sm font-semibold text-[var(--color-ink)] flex-1 truncate">{title}</span>
      </div>
      <span className="text-xs text-[var(--muted-foreground)] shrink-0 tabular-nums">{dateStr}</span>
    </div>
  );
};

export default SimplePostItem;
