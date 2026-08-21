'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '../utils/cn';
import { buttonVariants } from './button';

const PaginationRoot = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav role="navigation" aria-label="pagination" className={cn('mx-auto flex w-full justify-center', className)} {...props} />
);
PaginationRoot.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<'button'>;

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({ variant: isActive ? 'default' : 'ghost', size: 'icon' }),
      'h-9 w-9 text-sm',
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<'button'>) => (
  <button className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', className)} aria-label="이전 페이지" {...props}>
    <ChevronLeft className="h-4 w-4" />
  </button>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<'button'>) => (
  <button className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', className)} aria-label="다음 페이지" {...props}>
    <ChevronRight className="h-4 w-4" />
  </button>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">더 많은 페이지</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

function Pagination({ page, totalPages, onPageChange, className, siblingCount = 1 }: PaginationProps) {
  const pages = React.useMemo(() => {
    const total = totalPages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const left = Math.max(2, page - siblingCount);
    const right = Math.min(total - 1, page + siblingCount);
    const showLeftEllipsis = left > 2;
    const showRightEllipsis = right < total - 1;

    const items: (number | 'ellipsis-left' | 'ellipsis-right')[] = [1];
    if (showLeftEllipsis) items.push('ellipsis-left');
    for (let i = left; i <= right; i++) items.push(i);
    if (showRightEllipsis) items.push('ellipsis-right');
    items.push(total);
    return items;
  }, [page, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1} />
        </PaginationItem>
        {pages.map((p, idx) =>
          p === 'ellipsis-left' || p === 'ellipsis-right' ? (
            <PaginationItem key={`${p}-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink isActive={p === page} onClick={() => onPageChange(p as number)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
};
