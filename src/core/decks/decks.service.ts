import { db } from "@/lib/db";
import { CreateDeck } from "./decks.validations";
import { deckLikes, decks, users } from "@/lib/db/schema";
import { SQL, and, eq, ilike, sql } from "drizzle-orm";
import { BadRequestException } from "@/utils";

export * as DecksService from "./decks.service";

const deckSelectObject = {
  id: decks.id,
  name: decks.name,
  description: decks.description,
  authorId: decks.authorId,
  likes: sql<number>`COUNT(${deckLikes.deckId})`.mapWith(Number),
  author: users,
  createdAt: decks.createdAt,
  updatedAt: decks.updatedAt
};

const deckQuery = db
  .select(deckSelectObject)
  .from(decks)
  .leftJoin(deckLikes, eq(deckLikes.deckId, decks.id))
  .leftJoin(users, eq(users.id, decks.authorId))
  .groupBy(decks.id, users.id);

export const createDeck = async ({
  userId,
  ...data
}: CreateDeck & { userId: string }) => {
  const existingDeck = await db.query.decks.findFirst({
    where: and(eq(decks.authorId, userId), ilike(decks.name, data.name))
  });
  if (existingDeck) {
    throw new BadRequestException(
      `Deck with name "${data.name}" is already in your collections`
    );
  }
  const [newDeck] = await db
    .insert(decks)
    .values({ ...data, authorId: userId })
    .returning();

  return newDeck;
};

export const getDecks = async (query?: { authorId?: string }) => {
  const { authorId } = query || {};
  const where: SQL[] = [];
  if (authorId) {
    where.push(eq(decks.authorId, authorId));
  }
  const result = await deckQuery.where(and(...where));
  return result;
};

export const getDeckById = async (id: string) => {
  const [result] = await deckQuery.where(eq(decks.id, id));

  return result;
};
