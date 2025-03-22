import { z } from "zod";

export const depositSchema = z.object({
  place: z.string().min(1),
  code: z.string().min(1),
});

export type DepositSchema = z.infer<typeof depositSchema>;