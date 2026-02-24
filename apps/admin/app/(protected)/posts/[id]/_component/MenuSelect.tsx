import { useController, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getMenuList } from 'apis';

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
    <div className={'grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="content" className={'font-bold text-base md:text-lg block pb-2 text-left md:text-center border-b border-white/20 text-gray-200'}>
        카테고리
      </label>
      <select
        value={value}
        onChange={onChange}
        className={'border rounded-xl p-2 after:right-2 border-white/10 bg-white/5 text-white'}
      >
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
