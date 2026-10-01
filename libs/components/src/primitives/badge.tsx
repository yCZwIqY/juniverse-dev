import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-pill)] px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary)] text-[var(--color-on-primary)]',
        outline: 'border border-[var(--color-hairline)] text-[var(--color-ink)]',
        secondary: 'bg-[var(--color-surface-soft)] text-[var(--color-ink)]',
        success: 'bg-[var(--color-block-mint)] text-[var(--color-ink)]',
        warning: 'bg-[var(--color-block-cream)] text-[var(--color-ink)]',
        destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
