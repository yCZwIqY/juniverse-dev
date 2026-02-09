'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { PostData } from '@/app/posts/_models/posts';
import { Pagination } from '@/app/_models/common';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/_libs/posts';

interface ProjectTableProps extends Pagination {
  data: PostData[];
}

const ProjectTable = ({ data }: ProjectTableProps) => {
  const router = useRouter();
  const columns: ColumnDef<PostData>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: '제목',
    },
    {
      accessorKey: 'menu',
      header: '메뉴',
      cell: ({ row }) => <div>{row.original.menu?.name ?? '-'}</div>,
    },
    {
      accessorKey: 'viewCount',
      header: '조회수',
    },
    {
      id: 'manage', // ✅ accessor 대신 id
      header: '삭제',
      cell: ({ row }) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            deletePost(row.original.id.toString());
          }}
          className="text-red-600 border border-red-600 px-4 py-1 rounded-lg hover:bg-red-100 active:bg-red-200"
        >
          삭제
        </button>
      ),
    },
  ];
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });
  return (
    <table className={'w-full'}>
      <colgroup>
        <col className={'w-[5%]'} />
        <col className={'w-[30%]'} />
        <col className={'w-[10%]'} />
        <col className={'w-[5%]'} />
        <col className={'w-[20%]'} />
      </colgroup>
      <thead className={'border-b-2 border-primary-300'}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className={'h-10'} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={'h-6 border-b border-primary-100 hover:bg-primary-100/20 active:bg-primary-100/50'}
            onClick={() => router.push(`/posts/${row.original.id}`)}
          >
            {row.getVisibleCells().map((cell) => (
              <td className={'p-2 text-center'} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
