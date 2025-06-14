'use client';

import { FormProvider, useForm } from 'react-hook-form';
import FormTextInput from '@/components/form/FormTextInput';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FormDatePicker from '@/components/form/FormDatePicker';
import FormTextArea from '@/components/form/FormTextArea';
import FormMultiInput from '@/components/form/FormMultiInput';
import { Career, Tech } from 'shared-types';
import { useCareer, useCreateCareer, useCreateTech, useTech, useUpdateCareer } from 'apis';
import { useQueryClient } from '@tanstack/react-query';
import FormCheckBox from '@/components/form/FormCheckBox';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface CareerFormProps {
  id?: string;
}

const CareerFormDialog = ({ id }: CareerFormProps) => {
  const isNew = !id;
  const [open, setOpen] = useState(false);
  const form = useForm<Career>({
    defaultValues: {
      name: '',
      position: '',
      startDate: '',
      endDate: null,
      contents: '',
      inOffice: false,
      techs: [],
    },
  });

  const { data: techData } = useTech();
  const { data: career } = useCareer(id ?? '0', !!id && open);
  const { mutate: createCareer } = useCreateCareer();
  const { mutate: updateCareer } = useUpdateCareer();
  const { mutate: createTech } = useCreateTech();
  const techOptions = techData?.result.map((it: Tech) => ({ label: it.name, value: it.id })) ?? [];
  const queryClient = useQueryClient();

  useEffect(() => {
    if (id && career) {
      form.reset(career.result);
    } else {
      form.reset({
        name: '',
        position: '',
        startDate: '',
        endDate: null,
        contents: '',
        inOffice: false,
        techs: [],
      });
    }
  }, [open, career]);

  const onCreateNewTech = (name: string) => {
    if (techData?.result.find((it: { label: string }) => it.label === name)) {
      return;
    }
    createTech(
      { name },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tech'] });
          form.setValue('techs', [...form.getValues('techs'), name]);
        },
      },
    );
  };

  const onSubmit = (data: Career) => {
    if (isNew) {
      createCareer(data, {
        onSuccess: () => {
          location.reload();
        },
      });
      return;
    }
    if (id) {
      updateCareer(
        { id, career: data },
        {
          onSuccess: () => {
            location.reload();
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FormProvider {...form}>
        <DialogTrigger className={'bg-primary text-white rounded-lg px-4 py-1'}>{isNew ? 'ADD' : 'EDIT'}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isNew ? 'Add' : 'Edit'} Career</DialogTitle>
          </DialogHeader>
          <FormTextInput label={'회사명'} name={'name'} />
          <FormTextInput label={'포지션'} name={'position'} />
          <FormDatePicker label={'입사일'} name={'startDate'} />
          <FormDatePicker label={'퇴사일'} name={'endDate'} required={false} />
          <FormTextArea label={'내용'} name={'contents'} required={false} />
          <FormMultiInput label={'태그'} name={'techs'} required={false} options={techOptions} onCreate={onCreateNewTech} />
          <FormCheckBox label={'재직여부'} name={'inOffice'} required={false} />
          <DialogFooter>
            <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
};

export default CareerFormDialog;
