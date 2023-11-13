import { DecksService } from "@/core/decks/decks.service";
import { authenticate } from "@/utils";

export const getCurrentUserDecks = async () => {
  const { user } = await authenticate("get");
  const decks = await DecksService.getDecks({ authorId: user.id });
  return decks;
};
