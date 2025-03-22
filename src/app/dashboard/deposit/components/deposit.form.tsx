'use client';

import { Deposit } from "../utils/deposit";
import { useDepositMutations } from "../utils/use_deposit_mutations";
import { useForm } from "react-hook-form";
import { depositSchema, DepositSchema } from "../utils/deposit.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/form/form_input_field";

export const DepositForm = ({ deposit, refetch }: { deposit?: Deposit, refetch: () => void }) => {
  const { mutationCreate, mutationUpdate } = useDepositMutations(refetch);

  const form = useForm<DepositSchema>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      code: '',
      place: ''
    },
    values: {
      code: deposit?.code || '',
      place: deposit?.place || ''
    },
    mode: "onChange"
  });

  const onSubmit = async (data: DepositSchema) => {
    if (deposit?.id) mutationUpdate.mutate({id: deposit.id, data});
    else mutationCreate.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-3">
            <FormInputField
              control={form.control}
              name="code"
              label="Código"
              placeholder="Nombre del depósito"
              description="Ingrese un código descriptivo."
            />
            <FormInputField
              control={form.control}
              name="place"
              label="Place"
              placeholder="Lugar del depósito"
              description="Ingrese un lugar."
            />

            <Button type="submit">
              {deposit?.id ? "Actualizar" : "Crear"}
            </Button>
      </form>
    </Form>
  );
}