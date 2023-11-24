import { Deck, User } from "@/lib/db/schema";

export type DeckListItem = Deck & {
  likes: number;
  author: Pick<User, "id" | "username" | "name" | "avatar">;
};

export const mapToDeckListItem = (
  item: Deck & {
    authorName: string;
    username: string;
    authorAvatar: string | null;
    likes: number;
  }
): DeckListItem => {
  return {
    id: item.id,
    name: item.name,
    authorId: item.authorId,
    author: {
      id: item.authorId,
      name: item.authorName,
      username: item.username,
      avatar: item.authorAvatar
    },
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    description: item.description,
    likes: item.likes
  };
};
