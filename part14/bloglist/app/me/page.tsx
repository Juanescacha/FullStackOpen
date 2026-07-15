"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { generateToken, getApiToken } from "@/app/actions/users"

export default function MePage() {
	const { data: session } = useSession()
	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		getApiToken().then(setToken)
	}, [])

	const handleGenerate = async () => {
		const newToken = await generateToken()
		setToken(newToken)
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
		</div>
	)
}
