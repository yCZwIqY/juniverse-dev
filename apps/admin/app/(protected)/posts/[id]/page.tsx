import { getPost } from 'apis/server';
import { getMenuList } from 'apis/server';
import PostForm from './_component/PostForm';

interface Props {
  params: Promise<{ id: string }>;
}

const PostDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const isNew = id === '0';

  const [postRes, menusRes] = await Promise.all([
    isNew ? null : getPost(id),
    getMenuList('flat'),
  ]);

  const menuOptions = menusRes?.data?.map((m) => ({ label: m.name, value: m.id })) ?? [];

  return (
    <PostForm
      initialPost={postRes?.data ?? null}
      menuOptions={menuOptions}
      id={id}
      isNew={isNew}
    />
  );
};

export default PostDetailPage;
