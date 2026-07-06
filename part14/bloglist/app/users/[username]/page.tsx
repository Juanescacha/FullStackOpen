import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogsByUsername } from "@/app/services/users"

export default async function User({
	params,
}: {
	params: Promise<{ username: string }>
}) {
	const { username } = await params
	const user = await getUserWithBlogsByUsername(username)

	if (!user) notFound()

	const { blogs } = user

	return (
		<div className="flex flex-col gap-5">
			<h1 className="capitalize text-xl font-bold border-b">{username}</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-lg font-semibold">Blogs</h2>

				{blogs.map(({ id, title, author, likes }) => (
					<Link
						href={`/blogs/${id}`}
						key={id}
						className="flex flex-col max-w-fit hover:bg-gray-900 p-2 rounded"
					>
						<span className="font-bold">{title}</span>
						<span className="text-sm">{author}</span>
						<span className="text-sm">{likes} likes</span>
					</Link>
				))}
			</div>
		</div>
	)
}
