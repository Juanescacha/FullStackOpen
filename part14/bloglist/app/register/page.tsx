"use client"

import { useActionState } from "react"
import { createAccount } from "@/app/actions/account"

export default function RegisterPage() {
	type ActionState = Parameters<typeof createAccount>[0]

	const initialState: ActionState = {
		errors: {
			username: undefined,
			name: undefined,
			password: undefined,
		},
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
					<span>Username</span>
					<input
						type="text"
						name="username"
						placeholder="Username"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.username}
						required
					/>
				</label>
				{state.errors?.username && (
					<p className="text-red-500" data-testid="username-error">
						{state.errors.username}
					</p>
				)}
				<label className="space-x-4">
					<span>Name</span>
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.name}
						required
					/>
				</label>
				{state.errors?.name && (
					<p className="text-red-500" data-testid="name-error">
						{state.errors.name}
					</p>
				)}
				<label className="space-x-4">
					<span>Password</span>
					<input
						type="password"
						name="password"
						placeholder="password"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.password}
						required
					/>
				</label>
				<label className="space-x-4">
					<span>Confirm Password</span>
					<input
						type="password"
						name="passwordConfirm"
						placeholder="password"
						className="bg-zinc-900 rounded p-2"
						defaultValue={state.values?.passwordConfirm}
						required
					/>
				</label>
				{state.errors?.password && (
					<p className="text-red-500" data-testid="passwordConfirm-error">
						{state.errors.password}
					</p>
				)}
				<button
					type="submit"
					className="max-w-fit bg-zinc-800 px-3 py-2 rounded-lg"
					data-testid="register-button"
				>
					Create Account
				</button>
			</form>
		</div>
	)
}
