import { getBlogs } from "@/app/services/blogs"

export default function Blog() {
	const blogs = getBlogs()

	return (
		<div className="flex flex-col gap-2">
			{blogs.map(({ id, title, author, url, likes }) => (
				<div key={id} className="flex flex-col">
					<span className="font-bold">{title}</span>
					<span className="text-sm">{author}</span>
				</div>
			))}
		</div>
	)
}
