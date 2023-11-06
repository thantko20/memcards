import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name is required")
    .max(50),
  username: z.string().min(2, "Username is required").max(50),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6).max(16)
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
