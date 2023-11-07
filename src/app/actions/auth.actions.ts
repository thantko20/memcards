"use server";

import { AuthService } from "@/core/auth/auth.service";
import { signIn, signOut } from "@/lib/auth";
import { isNextRedirectError } from "@/utils";
import {
  LoginFormValues,
  LoginSchema,
  RegisterFormValues,
  RegisterSchema
} from "@/validations/auth";
import { redirect } from "next/navigation";

export const registerAction = async (
  _prevState: { message: string } | null | undefined,
  formData: RegisterFormValues
) => {
  try {
    const result = RegisterSchema.safeParse(formData);

    if (!result.success) return { message: "Validation Errors" };

    await AuthService.register(result.data);
    redirect("/login");
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    throw error;
  }
};

export const signInWithCredentialsAction = async (
  _prevState: { message: string } | null | undefined,
  formData: LoginFormValues
) => {
  try {
    const result = LoginSchema.safeParse(formData);
    if (!result.success) return { message: "Validation Errors" };
    await signIn("credentials", result.data);
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return { message: "Invalid Credentials" };
    }
    if (isNextRedirectError(error)) {
      throw error;
    }
    console.log(error);
    return { message: "Unknow error" };
  }
};

export const signOutAction = async () => {
  await signOut();
};
