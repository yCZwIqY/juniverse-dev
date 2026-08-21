import { PostData } from 'apis';
import { Badge } from 'components';

import { useSelectedPost } from '@/app/(protected)/comments/_store/useSelectedPost';

interface PostItemProps {
  data: PostData;
}

const PostItem = ({ data }: PostItemProps) => {
  const { setSelectedPost } = useSelectedPost();
  return (
    <button
      type="button"
      className="flex justify-between gap-2 items-center p-3 border border-[var(--color-hairline)] rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-soft)] transition-colors text-left w-full"
      onClick={() => setSelectedPost(data)}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="text-sm font-medium text-[var(--color-ink)] truncate">{data.title}</div>
        <div className="text-xs text-[var(--muted-foreground)]">{data.createdAt}</div>
      </div>
      <Badge variant="secondary" className="shrink-0">{data.comments?.length ?? 0}</Badge>
    </button>
  );
};

export default PostItem;
