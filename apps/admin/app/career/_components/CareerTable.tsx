'use client';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CareerFormDialog from '@/app/career/_components/CareerFormDialog';
import { Career } from 'shared-types';
import { useCareers, useRemoveCareer } from 'apis';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';

const CareerTable = () => {
  const { data } = useCareers();
  const { mutate: removeCareer } = useRemoveCareer();
  const queryClient = useQueryClient();

  const columns: ColumnDef<Career>[] = [
    {
      accessorKey: 'name',
      header: '회사명',
      cell: ({ row }: { row: Row<Career> }) => <div>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'position',
      header: '포지션',
      cell: ({ row }: { row: Row<Career> }) => <div className={'w-48'}>{row.getValue('position')}</div>,
    },
    {
      accessorKey: 'startDate',
      header: '입사일',
      cell: ({ row }: { row: Row<Career> }) => <div className={'w-48'}>{row.getValue('startDate')}</div>,
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
        <div className={'max-w-96 whitespace-nowrap overflow-hidden text-ellipsis'}>{row.getValue('contents')}</div>
      ),
    },
    {
      accessorKey: 'inOffice',
      header: '재직중',
      cell: ({ row }: { row: Row<Career> }) => <div>{row.getValue('inOffice') ? 'true' : 'false'}</div>,
    },
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }: { row: Row<Career> }) => (
        <div>
          <CareerFormDialog id={row.getValue('id')} />
        </div>
      ),
    },
    {
      accessorKey: 'delete',
      header: '',
      cell: ({ row }: { row: Row<Career> }) => (
        <div>
          <Button variant={'destructive'} onClick={() => onRemoveCareer(row)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  const onRemoveCareer = (row: Row<Career>) => {
    removeCareer(row.getValue('id'), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['career'] });
      },
    });
  };

  const table = useReactTable({
    data: data?.result ?? [],
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
