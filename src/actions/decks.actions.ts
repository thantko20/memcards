"use server";

import { DecksService } from "@/core/decks/decks.service";
import { CreateDeck, CreateDeckSchema } from "@/core/decks/decks.validations";
import { BadRequestException, authenticate } from "@/utils";
import {
  ServerActionState,
  handleErrorsInServerAction
} from "@/utils/errorHandlers";
import { revalidatePath } from "next/cache";

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

    const { user } = await authenticate("post");

    await DecksService.createDeck({ ...data, userId: user.id });
    revalidatePath("/app");
  } catch (error) {
    return handleErrorsInServerAction(error);
  }
};
