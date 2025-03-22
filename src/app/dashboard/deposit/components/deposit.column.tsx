import { ColumnDef } from "@tanstack/react-table";
import { TableActionMenu } from "@/components/table/table_action_menu";
import { Deposit } from "../utils/deposit";

export const DepositColumn = (
  showDeleted: boolean,
  handleEdit: (deposit: Deposit) => void,
  handleSoftDelete: (id: string) => void,
  handleRestore: (id: string) => void,
  handleHardDelete: (id: string) => void,
): ColumnDef<Deposit>[] => [
    {
      header: 'Código',
      accessorKey: 'code'
    },
    {
      accessorKey: "place",
      header: 'Lugar'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const deposit = row.original
        const actions = !showDeleted
          ? [
            {
              label: "Editar",
              onClick: () => deposit.id && handleEdit(deposit),
            },
            {
              label: "Eliminar",
              onClick: () => deposit.id && handleSoftDelete(deposit.id),
            },
            {
              label: "Eliminar permanente",
              onClick: () => deposit.id && handleHardDelete(deposit.id),
              variant: "destructive"
            }
          ]
          : [
            {
              label: "Restaurar",
              onClick: () => deposit.id && handleRestore(deposit.id),
            },
          ]

        return <TableActionMenu actions={actions} />
      }
    },
  ]