"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addToReadingList, readReadingList } from "@/app/services/blogs"
import { getReadingLists } from "@/app/services/readingLists"
import { getCurrentUser } from "@/app/services/session"
import { auth } from "@/auth"

export const addBlogToReadingList = async (formData: FormData) => {
	const user = await getCurrentUser()
	if (!user) redirect("/login")

	const blogId = Number(formData.get("blogId"))

	await addToReadingList(blogId, user.id)
	revalidatePath(`/blogs/${blogId}`)
	revalidatePath("/blogs")
}

export const getReadingListBlogs = async () => {
	const user = await getCurrentUser()
	if (!user) return []

	const list = await getReadingLists(String(user.id))
	return list
		.map((entry) => ({
			...entry.blog,
			read: entry.read,
		}))
		.filter(Boolean)
}

export const markAsRead = async (blogId: number) => {
	const user = await getCurrentUser()
	if (!user) redirect("/login")

	await readReadingList(blogId, user.id)
	revalidatePath("/me")
}
