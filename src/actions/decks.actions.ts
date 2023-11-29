"use server";

import { DecksService } from "@/core/decks/decks.service";
import { CreateDeckSchema } from "@/core/decks/decks.validations";
import { guardedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createDeckAction = guardedAction(
  CreateDeckSchema,
  async (data, { user }) => {
    const newDeck = await DecksService.createDeck({
      ...data,
      userId: user.id
    });
    revalidatePath("/app");
    return newDeck;
  }
);

export const likeDeck = guardedAction(
  z.object({ deckId: z.string().uuid() }),
  async ({ deckId }, { user }) => {
    await DecksService.likeDeck({
      deckId,
      userId: user.id
    });
    const deck = await DecksService.getDeckById({
      id: deckId,
      currentUserId: user.id
    });
    return { ...deck, isCurrentUserCard: user.id === deck.authorId };
  }
);
