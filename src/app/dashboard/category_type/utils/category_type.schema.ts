import { z } from "zod";

export const categoryTypeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "Máximo 100 caracteres"),
  description: z.string().max(255, "Máximo 255 caracteres"),
  category_id: z.string().uuid(),
});

export type CategoryTypeSchema = z.infer<typeof categoryTypeSchema>;
