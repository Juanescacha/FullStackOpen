"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, addLikeById, addToReadingList } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { auth } from "@/auth"

export const createBlog = async (
	prevState: {
		error: string
		values?: { title: string; author: string; url: string }
		success: boolean
	},
	formData: FormData,
) => {
	try {
		const session = await auth()
		const user = await getCurrentUser()
		if (!session || !user) redirect("/login")

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
					success: false,
				}
			}
		}

		const newBlog = await addBlog(blog)
		await addToReadingList(newBlog.id, user.id)
		revalidatePath("/blogs")
		revalidatePath(`/blogs/${newBlog.id}`)
		revalidatePath(`/me`)

		return {
			error: "",
			success: true,
		}
	} catch (error) {
		return {
			error: `An error occurred while creating the blog: ${error}`,
			success: false,
		}
	}
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
