"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addToken, getToken } from "@/app/services/users"
import { auth } from "@/auth"

export const generateToken = async () => {
	const session = await auth()
	if (!session) redirect("/login")

	const token = crypto.randomUUID()
	await addToken(token)
	revalidatePath("/me")
	return token
}

export const getApiToken = async () => {
	const session = await auth()
	if (!session) return null
	return getToken()
}
