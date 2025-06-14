import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
}

const FormTextInput = ({ label, name, required = true, ...props }: FormTextInputProps) => {
  const { register } = useFormContext();

  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Input {...{ ...register(name, { required }), ...props }} />
    </div>
  );
};

export default FormTextInput;
