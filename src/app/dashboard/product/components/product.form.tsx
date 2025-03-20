'use client';

import useAppStore from "@/lib/store";
import { Product } from "../utils/product";
import { useProductMutations } from "../utils/use_product_mutations";
import { useForm } from "react-hook-form";
import { productSchema, ProductSchema } from "../utils/product.schema";
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
import { ProductType } from "../../product_type/utils/product_type";
import { ImageUploadField } from "@/components/form/image_upload_field";

export const ProductForm = ({ product }: { product?: Product }) => {
  const { setLockScreen } = useAppStore();
  const { mutationCreate, mutationUpdate } = useProductMutations();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      description: '',
      name: '',
      code: '',
      image: '',
      price: 0,
      technology: '',
      product_type_id: ''
    },
    values: {
      name: product?.name || '',
      description: product?.description || '',
      code: product?.code || '',
      image: product?.image || '',
      price: Number(product?.price) || 0,
      technology: product?.technology || '',
      product_type_id: product?.product_type.id || '',
    },
    mode: "onChange"
  });

  const [selectedName, setSelectedName] = useState<string | null>(
    product?.product_type?.name ?? null
  );

  const onSubmit = async (data: ProductSchema) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: `${product?.id ? 'Editando' : 'Creando'} el producto`,
    });

    console.log('Datos en el on submit', data);

    if (product?.id) mutationUpdate.mutate({ id: product.id, data });
    else mutationCreate.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">
        <FormCard
          title={product?.id ? "Editar Tipo de Producto" : "Crear Tipo de Producto"}
          description="Complete la información para el tipo de producto."
          footer={
            <Button type="submit">
              {product?.id ? "Actualizar" : "Crear"}
            </Button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInputField
              control={form.control}
              name="name"
              label="Nombre"
              placeholder="Nombre del producto"
              description="Ingrese un nombre descriptivo."
            />
            <FormInputField
              control={form.control}
              name="description"
              label="Descripción"
              placeholder="Descripción del producto"
              description="Ingrese una descripción."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInputField
              control={form.control}
              name="price"
              label="Precio"
              placeholder="Precio del producto"
              description="Ingrese un precio."
            />
            <FormInputField
              control={form.control}
              name="technology"
              label="Tecnología"
              placeholder="Tecnología del producto"
              description="Ingrese una tecnología."
            />
          </div>

          <FormInputField
            control={form.control}
            name="code"
            label="Código"
            placeholder="Código del producto"
            description="Ingrese un código."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {product?.image && (
              <div className="space-y-2">
                <FormLabel className="block text-sm font-medium text-muted-foreground">
                  Imagen actual
                </FormLabel>
                <div className="w-full rounded-md border border-muted p-2 bg-muted/20">
                  <img
                    src={product.image}
                    alt="Imagen actual"
                    className="w-full h-auto max-h-60 object-contain rounded"
                  />
                </div>
              </div>
            )}

            <ImageUploadField
              control={form.control}
              label={product?.image ? 'Nueva imagen (opcional)' : 'Imagen'}
            />
          </div>


          <FormField
            control={form.control}
            name="product_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                {selectedName && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Tipo de producto seleccionadp: <strong>{selectedName}</strong>
                  </div>
                )}
                <DataTableSelectOneFetch<ProductType>
                  queryKey={[QUERY_KEY.PRODUCT, { showDeleted: false }]}
                  route={API_ROUTES.PRODUCT_TYPE}
                  columns={basicColumnGenerator<ProductType>(["name", "description"])}
                  selectedId={field.value}
                  onSelect={(row) => {
                    field.onChange(row.id);
                    setSelectedName(row.name);
                  }}
                  globalFilterPlaceholder="Buscar producto..."
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