import { z } from "zod";

export const depositProductSchema = z.object({
  product_id: z.string().uuid(),
  deposit_id: z.string().uuid(),
  characteristic_id: z.string().uuid(),
});

export type DepositProductSchema = z.infer<typeof depositProductSchema>;