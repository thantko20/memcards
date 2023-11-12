import { UserService } from "@/core/users/users.service";
import { auth } from "@/lib/lucia";
import { handleErrorsInServerAction } from "@/utils/errorHandlers";
import * as context from "next/headers";

export const getCurrentUser = async () => {
  try {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();

    const user = await UserService.getUserById(session.user.id);

    return user;
  } catch (error) {
    handleErrorsInServerAction(error);
  }
};
