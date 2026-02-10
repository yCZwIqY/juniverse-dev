'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createPost, getPost, updatePost } from '@/app/_libs/posts';
import { PostFormData } from 'apis';
import TextInput from '@/app/_components/form/TextInput';
import ContentEditor from '@/app/_components/form/ContentEditor';
import MenuSelect from '@/app/posts/[id]/_component/MenuSelect';
import TagInput from '@/app/_components/form/TagInput';
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
    <div className="max-w-[1100px] mx-auto w-full">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'text-xl font-bold flex justify-between items-center text-white'}>
            <span>{isNew ? '작성' : '수정'}</span>
            <Button className={'px-4 py-2 rounded-lg bg-cyan-500/80 hover:bg-cyan-400 border border-cyan-300/50'} type={'submit'}>
              작성완료
            </Button>
          </div>
          <div className={'mt-6 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4 md:p-8 flex flex-col gap-4'}>
            <TextInput name={'title'}
                       label={'제목'}
                       maxLength={200} />
            <TextInput name={'subtitle'}
                       label={'부제목'}
                       maxLength={300} />
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
