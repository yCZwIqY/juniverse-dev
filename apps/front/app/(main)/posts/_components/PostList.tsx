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
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between pb-3 border-b border-[var(--color-hairline)]">
        <div>
          <div className="eyebrow mb-0.5">Posts</div>
          <span className="text-sm text-[var(--muted-foreground)]">총 {total}개</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
      {total > 0 && (
        <div className="flex justify-center pt-2">
          <Pagination page={page} total={total} limit={10} />
        </div>
      )}
    </section>
  );
};

export default PostList;
