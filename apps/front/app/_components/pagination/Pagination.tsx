'use client';

import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
}

const Pagination = ({ page, total, limit }: PaginationProps) => {
  const updateSearchParams = useUpdateSearchParams();

  const startIndex = page < 3 ? 1 : page - 2;
  const maxPage = Math.min(page, limit);

  const onPageChange = (page: number) => {
    updateSearchParams('page', page.toString());
  };

  return (
    <div className={'flex items-center gap-2'}>
      <button className={'rotate-180'} type={'button'} onClick={() => onPageChange(1)}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 12l-3.293-3.293a1 1 0 0 1 0-1.414Z"
              fill="var(--color-gray-600)"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L9.586 12 6.293 8.707a1 1 0 0 1 0-1.414Z"
              fill="var(--color-gray-600)"
            ></path>
          </g>
        </svg>
      </button>
      {Array.from({ length: maxPage }).map((_, i) => (
        <button
          key={i}
          type={'button'}
          onClick={() => onPageChange(startIndex + i)}
          className={`border border-border size-7 rounded-md ${Number(startIndex + i) === Number(page) ? 'bg-accent border-none text-white opacity-50 hover:opacity-70 active:opacity-100' : ''}`}
        >
          {startIndex + i}
        </button>
      ))}
      <button type={'button'} onClick={() => onPageChange(Math.ceil(total / limit))}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 12l-3.293-3.293a1 1 0 0 1 0-1.414Z"
              fill="var(--color-gray-600)"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L9.586 12 6.293 8.707a1 1 0 0 1 0-1.414Z"
              fill="var(--color-gray-600)"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
