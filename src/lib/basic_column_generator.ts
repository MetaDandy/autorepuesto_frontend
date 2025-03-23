import { ColumnDef } from "@tanstack/react-table"

/**
 * Genera columnas básicas a partir de una lista de campos.
 * @param fields Campos del objeto T a mostrar en la tabla.
 */
export function basicColumnGenerator<T>(fields: (keyof T)[]): ColumnDef<T>[] {
  return fields.map((field) => ({
    accessorKey: field as string,
    header: capitalizeHeader(field.toString()),
  }))
}

/**
 * Capitaliza y convierte snake_case o camelCase a un header legible
 * Ej: "created_at" → "Created At"
 */
export function capitalizeHeader(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1') // camelCase → space
    .replace(/_/g, ' ')         // snake_case → space
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}
