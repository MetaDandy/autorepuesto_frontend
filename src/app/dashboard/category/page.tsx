'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { API_ROUTES } from "@/lib/api.routes";
import { QUERY_KEY } from "@/lib/query_key";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Category } from "./category";
import { DynamicTable } from "@/components/table/dynamic_table";
import { CategoryColumns } from "./category.column";

export default function CategoryPage() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const { data, isFetching, isLoading, dataUpdatedAt } = useFindAllQuery<Category>({
        queryKey: QUERY_KEY.CATEGORY,
        route: API_ROUTES.CATEGORY,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
    });

    const totalPages = Math.ceil((data?.totalCount || 0) / pagination.pageSize);

    return (
        <DynamicTable
            title="Categorias"
            columns={CategoryColumns}
            data={data?.data || []}
            isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
            pageCount={totalPages}
            pagination={pagination}
            onPaginationChange={setPagination}
        />
    )
}