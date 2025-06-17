'use client';

import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateImage, useRemoveImage } from 'apis';
import Image from 'next/image';
import { FileData } from 'shared-types';

interface FormMultiImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormImageInput = ({ label, name, accept, multiple = true }: FormMultiImageInputProps) => {
  const { control, setValue, getValues } = useFormContext();
  const { mutate: uploadImage } = useCreateImage();
  const { mutate: removeImage } = useRemoveImage();

  const [inputValue, setInputValue] = useState('');

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (const file of files) {
      formData.append('images', file);
    }

    uploadImage(formData, {
      onSuccess: (res) => {
        setValue(name, multiple ? [...(getValues(name) || []), ...res.result] : res.result[0]);
        setInputValue('');
      },
      onError: (err) => {},
    });
  };
  const onRemoveImage = (targetKey: string) => {
    removeImage(targetKey, {
      onSuccess: () => {
        setValue(name, multiple ? [...(getValues(name) || [])].filter(({ key }: FileData) => key !== targetKey) : null);
        setInputValue('');
      },
    });
  };

  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            <Input type={'file'} accept={accept} multiple={multiple} value={inputValue} onChange={onUploadImage} />
            <div className={'flex flex-wrap gap-2 p-2'}>
              {multiple
                ? field.value?.map((item: FileData, idx: number) =>
                    item.src ? (
                      <div key={`${item.key}_${idx}`} className="relative w-12 h-12 ">
                        <Image
                          className="w-12 h-12 rounded-md border"
                          src={item.src}
                          alt={item.name || 'uploaded image'}
                          width={100}
                          height={100}
                        />
                        <button
                          type="button"
                          className="w-4 h-4 text-sm flex justify-center items-center text-white opacity-0 hover:opacity-100 bg-red-500 absolute top-1 right-1 rounded-full"
                          onClick={() => onRemoveImage(item.key)}
                        >
                          x
                        </button>
                      </div>
                    ) : null,
                  )
                : field?.value?.src && (
                    <div className="relative w-12 h-12 ">
                      <Image
                        className="w-12 h-12 rounded-md border"
                        src={field?.value?.src}
                        alt={field?.value?.name || 'uploaded image'}
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className="w-4 h-4 text-sm flex justify-center items-center text-white opacity-0 hover:opacity-100 bg-red-500 absolute top-1 right-1 rounded-full"
                        onClick={() => onRemoveImage(field?.value?.key)}
                      >
                        x
                      </button>
                    </div>
                  )}
            </div>
          </div>
        )}
      ></Controller>
    </div>
  );
};

export default FormImageInput;
