import { PostData } from 'apis';
import PostItem from '@/app/_components/post/PostItem';
import Pagination from '@/app/_components/pagination/Pagination';

interface PostListProps {
  posts: PostData[];
  page: number;
  total: number;
}

const PostList = ({ posts, page, total }: PostListProps) => {
  return (
    <section className={'glass-card p-4 flex flex-col'}>
      <div className={'flex justify-between items-center pb-[10px] border-b-2 border-border'}>
        <span className={'font-bold'}>Posts</span>
        <span className={'text-sm'}>총 {total}개의 포스트</span>
      </div>
      <div className={'py-4 flex flex-col gap-2 flex-1 mb-2'}>{posts?.map((post) => <PostItem key={post.id} {...post} />)}</div>
      <div className={'flex justify-center items-center'}>
        <Pagination page={page} total={total} limit={5} />
      </div>
    </section>
  );
};

export default PostList;
