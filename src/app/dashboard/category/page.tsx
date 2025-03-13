'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { API_ROUTES } from "@/lib/api.routes";
import { QUERY_KEY } from "@/lib/query_key";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Category } from "./utils/category";
import { DynamicTable } from "@/components/table/dynamic_table";
import { CategoryColumns } from "./components/category.column";
import useAppStore from "@/lib/store";
import { CategoryForm } from "./components/category.form";
import { useCategoryMutations } from "./utils/use_category_mutations";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const [showDeleted, setShowDeleted] = useState(false);
    const { setSheet, setModal, setLockScreen } = useAppStore();
    const { data, isFetching, isLoading, dataUpdatedAt, refetch } = useFindAllQuery<Category>({
        queryKey: [QUERY_KEY.CATEGORY, { showDeleted }],
        route: showDeleted ? API_ROUTES.CATEGORY_FIND_ALL_SOFT : API_ROUTES.CATEGORY,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
    });
    const { handleSoftDelete, handleRestore, mutationHardDelete } = useCategoryMutations(refetch);

    const totalPages = Math.ceil((data?.totalCount || 0) / pagination.pageSize);

    const handleCreateCategory = () => {
        setSheet({
            isOpen: true,
            title: `Crear una categoría`,
            description: 'Ingrese los datos de la categoría',
            btnAction: null,
            btnCancel: null,
            content: <CategoryForm refetch={refetch} />,
            side: "right",
        });
    }

    function handleEditCategory(category: Category) {
        console.log("handleEditCustomer", category);
        setSheet({
            isOpen: true,
            title: `Editar cliente ${category.name}`,
            description: "Modifique los datos de la categoría",
            content: <CategoryForm refetch={refetch} category={category} />,
            btnAction: null,
            btnCancel: null,
            side: "right",
        });
    }

    const handleHardDelete = async (id: string) => {
        setModal({
            title: 'Eliminar la categoría permanentemente.',
            isOpen: true,
            description: '',
            content: 'Una vez eliminado no se puede recuperar',
            btnAction:
                <Button
                    onClick={() => {
                        setLockScreen({
                            isVisible: true,
                            type: "loading",
                            content: "Eliminando la categoría permanentemente",
                        });

                        mutationHardDelete.mutate(id);
                    }}
                    variant={"destructive"}
                >
                    Eliminar
                </Button>,
            btnCancel:
                <Button
                    onClick={() => setModal(false)}
                >
                    Cancelar
                </Button>
        });

    };

    const columns = CategoryColumns(
        showDeleted,
        handleEditCategory,
        handleSoftDelete,
        handleRestore,
        handleHardDelete
    );

    return (
        <div className="space-y-4">
            <DynamicTable
                title="Categorias"
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
                pageCount={totalPages}
                pagination={pagination}
                onPaginationChange={setPagination}
                handleCreate={handleCreateCategory}
                createName="Crear Categoría"
                showDeleted={showDeleted}
                setShowDeleted={setShowDeleted}
            />
        </div>
    )
}