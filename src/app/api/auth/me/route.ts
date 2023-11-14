import { authenticate } from "@/utils";
import { handleErrorsInApi } from "@/utils/errorHandlers";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const { user } = await authenticate("GET", "cookies");
    return user;
  } catch (error) {
    return handleErrorsInApi(error);
  }
};
