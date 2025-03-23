import { ColumnDef } from "@tanstack/react-table";
import { IncomeNote } from "../utils/income_note";
import { Button } from "@/components/ui/button";

export const IncomeNoteColumn = (
  handleView: (id: string) => void,
): ColumnDef<IncomeNote>[] => [
    {
      accessorKey: 'code',
      header: 'Código'
    },
    {
      accessorKey: 'description',
      header: 'Descripción'
    },
    {
      accessorKey: 'total',
      header: 'Total'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <Button
          onClick={()=> handleView(row.original?.id || '')}
          variant="ghost"
        >
          Ver los detalles
        </Button>
      )
    },
  ]