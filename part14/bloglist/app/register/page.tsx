import { createAccount } from "@/app/actions/account"

export default function RegisterPage() {
	return (
		<div>
			<h2 className="text-3xl font-bold mb-2">Register</h2>
			{/*{error && <p className="text-red-500">{error}</p>}*/}
			<form action={createAccount} className="flex flex-col gap-2">
				<label className="space-x-4">
					<span>Username:</span>
					<input
						type="text"
						name="username"
						placeholder="Username"
						className="bg-zinc-900 rounded p-2"
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
						required
					/>
				</label>
				<button
					type="submit"
					className="max-w-fit bg-zinc-800 px-3 py-2 rounded-lg"
				>
					Create Account
				</button>
			</form>
		</div>
	)
}
