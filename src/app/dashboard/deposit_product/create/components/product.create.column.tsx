import { ColumnDef } from "@tanstack/react-table";
import { ImageWithTitle } from "@/components/image_with_title";
import { Product } from "@/app/dashboard/product/utils/product";

export const ProductCreateColumn: ColumnDef<Product>[] = [
  {
    header: 'Nombre',
    cell: ({ row }) => (
      <ImageWithTitle
        title={row.original.name}
        src={row.original.image}
      />
    )
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  },
  {
    accessorKey: 'code',
    header: 'Código'
  },
  {
    accessorKey: 'price',
    header: 'Precio'
  },
  {
    accessorKey: 'technology',
    header: 'Tecnología'
  },
]