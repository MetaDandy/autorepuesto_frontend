'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { API_ROUTES } from "@/lib/api.routes";
import { QUERY_KEY } from "@/lib/query_key";
import useAppStore from "@/lib/store";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { CategoryType } from "./utils/category_type";
import { DynamicTable } from "@/components/table/dynamic_table";
import { CategoryTypeColumn } from "./components/category_type.column";
import { useRouter } from "next/navigation";
import { useCategoryTypeMutations } from "./utils/use_category_type_mutations";
import { Button } from "@/components/ui/button";

export default function CategoryTypePage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showDeleted, setShowDeleted] = useState(false);
  const router = useRouter();
  const { setLockScreen, setAlert } = useAppStore();
  const { data, isFetching, isLoading, dataUpdatedAt, refetch } = useFindAllQuery<CategoryType>({
    queryKey: [QUERY_KEY.CATEGORY, { showDeleted }],
    route: showDeleted ? API_ROUTES.CATEGORY_TYPE_FIND_ALL_SOFT : API_ROUTES.CATEGORY_TYPE,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const { handleRestore, handleSoftDelete, mutationHardDelete } = useCategoryTypeMutations(refetch);

  const totalPages = Math.ceil((data?.totalCount || 0) / pagination.pageSize);

  const handleHardDelete = async (id: string) => {
    setAlert({
      title: 'Eliminar el tipo de categoría permanentemente.',
      isOpen: true,
      description: '',
      btnCancel:
        <Button
          onClick={() => {
            setAlert(false);
            setLockScreen({
              isVisible: true,
              type: "loading",
              content: "Eliminando el tipo de categoría permanentemente",
            });

            mutationHardDelete.mutate(id);
          }}
          variant={"destructive"}
        >
          Eliminar
        </Button>,
      btnAction:
        <Button
          onClick={() => setAlert(false)}
        >
          Cancelar
        </Button>
    });
  };

  const columns = CategoryTypeColumn(
    showDeleted,
    (id: string) => router.push(`/dashboard/category_type/${id}/edit`),
    handleSoftDelete,
    handleRestore,
    handleHardDelete,
  );

  return (
    <div className="space-y-4">
      <DynamicTable
        title="Tipo de categorías"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
        pageCount={totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
        handleCreate={() => router.push("/dashboard/category_type/create")}
        createName="Crear tipo de categoría"
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
      />
    </div>
  );
}