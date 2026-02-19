import PostTop from '@/app/(main)/posts/_components/PostTop';
import PostList from '@/app/(main)/posts/_components/PostList';
import { getPosts } from 'apis';
import MenuList from '@/app/(main)/posts/_components/Menus/MenuList';

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
  const posts = await getPosts(page ?? 1, 5, category ?? 0, search ?? '');


  return (
    <div className={'py-4 flex flex-col gap-4 relative'}>
      <PostTop search={search} category={category} />
      <div className={'lg:grid grid-cols-[5fr_2fr] flex flex-col gap-4'}>
        <PostList posts={posts?.items ?? []} page={posts?.page ?? 1} total={posts?.total ?? 0} />
        <MenuList />
      </div>
    </div>
  );
};

export default PostListPage;
