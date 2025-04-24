import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name',{ length:40 }),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
