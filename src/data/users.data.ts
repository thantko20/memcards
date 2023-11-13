import { authenticate } from "@/utils";
import { handleErrorsInServerAction } from "@/utils/errorHandlers";

export const getCurrentUser = async () => {
  try {
    const { user } = await authenticate("get");
    return user;
  } catch (error) {
    handleErrorsInServerAction(error);
  }
};
