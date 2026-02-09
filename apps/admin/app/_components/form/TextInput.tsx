import { useController, useFormContext } from 'react-hook-form';

interface TextInputProps {
  name: string;
  maxLength?: number;
  label: string;
}

const TextInput = ({ name, maxLength, label }: TextInputProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { maxLength },
  });
  return (
    <div className={'grid grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="title" className={'font-bold text-lg block pb-2 text-center border-b-2 border-primary-300'}>
        {label}
      </label>
      <div className={'border rounded-lg border-gray-200'}>
        <input value={value} className={'h-10 px-2 py-1 w-full'} onChange={onChange} />
      </div>
    </div>
  );
};

export default TextInput;
