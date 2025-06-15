'use client';

import React, { useEffect } from 'react';
import { Tech } from 'shared-types';
import { FormProvider, useForm } from 'react-hook-form';
import FormTextInput from '@/components/form/FormTextInput';
import FormDropdown from '@/components/form/FormDropdown';
import { Button } from '@/components/ui/button';
import { useDeleteTech, useUpdateTech } from 'apis';
import { useQueryClient } from '@tanstack/react-query';

interface TechItemProps {
  tech?: Tech;
}

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

const TechItem = ({ tech }: TechItemProps) => {
  const form = useForm<Tech>({});
  const queryClient = useQueryClient();

  const { mutate: updateTech } = useUpdateTech();
  const { mutate: removeTech } = useDeleteTech();

  useEffect(() => {
    form.reset(tech);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech]);

  const onUpdate = (tech: Tech) => {
    updateTech(
      { id: tech.id!, tech },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tech'] });
        },
      },
    );
  };
  const onDelete = () => {
    if (!tech?.id) return;
    if (tech && tech.id) {
      removeTech(tech.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tech'] });
        },
      });
    }
  };

  return (
    <div className={'flex p-4 gap-3 shadow-md justify-between items-center'}>
      <FormProvider {...form}>
        <div className={'flex gap-3'}>
          <FormTextInput label={'이름'} name={'name'} />
          <FormDropdown label={'레벨'} name={'level'} options={LEVEL} />
          <FormDropdown label={'타입'} name={'type'} options={TYPE} />
        </div>
        <div className={'flex gap-3'}>
          <Button variant={'outline'} onClick={form.handleSubmit(onUpdate)}>
            저장
          </Button>
          <Button variant={'destructive'} onClick={onDelete}>
            삭제
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default TechItem;
