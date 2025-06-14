import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface FormCheckBoxProps {
  label: string;
  name: string;
  required?: boolean;
}

const FormCheckBox = ({ label, name, required = true }: FormCheckBoxProps) => {
  const { control } = useFormContext();
  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} ref={field.ref} />}
      />
    </div>
  );
};

export default FormCheckBox;
