'use client';
import type { InputHTMLAttributes } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'height'> & {
  height?: string;
  setValue?: (value: string) => void;
  onEnterKeyPress?: () => void;
  useComma?: boolean;
};

export function TextInput({ height = '36px', setValue, onEnterKeyPress, useComma: _useComma, onChange, onKeyDown, style, ...props }: Props) {
  return <input {...props} style={{ height, border: '1px solid var(--tt-gray-light-a-300, #ccc)', borderRadius: 6, padding: '0 8px', background: 'transparent', color: 'inherit', width: '100%', ...style }} onChange={event => { setValue?.(event.target.value); onChange?.(event); }} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); onEnterKeyPress?.(); } onKeyDown?.(event); }} />;
}
export function NumberInput(props: Props) {
  return <TextInput {...props} inputMode="numeric" pattern="[0-9]*" />;
}
