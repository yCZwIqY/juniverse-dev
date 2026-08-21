'use client';

import { useEffect, useState } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { getMenuList } from '@/app/(protected)/_libs/menus';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components';

const MenuSelect = () => {
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: 'menuId', control });

  useEffect(() => {
    (async () => {
      const response = await getMenuList('flat');
      if (response) {
        setOptions(response.data.map((it) => ({ label: it.name, value: it.id })));
        if (!value) onChange(response.data[0]?.id);
      }
    })();
  }, [value, onChange]);

  return (
    <div className="flex flex-col gap-1.5">
      <Label>카테고리</Label>
      <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
        <SelectTrigger>
          <SelectValue placeholder="카테고리 선택" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MenuSelect;
