import { z } from "zod";

export const characteristicShcema = z.object({
  code: z.string().min(2),
  color: z.string().min(1),
  is_complete: z.boolean(),
  state: z.string().min(1)
});

export type CharacteristicSchema = z.infer<typeof characteristicShcema>;