import { relations } from "drizzle-orm"
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	author: text("author").notNull(),
	url: text("url").notNull(),
	likes: integer("likes").default(0).notNull(),
	userId: integer("user_id").references(() => users.id, {
		onDelete: "cascade",
	}),
})

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: text("username").unique().notNull(),
	name: text("name").notNull(),
	passwordHash: text("password_hash").notNull().default(""),
	token: text("token"),
})

export const readingList = pgTable("reading_list", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	blogId: integer("blog_id")
		.references(() => blogs.id, { onDelete: "cascade" })
		.notNull(),
	read: boolean("read").default(false),
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

export const readingListRelations = relations(readingList, ({ one }) => ({
	blog: one(blogs, {
		fields: [readingList.blogId],
		references: [blogs.id],
	}),
}))
