"use server";

import { DecksService } from "@/core/decks/decks.service";
import { CreateDeckSchema } from "@/core/decks/decks.validations";
import { guardedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
