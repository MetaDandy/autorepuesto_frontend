'use client';

import useAppStore from "@/lib/store";
import { ProductType } from "../utils/product_type";
import { useProductTypeMutations } from "../utils/use_product_type_mutations";
import { useForm } from "react-hook-form";
import { productTypeSchema, ProductTypeSchema } from "../utils/product_type.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormCard } from "@/components/form/form_card";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/form/form_input_field";
import { DataTableSelectOneFetch } from "@/components/table/data_table_select_one_fetch";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { basicColumnGenerator } from "@/lib/basic_column_generator";

export const ProductTypeForm = ({ product_type }: { product_type?: ProductType }) => {
  const { setLockScreen } = useAppStore();
  const { mutationCreate, mutationUpdate } = useProductTypeMutations();

  const form = useForm<ProductTypeSchema>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      description: '',
      name: '',
      category_type_id: ''
    },
    values: {
      name: product_type?.name || '',
      description: product_type?.description || '',
      category_type_id: product_type?.category_type.id || '',
    },
    mode: "onChange"
  });

  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(
    product_type?.category_type?.name ?? null
  );

  const onSubmit = async (data: ProductTypeSchema) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: `${product_type?.id ? 'Editando' : 'Creando'} el tipo de producto`,
    });

    if (product_type?.id) mutationUpdate.mutate({ id: product_type.id, data });
    else mutationCreate.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">
        <FormCard
          title={product_type?.id ? "Editar Tipo de Producto" : "Crear Tipo de Producto"}
          description="Complete la información para el tipo de producto."
          footer={
            <Button type="submit">
              {product_type?.id ? "Actualizar" : "Crear"}
            </Button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInputField
              control={form.control}
              name="name"
              label="Nombre"
              placeholder="Nombre del tipo de producto"
              description="Ingrese un nombre descriptivo."
            />
            <FormInputField
              control={form.control}
              name="description"
              label="Descripción"
              placeholder="Descripción del tipo de producto"
              description="Ingrese una descripción opcional."
            />
          </div>

          <FormField
            control={form.control}
            name="category_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                {selectedCategoryName && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Categoría seleccionada: <strong>{selectedCategoryName}</strong>
                  </div>
                )}
                <DataTableSelectOneFetch<ProductType>
                  queryKey={[QUERY_KEY.PRODUCT_TYPE, { showDeleted: false }]}
                  route={API_ROUTES.CATEGORY_TYPE}
                  columns={basicColumnGenerator<ProductType>(["name", "description"])}
                  selectedId={field.value}
                  onSelect={(row) => {
                    field.onChange(row.id);
                    setSelectedCategoryName(row.name);
                  }}
                  globalFilterPlaceholder="Buscar categoría..."
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
