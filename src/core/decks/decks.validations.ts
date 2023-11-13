import { z } from "zod";

export const CreateDeckSchema = z.object({
  name: z.string(),
  description: z.string().optional()
});

export type CreateDeck = z.infer<typeof CreateDeckSchema>;
