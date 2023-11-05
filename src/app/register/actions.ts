import { z } from "zod";

export const register = (prevState: any, formData: FormData) => {
  const result = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    username: z.string().min(1)
  });

  if (!result) return prevState;
};
