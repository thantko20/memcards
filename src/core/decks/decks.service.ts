import { db } from "@/lib/db";
import { CreateDeck } from "./decks.validations";
import { decks } from "@/lib/db/schema";
import { SQL, and, eq, ilike } from "drizzle-orm";
import { BadRequestException } from "@/utils";

export * as DecksService from "./decks.service";

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

export const getDecks = async ({ authorId }: { authorId?: string }) => {
  const where: SQL[] = [];
  if (authorId) {
    where.push(eq(decks.authorId, authorId));
  }
  const result = await db.query.decks.findMany({
    where: and(...where),
    with: {
      author: true
    }
  });
  return result;
};

export const getDeckById = async (id: string) => {
  const result = await db.query.decks.findFirst({
    where: eq(decks.id, id),
    with: {
      author: true
    }
  });

  return result;
};
