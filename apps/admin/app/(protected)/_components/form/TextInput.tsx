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
    <div className={'grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor={name} className={'font-bold text-base md:text-lg block pb-2 text-left md:text-center border-b border-white/20 text-gray-200'}>
        {label}
      </label>
      <div className={'border rounded-xl border-white/10 bg-white/5 backdrop-blur-md'}>
        <input value={value} className={'h-10 px-3 py-2 w-full bg-transparent text-white placeholder:text-gray-400'} onChange={onChange} />
      </div>
    </div>
  );
};

export default TextInput;
