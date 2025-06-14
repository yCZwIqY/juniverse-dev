'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';

interface FormDatePickerProps {
  label: string;
  name: string;
  required?: boolean;
}

const FormDatePicker = ({ label, name, required = false }: FormDatePickerProps) => {
  const { control } = useFormContext();
  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        rules={{
          required,
        }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal">
                {field.value ? format(field.value, 'yyyy-MM-dd') : <span>YYYY-MM-DD</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default FormDatePicker;
