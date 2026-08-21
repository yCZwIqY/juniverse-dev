'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:opacity-85',
        outline: 'border border-[var(--color-hairline)] bg-transparent text-[var(--color-ink)] hover:border-[var(--color-ink)]',
        ghost: 'bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]',
        destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-85',
        secondary: 'bg-[var(--color-surface-soft)] text-[var(--color-ink)] hover:bg-[var(--color-hairline)]',
      },
      size: {
        sm: 'h-8 rounded-[var(--radius-md)] px-3 text-xs',
        md: 'h-9 rounded-[var(--radius-md)] px-4 text-sm',
        lg: 'h-10 rounded-[var(--radius-md)] px-6 text-base',
        icon: 'h-9 w-9 rounded-[var(--radius-full)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
