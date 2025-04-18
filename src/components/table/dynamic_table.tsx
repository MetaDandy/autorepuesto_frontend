'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
  VisibilityState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import { useState } from "react"
import { ColumnVisibilityToggle } from "./column_visibility_toggle"
import { TableFooter } from "./footer_table"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

type Props<T> = {
  data: T[];
  title: string;
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  globalFilterPlaceholder?: string;
  createName?: string;
  handleCreate?: () => void;
  showDeleted?: boolean;
  setShowDeleted?: (val: boolean) => void;
}

export function DynamicTable<T>({
  data,
  title,
  columns,
  isLoading,
  pageCount,
  pagination,
  onPaginationChange,
  globalFilterPlaceholder = "Search...",
  handleCreate,
  createName = "Crear",
  showDeleted,
  setShowDeleted
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
      sorting,
      columnVisibility,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <div className="space-y-4 p-4">
      {title && <h1 className="text-2xl font-semibold">{title}</h1>}

      <div className="flex justify-between mb-4">
        <Input
          placeholder={globalFilterPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        {handleCreate && <Button onClick={handleCreate}>{createName}</Button>}
      </div>

      <div className="flex justify-between mb-4">
        <ColumnVisibilityToggle
          columns={columns}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />

        {typeof showDeleted !== 'undefined' && setShowDeleted && (
          <div className="flex items-center space-x-2">
            <Switch
              checked={showDeleted}
              onCheckedChange={(val) => setShowDeleted(val)}
              id="show-deleted"
            />
            <Label htmlFor="show-deleted">
              {showDeleted ? "Mostrando eliminados" : "Mostrando activos"}
            </Label>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="w-full overflow-auto relative">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    const isSortable = header.column.getCanSort()
                    return (
                      <TableHead
                        key={header.id}
                        onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                        className={isSortable ? 'cursor-pointer select-none' : ''}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && <ArrowUp className="inline ml-1 w-3 h-3" />}
                        {header.column.getIsSorted() === 'desc' && <ArrowDown className="inline ml-1 w-3 h-3" />}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">Cargando...</TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">Sin resultados</TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {isLoading && (
            <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Loader2 className="animate-spin w-4 h-4" />
                Cargando datos...
              </div>
            </div>
          )}

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
    </div>
  )
}
