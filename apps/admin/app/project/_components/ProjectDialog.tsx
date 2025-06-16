import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Project, Tech } from 'shared-types';
import { FormProvider, useForm } from 'react-hook-form';
import FormTextInput from '@/components/form/FormTextInput';
import FormImageInput from '@/components/form/FormImageInput';
import FormMultiInput from '@/components/form/FormMultiInput';
import { useCreateTech, useTech } from 'apis';
import { useQueryClient } from '@tanstack/react-query';
import FormTextArea from '@/components/form/FormTextArea';
import FormRichText from '@/components/form/tiptab/FormRichText';
import FormDatePicker from '@/components/form/FormDatePicker';

interface ProjectDialogProps {
  children: React.ReactNode;
  id?: string;
}

const ProjectDialog = ({ children, id }: ProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const isNew = !id;
  const form = useForm<Project>();
  const { data: techData } = useTech();
  const { mutate: createTech } = useCreateTech();
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
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ['tech'] });
          form.setValue('techs', [...form.getValues('techs'), res.result] as Tech[]);
        },
      },
    );
  };

  useEffect(() => {
    form.reset();
  }, [open]);

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
                <FormTextInput label={'데모 영상'} name={'video'} type={'file'} accept={'video/*'} />
                <FormImageInput label={'첨부 이미지'} name={'thumbnail'} multiple={false} />
                <FormImageInput label={'첨부 이미지'} name={'images'} />
                <FormMultiInput label={'태그'} name={'techs'} required={false} options={techOptions} onCreate={onCreateNewTech} />
                <FormDatePicker label={'시작일'} name={'startDate'} />
                <FormDatePicker label={'종료일'} name={'endDate'} />
                <FormTextInput label={'깃허브 URL'} name={'gitHubUrl'} />
                <FormTextInput label={'데모 URL'} name={'DemoUrl'} />
                <FormTextInput label={'역할'} name={'role'} />
                <FormTextArea label={'요약'} name={'summary'} />
                <FormRichText label={'설명'} name={'description'} />
              </div>
            </DialogContent>
          </div>
        </FormProvider>
      </Dialog>
    </div>
  );
};

export default ProjectDialog;
