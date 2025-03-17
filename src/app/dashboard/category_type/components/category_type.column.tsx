import { ColumnDef } from "@tanstack/react-table";
import { CategoryType } from "../utils/category_type";
import { TableActionMenu } from "@/components/table/table_action_menu";

export const CategoryTypeColumn = (
  showDeleted: boolean,
  handleEditCategory: (id: string) => void,
  handleSoftDelete: (id: string) => void,
  handleRestore: (id: string) => void,
  handleHardDelete: (id: string) => void,
): ColumnDef<CategoryType>[] => [
    {
      accessorKey: 'name',
      header: 'Nombre'
    },
    {
      accessorKey: 'description',
      header: 'Descripción'
    },
    {
      accessorKey: 'category.name',
      header: 'Categoría'
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