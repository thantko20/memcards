import * as bcrypt from "bcrypt";

import { UserService } from "../users/users.service";
import { RegisterFormValues } from "@/validations/auth";

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
  const newUser = await UserService.createUser(data);
  return newUser;
};
