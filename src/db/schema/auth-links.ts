import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const authLinks = pgTable("authLinks" , {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  code: text("code").notNull().unique(),
  userId: text("user_id").references(() => users.id).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  


});