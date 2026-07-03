import Link from "next/link"
import { filterBlog } from "@/app/actions/blogs"
import { getBlogs } from "@/app/services/blogs"

export default async function Blogs({
	searchParams,
}: {
	searchParams: Promise<{ filter?: string }>
}) {
	const { filter } = await searchParams
	let blogs = await getBlogs().then((x) => x.sort((a, b) => b.likes - a.likes))

	blogs = filter
		? blogs.filter((blog) =>
				blog.title
					.toLowerCase()
					.includes(filter.toString().trim().toLowerCase()),
			)
		: blogs

	return (
		<div className="flex flex-col gap-2">
			<form action={filterBlog} className="space-x-2">
				<input
					type="text"
					name="filter"
					placeholder="filter"
					className="bg-zinc-900 rounded p-2"
				/>
				<button
					type="submit"
					className="max-w-fit bg-zinc-800 px-3 py-2 rounded-lg"
				>
					search
				</button>
			</form>
			{blogs.map(({ id, title, author, likes }) => (
				<Link href={`blogs/${id}`} key={id} className="flex flex-col max-w-fit">
					<span className="font-bold">{title}</span>
					<span className="text-sm">{author}</span>
					<span className="text-sm">{likes} likes</span>
				</Link>
			))}
		</div>
	)
}
