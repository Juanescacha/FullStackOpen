"use client"

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import type { SubmitEvent } from "react"
import { useState } from "react"
import { useNotification } from "@/app/components/NotificationContext"

export default function LoginPage() {
	const router = useRouter()
	const [error, setError] = useState("")
	const { showNotification } = useNotification()

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const result = await signIn("credentials", {
			username: formData.get("username"),
			password: formData.get("password"),
			redirect: false,
		})

		if (result?.error) {
			setError("Invalid username or password")
		} else {
			showNotification("Login successful")
			router.push("/")
			router.refresh()
		}
	}

	return (
		<div>
			<h2 className="text-3xl font-bold mb-2">Login</h2>
			{error && (
				<p className="text-red-500" data-testid="error-message">
					{error}
				</p>
			)}
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<label className="space-x-4">
					<span>Username</span>
					<input
						type="text"
						name="username"
						placeholder="Username"
						className="bg-zinc-900 rounded p-2"
						required
					/>
				</label>
				<label className="space-x-4">
					<span>Password</span>
					<input
						type="password"
						name="password"
						placeholder="password"
						className="bg-zinc-900 rounded p-2"
						required
					/>
				</label>
				<button
					type="submit"
					className="max-w-fit bg-zinc-800 px-3 py-2 rounded-lg"
					data-testid="login-button"
				>
					Login
				</button>
			</form>
		</div>
	)
}
