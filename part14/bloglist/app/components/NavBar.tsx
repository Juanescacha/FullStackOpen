"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function NavBar() {
	const { data: session } = useSession()

	return (
		<header>
			<nav className="flex gap-4 p-4 font-bold">
				<Link href="/">Home</Link>|<Link href="/blogs">Blogs</Link>|
				<Link href="/users">Users</Link>|
				{session ? (
					<>
						<Link href="/blogs/new">New Blog</Link>|
						<em>{session.user?.name} logged in</em>|
						<button type="button" onClick={() => signOut()}>
							logout
						</button>
					</>
				) : (
					<>
						<Link href="/login">Login</Link>|
						<Link href="/register">Register</Link>
					</>
				)}
			</nav>
		</header>
	)
}
