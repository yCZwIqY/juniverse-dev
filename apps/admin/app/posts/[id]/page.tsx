'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createPost, getPost, updatePost } from '@/app/_libs/posts';
import { PostFormData } from '@/app/posts/_models/posts';
import TitleInput from '@/app/posts/[id]/_component/TitleInput';
import ContentEditor from '@/app/posts/[id]/_component/ContentEditor';
import MenuSelect from '@/app/posts/[id]/_component/MenuSelect';
import SubTitleInput from '@/app/posts/[id]/_component/SubTitleInput';
import TagInput from '@/app/posts/[id]/_component/TagInput';
import Button from '@/app/_components/common/Button';

const PostDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const isNew = id === '0';
  const form = useForm<PostFormData>({
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      menuId: 0,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (isNew) return;
    else if (id) {
      getPost(id?.toString()).then((post) => {
        if (post) {
          form.reset({
            title: post.data.title,
            subtitle: post.data.subtitle,
            content: post.data.content,
            tags: post.data.tags,
            menuId: post.data.menuId,
          });
        }
      });
    }
  }, [form, id, isNew]);

  const onSubmit = async (data: PostFormData) => {
    if (isNew) await createPost(data);
    else if (id) await updatePost(id.toString(), data);

    router.push('/posts');
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'text-xl font-bold flex justify-between'}>
            <span>{isNew ? '작성' : '수정'}</span>
            <Button className={'px-4 py-2 rounded-lg'} type={'submit'}>
              작성완료
            </Button>
          </div>
          <div className={'p-10 flex flex-col gap-3'}>
            <TitleInput />
            <SubTitleInput />
            <MenuSelect />
            <ContentEditor />
            <TagInput />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PostDetailPage;
