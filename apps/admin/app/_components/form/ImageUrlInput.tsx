'use client';

import { useController, useFormContext } from 'react-hook-form';
import { useMemo, useState } from 'react';

interface ImageUrlInputProps {
  name?: string;
  label?: string;
}

const ImageUrlInput = ({ name = 'imageUrls', label = '이미지' }: ImageUrlInputProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });
  const [inputValue, setInputValue] = useState('');
  const list: string[] = useMemo(() => (Array.isArray(value) ? value : []), [value]);

  const addUrl = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (list.includes(trimmed)) {
      setInputValue('');
      return;
    }
    onChange([...list, trimmed]);
    setInputValue('');
  };

  const removeUrl = (url: string) => {
    onChange(list.filter((it) => it !== url));
  };

  return (
    <div className={'grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor={name} className={'font-bold text-base md:text-lg block pb-2 text-left md:text-center border-b border-white/20 text-gray-200'}>
        {label}
      </label>
      <div className={'flex gap-2 border rounded-xl border-white/10 bg-white/5 backdrop-blur-md p-2'}>
        <input
          id={name}
          value={inputValue}
          className={'h-10 px-3 py-2 w-full bg-transparent text-white placeholder:text-gray-400'}
          placeholder="이미지 URL을 입력하세요"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addUrl();
            }
          }}
        />
        <button
          type="button"
          onClick={addUrl}
          className="px-3 py-1 rounded-lg border border-cyan-300/50 text-cyan-100 hover:bg-cyan-400/10"
        >
          추가
        </button>
      </div>
      <div className={'col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
        {list.length === 0 ? (
          <div className="col-span-3 text-gray-400 text-sm">등록된 이미지가 없습니다.</div>
        ) : (
          list.map((url) => (
            <div key={url} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="preview" className="w-full h-24 object-cover" />
              <div className="p-2 flex items-center justify-between gap-2">
                <div className="text-xs text-gray-300 truncate" title={url}>
                  {url}
                </div>
                <button
                  type="button"
                  onClick={() => removeUrl(url)}
                  className="text-red-200 border border-red-400/70 px-2 py-0.5 rounded-md hover:bg-red-500/20"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageUrlInput;
