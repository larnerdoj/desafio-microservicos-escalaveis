/* import { count } from 'console';
import { date, integer, timestamp, pgTable, pgEnum, text } from 'drizzle-orm/pg-core';
import { email } from 'zod/v4';

export const customers = pgTable('customers', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    address: text().notNull(),
    state: text().notNull(),
    zipCode: text().notNull(),
    country: text().notNull(),
    dateOfBirth: date({ mode: 'date' }).notNull(),
    createdAt: timestamp().notNull().defaultNow().notNull(),
}); */