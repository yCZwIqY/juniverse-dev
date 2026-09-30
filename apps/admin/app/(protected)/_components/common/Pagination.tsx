'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Pagination as PaginationPrimitive } from 'components';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
}

const Pagination = ({ page, total, limit }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const totalPages = Math.ceil(total / limit);

  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(pathname + '?' + params);
  };

  return <PaginationPrimitive page={Number(page)} totalPages={totalPages} onPageChange={onPageChange} />;
};

export default Pagination;
