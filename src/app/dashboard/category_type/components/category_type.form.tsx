'use client';

import useAppStore from "@/lib/store";
import { CategoryType } from "../utils/category_type";
import { useCategoryTypeMutations } from "../utils/use_category_type_mutations";
import { useForm } from "react-hook-form";
import { categoryTypeSchema, CategoryTypeSchema } from "../utils/category_type.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form/form_input_field";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DataTableSelectOneFetch } from "@/components/table/data_table_select_one_fetch";
import { Category } from "../../category/utils/category";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { basicColumnGenerator } from "@/lib/basic_column_generator";
import { useState } from "react";
import { FormCard } from "@/components/form/form_card";

export const CategoryTypeForm = ({ category_type }: { category_type?: CategoryType }) => {
  const { setLockScreen } = useAppStore();
  const { mutationCreate, mutationUpdate } = useCategoryTypeMutations();

  const form = useForm<CategoryTypeSchema>({
    resolver: zodResolver(categoryTypeSchema),
    defaultValues: {
      description: '',
      name: '',
      category_id: ''
    },
    values: {
      name: category_type?.name || '',
      description: category_type?.description || '',
      category_id: category_type?.category.id || '',
    },
    mode: "onChange"
  });

  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(
    category_type?.category?.name ?? null
  );

  const onSubmit = async (data: CategoryTypeSchema) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: `${category_type?.id ? 'Editando' : 'Creando'} el tipo de categoría`,
    });

    if (category_type?.id) mutationUpdate.mutate({ id: category_type.id, data });
    else mutationCreate.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">
        <FormCard
          title={category_type?.id ? "Editar Tipo de Categoría" : "Crear Tipo de Categoría"}
          description="Complete la información para el tipo de categoría."
          footer={
            <Button type="submit">
              {category_type?.id ? "Actualizar" : "Crear"}
            </Button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInputField
              control={form.control}
              name="name"
              label="Nombre"
              placeholder="Nombre del tipo de categoría"
              description="Ingrese un nombre descriptivo."
            />
            <FormInputField
              control={form.control}
              name="description"
              label="Descripción"
              placeholder="Descripción del tipo de categoría"
              description="Ingrese una descripción opcional."
            />
          </div>

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                {selectedCategoryName && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Categoría seleccionada: <strong>{selectedCategoryName}</strong>
                  </div>
                )}
                <DataTableSelectOneFetch<Category>
                  queryKey={[QUERY_KEY.CATEGORY, { showDeleted: false }]}
                  route={API_ROUTES.CATEGORY}
                  columns={basicColumnGenerator<Category>(["name", "description"])}
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
