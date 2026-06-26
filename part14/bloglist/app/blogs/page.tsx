import Link from "next/link"
import { getBlogs } from "@/app/services/blogs"

export default function Blogs() {
	const blogs = getBlogs()

	return (
		<div className="flex flex-col gap-2">
			{blogs.map(({ id, title, author }) => (
				<Link href={`blogs/${id}`} key={id} className="flex flex-col">
					<span className="font-bold">{title}</span>
					<span className="text-sm">{author}</span>
				</Link>
			))}
		</div>
	)
}
