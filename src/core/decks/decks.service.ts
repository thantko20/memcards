import { db } from "@/lib/db";
import { CreateDeck } from "./decks.validations";
import { deckLikes, decks, users } from "@/lib/db/schema";
import { SQL, and, eq, ilike, sql, asc, desc } from "drizzle-orm";
import { BadRequestException } from "@/utils";

export * as DecksService from "./decks.service";

const deckSelectObject = () => ({
  id: decks.id,
  name: decks.name,
  description: decks.description,
  authorId: decks.authorId,
  likesCount: sql<number>`COUNT(${deckLikes.deckId})`.mapWith(Number),
  author: users,
  createdAt: decks.createdAt,
  updatedAt: decks.updatedAt
});

export const createDeck = async ({
  userId,
  ...data
}: CreateDeck & { userId: string }) => {
  return await db.transaction(async (tx) => {
    const existingDeck = await tx.query.decks.findFirst({
      where: and(eq(decks.authorId, userId), ilike(decks.name, data.name))
    });
    if (existingDeck) {
      throw new BadRequestException(
        `Deck with name "${data.name}" is already in your collections`
      );
    }
    const [newDeck] = await tx
      .insert(decks)
      .values({ ...data, authorId: userId })
      .returning();

    await tx.insert(deckLikes).values({ deckId: newDeck.id, userId });

    return newDeck;
  });
};

export const getDecks = async (query?: {
  authorId?: string;
  currentUserId?: string;
}) => {
  const { authorId, currentUserId } = query || {};
  const where: SQL[] = [];
  if (authorId) {
    where.push(eq(decks.authorId, authorId));
  }
  const likesCount = sql<number>`COUNT(${deckLikes.deckId})`.mapWith(Number);
  const result = await db
    .select({
      id: decks.id,
      name: decks.name,
      description: decks.description,
      authorId: decks.authorId,
      likesCount,
      author: users,
      createdAt: decks.createdAt,
      updatedAt: decks.updatedAt,
      hasLiked: currentUserId
        ? // MAX function is used to prevent duplicated rows
          sql<boolean>`
      BOOL_OR(CASE WHEN ${deckLikes.userId} = ${currentUserId} THEN true ELSE false END)
      `.mapWith(Boolean)
        : sql<boolean>`FALSE`.mapWith(Boolean)
    })
    .from(decks)
    .leftJoin(deckLikes, eq(deckLikes.deckId, decks.id))
    .leftJoin(users, eq(users.id, decks.authorId))
    .groupBy(decks.id, users.id)
    .where(and(...where))
    .orderBy(desc(decks.createdAt));
  return result;
};

export const getDeckById = async ({
  id,
  currentUserId
}: {
  id: string;
  currentUserId?: string;
}) => {
  const likesCount = sql<number>`COUNT(${deckLikes.deckId})`.mapWith(Number);
  const [result] = await db
    .select({
      id: decks.id,
      name: decks.name,
      description: decks.description,
      authorId: decks.authorId,
      likesCount,
      author: users,
      createdAt: decks.createdAt,
      updatedAt: decks.updatedAt,
      hasLiked: currentUserId
        ? // MAX function is used to prevent duplicated rows
          sql<boolean>`
    BOOL_OR(CASE WHEN ${deckLikes.userId} = ${currentUserId} THEN true ELSE false END)
    `.mapWith(Boolean)
        : sql<boolean>`FALSE`.mapWith(Boolean)
    })
    .from(decks)
    .leftJoin(deckLikes, eq(deckLikes.deckId, decks.id))
    .innerJoin(users, eq(users.id, decks.authorId))
    .groupBy(decks.id, users.id)
    .where(eq(decks.id, id));

  return result;
};

export const likeDeck = async ({
  deckId,
  userId
}: {
  deckId: string;
  userId: string;
}) => {
  const existingLike = await db.query.deckLikes.findFirst({
    where: and(eq(deckLikes.deckId, deckId), eq(deckLikes.userId, userId))
  });
  if (existingLike) {
    await db
      .delete(deckLikes)
      .where(eq(deckLikes.id, existingLike.id))
      .returning();
    return existingLike;
  }

  const [result] = await db
    .insert(deckLikes)
    .values({ deckId, userId })
    .returning();

  return result;
};
