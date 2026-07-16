"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function NavBar() {
	const { data: session } = useSession()

	return (
		<header>
			<nav className="flex gap-4 p-4 font-bold">
				<Link href="/">home</Link>|<Link href="/blogs">blogs</Link>|
				<Link href="/users">users</Link>|
				{session ? (
					<>
						<Link href="/blogs/new">new blog</Link>|<Link href="/me">me</Link>|
						<em>{session.user?.name} logged in</em>|
						<button type="button" onClick={() => signOut()}>
							logout
						</button>
					</>
				) : (
					<>
						<Link href="/login">login</Link>|
						<Link href="/register">register</Link>
					</>
				)}
			</nav>
		</header>
	)
}
