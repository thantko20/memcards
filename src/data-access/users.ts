import { data } from "@/utils/data-access";
import { z } from "zod";

export const getCurrentUser = data(true, z.object({}), async (_, { user }) => {
  return user;
});
