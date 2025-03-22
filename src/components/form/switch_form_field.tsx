'use client';

import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Switch } from "../ui/switch";

type SwitchFormFieldProps<T extends FieldValues> = {
  control: any;
  name: Path<T>;
  label: string;
  description?: string;
};

export function SwitchFormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: SwitchFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
