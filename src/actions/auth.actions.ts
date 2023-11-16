"use server";

import { AuthService } from "@/core/auth/auth.service";
import { BadRequestException, UnauthenticatedException } from "@/utils";
import {
  LoginFormValues,
  LoginSchema,
  RegisterFormValues,
  RegisterSchema
} from "@/core/auth/auth.validation";
import { redirect } from "next/navigation";
import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import {
  ServerActionState,
  handleErrorsInServerAction
} from "@/utils/errorHandlers";

export const registerAction = async (formData: RegisterFormValues) => {
  try {
    const result = RegisterSchema.safeParse(formData);

    if (!result.success)
      throw new BadRequestException(
        "Validation errors",
        result.error.flatten().formErrors
      );

    const { session } = await AuthService.register(result.data);
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);
    redirect("/login");
  } catch (error) {
    return handleErrorsInServerAction(error);
  }
};

export const signInWithCredentialsAction = async (
  formData: LoginFormValues
) => {
  try {
    const result = LoginSchema.safeParse(formData);
    if (!result.success)
      throw new BadRequestException(
        "Validation errors",
        result.error.flatten().formErrors
      );
    const { session } = await AuthService.loginWithCredentials(result.data);
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);
    redirect("/app");
  } catch (error) {
    return handleErrorsInServerAction(error);
  }
};

export const signOutAction = async () => {
  try {
    const { session, authRequest } = await AuthService.authenticate("post");
    if (!session) {
      throw new UnauthenticatedException("You are not authenticated");
    }
    await auth.invalidateSession(session?.sessionId ?? "");
    authRequest.setSession(null);
    redirect("/login");
  } catch (error) {
    handleErrorsInServerAction(error);
  }
};

export const checkIfEmailExistsAction = async (theEmail: string) => {
  try {
    const { emailExists } = await AuthService.checkIfEmailExists(theEmail);
    if (emailExists) {
      return { data: true, status: "success" as const };
    }
    redirect(`/register?email=${theEmail}`);
  } catch (error) {
    handleErrorsInServerAction(error);
  }
};
