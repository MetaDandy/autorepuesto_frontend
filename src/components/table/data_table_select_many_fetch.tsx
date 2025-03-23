'use client'

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSelectMany } from "./data_table_select_many";

interface DataTableSelectManyFetchProps<T> {
  queryKey: any;
  route: string;
  columns: ColumnDef<T, any>[];
  onAddSelected: (rows: T[]) => void;
  pageSize?: number;
  globalFilterPlaceholder?: string;
  rowIdAccessor?: (row: T) => string;
}

export function DataTableSelectManyFetch<T>({
  queryKey,
  route,
  columns,
  onAddSelected,
  pageSize = 5,
  globalFilterPlaceholder,
  rowIdAccessor,
}: DataTableSelectManyFetchProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const { data, isLoading, isFetching, dataUpdatedAt } = useFindAllQuery<T>({
    queryKey,
    route,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  return (
    <DataTableSelectMany<T>
      data={data?.data || []}
      columns={columns}
      onAddSelected={onAddSelected}
      isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
      pagination={pagination}
      onPaginationChange={setPagination}
      pageCount={data?.totalPages || 0}
      globalFilterPlaceholder={globalFilterPlaceholder}
      rowIdAccessor={rowIdAccessor}
    />
  );
}
