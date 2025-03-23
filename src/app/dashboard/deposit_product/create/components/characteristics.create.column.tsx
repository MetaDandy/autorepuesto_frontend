import { Characteristics } from "@/app/dashboard/characteristics/utils/characteristics";
import { ColumnDef } from "@tanstack/react-table";

export const CharacteristicsCreateColumn: ColumnDef<Characteristics>[] = [
  {
    header: 'Código',
    accessorKey: 'code'
  },
  {
    accessorKey: "color",
    header: 'color',
    cell: ({ row }) => {
      const color = row.original.color;
      return (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-muted-foreground">{color}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "is_complete",
    header: 'Esta completo'
  },
  {
    accessorKey: "state",
    header: 'Estado'
  },
]