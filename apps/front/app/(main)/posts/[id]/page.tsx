import { getPost, increaseView } from 'apis';
import PostTitle from '@/app/(main)/posts/[id]/_components/PostTitle';
import PostButtons from '@/app/(main)/posts/[id]/_components/PostButtons';
import { Metadata } from 'next';
import PostContent from '@/app/(main)/posts/[id]/_components/PostContent';
import PostComments from '@/app/(main)/posts/[id]/_components/PostComments';

interface PostDetailPageProps {
  params: Promise<{ id: number }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post?.data?.title,
    description: post?.data.subtitle,
  };
}

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return <div className={'border border-border rounded-lg p-4 bg-card mt-5'}>존재하지 않는 포스트입니다.</div>;

  await increaseView(id);
  return (
    <div>
      <div className={'border border-border rounded-lg p-8 bg-card mt-4'}>
        <PostTitle post={post.data} />
        <PostButtons title={post.data.title} subtitle={post.data.subtitle} />
        <PostContent content={post.data.content} />
      </div>
      <div className={'border border-border rounded-lg p-8 bg-card mt-4'}>
        <PostComments comments={post.data.comments} />
      </div>
    </div>
  );
};

export default PostDetailPage;
