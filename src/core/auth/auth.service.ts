import * as bcrypt from "bcrypt";
import crypto from "crypto";

import { UserService } from "../users/users.service";
import { RegisterFormValues } from "@/core/auth/auth.validation";
import { auth } from "@/lib/lucia";
import { InferSelectModel, eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { LuciaError } from "lucia";
import { BadRequestException } from "@/utils";
import { db } from "@/lib/db";

export * as AuthService from "./auth.service";

export const loginWithCredentials = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const user: any = await UserService.getUserByEmail(email);
  if (!user) throw new BadRequestException("Invalid credentials");

  try {
    const key = await auth.useKey("email", email, password);
    const user: InferSelectModel<typeof users> = await auth.getUser(key.userId);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    });
    return { user, session };
  } catch (error) {
    if (error instanceof LuciaError) {
      throw new BadRequestException("Invalid credentials");
    }
    throw error;
  }
};

export const register = async ({
  email,
  name,
  password,
  username
}: RegisterFormValues) => {
  const userWithEmail = await UserService.getUserByEmail(email);
  if (userWithEmail) {
    throw new Error("Email already exists");
  }
  const userWithUsername = await UserService.getUserByUsername(username);
  if (userWithUsername) {
    throw new Error("Username is already taken");
  }

  const user = (await auth.createUser({
    key: {
      providerId: "email",
      providerUserId: email.toLowerCase(),
      password
    },
    attributes: {
      email,
      name,
      username
    },
    userId: crypto.randomUUID()
  })) as InferSelectModel<typeof users>;
  return {
    user,
    session: await auth.createSession({ userId: user.id, attributes: {} })
  };
};

export const checkIfEmailExists = async (email: string) => {
  const [user] = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return {
    emailExists: !!user,
    email: user?.email ?? null
  };
};
