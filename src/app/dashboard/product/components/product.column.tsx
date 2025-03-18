import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../utils/product";
import { TableActionMenu } from "@/components/table/table_action_menu";

export const ProductColumn = (
  showDeleted: boolean,
  handleEdit: (id: string) => void,
  handleSoftDelete: (id: string) => void,
  handleRestore: (id: string) => void,
  handleHardDelete: (id: string) => void,
): ColumnDef<Product>[] => [
    {
      accessorKey: 'name',
      header: 'Nombre'
    },
    {
      header: 'Imagen',
      cell: ({ row }) => (
        <img src={row.original.image} />
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
              label: "Editar",
              onClick: () => handleEdit(product?.id || ''),
            },
            {
              label: "Eliminar",
              onClick: () => handleSoftDelete(product.id || ""),
            },
            {
              label: "Eliminar permanente",
              onClick: () => handleHardDelete(product.id || ""),
              variant: "destructive"
            }
          ]
          : [
            {
              label: "Restaurar",
              onClick: () => handleRestore(product.id || ""),
            },
            {
              label: "Eliminar permanente",
              onClick: () => handleHardDelete(product.id || ""),
              variant: "destructive"
            }
          ]

        return <TableActionMenu actions={actions} />
      }
    },
  ]