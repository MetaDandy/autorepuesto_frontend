'use client';

import useAppStore from "@/lib/store";
import { Category } from "../utils/category";
import { useForm } from "react-hook-form";
import { categorySchema, CategorySchema } from "../utils/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form/form_input_field";
import { Button } from "@/components/ui/button";
import { useCategoryMutations } from "../utils/use_category_mutations";

export const CategoryForm = ({ refetch, category }: { refetch: () => void, category?: Category }) => {
  const { setLockScreen, setSheet } = useAppStore();
  const { mutationCreate, mutationUpdate } = useCategoryMutations(refetch);

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      description: '',
      name: ''
    },
    values: {
      name: category?.name || '',
      description: category?.description || '',
    },
    mode: "onChange"
  });

  const onSubmit = async (data: CategorySchema) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Creando la categoría",
    });

    setSheet(false);

    if (category?.id) mutationUpdate.mutate({ id: category.id, data });
    else mutationCreate.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">

        <FormInputField
          control={form.control}
          name="name"
          label="Nombre de la categoría."
          placeholder="Nombre de la categoría."
          description="Ingrese un nombre."
        />
        <FormInputField
          control={form.control}
          name="description"
          label="Descripción de la categoría."
          placeholder="Descripción de la categoría."
          description="Ingrese una descripción."
        />
        <Button type="submit">
          {category?.id ? "Editar categoría" : "Crear Categoría"}
        </Button>
      </form>
    </Form>
  );
}