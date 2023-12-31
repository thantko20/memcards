import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "./db";
import { InferSelectModel } from "drizzle-orm";
import { User, users } from "./db/schema";
import { google } from "@lucia-auth/oauth/providers";
import { UnauthenticatedException } from "@/utils";

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
      name: data.name,
      avatar: data.avatar
    };
  },
  getSessionAttributes: (data) => {
    return {
      sessionId: data.id,
      userId: data.userId
    };
  }
});

export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: "http://localhost:3000/api/auth/google/callback",
  scope: ["email"]
});

export type Auth = typeof auth;

export const authenticate = async (method: string, context: any) => {
  const authRequest = auth.handleRequest(method, context);
  const session = await authRequest.validate();
  if (!session) {
    throw new UnauthenticatedException();
  }

  return {
    session,
    user: session.user as User,
    authRequest
  };
};
