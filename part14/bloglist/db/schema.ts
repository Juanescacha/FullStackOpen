import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	author: text("author").notNull(),
	url: text("url").notNull(),
	likes: integer("likes").default(0).notNull(),
})
