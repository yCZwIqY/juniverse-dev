'use client';

import { useState } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Badge, Input, Label } from 'components';

const TagInput = () => {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const {
    field: { value, onChange },
  } = useController({ name: 'tags', control });

  const addTags = () => {
    if (!inputValue.trim()) return;
    const newTags = inputValue.split(',').map((t) => t.trim()).filter(Boolean);
    const merged = Array.from(new Set([...(value ?? []), ...newTags]));
    onChange(merged);
    setInputValue('');
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label>태그</Label>
      <Input
        value={inputValue}
        placeholder="태그 입력 후 Enter (쉼표로 구분)"
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={addTags}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTags();
          }
        }}
      />
      {value?.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-1">
          {value.map((tag: string) => (
            <button
              key={tag}
              type="button"
              onClick={() => onChange(value.filter((t: string) => t !== tag))}
            >
              <Badge variant="outline" className="cursor-pointer hover:bg-[var(--color-surface-soft)]">
                {tag} ✕
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
