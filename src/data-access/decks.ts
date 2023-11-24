import { DecksService } from "@/core/decks/decks.service";
import { data } from "@/utils/data-access";
import { z } from "zod";

export const getCurrentUserDecks = data(
  true,
  z.object({}),
  async (_, { user }) => {
    const decks = await DecksService.getDecks({ authorId: user.id });
    return decks.map((deck) => ({ ...deck, isCurrentUserCard: true }));
  }
);

export const getPublicDecks = data(z.object({}), async () => {
  const decks = await DecksService.getDecks();
  return decks;
});

export const getDeckById = data(
  z.object({ id: z.string().uuid() }),
  async ({ id }) => {
    return await DecksService.getDeckById(id);
  }
);
