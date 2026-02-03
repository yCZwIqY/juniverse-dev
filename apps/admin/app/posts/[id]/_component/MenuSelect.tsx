import { useController, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getMenuList } from '@/app/_libs/menus';

const MenuSelect = () => {
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: 'menuId',
    control,
  });

  useEffect(() => {
    (async () => {
      const response = await getMenuList('flat');
      if (response) {
        setOptions(response?.data.map((it) => ({ label: it.name, value: it.id })));
        if (!value) {
          onChange(response?.data[0].id);
        }
      }
    })();
  }, [value, onChange]);

  return (
    <div className={'grid grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="content" className={'font-bold text-lg block pb-2 text-center border-b-2 border-primary-300'}>
        카테고리
      </label>
      <select value={value} onChange={onChange} className={'border rounded-lg p-2 after:right-2 border-gray-200'}>
        {options.map((it) => (
          <option key={it.value} value={it.value}>
            {it.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MenuSelect;
