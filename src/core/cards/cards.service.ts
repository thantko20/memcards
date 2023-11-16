import { db } from "@/lib/db";
import { AddCard } from "./cards.validation";
import { and, eq } from "drizzle-orm";
import { cards, decks } from "@/lib/db/schema";
import { BadRequestException } from "@/utils";

export * as CardsService from "./cards.service";

export const addCard = async ({
  deckId,
  userId,
  ...data
}: AddCard & { userId: string }) => {
  const deck = await db.query.decks.findFirst({
    where: and(eq(decks.id, deckId), eq(decks.authorId, userId))
  });

  if (!deck) {
    throw new BadRequestException("Deck not found");
  }

  const newCard = await db
    .insert(cards)
    .values({ ...data, deckId })
    .returning();
  return newCard;
};

export const getCards = async ({ deckId }: { deckId: string }) => {
  return await db.query.cards.findMany({
    where: eq(cards.deckId, deckId)
  });
};
