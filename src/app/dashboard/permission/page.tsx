'use client';

import { ColumnDef, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Permissions } from "./permissions";
import { useState } from "react";
import { FindAll } from "@/types/find_all";
import { useQuery } from '@tanstack/react-query';
import { DynamicTable } from "@/components/dynamic_table";
import { API_ROUTES } from "@/lib/api.routes";
import { useAuth } from "@/hooks/use_auth";

export default function PermissionPage() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const { token } = useAuth();
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const columns: ColumnDef<Permissions>[] = [
        {
            accessorKey: 'name',
            header: 'Nombre',
        },
        {
            accessorKey: 'code',
            header: 'Código',
        },
        {
            accessorKey: 'createdAt',
            header: 'Creado',
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
        },
        {
            accessorKey: 'updatedAt',
            header: 'Actualizado',
            cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
        }
    ]

    const { data, isLoading } = useQuery<FindAll<Permissions>>({
        queryKey: ['permissions', pagination.pageIndex, pagination.pageSize],
        queryFn: async (): Promise<FindAll<Permissions>> => {
            const page = pagination.pageIndex + 1
            const limit = pagination.pageSize
            const res = await fetch(`${API_ROUTES.FIND_ALL_PERMISSIONS}?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!res.ok) throw new Error("Error al obtener permisos")
            return res.json()
        },
        gcTime: 10 * 60 * 1000,
    });

    const totalPages = Math.ceil((data?.totalCount || 0) / pagination.pageSize);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Permisos</h1>

            <DynamicTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                pageCount={totalPages}
                pagination={pagination}
                onPaginationChange={setPagination}
                sorting={sorting}
                onSortingChange={setSorting}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
            />
        </div>
    )
}