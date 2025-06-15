'use client';

import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormMultiImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormImageInput = ({ label, name }: FormMultiImageInputProps) => {
  const { control } = useFormContext();

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
  };
  const onRemoveImage = (file: File) => {};

  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller
        control={control}
        render={({ field }) => (
          <div>
            <Input type={'file'} multiple value={field.value} onChange={onUploadImage} />
            <div></div>
          </div>
        )}
        name={name}
      ></Controller>
    </div>
  );
};

export default FormImageInput;
