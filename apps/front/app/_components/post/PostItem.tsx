'use client';
import { PostData } from 'apis';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { useRouter } from 'next/navigation';
import CommentIcon from '@/app/_components/icon/CommentIcon';
import ViewIcon from '@/app/_components/icon/ViewIcon';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const PostItem = ({ id, title, subtitle, menu, createdAt, tags, viewCount, comments }: PostData) => {
  const updateSearchParams = useUpdateSearchParams('posts');
  const router = useRouter();
  const { startNavigation } = useNavigationLoading();
  return (
    <div
      className={'border border-border rounded-lg p-4 flex flex-col gap-2 hover:border-accent transition-all'}
      onClick={() => {
        startNavigation();
        router.push(`/posts/${id}`);
      }}
    >
      <div className={'flex flex-col items-center lg:items-start gap-2 text-center lg:text-left'}>
        <Tag
          className={'!text-base'}
          onClick={(e) => {
            e.stopPropagation();
            updateSearchParams('category', menu.id.toString());
          }}
        >
          {menu.name}
        </Tag>
        <div className={'text-lg font-bold lg:pr-10'}>{title}</div>
      </div>
      <div className={'flex flex-col lg:flex-row gap-2 justify-between items-center '}>
        <div className={'flex flex-col lg:flex-row gap-2 items-center text-gray-600'}>
          <span>
            {new Date(createdAt)
              .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                formatMatcher: 'basic',
              })
              .replaceAll('. ', '-')
              .slice(0, 10)}
          </span>
          <span className={'hidden lg:block'}>•</span>
          <div className={'flex gap-2 flex-wrap'}>
            {tags.slice(0, 5).map((tag) => (
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
        <div className={'flex gap-2 self-end'}>
          <div className={'text-accent flex gap-1 items-center'}>
            <CommentIcon />
            <span>{comments?.length ?? 0}</span>
          </div>
          <div className={'text-accent flex gap-1 items-center'}>
            <ViewIcon />
            <span>{viewCount}</span>
          </div>
        </div>
      </div>
      {subtitle && <p className={'text-gray-600 overflow-hidden text-ellipsis line-clamp-1 text-center lg:text-left px-2'}>{subtitle}</p>}
    </div>
  );
};

export default PostItem;
