import * as React from 'react';

import { cn } from '../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-[var(--radius-sm)] border border-[var(--color-hairline)] bg-transparent px-3 py-2 text-sm text-[var(--color-ink)] transition-colors resize-y',
        'placeholder:text-[var(--muted-foreground)]',
        'focus-visible:outline-none focus-visible:border-[var(--color-ink)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
