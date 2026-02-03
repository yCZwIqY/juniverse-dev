import { useController, useFormContext } from 'react-hook-form';

const TitleInput = () => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: 'title',
    control,
    rules: { maxLength: 200 },
  });
  return (
    <div className={'grid grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="title" className={'font-bold text-lg block pb-2 text-center border-b-2 border-primary-300'}>
        제목
      </label>
      <div className={'border rounded-lg border-gray-200'}>
        <input value={value} className={'h-10 px-2 py-1 w-full'} onChange={onChange} />
      </div>
    </div>
  );
};

export default TitleInput;
