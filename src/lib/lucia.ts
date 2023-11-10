import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "./db";
import { InferSelectModel } from "drizzle-orm";
import { users } from "./db/schema";

export const auth = lucia({
  env: "DEV",
  middleware: nextjs_future(),
  adapter: pg(pool, {
    user: "users",
    key: "user_keys",
    session: "user_sessions"
  }),
  sessionCookie: {
    expires: false
  },
  getUserAttributes: (data: InferSelectModel<typeof users>) => {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      name: data.name
    };
  }
});

export type Auth = typeof auth;
