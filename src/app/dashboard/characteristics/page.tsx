'use client';

import { useFindAllQuery } from "@/hooks/use_find_all_query";
import useAppStore from "@/lib/store";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Characteristics } from "./utils/characteristics";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { useCharacteristicsMutations } from "./utils/use_characteristics_mutations";
import { Button } from "@/components/ui/button";
import { CharacteristicsColumn } from "./components/characteristics.column";
import { CharacteristicsForm } from "./components/characteristics.form";
import { DynamicTable } from "@/components/table/dynamic_table";

export default function CharacteristicsPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [showDeleted, setShowDeleted] = useState(false);
  const { setAlert, setSheet } = useAppStore();
  const { data, isFetching, isLoading, dataUpdatedAt, refetch } = useFindAllQuery<Characteristics>({
    queryKey: [QUERY_KEY.CHARACTERISTICS, { showDeleted }],
    route: showDeleted ? API_ROUTES.CHARACTERISTICS_FIND_ALL_SOFT : API_ROUTES.CHARACTERISTICS,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const { mutationRestore, mutationSoftDelete, mutationHardDelete } = useCharacteristicsMutations(refetch);

  const handleHardDelete = async (id: string) => {
    setAlert({
      title: 'Eliminar la característica permanentemente.',
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

  const columns = CharacteristicsColumn(
    showDeleted,
    (characteristic: Characteristics) => {
      setSheet({
        title: 'Editar la característica',
        description: 'Ingrese los datos de la característica',
        content: <CharacteristicsForm characteristic={characteristic} refetch={refetch} />,
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
        title="Característica"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading || (isFetching && dataUpdatedAt === 0)}
        pageCount={data?.totalPages || 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        handleCreate={() => setSheet({
          title: 'Crear la característica',
          description: 'Ingrese los datos de la característica',
          content: <CharacteristicsForm refetch={refetch} />,
          isOpen: true,
          side: "right",
          btnAction: null,
          btnCancel: null,
        })}
        createName="Crear característica"
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
      />
    </div>
  );
}