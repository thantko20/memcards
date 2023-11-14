import { z } from "zod";

export const CreateDeckSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  description: z.string().min(1).or(z.literal("")).optional()
});

export type CreateDeck = z.infer<typeof CreateDeckSchema>;
