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
    <div className={'grid grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="title" className={'font-bold text-lg block pb-2 text-center border-b-2 border-primary-300'}>
        태그
      </label>
      <div className={'border rounded-lg border-gray-200'}>
        <input
          value={inputValue}
          className={'h-10 px-2 py-1 w-full'}
          onBlur={onEnter}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onEnter();
            }
          }}
          onChange={(e) => setInputValue(e.target.value.trim())}
        />
      </div>
      <div className={'flex gap-2 flex-wrap pt-1 col-span-2'}>
        {value?.map((tag: string) => (
          <span
            key={tag}
            className={'px-3 py-1 bg-primary-300 rounded-full cursor-pointer text-white'}
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
