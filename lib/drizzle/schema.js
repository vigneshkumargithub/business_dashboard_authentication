// import { pgTable, varchar, uuid, text } from 'drizzle-orm/pg-core';

// export const businesses = pgTable('businesses', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   name: varchar('name', { length: 100 }),
//   owner_id: uuid('owner_id').notNull(),
//   description: text('description'),
// });



// lib/drizzle/schema.js
import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const businesses = pgTable('businesses', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  owner_id: uuid('owner_id').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
