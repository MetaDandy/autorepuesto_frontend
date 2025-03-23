'use client';

import useAppStore from "@/lib/store";
import { useDepositProductMutations } from "../utils/use_deposit_product_mutations";
import { useForm } from "react-hook-form";
import { depositProductSchema, DepositProductSchema } from "../utils/deposit.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormCard } from "@/components/form/form_card";
import { Button } from "@/components/ui/button";
import { DataTableSelectOneFetch } from "@/components/table/data_table_select_one_fetch";
import { Product } from "../../product/utils/product";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { Characteristics } from "../../characteristics/utils/characteristics";
import { Deposit } from "../../deposit/utils/deposit";
import { DepositCreateColumn } from "../create/components/deposit.create.column";
import { CharacteristicsCreateColumn } from "../create/components/characteristics.create.column";
import { ProductCreateColumn } from "../create/components/product.create.column";

export const DepositProductForm = () => {
  const { setLockScreen } = useAppStore();
  const { mutationCreate } = useDepositProductMutations();

  const form = useForm<DepositProductSchema>({
    resolver: zodResolver(depositProductSchema),
    defaultValues: {
      characteristic_id: '',
      deposit_id: '',
      product_id: ''
    },
    mode: "onChange"
  });

  const [productName, setProductName] = useState<string>('');
  const [depositName, setDepositName] = useState<string>('');
  const [characteristicName, setCharacteristicName] = useState<string>('');

  const onSubmit = async (data: DepositProductSchema) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: 'Creando el depósito-producto',
    });

    console.log('Datos en el on submit', data);

    mutationCreate.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">
        <FormCard
          title='Crear el depósito-producto'
          description="Complete la información para el depósito-producto."
          footer={
            <Button type="submit">
              Crear
            </Button>
          }
        >
          <FormField
            control={form.control}
            name="product_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto</FormLabel>
                {productName && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Producto seleccionado: <strong>{productName}</strong>
                  </div>
                )}
                <DataTableSelectOneFetch<Product>
                  queryKey={[QUERY_KEY.PRODUCT, { showDeleted: false }]}
                  route={API_ROUTES.PRODUCT}
                  columns={ProductCreateColumn}
                  selectedId={field.value}
                  onSelect={(row) => {
                    field.onChange(row.id);
                    setProductName(row.name);
                  }}
                  globalFilterPlaceholder="Buscar producto..."
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="characteristic_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Características</FormLabel>
                {characteristicName && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Características seleccionadas: <strong>{characteristicName}</strong>
                  </div>
                )}
                <DataTableSelectOneFetch<Characteristics>
                  queryKey={[QUERY_KEY.CHARACTERISTICS, { showDeleted: false }]}
                  route={API_ROUTES.CHARACTERISTICS}
                  columns={CharacteristicsCreateColumn}
                  selectedId={field.value}
                  onSelect={(row) => {
                    field.onChange(row.id);
                    setCharacteristicName(row.code);
                  }}
                  globalFilterPlaceholder="Buscar características..."
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deposit_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depósito</FormLabel>
                {depositName && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Depósito seleccionado: <strong>{depositName}</strong>
                  </div>
                )}
                <DataTableSelectOneFetch<Deposit>
                  queryKey={[QUERY_KEY.DEPOSIT, { showDeleted: false }]}
                  route={API_ROUTES.DEPOSIT}
                  columns={DepositCreateColumn}
                  selectedId={field.value}
                  onSelect={(row) => {
                    field.onChange(row.id);
                    setDepositName(row.place);
                  }}
                  globalFilterPlaceholder="Buscar depósito..."
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormCard>
      </form>
    </Form>
  );
}