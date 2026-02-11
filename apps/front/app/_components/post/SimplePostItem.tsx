'use client';
import { useRouter } from 'next/navigation';
import Tag from '@/app/_components/tag/Tag';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { PostData } from 'apis';

const SimplePostItem = ({ id, title, menu, createdAt }: PostData) => {
  const updateSearchParams = useUpdateSearchParams('posts');
  const router = useRouter();
  return (
    <div
      className={'border border-border rounded-full p-4 flex justify-between items-center gap-2 hover:shadow-sm shadow-accent'}
      onClick={() => router.push(`/posts/${id}`)}
    >
      <div className={'flex-1 flex gap-2 items-center'}>
        <Tag
          className={'!text-base'}
          onClick={(e) => {
            e.stopPropagation();
            updateSearchParams('category', menu.id.toString());
          }}
        >
          {menu.name}
        </Tag>
        <div className={'text-base font-bold lg:pr-10 flex-1 text-left break-keep overflow-hidden text-ellipsis line-clamp-1'}>{title}</div>
      </div>
      <span className={'text-sm text-gray-500 pr-5'}>{new Date(createdAt).toLocaleDateString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      })}</span>
    </div>
  );
};

export default SimplePostItem;