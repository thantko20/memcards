import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { InferInsertModel, eq, or } from "drizzle-orm";
import * as bcrypt from "bcrypt";

export * as UserService from "./users.service";

export const getUserByEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
};

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username)
  });
};

export const createUser = async (user: InferInsertModel<typeof users>) => {
  const [existingUsername] = await db
    .select()
    .from(users)
    .where(eq(users.username, user.username));
  if (existingUsername) {
    throw new Error(`Username ${user.username} is already in use.`);
  }
  const [existingEmail] = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));
  if (existingEmail) {
    throw new Error(`Email is already taken.`);
  }

  const hashedPassword = user.password
    ? await bcrypt.hash(user.password, 12)
    : undefined;

  const [newUser] = await db
    .insert(users)
    .values({ ...user, password: hashedPassword })
    .returning();
  return newUser;
};

export const getUserById = async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      password: false
    }
  });

  return user;
};
