"use server";

import { AuthService } from "@/core/auth/auth.service";
import { CardsService } from "@/core/cards/cards.service";
import { AddCard, AddCardSchema } from "@/core/cards/cards.validation";
import { guardedAction } from "@/lib/safe-action";
import { handleErrorsInServerAction } from "@/utils/errorHandlers";
import { revalidatePath } from "next/cache";

export const addCardAction = guardedAction(
  AddCardSchema,
  async (data: AddCard, { user }) => {
    await CardsService.addCard({ ...data, userId: user.id });
    revalidatePath(`/app/decks/${data.deckId}`);
  }
);
