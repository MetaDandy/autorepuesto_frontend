import { ColumnDef } from "@tanstack/react-table";
import { ImageWithTitle } from "@/components/image_with_title";
import { DepositProduct } from "../../deposit_product/utils/deposit_product";

export const DepositProductSelectedColumn: ColumnDef<DepositProduct>[] = [
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
  ]