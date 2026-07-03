import Link from "next/link"
import { getUsers } from "@/app/services/users"

export default async function Users() {
	const users = await getUsers()

	return (
		<div className="flex flex-col gap-2">
			{users.map(({ id, name, username }) => (
				<Link
					href={`users/${username}`}
					key={id}
					className="flex flex-col max-w-fit"
				>
					<span className="font-bold">{username}</span>
					<span className="text-sm">{name}</span>
				</Link>
			))}
		</div>
	)
}
