'use client';
import { PostData } from 'apis';
import Tag from '@/app/_components/tag/Tag';
import { useRouter } from 'next/navigation';
import CommentIcon from '@/app/_components/icon/CommentIcon';
import ViewIcon from '@/app/_components/icon/ViewIcon';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

interface PostTitleProps {
  post: PostData;
}

const PostTitle = ({ post }: PostTitleProps) => {
  const { title, subtitle, createdAt, menu, tags, comments, viewCount } = post;
  const router = useRouter();
  const { startNavigation } = useNavigationLoading();
  return (
    <div className={'flex flex-col items-start gap-2'}>
      <Tag className={'!text-base lg:hidden'} onClick={() => {
        startNavigation();
        router.push(`/posts?category=${menu.id}`);
      }}>
        {menu.name}
      </Tag>
      <h1 className={'text-2xl font-bold'}>{title}</h1>
      {subtitle && <h3 className={'text-lg'}>{subtitle}</h3>}
      <div className={'flex flex-col lg:flex-row gap-2 items-start py-2'}>
        <Tag className={'!text-base hidden lg:block'} onClick={() => {
          startNavigation();
          router.push(`/posts?category=${menu.id}`);
        }}>
          {menu.name}
        </Tag>
        <div className={'flex flex-col lg:flex-row gap-2 lg:items-center text-gray-600'}>
          <span>{new Date(createdAt).toLocaleDateString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
          <span className={'hidden lg:block'}>•</span>
          <div className={'flex gap-2'}>
            {tags.slice(0, 5).map((tag) => (
              <Tag key={tag} onClick={() => {
                startNavigation();
                router.push(`/posts?search=${tag}`);
              }}>
                #{tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div className={'flex gap-2'}>
        <div className={'flex items-center gap-1 text-accent'}>
          <CommentIcon />
          <span>{comments.length}</span>
        </div>
        <div className={'flex items-center gap-1 text-accent'}>
          <ViewIcon />
          <span>{viewCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostTitle;
