"use client"

import { useActionState } from "react"
import { createAccount } from "@/app/actions/account"

export default function RegisterPage() {
	const initialState = {
		error: "",
		values: {
			username: "",
			name: "",
			password: "",
			passwordConfirm: "",
		},
	}

	const [state, formAction] = useActionState(createAccount, initialState)

	return (
		<div>
			<h2 className="text-3xl font-bold mb-2">Register</h2>
			<form action={formAction} className="flex flex-col gap-2">
				<label className="space-x-4">
					<span>Username:</span>
					<input
						type="text"
						name="username"
						placeholder="Username"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.username}
						// minLength={4}
						required
					/>
				</label>
				<label className="space-x-4">
					<span>Name:</span>
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.name}
						// minLength={4}
						required
					/>
				</label>
				<label className="space-x-4">
					<span>Password:</span>
					<input
						type="password"
						name="password"
						placeholder="password"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.password}
						// minLength={4}
						required
					/>
				</label>
				<label className="space-x-4">
					<span>Password Confirm:</span>
					<input
						type="password"
						name="passwordConfirm"
						placeholder="password"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.passwordConfirm}
						required
					/>
				</label>
				<button
					type="submit"
					className="max-w-fit bg-zinc-800 px-3 py-2 rounded-lg"
				>
					Create Account
				</button>
				{state.error && <p className="text-red-500">{state.error}</p>}
			</form>
		</div>
	)
}
