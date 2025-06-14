import React, { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormTextAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormTextArea = ({ label, name }: FormTextAreaProps) => {
  const { control } = useFormContext();

  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller name={name} control={control} render={({ field }) => <Textarea value={field.value} onChange={field.onChange} />} />
    </div>
  );
};

export default FormTextArea;
