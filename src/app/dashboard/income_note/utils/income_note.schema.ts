import { z } from "zod";

export const incomeNoteSchema = z.object({
  description: z.string(),
  details: z.array(z.object({
    deposit_product_id: z.string().uuid(),
    quantity: z.number(),
    total: z.number()
  }))
}).strict();

export type IncomeNoteSchema = z.infer<typeof incomeNoteSchema>;