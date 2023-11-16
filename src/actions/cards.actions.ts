"use server";

import { AuthService } from "@/core/auth/auth.service";
import { CardsService } from "@/core/cards/cards.service";
import { AddCard } from "@/core/cards/cards.validation";
import { ActionReturnType } from "@/hooks/useActionForm";
import {
  ServerActionError,
  handleErrorsInServerAction
} from "@/utils/errorHandlers";
import { revalidatePath } from "next/cache";

export const addCardAction = async (data: AddCard) => {
  try {
    const { user } = await AuthService.authenticate("POST");

    await CardsService.addCard({ ...data, userId: user.id });
    revalidatePath(`/app/decks/${data.deckId}`);
    return {
      data: "hello",
      status: "success" as const
    };
  } catch (error) {
    return handleErrorsInServerAction(error);
  }
};
