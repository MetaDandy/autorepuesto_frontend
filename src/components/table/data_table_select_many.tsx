'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  PaginationState,
  Row,
} from '@tanstack/react-table';
import { useState } from 'react';
import { TableFooter } from './footer_table';

interface DataTableSelectManyProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onAddSelected: (rows: T[]) => void;
  globalFilterPlaceholder?: string;
  isLoading?: boolean;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  pageCount: number;
  rowIdAccessor?: (row: T) => string;
}

export function DataTableSelectMany<T>({
  data,
  columns,
  onAddSelected,
  pagination,
  onPaginationChange,
  pageCount,
  globalFilterPlaceholder = 'Buscar...',
  isLoading = false,
  rowIdAccessor = (row: any) => row.id,
}: DataTableSelectManyProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const toggleRow = (row: Row<T>) => {
    const id = rowIdAccessor(row.original);
    setSelectedRowIds(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedRows = table
    .getRowModel()
    .rows.filter(row => selectedRowIds[rowIdAccessor(row.original)]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder={globalFilterPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <Button
          disabled={selectedRows.length === 0}
          onClick={() => {
            onAddSelected(selectedRows.map(row => row.original));
            setSelectedRowIds({});
          }}
        >
          Agregar seleccionados
        </Button>
      </div>

      <div className="w-full overflow-auto relative">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  <Loader2 className="animate-spin inline w-4 h-4 mr-2" />
                  Cargando datos...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  Sin resultados
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                const isSelected = selectedRowIds[rowIdAccessor(row.original)];
                return (
                  <TableRow
                    key={row.id}
                    onClick={() => toggleRow(row)}
                    className={isSelected ? 'bg-muted hover:bg-muted/80 cursor-pointer' : 'cursor-pointer'}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected || false}
                        onChange={() => toggleRow(row)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <TableFooter
        pagination={pagination}
        pageCount={pageCount}
        onPageChange={(newPage) =>
          onPaginationChange({ ...pagination, pageIndex: newPage })
        }
        onPageSizeChange={(newSize) =>
          onPaginationChange({ pageIndex: 0, pageSize: newSize })
        }
      />
    </div>
  );
}
