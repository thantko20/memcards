import { DecksService } from "@/core/decks/decks.service";
import { getCurrentUser } from "./users.data";

export const getCurrentUserDecks = async () => {
  const user = await getCurrentUser();
  const decks = await DecksService.getDecks({ authorId: user?.id });
  return decks;
};
