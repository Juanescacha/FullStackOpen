"use server"

import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"

export const createAccount = async (
	prevState: {
		errors: {
			username?: string
			name?: string
			password?: string
		}
		values: {
			username: string
			name: string
			password: string
			passwordConfirm: string
		}
	},
	formData: FormData,
) => {
	const values = {
		username: (formData.get("username") as string)?.trim(),
		name: (formData.get("name") as string)?.trim(),
		password: formData.get("password") as string,
		passwordConfirm: formData.get("passwordConfirm") as string,
	}

	if (!values.username || values.username.length < 4)
		return {
			errors: {
				username: "Username must be at least 4 characters",
			},
			values,
		}

	if (!values.name || values.name.length < 4)
		return {
			errors: {
				name: "Name must be at least 4 characters",
			},
			values,
		}

	if (!values.password || values.password !== values.passwordConfirm)
		return {
			errors: {
				password: "Password must match confirmation",
			},
			values,
		}

	const user = await db.query.users.findFirst({
		where: eq(users.username, values.username),
	})

	if (user && user.username === values.username)
		return {
			errors: {
				username: "Username already exists",
			},
			values,
		}

	const passwordHash = await bcrypt.hash(values.password, 10)

	await db
		.insert(users)
		.values({ username: values.username, name: values.name, passwordHash })

	redirect("/login")
}
