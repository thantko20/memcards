import { DecksService } from "@/core/decks/decks.service";
import { data } from "@/utils/data-access";
import { z } from "zod";

export const getCurrentUserDecks = data(
  true,
  z.object({}),
  async (_, { user }) => {
    const decks = await DecksService.getDecks({
      authorId: user.id,
      currentUserId: user.id
    });
    return decks.map((deck) => ({ ...deck, isCurrentUserCard: true }));
  }
);

export const getPublicDecks = data(
  "guard_or_pass",
  z.object({}),
  async (_, { user }) => {
    const decks = await DecksService.getDecks({ currentUserId: user.id });
    return decks;
  }
);

export const getDeckById = data(
  "guard_or_pass",
  z.object({ id: z.string().uuid() }),
  async ({ id }, { user }) => {
    return await DecksService.getDeckById({ id, currentUserId: user?.id });
  }
);
