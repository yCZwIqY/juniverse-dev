'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
}

const Pagination = ({ page, total, limit }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const startIndex = Number(page) <= 3 ? 1 : Number(page) - 2;
  const maxPage = Math.ceil(total / limit);
  const renderMaxPage = Math.min(startIndex + 3, maxPage);

  const onPageChange = (newPage: number) => {
    if (Number(page) === Number(newPage)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(pathname + '?' + params);
  };


  return (
    <div className={'flex items-center gap-2'}>
      <button className={`rotate-180 ${1 !== Number(page) ? 'rounded-md hover:bg-foreground/30 active:bg-foreground/50' : 'opacity-50'}`}
              disabled={1 === Number(page)}
              type={'button'}
              onClick={() => onPageChange(1)}>
        <svg width='24px'
             height='24px'
             viewBox='0 0 24 24'
             fill='none'
             xmlns='http://www.w3.org/2000/svg'>
          <g id='SVGRepo_bgCarrier'
             strokeWidth='0'></g>
          <g id='SVGRepo_tracerCarrier'
             strokeLinecap='round'
             strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 12l-3.293-3.293a1 1 0 0 1 0-1.414Z'
              fill='var(--color-foreground)'
            ></path>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L9.586 12 6.293 8.707a1 1 0 0 1 0-1.414Z'
              fill='var(--color-foreground)'
            ></path>
          </g>
        </svg>
      </button>
      {Array.from({ length: renderMaxPage }).map((_, i) => (
        <button
          key={i}
          type={'button'}
          onClick={() => {
            if (Number(startIndex + i) === Number(page)) {
              return;
            }
            onPageChange(startIndex + i);
          }}
          className={`border border-gray-700 size-7 rounded-md ${Number(startIndex + i) === Number(page) ? 'bg-accent' : 'border border-foreground hover:bg-foreground/30 active:bg-foreground/50'}`}
        >
          {startIndex + i}
        </button>
      ))}
      <button type={'button'}
              disabled={Number(page) === maxPage}
              className={`${Number(page) !== maxPage ? 'rounded-md hover:bg-foreground/30 active:bg-foreground/50' : 'opacity-50'}`}
              onClick={() => onPageChange(maxPage)}>
        <svg width='24px'
             height='24px'
             viewBox='0 0 24 24'
             fill='none'
             xmlns='http://www.w3.org/2000/svg'>
          <g id='SVGRepo_bgCarrier'
             strokeWidth='0'></g>
          <g id='SVGRepo_tracerCarrier'
             strokeLinecap='round'
             strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 12l-3.293-3.293a1 1 0 0 1 0-1.414Z'
              fill='var(--color-foreground)'
            ></path>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L9.586 12 6.293 8.707a1 1 0 0 1 0-1.414Z'
              fill='var(--color-foreground)'
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
