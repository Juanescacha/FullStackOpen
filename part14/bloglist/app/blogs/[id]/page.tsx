import { notFound } from "next/navigation"
import { addLike } from "@/app/actions/blogs"
import { addBlogToReadingList } from "@/app/actions/readingLists"
import { getBlogById, isBlogInReadingList } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"

export default async function Blog({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const blog = await getBlogById(Number(id))
	const user = await getCurrentUser()

	if (!blog) notFound()

	const isNotInReadingList = user
		? !(await isBlogInReadingList(Number(id), user.id))
		: false

	const { title, author, url, likes } = blog

	return (
		<div className="flex flex-col" data-testid="blog-detail">
			<span data-testid="blog-title">
				<strong>TITLE: </strong>
				{title}
			</span>
			<span data-testid="blog-author">
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
			{isNotInReadingList && (
				<form action={addBlogToReadingList}>
					<input type="hidden" name="blogId" value={id} />
					<button
						type="submit"
						className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 items-center justify-center"
						data-testid="add-to-reading-list-button"
					>
						Add to Reading List
					</button>
				</form>
			)}
		</div>
	)
}
