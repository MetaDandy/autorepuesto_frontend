'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DepositProduct } from "./utils/deposit_product";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { useDepositProductMutations } from "./utils/use_deposit_product_mutations";
import { DepositProductColumn } from "./components/deposit_product.column";
import { DynamicTable } from "@/components/table/dynamic_table";

export default function DepositProductPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showDeleted, setShowDeleted] = useState(false);
  const router = useRouter();
  const { data, isFetching, isLoading, dataUpdatedAt, refetch } = useFindAllQuery<DepositProduct>({
    queryKey: [QUERY_KEY.DEPOSIT_PRODUCT, { showDeleted }],
    route: showDeleted ? API_ROUTES.DEPOSIT_PRODUCT_FIND_ALL_SOFT : API_ROUTES.DEPOSIT_PRODUCT,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const { mutationRestore, mutationSoftDelete } = useDepositProductMutations(refetch);

  const columns = DepositProductColumn(
    showDeleted,
    (id: string)=> mutationSoftDelete.mutate(id),
    (id: string)=> mutationRestore.mutate(id),
    // (id: string) => router.push(`/dashboard/deposit_product/${id}/view`),
  );

  return (
    <div className="space-y-4">
      <DynamicTable
        title="Depósito-Producto"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
        pageCount={data?.totalPages || 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        handleCreate={() => router.push("/dashboard/deposit_product/create")}
        createName="Crear depósito-producto"
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
      />
    </div>
  );
}