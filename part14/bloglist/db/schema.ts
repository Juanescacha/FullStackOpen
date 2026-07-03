import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	author: text("author").notNull(),
	url: text("url").notNull(),
	likes: integer("likes").default(0).notNull(),
	userId: integer("user_id").references(() => users.id),
})

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: text("username").unique().notNull(),
	name: text("name").notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
	blogs: many(blogs),
}))

export const blogsRelations = relations(blogs, ({ one }) => ({
	user: one(users, {
		fields: [blogs.userId],
		references: [users.id],
	}),
}))
