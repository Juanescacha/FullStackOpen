import { createBlog } from "@/app/actions/blogs"

export default function NewBlog() {
	return (
		<form action={createBlog} className="flex flex-col gap-2">
			<label className="space-x-4">
				<span>Title:</span>
				<input
					type="text"
					name="title"
					placeholder="Title"
					className="bg-zinc-900 rounded p-2"
					required
				/>
			</label>
			<label className="space-x-4">
				<span>Author:</span>
				<input
					type="text"
					name="author"
					placeholder="Author"
					className="bg-zinc-900 rounded p-2"
					required
				/>
			</label>
			<label className="space-x-4">
				<span>Url:</span>
				<input
					type="text"
					name="url"
					placeholder="Url"
					className="bg-zinc-900 rounded p-2"
					required
				/>
			</label>
			<button
				type="submit"
				className="max-w-fit bg-zinc-800 px-3 py-2 rounded-lg"
			>
				Create
			</button>
		</form>
	)
}
