'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { API_ROUTES } from "@/lib/api.routes";
import { QUERY_KEY } from "@/lib/query_key";
import useAppStore from "@/lib/store";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "./utils/product";
import { useProductMutations } from "./utils/use_product_mutations";
import { Button } from "@/components/ui/button";
import { ProductColumn } from "./components/product.column";
import { DynamicTable } from "@/components/table/dynamic_table";

export default function ProductPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showDeleted, setShowDeleted] = useState(false);
  const router = useRouter();
  const { setLockScreen, setAlert } = useAppStore();
  const { data, isFetching, isLoading, dataUpdatedAt, refetch } = useFindAllQuery<Product>({
    queryKey: [QUERY_KEY.PRODUCT, { showDeleted }],
    route: showDeleted ? API_ROUTES.PRODUCT_FIND_ALL_SOFT : API_ROUTES.PRODUCT,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const { mutationRestore, mutationSoftDelete, mutationHardDelete, mutationDeleteOneImage } = useProductMutations(refetch);

  const handleHardDelete = async (id: string) => {
    setAlert({
      title: 'Eliminar el producto permanentemente.',
      isOpen: true,
      description: '',
      btnCancel:
        <Button
          onClick={() => {
            setAlert(false);
            setLockScreen({
              isVisible: true,
              type: "loading",
              content: "Eliminando el producto permanentemente",
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

  const columns = ProductColumn(
    showDeleted,
    (id: string) => router.push(`/dashboard/product/${id}/edit`),
    (id: string)=> mutationSoftDelete.mutate(id),
    (id: string)=> mutationRestore.mutate(id),
    handleHardDelete,
    (id: string)=> mutationDeleteOneImage.mutate(id),
    (id: string) => router.push(`/dashboard/product/${id}/view`),
  );

  return (
    <div className="space-y-4">
      <DynamicTable
        title="Producto"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
        pageCount={data?.totalPages || 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        handleCreate={() => router.push("/dashboard/product/create")}
        createName="Crear producto"
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
      />
    </div>
  );
}