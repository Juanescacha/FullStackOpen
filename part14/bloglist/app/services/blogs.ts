import { eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"

export const getBlogs = async () => {
	return db.query.blogs.findMany()
}

export const addBlog = async (blog: {
	title: string
	author: string
	url: string
}) => {
	return db.insert(blogs).values(blog)
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
