import { ColumnDef } from "@tanstack/react-table";
import { Category } from "./category";

export const CategoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  }
]