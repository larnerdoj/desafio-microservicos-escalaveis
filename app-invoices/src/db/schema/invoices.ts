import { integer, timestamp } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { pgEnum, text } from 'drizzle-orm/pg-core';

export const invoices = pgTable('invoices', {
    id: text().primaryKey(),
    orderId: text().notNull(),
    createdAt: timestamp().notNull().defaultNow().notNull(),
});