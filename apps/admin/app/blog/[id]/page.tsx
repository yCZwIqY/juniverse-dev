'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Blog, Tech } from 'shared-types';
import FormTextInput from '@/components/form/FormTextInput';
import FormRichText from '@/components/form/tiptab/FormRichText';
import FormImageInput from '@/components/form/FormImageInput';
import FormMultiInput from '@/components/form/FormMultiInput';
import { useQueryClient } from '@tanstack/react-query';
import { useBlog, useCreateBlog, useCreateTech, useTech, useUpdateBlog } from 'apis';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const BlogDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const form = useForm<Blog>();
  const isNew = params.id === '0';

  const { data: techData } = useTech();
  const techOptions = techData?.result.map((it: Tech) => ({ label: it.name, value: it.id! })) ?? [];
  const queryClient = useQueryClient();
  const { mutate: createTech } = useCreateTech();

  const { data: blog } = useBlog(params.id?.toString() ?? '0', !!Number(params.id));
  const { mutate: createBlog } = useCreateBlog();
  const { mutate: updateBlog } = useUpdateBlog(params.id?.toString() ?? '0');

  const onCreateNewTech = (name: string) => {
    if (techData?.result.find((it: Tech) => it.name === name)) {
      return;
    }
    createTech(
      {
        name,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tech'] });
          form.setValue('techs', [...form.getValues('techs'), name]);
        },
      },
    );
  };

  useEffect(() => {
    if (params.id && blog) {
      form.reset(blog.result);
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog, params.id]);

  const onSubmit = (data: Blog) => {
    if (isNew) {
      createBlog(data, {
        onSuccess: () => {
          router.push('/blog');
        },
      });
    } else {
      updateBlog(data, {
        onSuccess: () => {
          router.push('/blog');
        },
      });
    }
  };

  return (
    <div className={'flex flex-col gap-3 p-2'}>
      <FormProvider {...form}>
        <FormImageInput label={'썸네일'} name={'thumbnail'} multiple={false} required={false} />
        <FormTextInput label={'제목'} name={'title'} />
        <FormTextInput label={'부제목'} name={'subtitle'} />
        <FormRichText label={'내용'} name={'contents'} />
        <FormMultiInput label={'태그'} name={'techs'} required={false} options={techOptions} onCreate={onCreateNewTech} />
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
        </DialogFooter>
      </FormProvider>
    </div>
  );
};

export default BlogDetailPage;
