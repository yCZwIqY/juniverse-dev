'use client';

import { Pagination as PaginationPrimitive } from 'components';

import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
}

const Pagination = ({ page, total, limit }: PaginationProps) => {
  const updateSearchParams = useUpdateSearchParams();
  const totalPages = Math.ceil(total / limit);

  const onPageChange = (newPage: number) => {
    if (Number(page) === Number(newPage)) return;
    updateSearchParams('page', newPage.toString());
  };

  return <PaginationPrimitive page={Number(page)} totalPages={totalPages} onPageChange={onPageChange} />;
};

export default Pagination;
