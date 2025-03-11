'use client';

import { PaginationState } from "@tanstack/react-table";
import { Permissions } from "./permissions";
import { useState } from "react";
import { DynamicTable } from "@/components/table/dynamic_table";
import { API_ROUTES } from "@/lib/api.routes";
import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { PermissionColumns } from "./permission.column";

export default function PermissionPage() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const { data, isFetching, isLoading, dataUpdatedAt } = useFindAllQuery<Permissions>({
        queryKey: 'permissions',
        route: API_ROUTES.FIND_ALL_PERMISSIONS,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
    });

    const totalPages = Math.ceil((data?.totalCount || 0) / pagination.pageSize);

    return (
        <div className="">
            <DynamicTable
                title="Permisos"
                columns={PermissionColumns}
                data={data?.data || []}
                isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
                pageCount={totalPages}
                pagination={pagination}
                onPaginationChange={setPagination}
            />
        </div>
    )
}