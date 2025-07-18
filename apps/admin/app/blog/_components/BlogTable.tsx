'use client';

import { useBlogs, useRemoveBlog } from 'apis';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { Blog, FileData } from 'shared-types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';

const BlogTable = () => {
  const { data } = useBlogs();
  const router = useRouter();
  const blogs = data?.result;
  const { mutate: removeBlog } = useRemoveBlog();
  const queryClient = useQueryClient();
  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }: { row: Row<Blog> }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'thumbnail',
      header: '썸네일',
      cell: ({ row }: { row: Row<Blog> }) => (
        <div>
          <Image
            src={(row.getValue('thumbnail') as FileData)?.src}
            alt={(row.getValue('thumbnail') as FileData)?.name ?? 'thumbnail'}
            width={100}
            height={100}
          />
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: '제목',
      cell: ({ row }: { row: Row<Blog> }) => <div>{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'subtitle',
      header: '서브 타이틀',
      cell: ({ row }: { row: Row<Blog> }) => <div>{row.getValue('subtitle')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: '작성일',
      cell: ({ row }: { row: Row<Blog> }) => <div>{row.getValue('createdAt')}</div>,
    },
    {
      accessorKey: 'views',
      header: '조회수',
      cell: ({ row }: { row: Row<Blog> }) => <div>{Number(row.getValue('views') ?? 0)}</div>,
    },
    {
      accessorKey: 'likes',
      header: '좋아요 수',
      cell: ({ row }: { row: Row<Blog> }) => <div>{Number(((row.getValue('likes') as string[]) ?? []).length ?? 0)}</div>,
    },
    {
      accessorKey: 'delete',
      header: '',
      cell: ({ row }: { row: Row<Blog> }) => (
        <div>
          <Button
            variant={'destructive'}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveBlog(row);
            }}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  const onRemoveBlog = (row: Row<Blog>) => {
    removeBlog(row.getValue('id'), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blog'] });
      },
    });
  };

  const table = useReactTable({
    data: blogs ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} onClick={() => router.push(`/blog/${row.getValue('id')}`)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogTable;
