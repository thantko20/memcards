import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  bigint,
  pgEnum,
  unique
} from "drizzle-orm/pg-core";

export const accountCompletenessEnum = pgEnum("account_completeness", [
  "incomplete",
  "completed"
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  username: varchar("username", { length: 100 }).unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  avatar: varchar("avatar", { length: 300 }),
  accountCompleteness: accountCompletenessEnum("account_completeness").default(
    "incomplete"
  ),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
});

export type User = InferSelectModel<typeof users>;

export const session = pgTable("user_sessions", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  activeExpires: bigint("active_expires", {
    mode: "number"
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number"
  }).notNull()
});

export type DbSession = InferSelectModel<typeof session>;

export const key = pgTable("user_keys", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  hashedPassword: varchar("hashed_password", { length: 255 })
});

export const decks = pgTable("decks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
});

export const deckRelations = relations(decks, ({ one, many }) => ({
  author: one(users, {
    fields: [decks.authorId],
    references: [users.id]
  }),
  deckLikes: many(deckLikes)
}));

export type Deck = InferSelectModel<typeof decks>;

export const deckLikes = pgTable(
  "decks_likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    deckId: uuid("deck_id")
      .notNull()
      .references(() => decks.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id)
  },
  (self) => ({
    unq1: unique().on(self.deckId, self.userId)
  })
);

export const deckLikesRelations = relations(deckLikes, ({ one }) => ({
  deck: one(decks, {
    fields: [deckLikes.deckId],
    references: [decks.id]
  }),
  user: one(users, {
    fields: [deckLikes.userId],
    references: [users.id]
  })
}));

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
