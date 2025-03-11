import { ColumnDef } from "@tanstack/react-table";
import { Permissions } from "./permissions";

export const PermissionColumns: ColumnDef<Permissions>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Actualizado',
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
  }
]