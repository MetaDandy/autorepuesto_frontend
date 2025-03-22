'use client';
import { useFindAllQuery } from "@/hooks/use_find_all_query";
import { API_ROUTES } from "@/lib/api.routes";
import { QUERY_KEY } from "@/lib/query_key";
import useAppStore from "@/lib/store";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Deposit } from "./utils/deposit";
import { useDepositMutations } from "./utils/use_deposit_mutations";
import { Button } from "@/components/ui/button";
import { DepositColumn } from "./components/deposit.column";
import { DepositForm } from "./components/deposit.form";
import { DynamicTable } from "@/components/table/dynamic_table";

export default function DepositPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showDeleted, setShowDeleted] = useState(false);
  const router = useRouter();
  const { setAlert, setSheet } = useAppStore();
  const { data, isFetching, isLoading, dataUpdatedAt, refetch } = useFindAllQuery<Deposit>({
    queryKey: [QUERY_KEY.DEPOSIT, { showDeleted }],
    route: showDeleted ? API_ROUTES.DEPOSIT_FIND_ALL_SOFT : API_ROUTES.DEPOSIT,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const { mutationRestore, mutationSoftDelete, mutationHardDelete } = useDepositMutations(refetch);

  const handleHardDelete = async (id: string) => {
    setAlert({
      title: 'Eliminar el depósito permanentemente.',
      isOpen: true,
      description: '',
      btnCancel:
        <Button
          onClick={() => {
            setAlert(false);

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

  const columns = DepositColumn(
    showDeleted,
    (deposit: Deposit) => {
      setSheet({
        title: 'Editar el depósito',
        description: 'Ingrese los datos del depósito',
        content: <DepositForm deposit={deposit} refetch={refetch} />,
        isOpen: true,
        side: "right",
        btnAction: null,
        btnCancel: null,
      });
    },
    (id: string) => mutationSoftDelete.mutate(id),
    (id: string) => mutationRestore.mutate(id),
    handleHardDelete,
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
        handleCreate={() => setSheet({
          title: 'Crear el depósito',
          description: 'Ingrese los datos del depósito',
          content: <DepositForm refetch={refetch} />,
          isOpen: true,
          side: "right",
          btnAction: null,
          btnCancel: null,
        })}
        createName="Crear producto"
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
      />
    </div>
  );
}