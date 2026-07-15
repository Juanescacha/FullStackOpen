import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/app/services/session"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getUsers = async () => {
	return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
	return db.query.users.findFirst({ where: eq(users.id, id) })
}

export const getUserWithBlogsByUsername = async (username: string) => {
	return db.query.users.findFirst({
		where: eq(users.username, username),
		with: { blogs: true },
	})
}

export const addToken = async (token: string) => {
	const user = await getCurrentUser()
	if (!user) throw new Error("Not logged in")
	return db.update(users).set({ token }).where(eq(users.id, user.id))
}

export const getToken = async () => {
	const user = await getCurrentUser()
	if (!user) return null
	return user.token ?? null
}
