import { Metadata } from 'next';
import PostTop from '@/app/(main)/posts/_components/PostTop';
import PostList from '@/app/(main)/posts/_components/PostList';
import { getMenuList, getPosts } from 'apis';
import MenuList from '@/app/(main)/posts/_components/Menus/MenuList';

export const metadata: Metadata = { title: 'Posts' };

export const revalidate = 60;

interface ListPageProps {
  searchParams: Promise<{
    search: string;
    category: number;
    page: number;
  }>;
}

const PostListPage = async ({ searchParams }: ListPageProps) => {
  const { search, category, page } = await searchParams;
  const [posts, menus] = await Promise.all([
    getPosts(page ?? 1, 10, category ?? 0, search ?? ''),
    getMenuList('tree'),
  ]);

  return (
    <div className={'py-4 flex flex-col gap-4 relative'}>
      <PostTop search={search} category={category} />
      <div className={'flex flex-col lg:grid lg:grid-cols-[5fr_2fr] gap-4 min-w-0'}>
        <PostList posts={posts?.items ?? []} page={posts?.page ?? 1} total={posts?.total ?? 0} />
        <MenuList menus={menus?.data ?? []} />
      </div>
    </div>
  );
};

export default PostListPage;
