'use client';

import { useController, useFormContext } from 'react-hook-form';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components';

interface MenuSelectProps {
  options: { label: string; value: number }[];
}

const MenuSelect = ({ options }: MenuSelectProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: 'menuId', control });

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
