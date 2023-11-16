import { AuthService } from "@/core/auth/auth.service";
import { handleErrorsInServerAction } from "@/utils/errorHandlers";

export const getCurrentUser = async () => {
  try {
    const { user } = await AuthService.authenticate("get");
    return user;
  } catch (error) {
    handleErrorsInServerAction(error);
  }
};
