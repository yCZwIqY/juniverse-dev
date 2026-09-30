import { PostData } from 'apis';
import SimplePostItem from '@/app/_components/post/SimplePostItem';

interface LatestPostProps {
  posts: PostData[];
}

const LatestPosts = async ({ posts }: LatestPostProps) => {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-[var(--muted-foreground)] py-4">아직 작성된 포스트가 없습니다.</p>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <SimplePostItem key={post.id} {...post} />
      ))}
    </div>
  );
};

export default LatestPosts;
