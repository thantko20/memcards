import { auth } from "@/lib/lucia";
import { UnauthenticatedException } from ".";
import { DbSession, User } from "@/lib/db/schema";
import * as context from "next/headers";

/**
 * This method is tightly coupled to NextJS's headers.
 * Might refactor into a separate class
 *
 * @param {'GET' | 'POST' | 'get' | 'post'} method - request method
 * @param {'bearer' | 'cookies'} type
 */
export const authenticate = async (
  method: "GET" | "POST" | "get" | "post",
  type: "bearer" | "cookies" = "cookies"
) => {
  const authRequest = auth.handleRequest(method, context);
  let session: (DbSession & { user: User; sessionId: string }) | undefined;
  if (type === "cookies") {
    session = await authRequest.validate();
  } else {
    session = await authRequest.validateBearerToken();
  }

  if (!session) {
    throw new UnauthenticatedException("You are not authenticated");
  }

  const user: User = await auth.getUser(session?.user?.id);
  return { user, session, authRequest };
};
