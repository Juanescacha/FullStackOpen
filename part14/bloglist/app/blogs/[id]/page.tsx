import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"

export default async function Blog({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const blog = getBlogById(Number(id))

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
			</span>
		</div>
	)
}
