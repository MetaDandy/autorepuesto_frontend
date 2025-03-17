'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import useAppStore from "@/lib/store";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductType } from "./utils/product_type";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { useProductTypeMutations } from "./utils/use_product_type_mutations";
import { Button } from "@/components/ui/button";
import { ProductTypeColumn } from "./components/product_type.column";
import { DynamicTable } from "@/components/table/dynamic_table";

export default function ProductTypePage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showDeleted, setShowDeleted] = useState(false);
  const router = useRouter();
  const { setLockScreen, setAlert } = useAppStore();
  const { data, isFetching, isLoading, dataUpdatedAt, refetch } = useFindAllQuery<ProductType>({
    queryKey: [QUERY_KEY.PRODUCT_TYPE, { showDeleted }],
    route: showDeleted ? API_ROUTES.PRODUCT_TYPE_FIND_ALL_SOFT : API_ROUTES.PRODUCT_TYPE,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const { handleRestore, handleSoftDelete, mutationHardDelete } = useProductTypeMutations(refetch);

  const totalPages = Math.ceil((data?.totalCount || 0) / pagination.pageSize);

  const handleHardDelete = async (id: string) => {
    setAlert({
      title: 'Eliminar el tipo de producto permanentemente.',
      isOpen: true,
      description: '',
      btnCancel:
        <Button
          onClick={() => {
            setAlert(false);
            setLockScreen({
              isVisible: true,
              type: "loading",
              content: "Eliminando el tipo de producto permanentemente",
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

  const columns = ProductTypeColumn(
    showDeleted,
    (id: string) => router.push(`/dashboard/product_type/${id}/edit`),
    handleSoftDelete,
    handleRestore,
    handleHardDelete,
  );

  return (
    <div className="space-y-4">
      <DynamicTable
        title="Tipo de producto"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
        pageCount={totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
        handleCreate={() => router.push("/dashboard/product_type/create")}
        createName="Crear tipo de producto"
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
      />
    </div>
  );
}