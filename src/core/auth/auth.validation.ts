import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name is required")
    .max(50),
  username: z.string().min(2, "Username is required").max(50),
  email: z.string().email("Invalid Email"),
  password: z
    .string({ required_error: "Please fill out this field" })
    .min(6, "Password must have at least 6 characters")
    .max(16, "Cannot be more than 16 characters")
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const LoginSchema = RegisterSchema.pick({ email: true, password: true });
export type LoginFormValues = z.infer<typeof LoginSchema>;

export const EmailExistsFormSchema = RegisterSchema.pick({ email: true });
export type EmailExistsFormValues = z.infer<typeof EmailExistsFormSchema>;
