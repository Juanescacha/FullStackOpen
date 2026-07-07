"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, addLikeById } from "@/app/services/blogs"
import { auth } from "@/auth"

export const createBlog = async (
	prevState: { error: string },
	formData: FormData,
) => {
	const session = await auth()
	if (!session) redirect("/login")

	const blog = {
		title: formData.get("title") as string,
		author: formData.get("author") as string,
		url: formData.get("url") as string,
	}

	for (const [key, value] of Object.entries(blog)) {
		if (!value || value.length < 5) {
			return {
				error: `Blog ${key} must be at least 5 characters`,
				values: blog,
			}
		}
	}

	await addBlog(blog)
	revalidatePath("/blogs")
	redirect("/blogs")
}

export const addLike = async (formData: FormData) => {
	const id = Number(formData.get("id"))
	await addLikeById(id)
	revalidatePath(`/blogs/${id}`)
	revalidatePath("/blogs")
	redirect(`/blogs/${id}`)
}

export const filterBlog = async (formData: FormData) => {
	const filter = formData.get("filter") as string
	revalidatePath(`/blogs?filter=${filter}`)
	redirect(`/blogs?filter=${filter}`)
}
