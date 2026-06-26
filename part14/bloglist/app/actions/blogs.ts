"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, addLikeById } from "@/app/services/blogs"

export const createBlog = async (formData: FormData) => {
	const blog = {
		title: formData.get("title") as string,
		author: formData.get("author") as string,
		url: formData.get("url") as string,
	}
	addBlog(blog)
	revalidatePath("/blogs")
	redirect("/blogs")
}

export const addLike = async (formData: FormData) => {
	const id = Number(formData.get("id"))
	addLikeById(id)
	revalidatePath(`/blogs/${id}`)
	revalidatePath("/blogs")
}
