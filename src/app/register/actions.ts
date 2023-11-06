"use server";

import { AuthService } from "@/core/auth/auth.service";
import { RegisterFormValues, RegisterSchema } from "@/validations/auth";

export const registerAction = async (
  _prevState: { message: string } | null,
  formData: RegisterFormValues
) => {
  try {
    const result = RegisterSchema.safeParse(formData);

    if (!result.success) return { message: "Validation Errors" };

    await AuthService.register(result.data);

    return null;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "Unknown Error" };
  }
};
