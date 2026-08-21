'use client';

import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { PostFormData } from 'apis';
import { Button } from 'components';
import { createPost, getPost, updatePost } from '@/app/(protected)/_libs/posts';
import ContentEditor from '@/app/(protected)/_components/form/ContentEditor';
import TextInput from '@/app/(protected)/_components/form/TextInput';
import TagInput from '@/app/(protected)/_components/form/TagInput';
import MenuSelect from '@/app/(protected)/posts/[id]/_component/MenuSelect';

const PostDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const isNew = id === '0';
  const router = useRouter();

  const form = useForm<PostFormData>({
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      menuId: 0,
    },
  });

  useEffect(() => {
    if (isNew || !id) return;
    getPost(id.toString()).then((post) => {
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
  }, [form, id, isNew]);

  const onSubmit = async (data: PostFormData, status: PostFormData['status']) => {
    if (isNew) await createPost({ ...data, status });
    else if (id) await updatePost(id.toString(), { ...data, status });
    router.push('/posts');
  };

  return (
    <div className="max-w-[1100px] mx-auto w-full">
      <FormProvider {...form}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between sticky -top-6 py-2 bg-[var(--color-canvas)] z-10 border-b border-[var(--color-hairline)]">
            <div>
              <div className="eyebrow mb-0.5">{isNew ? 'New Post' : 'Edit Post'}</div>
              <div className="text-xl font-bold text-[var(--color-ink)]">{isNew ? '작성' : '수정'}</div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="md"
                type="button"
                onClick={form.handleSubmit((data) => onSubmit(data, 'DRAFT'))}
              >
                임시저장
              </Button>
              <Button
                variant="default"
                size="md"
                type="button"
                onClick={form.handleSubmit((data) => onSubmit(data, 'PUBLISH'))}
              >
                작성완료
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col gap-4">
            <TextInput name="title" label="제목" maxLength={200} />
            <TextInput name="subtitle" label="부제목" maxLength={300} />
            <MenuSelect />
            <ContentEditor />
            <TagInput />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default PostDetailPage;
