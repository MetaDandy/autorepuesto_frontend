'use client'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ColumnDef, VisibilityState } from '@tanstack/react-table'

interface ColumnVisibilityToggleProps<TData> {
  columns: ColumnDef<TData, any>[];
  columnVisibility: VisibilityState
  onColumnVisibilityChange: (updater: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => void
}

export function ColumnVisibilityToggle<TData>({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
}: ColumnVisibilityToggleProps<TData>) {

  function getColumnId<T>(column: ColumnDef<T, any>): string | undefined {
    if ('id' in column && column.id) return column.id
    if ('accessorKey' in column && typeof column.accessorKey === 'string') return column.accessorKey
    return undefined
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mb-4">Columnas visibles</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {columns.map((column) => {
          const columnId = getColumnId(column);
          if (!columnId) return null
          return (
            <DropdownMenuCheckboxItem
              key={columnId}
              checked={columnVisibility[columnId] !== false}
              onCheckedChange={(value) =>
                onColumnVisibilityChange((prev) => ({
                  ...prev,
                  [columnId]: value,
                }))
              }
            >
              {typeof column.header === 'string'
                ? column.header
                : typeof columnId === 'string'
                ? columnId
                : 'Columna'}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
