"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getReadingListBlogs, markAsRead } from "@/app/actions/readingLists"
import { generateToken, getApiToken } from "@/app/actions/users"

export default function MePage() {
	const { data: session } = useSession()
	const [token, setToken] = useState<string | null>(null)
	const [readingListBlogs, setReadingListBlogs] = useState<
		Awaited<ReturnType<typeof getReadingListBlogs>>
	>([])

	useEffect(() => {
		getApiToken().then(setToken)
		getReadingListBlogs().then(setReadingListBlogs)
	}, [])

	const unreadBlogs = readingListBlogs.filter((blog) => !blog.read)
	const readBlogs = readingListBlogs.filter((blog) => blog.read)

	const handleGenerate = async () => {
		const newToken = await generateToken()
		setToken(newToken)
	}

	const handleMarkAsRead = async (blogId: number) => {
		await markAsRead(blogId)
		const updatedList = await getReadingListBlogs()
		setReadingListBlogs(updatedList)
	}

	return (
		<div className="flex flex-col gap-3">
			<h1 className="font-bold">My Profile</h1>
			<div>
				<strong>Name:</strong> {session?.user?.name}
			</div>
			<div>
				<strong>Username:</strong> {session?.user?.email}
			</div>
			<hr />
			<h2 className="font-bold">API Token</h2>
			{token ? (
				<div className="bg-white/10 px-4 py-2 rounded">{token}</div>
			) : (
				<button
					type="button"
					onClick={handleGenerate}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Generate Token
				</button>
			)}
			<hr />
			<h2 className="font-bold">Reading List</h2>
			<h3>Unread ({unreadBlogs.length})</h3>
			{unreadBlogs.map((blog) => (
				<div
					key={blog.id}
					className="bg-white/10 px-4 py-2 min-h-12 rounded flex justify-between items-center"
				>
					{blog.title}
					{!blog.read && (
						<button
							type="button"
							onClick={() => handleMarkAsRead(blog.id)}
							className="bg-blue-500 text-white px-2 py-1 rounded"
						>
							Mark as Read
						</button>
					)}
				</div>
			))}
			<h3>Read ({readBlogs.length})</h3>
			{readBlogs.map((blog) => (
				<div
					key={blog.id}
					className="bg-white/10 px-4 py-2 min-h-12 rounded flex justify-between items-center"
				>
					{blog.title}
				</div>
			))}
		</div>
	)
}
