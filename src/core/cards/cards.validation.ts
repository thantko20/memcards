import { z } from "zod";

export const AddCardSchema = z.object({
  question: z.string().min(1).max(255),
  answer: z.string().min(1).max(255),
  hint: z.string().min(1).max(50),
  deckId: z.string().uuid()
});

export type AddCard = z.infer<typeof AddCardSchema>;
