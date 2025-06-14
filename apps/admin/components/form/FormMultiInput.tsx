'use client';
import React, { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

interface FormMultiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  onCreate?: (value: string) => void;
}

const FormMultiInput = ({ label, name, options, onCreate }: FormMultiInputProps) => {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [tempValue, setTempValue] = React.useState('');

  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <div className={'flex gap-1 flex-wrap text-sm'}>
                {field.value.length > 0 && field.value.map((item: string) => <Badge key={item}>{item}</Badge>)}
                <div className={'bg-muted py-1 px-2 rounded-lg'}>Add</div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command
                onKeyUp={({ key }) => {
                  if (tempValue && key === 'Enter') {
                    onCreate?.(tempValue);
                    setTempValue('');
                    setOpen(false);
                  }
                }}
              >
                <CommandInput value={tempValue} onValueChange={setTempValue} placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty> empty </CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          if (field.value && field.value.includes(currentValue)) {
                            return;
                          }
                          field.onChange([...(field.value ?? []), currentValue]);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default FormMultiInput;
