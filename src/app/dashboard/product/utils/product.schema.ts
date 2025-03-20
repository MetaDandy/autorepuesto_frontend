import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  code: z.string(),
  technology: z.string(),
  price: z.coerce.number().nonnegative(),
  image: z.any().optional(),
  product_type_id: z.string().uuid(),
});

export type ProductSchema = z.infer<typeof productSchema>;