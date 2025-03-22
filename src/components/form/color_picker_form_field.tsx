'use client';

import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

type ColorPickerFormFieldProps<T extends FieldValues> = {
  control: any;
  name: Path<T>;
  label: string;
  description?: string;
};

export function ColorPickerFormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: ColorPickerFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={field.value}
                onChange={field.onChange}
                className="w-12 h-10 p-0 border rounded-md cursor-pointer"
              />
              <span className="text-sm text-muted-foreground">{field.value}</span>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
