'use client';

import React from 'react';
import { Tech } from 'shared-types';
import { FormProvider, useForm } from 'react-hook-form';
import FormTextInput from '@/components/form/FormTextInput';
import FormDropdown from '@/components/form/FormDropdown';
import { Button } from '@/components/ui/button';
import { useCreateTech } from 'apis';
import { useQueryClient } from '@tanstack/react-query';

const LEVEL = [
  {
    label: 'Strong',
    value: 'STRONG',
  },
  {
    label: 'Knowledgeable',
    value: 'knowledgeable',
  },
  {
    label: 'Experienced',
    value: 'EXPERIENCED',
  },
];

const TYPE = [
  {
    label: 'Front',
    value: 'FRONT',
  },
  {
    label: 'Back',
    value: 'BACK',
  },
  {
    label: 'Other',
    value: 'OTHER',
  },
];

const NewTech = () => {
  const form = useForm<Tech>({
    defaultValues: {
      name: '',
      level: 'STRONG',
      type: 'FRONT',
    },
  });
  const queryClient = useQueryClient();
  const { mutate: createTech } = useCreateTech();

  const onSave = (tech: Tech) => {
    createTech(tech, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tech'] });
        form.reset();
      },
      onError: (e) => {
        console.log('error', e);
      },
    });
  };

  return (
    <div className={'flex p-4 gap-3 shadow-md justify-between items-center'}>
      <FormProvider {...form}>
        <div className={'flex gap-3'}>
          <FormTextInput label={'이름'} name={'name'} />
          <FormDropdown label={'레벨'} name={'level'} options={LEVEL} />
          <FormDropdown label={'타입'} name={'type'} options={TYPE} />
        </div>
        <div>
          <Button variant={'outline'} onClick={form.handleSubmit(onSave)}>
            저장
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default NewTech;
