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
  return (
    <div
      className={'border border-border rounded-full p-1 lg:p-4 flex justify-between items-center gap-2 hover:shadow-sm shadow-accent'}
      onClick={() => {
        startNavigation();
        router.push(`/posts/${id}`);
      }}
    >
      <div className={'flex-1 grid grid-cols-[1fr_2fr] flex-1 lg:flex gap-2 items-center'}>
        <Tag
          className={'lg:!text-base break-keep break-keep overflow-hidden text-ellipsis line-clamp-1'}
          onClick={(e) => {
            e.stopPropagation();
            updateSearchParams('category', menu.id.toString());
          }}
        >
          {menu.name}
        </Tag>
        <div className={'text-base font-bold lg:pr-10 flex-1 text-left break-keep overflow-hidden text-ellipsis line-clamp-1'}>{title}</div>
      </div>
      <span className={'text-xs lg:text-sm text-gray-500 pr-5'}>{new Date(createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replaceAll('. ', '-')}</span>
    </div>
  );
};

export default SimplePostItem;
