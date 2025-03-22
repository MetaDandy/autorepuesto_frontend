import { ColumnDef } from "@tanstack/react-table";
import { TableActionMenu } from "@/components/table/table_action_menu";
import { Characteristics } from "../utils/characteristics";

export const CharacteristicsColumn = (
  showDeleted: boolean,
  handleEdit: (characteristic: Characteristics) => void,
  handleSoftDelete: (id: string) => void,
  handleRestore: (id: string) => void,
  handleHardDelete: (id: string) => void,
): ColumnDef<Characteristics>[] => [
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
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const characteristic = row.original
        const actions = !showDeleted
          ? [
            {
              label: "Editar",
              onClick: () => characteristic.id && handleEdit(characteristic),
            },
            {
              label: "Eliminar",
              onClick: () => characteristic.id && handleSoftDelete(characteristic.id),
            },
            {
              label: "Eliminar permanente",
              onClick: () => characteristic.id && handleHardDelete(characteristic.id),
              variant: "destructive"
            }
          ]
          : [
            {
              label: "Restaurar",
              onClick: () => characteristic.id && handleRestore(characteristic.id),
            },
          ]

        return <TableActionMenu actions={actions} />
      }
    },
  ]