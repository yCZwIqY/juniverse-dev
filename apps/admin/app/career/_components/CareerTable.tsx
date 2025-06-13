'use client';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { Career } from 'shared-types/src';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const data: Career[] = [
  {
    id: 0,
    name: 'CRSCube',
    position: '주니어 웹 개발자',
    startDate: '2025-01-01',
    endDate: '2025-01-01',
    contents: ['의약품 관리 솔루션 신규기능 개발 및 유지보수', 'Typescript, Vue.js, Java, Spring Boot'],
    inOffice: false,
    tags: ['javascript', 'typescript'],
  },
];
const columns: ColumnDef<Career>[] = [
  {
    accessorKey: 'name',
    header: '회사명',
    cell: ({ row }: { row: Row<Career> }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'position',
    header: '포지션',
    cell: ({ row }: { row: Row<Career> }) => <div>{row.getValue('position')}</div>,
  },
  {
    accessorKey: 'startDate',
    header: '입사일',
    cell: ({ row }: { row: Row<Career> }) => <div>{row.getValue('startDate')}</div>,
  },
  {
    accessorKey: 'endDate',
    header: '퇴사일',
    cell: ({ row }: { row: Row<Career> }) => <div>{row.getValue('endDate') ?? '-'}</div>,
  },
  {
    accessorKey: 'contents',
    header: '내용',
    cell: ({ row }: { row: Row<Career> }) => (
      <div className={'max-w-80 whitespace-nowrap overflow-hidden text-ellipsis'}>
        {((row.getValue('contents') ?? []) as string[]).join(',')}
      </div>
    ),
  },
  {
    accessorKey: 'inOffice',
    header: '재직중',
    cell: ({ row }: { row: Row<Career> }) => <div>{row.getValue('inOffice') ? 'true' : 'false'}</div>,
  },
];

const CareerTable = () => {
  // const { data } = useCareer();
  const table = useReactTable({
    data,
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
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CareerTable;
