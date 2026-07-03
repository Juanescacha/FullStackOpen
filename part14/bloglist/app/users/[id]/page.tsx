import { notFound } from "next/navigation"
import { getUserById } from "@/app/services/users"

export default async function User({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const user = await getUserById(Number(id))

	if (!user) notFound()

	const { username, name } = user

	return (
		<div className="flex flex-col">
			<span>
				<strong>USERNAME: </strong>
				{username}
			</span>
			<span>
				<strong>NAME: </strong>
				{name}
			</span>
		</div>
	)
}
