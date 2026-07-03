import { notFound } from "next/navigation"
import { addLike } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"

export default async function Blog({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const blog = await getBlogById(Number(id))

	if (!blog) notFound()

	const { title, author, url, likes } = blog

	return (
		<div className="flex flex-col">
			<span>
				<strong>TITLE: </strong>
				{title}
			</span>
			<span>
				<strong>AUTHOR: </strong>
				{author}
			</span>
			<span>
				<strong>URL: </strong>
				{url}
			</span>
			<span>
				<strong>LIKES: </strong>
				{likes}
				<form action={addLike} className="inline">
					<input type="hidden" name="id" value={id} />
					<button
						type="submit"
						className="cursor-pointer ml-2 bg-white text-black rounded-full size-5 inline-flex items-center justify-center"
					>
						+
					</button>
				</form>
			</span>
		</div>
	)
}
