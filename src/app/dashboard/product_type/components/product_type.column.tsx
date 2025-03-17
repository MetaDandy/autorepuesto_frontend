import { ColumnDef } from "@tanstack/react-table";
import { TableActionMenu } from "@/components/table/table_action_menu";
import { ProductType } from "../utils/product_type";

export const ProductTypeColumn = (
  showDeleted: boolean,
  handleEditCategory: (id: string) => void,
  handleSoftDelete: (id: string) => void,
  handleRestore: (id: string) => void,
  handleHardDelete: (id: string) => void,
): ColumnDef<ProductType>[] => [
    {
      accessorKey: 'name',
      header: 'Nombre'
    },
    {
      accessorKey: 'description',
      header: 'Descripción'
    },
    {
      accessorKey: 'category_type.name',
      header: 'Tipo de categoría'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const category_type = row.original
        const actions = !showDeleted
          ? [
            {
              label: "Editar",
              onClick: () => handleEditCategory(category_type?.id || ''),
            },
            {
              label: "Eliminar",
              onClick: () => handleSoftDelete(category_type.id || ""),
            },
            {
              label: "Eliminar permanente",
              onClick: () => handleHardDelete(category_type.id || ""),
              variant: "destructive"
            }
          ]
          : [
            {
              label: "Restaurar",
              onClick: () => handleRestore(category_type.id || ""),
            },
            {
              label: "Eliminar permanente",
              onClick: () => handleHardDelete(category_type.id || ""),
              variant: "destructive"
            }
          ]

        return <TableActionMenu actions={actions} />
      }
    },
  ]