import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "@/app/services/session"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"

export const getBlogs = async () => {
	return db.query.blogs.findMany()
}

export const addBlog = async (blog: {
	title: string
	author: string
	url: string
}) => {
	const user = await getCurrentUser()

	if (!user) throw new Error("Not logged in")
	const [newBlog] = await db
		.insert(blogs)
		.values({ ...blog, userId: user.id })
		.returning()

	return newBlog
}

export const getBlogById = async (id: number) => {
	return db.query.blogs.findFirst({ where: eq(blogs.id, id) })
}

export const addLikeById = async (id: number) => {
	const blog = await getBlogById(id)
	if (blog)
		await db
			.update(blogs)
			.set({ likes: blog.likes + 1 })
			.where(eq(blogs.id, id))
}

export const addToReadingList = async (blogId: number, userId: number) => {
	const [newReadingListEntry] = await db
		.insert(readingList)
		.values({ blogId, userId })
		.returning()
	return newReadingListEntry
}

export const isBlogInReadingList = async (blogId: number, userId: number) => {
	const entry = await db.query.readingList.findFirst({
		where: and(eq(readingList.blogId, blogId), eq(readingList.userId, userId)),
	})

	return !!entry
}

export const readReadingList = async (blogId: number, userId: number) => {
	const entry = await db.query.readingList.findFirst({
		where: and(eq(readingList.blogId, blogId), eq(readingList.userId, userId)),
	})

	if (entry) {
		await db
			.update(readingList)
			.set({ read: true })
			.where(eq(readingList.id, entry.id))
	}
}
