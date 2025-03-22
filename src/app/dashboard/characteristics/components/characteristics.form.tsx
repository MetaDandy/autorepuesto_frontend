'use client';

import { useForm } from "react-hook-form";
import { Characteristics } from "../utils/characteristics";
import { CharacteristicSchema, characteristicShcema } from "../utils/characteristics.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCharacteristicsMutations } from "../utils/use_characteristics_mutations";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form/form_input_field";
import { Button } from "@/components/ui/button";
import { ColorPickerFormField } from "@/components/form/color_picker_form_field";
import { SwitchFormField } from "@/components/form/switch_form_field";

export const CharacteristicsForm = ({ characteristic, refetch }: { characteristic?: Characteristics, refetch: () => void }) => {
  const { mutationCreate, mutationUpdate } = useCharacteristicsMutations(refetch);

  const form = useForm<CharacteristicSchema>({
    resolver: zodResolver(characteristicShcema),
    defaultValues: {
      code: '',
      color: '',
      is_complete: true,
      state: ''
    },
    values: {
      code: characteristic?.code || '',
      color: characteristic?.color || '',
      is_complete: characteristic?.is_complete || true,
      state: characteristic?.state || '',
    },
    mode: "onChange"
  });

  const onSubmit = async (data: CharacteristicSchema) => {
    if (characteristic?.id) mutationUpdate.mutate({ id: characteristic.id, data });
    else mutationCreate.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">
        <FormInputField
          control={form.control}
          name="code"
          label="Código"
          placeholder="Código de la característica"
          description="Ingrese un código descriptivo."
        />
        <ColorPickerFormField
          control={form.control}
          name="color"
          label="Color"
          description="Seleccione un color para la característica"
        />

        <FormInputField
          control={form.control}
          name="state"
          label="Estado"
          placeholder="Estado de la característica"
          description="Ingrese un estado."
        />

        <SwitchFormField
          control={form.control}
          label="Esta completo?"
          name="is_complete"
          description="Coloque si esta completo o no el producto"
        />

        <Button type="submit">
          {characteristic?.id ? "Actualizar" : "Crear"}
        </Button>
      </form>
    </Form>
  );
}