import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   name: varchar("name", { length: 100 }).notNull(),
//   username: varchar("username", { length: 100 }).notNull().unique(),
//   password: text("password")
// });

export const decks = pgTable("decks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
});

export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
  hint: varchar("hint", { length: 50 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deckId: uuid("deck_id")
    .notNull()
    .references(() => decks.id)
});
