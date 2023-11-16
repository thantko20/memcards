"use server";

import { AuthService } from "@/core/auth/auth.service";
import { DecksService } from "@/core/decks/decks.service";
import { CreateDeck, CreateDeckSchema } from "@/core/decks/decks.validations";
import { BadRequestException } from "@/utils";
import {
  ServerActionState,
  handleErrorsInServerAction
} from "@/utils/errorHandlers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createDeckAction = async (
  _prevState: ServerActionState,
  data: CreateDeck
) => {
  try {
    const result = CreateDeckSchema.safeParse(data);
    if (!result.success)
      throw new BadRequestException(
        "Validation Error",
        result.error.flatten().formErrors
      );

    const { user } = await AuthService.authenticate("post");

    await DecksService.createDeck({ ...data, userId: user.id });
    revalidatePath("/app");
    redirect("/app");
  } catch (error) {
    return handleErrorsInServerAction(error);
  }
};
