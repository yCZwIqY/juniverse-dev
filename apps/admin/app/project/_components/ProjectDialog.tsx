import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Project, Tech } from 'shared-types';
import { FormProvider, useForm } from 'react-hook-form';
import FormTextInput from '@/components/form/FormTextInput';
import FormImageInput from '@/components/form/FormImageInput';
import FormMultiInput from '@/components/form/FormMultiInput';
import { useCreateProject, useCreateTech, useProject, useTech, useUpdateProject } from 'apis';
import { useQueryClient } from '@tanstack/react-query';
import FormTextArea from '@/components/form/FormTextArea';
import FormRichText from '@/components/form/tiptab/FormRichText';
import FormDatePicker from '@/components/form/FormDatePicker';
import { Button } from '@/components/ui/button';

interface ProjectDialogProps {
  children: React.ReactNode;
  id?: string;
}

const ProjectDialog = ({ children, id }: ProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const isNew = !id;
  const form = useForm<Project>();
  const { data: project } = useProject(id ?? '0', !!id && open);
  const { data: techData } = useTech();
  const { mutate: createTech } = useCreateTech();
  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject();
  const queryClient = useQueryClient();

  const techOptions = techData?.result.map((it: Tech) => ({ label: it.name, value: it.id! })) ?? [];

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

  const onSubmit = (data: Project) => {
    const request = {
      ...data,
      video: data.video?.key ? data.video : null,
    };

    if (isNew) {
      createProject(request, {
        onSuccess: () => {
          location.reload();
        },
      });
    }
    if (id) {
      updateProject(
        { id, project: request },
        {
          onSuccess: () => {
            location.reload();
          },
        },
      );
    }
  };

  useEffect(() => {
    if (id && project) {
      form.reset(project.result);
    } else {
      form.reset();
    }
  }, [open, project, id]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <FormProvider {...form}>
          <DialogTrigger className={'w-full h-full'}>{children}</DialogTrigger>
          <div>
            <DialogContent className={''}>
              <DialogHeader>
                <DialogTitle>{isNew ? 'Add' : 'Edit'} Project</DialogTitle>
              </DialogHeader>
              <div className={'flex flex-col gap-3 h-[80dvh] overflow-y-scroll'}>
                <FormTextInput label={'제목'} name={'title'} />
                <FormTextInput label={'데모 영상'} name={'video'} type={'file'} accept={'video/*'} required={false} />
                <FormImageInput label={'썸네일'} name={'thumbnail'} multiple={false} required={false} />
                <FormImageInput label={'첨부 이미지'} name={'images'} required={false} />
                <FormMultiInput label={'태그'} name={'techs'} required={false} options={techOptions} onCreate={onCreateNewTech} />
                <FormDatePicker label={'시작일'} name={'startDate'} />
                <FormDatePicker label={'종료일'} name={'endDate'} />
                <FormTextInput label={'깃허브 URL'} name={'githubUrl'} required={false} />
                <FormTextInput label={'데모 URL'} name={'demoUrl'} required={false} />
                <FormTextInput label={'인원 수'} name={'memberCount'} />
                <FormTextInput label={'역할'} name={'role'} />
                <FormTextArea label={'요약'} name={'summary'} />
                <FormRichText label={'설명'} name={'description'} />
              </div>
              <DialogFooter>
                <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </div>
        </FormProvider>
      </Dialog>
    </div>
  );
};

export default ProjectDialog;
