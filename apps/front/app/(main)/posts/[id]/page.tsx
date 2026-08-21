import { getPost, increaseView } from 'apis';
import PostTitle from '@/app/(main)/posts/[id]/_components/PostTitle';
import PostButtons from '@/app/(main)/posts/[id]/_components/PostButtons';
import { Metadata } from 'next';
import EditorViewer from '@/app/(main)/_components/EditorViewer';
import PostComments from '@/app/(main)/posts/[id]/_components/PostComments';
import QuickMenus from '@/app/(main)/posts/[id]/_components/QuickMenus';
import PostNavigator from '@/app/(main)/posts/[id]/_components/PostNavigator';

export const revalidate = 300;

interface PostDetailPageProps {
  params: Promise<{ id: number }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post?.data?.title,
    description: post?.data.subtitle,
    keywords: post?.data.tags,
  };
}

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return <div className={'border border-border rounded-lg p-4 bg-card mt-5'}>존재하지 않는 포스트입니다.</div>;

  void increaseView(id);

  return (
    <div>
      <div className={'glass-card mt-4 overflow-hidden'}>
        <div className="p-4 md:p-6 border-b border-[var(--color-hairline)]">
          <PostTitle post={post.data} />
          <PostButtons title={post.data.title} subtitle={post.data.subtitle} />
        </div>
        <EditorViewer content={post.data.content} className="px-4 md:px-6 py-5 md:py-6" />
      </div>
      <PostNavigator next={post.data.next} prev={post.data.prev}/>
      <div className={'border border-border rounded-lg p-4 md:p-6 bg-card mt-4'}>
        <PostComments comments={post.data.comments} />
      </div>
      <QuickMenus content={post.data.content ?? ''} />
    </div>
  );
};

export default PostDetailPage;
