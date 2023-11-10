"use server";

import { AuthService } from "@/core/auth/auth.service";
import { isNextRedirectError } from "@/utils";
import {
  LoginFormValues,
  LoginSchema,
  RegisterFormValues,
  RegisterSchema
} from "@/core/auth/auth.validation";
import { redirect } from "next/navigation";
import { auth } from "@/lib/lucia";
import * as context from "next/headers";

export const registerAction = async (
  _prevState: { message: string } | null | undefined,
  formData: RegisterFormValues
) => {
  try {
    const result = RegisterSchema.safeParse(formData);

    if (!result.success) return { message: "Validation Errors" };

    const { session } = await AuthService.register(result.data);
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);
    redirect("/login");
  } catch (error) {
    if (isNextRedirectError(error)) throw error;
    return { message: (error as Error).message };
  }
};

export const signInWithCredentialsAction = async (
  _prevState: { message: string } | null | undefined,
  formData: LoginFormValues
) => {
  try {
    const result = LoginSchema.safeParse(formData);
    if (!result.success) return { message: "Validation Errors" };
    const { session } = await AuthService.loginWithCredentials(result.data);
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);
    redirect("/");
  } catch (error) {
    if (isNextRedirectError(error)) {
      throw error;
    }
    return { message: (error as Error).message };
  }
};

export const signOutAction = async () => {
  const authRequest = auth.handleRequest("POST", context);
  const session = await authRequest.validate();
  if (!session) {
    throw new Error("Cannot sign out");
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  redirect("/login");
};
