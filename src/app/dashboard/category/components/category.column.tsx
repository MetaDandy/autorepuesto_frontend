import { ColumnDef } from "@tanstack/react-table";
import { Category } from "../utils/category";
import { TableActionMenu } from "@/components/table/table_action_menu";

export const CategoryColumns = (
  showDeleted: boolean,
  handleEditCategory: (category: Category) => void,
  handleDeleteCategory: (id: string) => void,
  handleRestore: (id: string) => void,
  handleHardDelete: (id: string) => void,
): ColumnDef<Category>[] => [
    {
      accessorKey: 'name',
      header: 'Nombre'
    },
    {
      accessorKey: 'description',
      header: 'Descripción'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const category = row.original
        const actions = !showDeleted
          ? [
            {
              label: "Editar",
              onClick: () => handleEditCategory(category),
            },
            {
              label: "Eliminar",
              onClick: () => handleDeleteCategory(category.id || ""),
            },
            {
              label: "Eliminar permanente",
              onClick: () => handleHardDelete(category.id || ""),
              variant: "destructive"
            }
          ]
          : [
            {
              label: "Restaurar",
              onClick: () => handleRestore(category.id || ""),
            },
            {
              label: "Eliminar permanente",
              onClick: () => handleHardDelete(category.id || ""),
              variant: "destructive"
            }
          ]

        return <TableActionMenu actions={actions} />
      }
    },
  ]