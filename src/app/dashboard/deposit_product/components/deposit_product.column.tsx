import { ColumnDef } from "@tanstack/react-table";
import { TableActionMenu } from "@/components/table/table_action_menu";
import { DepositProduct } from "../utils/deposit_product";
import { ImageWithTitle } from "@/components/image_with_title";

export const DepositProductColumn = (
  showDeleted: boolean,
  handleSoftDelete: (id: string) => void,
  handleRestore: (id: string) => void,
  // handleView: (id: string) => void,
): ColumnDef<DepositProduct>[] => [
    {
      header: 'Producto',
      cell: ({ row }) => (
        <ImageWithTitle
          title={row.original.product?.name || ''}
          src={row.original.product?.image}
        />
      )
    },
    {
      accessorKey: 'stock',
      header: 'Stock'
    },
    {
      accessorKey: 'deposit.place',
      header: 'Deposito'
    },
    {
      accessorKey: 'characteristic.code',
      header: 'Características'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const product = row.original
        const actions = !showDeleted
          ? [
            // {
            //   label: "Ver producto",
            //   onClick: () => product.id && handleView(product?.id),
            // },
            {
              label: "Eliminar",
              onClick: () => product.id && handleSoftDelete(product.id),
            },
          ]
          : [
            {
              label: "Restaurar",
              onClick: () => {
                console.log(product.id);
                product.id && handleRestore(product.id)
              },
            },
          ]

        return <TableActionMenu actions={actions} />
      }
    },
  ]