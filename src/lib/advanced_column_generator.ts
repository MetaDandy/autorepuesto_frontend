import { ColumnDef } from "@tanstack/react-table"
import { capitalizeHeader } from "./basic_column_generator"

type FieldCustomization<T> = {
  [K in keyof T]?: {
    header?: string
    cell?: (row: T) => React.ReactNode
  }
}

export function advancedColumnGenerator<T>(
  fields: (keyof T)[],
  customizations?: FieldCustomization<T>
): ColumnDef<T>[] {
  return fields.map((field) => ({
    accessorKey: field as string,
    header: customizations?.[field]?.header ?? capitalizeHeader(field.toString()),
    cell: customizations?.[field]?.cell
      ? ({ row }) => customizations[field]?.cell?.(row.original)
      : undefined,
  }))
}
