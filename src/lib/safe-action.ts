import { createSafeActionClient } from "next-safe-action";
import { authenticate } from "./lucia";
import * as context from "next/headers";
import { BaseException } from "@/utils";

const handleReturnedServerError = (e: unknown): { serverError: string } => {
  if (e instanceof BaseException) {
    return { serverError: e.message };
  }
  return { serverError: "Unknown Error" };
};

export const action = createSafeActionClient({ handleReturnedServerError });

export const guardedAction = createSafeActionClient({
  async middleware() {
    // authenticate automatically throws error if not authenticated
    const { user, session, authRequest } = await authenticate("post", context);
    return { user, session, authRequest };
  },
  handleReturnedServerError
});
