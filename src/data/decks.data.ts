import { AuthService } from "@/core/auth/auth.service";
import { DecksService } from "@/core/decks/decks.service";

export const getCurrentUserDecks = async () => {
  const { user } = await AuthService.authenticate("get");
  const decks = await DecksService.getDecks({ authorId: user.id });
  return decks;
};
