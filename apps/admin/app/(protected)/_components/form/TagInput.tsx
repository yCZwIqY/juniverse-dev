import { useController, useFormContext } from 'react-hook-form';
import { useState } from 'react';

const TagInput = () => {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const {
    field: { value, onChange },
  } = useController({
    name: 'tags',
    control,
  });

  const onEnter = () => {
    if (value?.find((it: string) => it.toUpperCase() === inputValue.toUpperCase())) {
      setInputValue('');
      return;
    }
    onChange([
      ...value,
      ...(inputValue
        ? inputValue
            .split(',')
            .map((it: string) => it.trim())
            .filter((it: string) => it)
        : []),
    ]);
    setInputValue('');
  };

  return (
    <div className={'grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="title" className={'font-bold text-base md:text-lg block pb-2 text-left md:text-center border-b border-white/20 text-gray-200'}>
        태그
      </label>
      <div className={'border rounded-xl border-white/10 bg-white/5 backdrop-blur-md'}>
        <input
          value={inputValue}
          className={'h-10 px-3 py-2 w-full bg-transparent text-white placeholder:text-gray-400'}
          onBlur={onEnter}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onEnter();
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className={'flex gap-2 flex-wrap pt-1 col-span-1 md:col-span-2'}>
        {value?.map((tag: string) => (
          <span
            key={tag}
            className={'px-3 py-1 bg-cyan-400/20 border border-cyan-300/40 rounded-full cursor-pointer text-cyan-100'}
            onClick={() => {
              const filterValue = value.filter((it: string) => it !== tag);
              onChange(filterValue);
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
