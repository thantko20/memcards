import { z } from "zod";

export const CreateDeckSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional()
});

export type CreateDeck = z.infer<typeof CreateDeckSchema>;
