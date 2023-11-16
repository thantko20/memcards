"use server";

import { AuthService } from "@/core/auth/auth.service";
import { DecksService } from "@/core/decks/decks.service";
import { CreateDeck, CreateDeckSchema } from "@/core/decks/decks.validations";
import { BadRequestException } from "@/utils";
import { handleErrorsInServerAction } from "@/utils/errorHandlers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createDeckAction = async (data: CreateDeck) => {
  try {
    const result = CreateDeckSchema.safeParse(data);
    if (!result.success)
      throw new BadRequestException(
        "Validation Error",
        result.error.flatten().formErrors
      );

    const { user } = await AuthService.authenticate("post");

    const newDeck = await DecksService.createDeck({ ...data, userId: user.id });
    revalidatePath("/app");
    redirect(`/app/decks/${newDeck.id}`);
  } catch (error) {
    return handleErrorsInServerAction(error);
  }
};
