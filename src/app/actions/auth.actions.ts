"use server";

import { AuthService } from "@/core/auth/auth.service";
import { signIn } from "@/lib/auth";
import {
  LoginFormValues,
  LoginSchema,
  RegisterFormValues,
  RegisterSchema
} from "@/validations/auth";

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

export const signInWithCredentials = async (
  _prevState: { message: string } | null | undefined,
  formData: LoginFormValues
) => {
  try {
    const result = LoginSchema.safeParse(formData);
    if (!result.success) return { message: "Validation Errors" };
    await signIn("credentials", { ...result.data, redirect: true });
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return { message: "Invalid Credentials" };
    }
    console.log(error);
    return { message: "Unknown Error" };
  }
};
