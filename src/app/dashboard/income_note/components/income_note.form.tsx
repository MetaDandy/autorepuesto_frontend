'use client';

import useAppStore from "@/lib/store";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormCard } from "@/components/form/form_card";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/form/form_input_field";
import { DataTableSelectManyFetch } from "@/components/table/data_table_select_many_fetch";

import { incomeNoteSchema, IncomeNoteSchema } from "../utils/income_note.schema";
import { IncomeNote } from "../utils/income_note";
import { useMutation } from "@tanstack/react-query";
import { FetchHelper } from "@/lib/fetch_helper";
import { useAuth } from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { DepositProduct } from "../../deposit_product/utils/deposit_product";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { DetailsEditableTable } from "@/components/form/details_editable_table_field";
import { DepositProductSelectedColumn } from "./deposit_product_selected_column";
import { useState } from "react";
import { ImageWithTitle } from "@/components/image_with_title";

export const IncomeNoteForm = () => {
  const { setLockScreen, showToast } = useAppStore();
  const { token } = useAuth();
  const router = useRouter();
  const [detailsDisplay, setDetailsDisplay] = useState<Record<string, {
    product_name: string;
    product_image?: string;
    deposit_name: string;
    characteristics_code: string;
  }>>({});
  

  const form = useForm<IncomeNoteSchema>({
    resolver: zodResolver(incomeNoteSchema),
    defaultValues: {
      description: '',
      details: [],
    },
    mode: "onChange"
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details"
  });

  const mutationCreate = useMutation<IncomeNote, Error, IncomeNoteSchema>({
    mutationFn: async (data) => {
      return await FetchHelper<IncomeNote>({
        token: token ?? '',
        baseUrl: API_ROUTES.INCOME_NOTE,
        data,
      });
    },
    onSuccess: () => {
      setLockScreen(false);
      router.push("/dashboard/income_note");
      showToast("Nota de ingreso creada", "Se creó correctamente", "success");
    },
    onError: (error) => {
      setLockScreen(false);
      showToast(
        'La nota de ingreso no se pudo crear.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const onSubmit = async (data: IncomeNote) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: 'Creando la nota de ingreso',
    });

    console.log('Datos en el onSubmit', data);
    mutationCreate.mutate(data);
  };

  // Evita duplicados al agregar
  const handleAddDetail = (product: DepositProduct) => {
    const alreadyExists = fields.some((item) => item.deposit_product_id === product.id);
    if (!alreadyExists) {
      append({
        deposit_product_id: product.id || '',
        quantity: 1,
        total: 0,
      });
      console.log(product);

      setDetailsDisplay((prev) => ({
        ...prev,
        [(product?.id) as string]: {
          product_name: product?.product?.name || '',
          product_image: product?.product?.image || '',
          deposit_name: product?.deposit?.place || '',
          characteristics_code: product?.characteristic?.code || '',
        },
      }));
    }
  };

  {form.formState.errors && (
    <pre className="text-red-500 text-sm">
      {JSON.stringify(form.formState.errors, null, 2)}
    </pre>
  )}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">
        <FormCard
          title='Crear nota de ingreso'
          description="Complete la información para la nota de ingreso."
          footer={<Button type="submit">Crear nota de ingreso</Button>}
        >
          <FormInputField
            control={form.control}
            label="Descripción"
            name="description"
            description="Ingrese una descripción"
          />
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Seleccionar depósito-productos</h4>
            <DataTableSelectManyFetch<DepositProduct>
              queryKey={[QUERY_KEY.DEPOSIT_PRODUCT, { showDeleted: false }]}
              route={API_ROUTES.DEPOSIT_PRODUCT}
              columns={DepositProductSelectedColumn}
              onAddSelected={(rows) => {
                rows.forEach(handleAddDetail);
              }}
              globalFilterPlaceholder="Buscar depósito-producto..."
            />

            <DetailsEditableTable<{
              deposit_product_id: string;
              quantity: number;
              total: number;
              deposit_product: DepositProduct
            }>
              fields={fields}
              register={form.register}
              remove={remove}

              renderRowLabel={(item) => {
                const data = detailsDisplay[item.deposit_product_id];
                return (
                  <ImageWithTitle
                    title={data.product_name}
                    src={data.product_image}
                  />
                );
              }}
              renderExtraColumns={(item) => {
                const data = detailsDisplay[item.deposit_product_id];
                return (
                  <div className="text-xs text-muted-foreground">
                    <p>{data?.deposit_name}</p>
                    <p>{data?.characteristics_code}</p>
                  </div>
                );
              }}
            />
          </div>
        </FormCard>

      </form>
    </Form>
  );
};
