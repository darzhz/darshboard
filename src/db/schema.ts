import { pgTable, serial, text, varchar, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name',{ length:40 }),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Widget store table - stores layouts for each user
export const widgetStore = pgTable('widget_store', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull().default('default'),
  layout: jsonb('layout').notNull(), 
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});