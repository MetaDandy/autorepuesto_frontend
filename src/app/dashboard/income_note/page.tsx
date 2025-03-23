'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { DynamicTable } from "@/components/table/dynamic_table";
import { IncomeNote } from "./utils/income_note";
import { IncomeNoteColumn } from "./components/income_note.column";

export default function IncomeNotePage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const router = useRouter();
  const { data, isFetching, isLoading, dataUpdatedAt } = useFindAllQuery<IncomeNote>({
    queryKey: [QUERY_KEY.INCOME_NOTE, { showDeleted: false }],
    route: API_ROUTES.INCOME_NOTE,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const columns = IncomeNoteColumn(
    (id: string) => router.push(`/dashboard/income_note/${id}/view`),
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
        handleCreate={() => router.push("/dashboard/income_note/create")}
        createName="Crear depósito-producto"
      />
    </div>
  );
}