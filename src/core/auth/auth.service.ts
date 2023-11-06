import * as bcrypt from "bcrypt";

import { UserService } from "../users/users.service";
import { RegisterFormValues } from "@/validations/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export * as AuthService from "./auth.service";

export const loginWithCredentials = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const user = await UserService.getUserByEmail(email);
  if (!user || user.password === null) return null;

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) return null;
  return user;
};

export const register = async (data: RegisterFormValues) => {
  const { email, password } = data;
  const user = await UserService.getUserByEmail(email);
  if (user) {
    throw new Error("Email already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await db
    .insert(users)
    .values({ ...data, password: hashedPassword })
    .returning();

  return newUser;
};
