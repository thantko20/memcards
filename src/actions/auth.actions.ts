"use server";

import { AuthService } from "@/core/auth/auth.service";
import { LoginSchema, RegisterSchema } from "@/core/auth/auth.validation";
import { redirect } from "next/navigation";
import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import { action, guardedAction } from "@/lib/safe-action";
import { z } from "zod";

export const registerAction = action(RegisterSchema, async (data) => {
  const { session } = await AuthService.register(data);
  const authRequest = auth.handleRequest("POST", context);
  authRequest.setSession(session);
  redirect("/login");
});

export const signInWithCredentialsAction = action(LoginSchema, async (data) => {
  const { session } = await AuthService.loginWithCredentials(data);
  const authRequest = auth.handleRequest("POST", context);
  authRequest.setSession(session);
  redirect("/app");
});

export const signOutAction = guardedAction(
  z.undefined(),
  async (_, { session, authRequest }) => {
    await auth.invalidateSession(session.sessionId);
    authRequest.setSession(null);
    redirect("/login");
  }
);

export const checkIfEmailExistsAction = action(
  z.string().email(),
  async (theEmail) => {
    const { emailExists } = await AuthService.checkIfEmailExists(theEmail);
    if (emailExists) {
      return true;
    }
    redirect(`/register?email=${theEmail}`);
  }
);
