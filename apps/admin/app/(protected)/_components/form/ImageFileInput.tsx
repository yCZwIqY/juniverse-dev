'use client';

import { useController, useFormContext } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';

interface ImageFileInputProps {
  name?: string;
  label?: string;
  multiple?: boolean;
}

const ImageFileInput = ({ name = 'images', label = '이미지', multiple = true }: ImageFileInputProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const files: File[] = useMemo(() => (Array.isArray(value) ? value : []), [value]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const onFilesChange = (fileList: FileList | null) => {
    if (!fileList) return;
    const next = Array.from(fileList);
    onChange(next);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    onChange(next);
  };

  const moveFile = (from: number, to: number) => {
    if (to < 0 || to >= files.length) return;
    const next = [...files];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className={'grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor={name} className={'font-bold text-base md:text-lg block pb-2 text-left md:text-center border-b border-white/20 text-gray-200'}>
        {label}
      </label>
      <div className={'flex flex-col gap-3'}>
        <div className={'border rounded-xl border-white/10 bg-white/5 backdrop-blur-md p-3'}>
          <input
            id={name}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => onFilesChange(e.target.files)}
            className="text-gray-200 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/80 file:px-3 file:py-1.5 file:text-white hover:file:bg-cyan-400"
          />
        </div>
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
          {previews.length === 0 ? (
            <div className="col-span-3 text-gray-400 text-sm">선택된 이미지가 없습니다.</div>
          ) : (
            previews.map((url, index) => (
              <div key={url} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="preview" className="w-full h-28 object-cover" />
                <div className="p-2 flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-300 truncate" title={files[index]?.name}>
                    {files[index]?.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveFile(index, index - 1)}
                      className="text-gray-200 border border-white/20 px-2 py-0.5 rounded-md hover:bg-white/10"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFile(index, index + 1)}
                      className="text-gray-200 border border-white/20 px-2 py-0.5 rounded-md hover:bg-white/10"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-200 border border-red-400/70 px-2 py-0.5 rounded-md hover:bg-red-500/20"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageFileInput;
