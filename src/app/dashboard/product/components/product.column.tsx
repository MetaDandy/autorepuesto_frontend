import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../utils/product";
import { TableActionMenu } from "@/components/table/table_action_menu";
import { ImageWithTitle } from "@/components/image_with_title";

export const ProductColumn = (
  showDeleted: boolean,
  handleEdit: (id: string) => void,
  handleSoftDelete: (id: string) => void,
  handleRestore: (id: string) => void,
  handleHardDelete: (id: string) => void,
  handleDeleteOneImage: (id: string) => void,
  handleView: (id: string) => void,
): ColumnDef<Product>[] => [
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
    {
      accessorKey: 'product_type.name',
      header: 'Tipo de producto'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const product = row.original
        const actions = !showDeleted
          ? [
            {
              label: "Ver producto",
              onClick: () => product.id && handleView(product?.id),
            },
            {
              label: "Editar",
              onClick: () => product.id && handleEdit(product?.id),
            },
            {
              label: "Eliminar",
              onClick: () => product.id && handleSoftDelete(product.id),
            },
            {
              label: "Eliminar la imagen",
              onClick: () => product.id && handleDeleteOneImage(product.id),
            },
            {
              label: "Eliminar permanente",
              onClick: () => product.id && handleHardDelete(product.id),
              variant: "destructive"
            }
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