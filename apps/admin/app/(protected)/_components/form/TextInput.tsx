import { useController, useFormContext } from 'react-hook-form';

import { Input, Label } from 'components';

interface TextInputProps {
  name: string;
  maxLength?: number;
  label: string;
}

const TextInput = ({ name, maxLength, label }: TextInputProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name, control, rules: { maxLength } });

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} value={value} onChange={onChange} maxLength={maxLength} />
    </div>
  );
};

export default TextInput;
