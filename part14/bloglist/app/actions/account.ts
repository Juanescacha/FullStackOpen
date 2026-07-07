"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"

export const createAccount = async (formData: FormData) => {
	const username = (formData.get("username") as string)?.trim()
	const name = (formData.get("name") as string)?.trim()
	const password = formData.get("password") as string

	const passwordHash = await bcrypt.hash(password, 10)

	await db.insert(users).values({ username, name, passwordHash })

	redirect("/login")
}
