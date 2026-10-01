import * as React from 'react';

import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-[var(--radius-sm)] border border-[var(--color-hairline)] bg-transparent px-3 py-1 text-sm text-[var(--color-ink)] transition-colors',
        'placeholder:text-[var(--muted-foreground)]',
        'focus-visible:outline-none focus-visible:border-[var(--color-ink)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
