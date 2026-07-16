"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getReadingListBlogs, markAsRead } from "@/app/actions/readingLists"
import { generateToken, getApiToken } from "@/app/actions/users"

export default function MePage() {
	const { data: session, status } = useSession()
	const [token, setToken] = useState<string | null>(null)
	const [readingListBlogs, setReadingListBlogs] = useState<
		Awaited<ReturnType<typeof getReadingListBlogs>>
	>([])
	const router = useRouter()

	useEffect(() => {
		getApiToken().then(setToken)
		getReadingListBlogs().then(setReadingListBlogs)
	}, [])

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login")
		}
	}, [status, router])

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
		<div className="flex flex-col gap-3" data-testid="user-profile">
			<h1 className="font-bold">My Profile</h1>
			<div data-testid="user-name">
				<strong>Name:</strong> {session?.user?.name}
			</div>
			<div data-testid="user-username">
				<strong>Username:</strong> {session?.user?.email}
			</div>
			<hr />
			<h2 className="font-bold" data-testid="api-token-section">
				API Token
			</h2>
			{token ? (
				<span data-testid="token-display">
					Token:
					<div
						className="bg-white/10 px-4 py-2 rounded"
						data-testid="api-token"
					>
						{token}
					</div>
				</span>
			) : (
				<span data-testid="no-token-message">No token</span>
			)}
			<button
				type="button"
				onClick={handleGenerate}
				className="bg-blue-500 text-white px-4 py-2 rounded"
				data-testid="generate-token-button"
			>
				Generate Token
			</button>
			<hr />
			<h2 className="font-bold" data-testid="reading-list-section">
				Reading List
			</h2>
			<h3>Unread ({unreadBlogs.length})</h3>
			<div data-testid="unread-section" className="flex flex-col gap-3">
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
								data-testid={`mark-read-${blog.id}`}
							>
								Mark as Read
							</button>
						)}
					</div>
				))}
				{unreadBlogs.length === 0 && (
					<div className="text-gray-500" data-testid="no-unread-blogs">
						No unread blogs
					</div>
				)}
			</div>
			<div data-testid="read-section" className="flex flex-col gap-3">
				<h3>Read ({readBlogs.length})</h3>
				{readBlogs.map((blog) => (
					<div
						key={blog.id}
						className="bg-white/10 px-4 py-2 min-h-12 rounded flex justify-between items-center"
					>
						{blog.title}
					</div>
				))}
				{readBlogs.length === 0 && (
					<div className="text-gray-500" data-testid="no-read-blogs">
						No read blogs
					</div>
				)}
			</div>
			{!readBlogs.length && !unreadBlogs.length && (
				<div className="text-gray-500" data-testid="empty-reading-list">
					No blogs to display
				</div>
			)}
		</div>
	)
}
