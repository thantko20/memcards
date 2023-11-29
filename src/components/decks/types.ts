import { Deck, User } from "@/lib/db/schema";

export type DeckWithAuthor = Deck & {
  author: User;
  isCurrentUserCard?: boolean;
  likesCount: number;
  hasLiked: boolean;
};
