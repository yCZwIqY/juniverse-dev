'use client';

import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[var(--color-canvas)] group-[.toaster]:text-[var(--color-ink)] group-[.toaster]:border group-[.toaster]:border-[var(--color-hairline)] group-[.toaster]:shadow-none group-[.toaster]:rounded-[var(--radius-md)]',
          description: 'group-[.toast]:text-[var(--muted-foreground)]',
          actionButton: 'group-[.toast]:bg-[var(--color-primary)] group-[.toast]:text-[var(--color-on-primary)]',
          cancelButton: 'group-[.toast]:bg-[var(--color-surface-soft)] group-[.toast]:text-[var(--color-ink)]',
        },
      }}
      {...props}
    />
  );
}

export { toast, Toaster };
