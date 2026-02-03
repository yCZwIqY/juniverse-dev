import { useController, useFormContext } from 'react-hook-form';

const SubTitleInput = () => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: 'subtitle',
    control,
    rules: { maxLength: 300 },
  });
  return (
    <div className={'grid grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="title" className={'font-bold text-lg block pb-2 text-center border-b-2 border-primary-300'}>
        부제목
      </label>
      <div className={'border rounded-lg border-gray-200'}>
        <input value={value} className={'h-10 px-2 py-1 w-full'} onChange={onChange} />
      </div>
    </div>
  );
};

export default SubTitleInput;
