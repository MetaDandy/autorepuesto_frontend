'use client'

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSelectOne } from "./data_table_select_one";

interface DataTableSelectOneFetchProps<T> {
  queryKey: any
  route: string
  columns: ColumnDef<T, any>[]
  selectedId: string | null
  onSelect: (row: T) => void
  pageSize?: number
  globalFilterPlaceholder?: string
}

export function DataTableSelectOneFetch<T>({
  queryKey,
  route,
  columns,
  selectedId,
  onSelect,
  pageSize = 5,
  globalFilterPlaceholder,
}: DataTableSelectOneFetchProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const { data, isLoading, isFetching, dataUpdatedAt } = useFindAllQuery<T>({
    queryKey,
    route,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  })

  const pageCount = Math.ceil((data?.totalCount || 0) / pagination.pageSize)

  return (
    <DataTableSelectOne<T>
      data={data?.data || []}
      isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
      selectedId={selectedId}
      onSelect={onSelect}
      columns={columns}
      pagination={pagination}
      onPaginationChange={setPagination}
      globalFilterPlaceholder={globalFilterPlaceholder}
      pageCount={pageCount}
    />
  )
}
