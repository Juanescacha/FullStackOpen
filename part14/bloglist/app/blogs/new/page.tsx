"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

export default function NewBlog() {
	const initialState = {
		error: "",
		values: {
			title: "",
			author: "",
			url: "",
		},
		success: false,
	}

	const { showNotification } = useNotification()

	const [state, formAction] = useActionState(createBlog, initialState)
	const router = useRouter()

	useEffect(() => {
		if (state.success) {
			showNotification("blog created successfully")
			router.push("/blogs")
		}
	}, [state, showNotification, router])

	return (
		<form action={formAction} className="flex flex-col gap-2 mx-auto">
			<label className="flex items-center justify-between">
				<span>Title</span>
				<input
					type="text"
					name="title"
					placeholder="Title"
					className="bg-zinc-900 rounded p-2 w-3/4"
					defaultValue={state.values?.title}
					minLength={5}
					required
				/>
			</label>
			<label className="flex items-center justify-between">
				<span>Author</span>
				<input
					type="text"
					name="author"
					placeholder="Author"
					className="bg-zinc-900 rounded p-2 w-3/4"
					defaultValue={state.values?.author}
					minLength={5}
					required
				/>
			</label>
			<label className="flex items-center justify-between">
				<span>URL</span>
				<input
					type="text"
					name="url"
					placeholder="Url"
					className="bg-zinc-900 rounded p-2 w-3/4"
					defaultValue={state.values?.url}
					minLength={5}
					required
				/>
			</label>
			<button
				type="submit"
				className="max-w-fit bg-zinc-800 px-3 py-2 rounded-lg"
				data-testid="create-blog-button"
			>
				Create
			</button>
			{state.error && <p className="text-red-500">{state.error}</p>}
		</form>
	)
}
