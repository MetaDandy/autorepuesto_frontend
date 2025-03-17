'use client'

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DynamicTable } from "./dynamic_table";

interface DynamicTableFetchProps<T> {
  queryKey: any
  route: string
  columns: ColumnDef<T>[]
  title: string
  showDeleted: boolean
  setShowDeleted: (val: boolean) => void
  handleCreate?: () => void
  pageSize?: number
  onRefetch?: (refetchFn: () => void) => void
}

export function DynamicTableFetch<T>({
  queryKey,
  route,
  columns,
  title,
  handleCreate,
  pageSize = 5,
  onRefetch,
}: DynamicTableFetchProps<T>) {
  const [showDeleted, setShowDeleted] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const {
    data,
    isLoading,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useFindAllQuery<T>({
    queryKey,
    route,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  })

  useEffect(() => {
    if (onRefetch) onRefetch(refetch)
  }, [refetch, onRefetch])

  const pageCount = Math.ceil((data?.totalCount || 0) / pagination.pageSize)

  return (
    <DynamicTable
      title={title}
      columns={columns}
      data={data?.data || []}
      isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      handleCreate={handleCreate}
      createName="Crear"
      showDeleted={showDeleted}
      setShowDeleted={setShowDeleted}
      globalFilterPlaceholder="Buscar..."
    />
  )
}
