import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), //pwd ni utrohon based on how you would like to represent the ID but for now leave it as it.
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  age: integer().notNull(), 
  createdAt: timestamp("created_at").defaultNow(), 
  country: varchar({ length: 100 }).notNull(),
});
