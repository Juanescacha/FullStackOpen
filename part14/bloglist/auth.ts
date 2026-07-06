import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./db"
import { users } from "./db/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) {
					return null
				}

				const user = await db.query.users.findFirst({
					where: eq(users.username, credentials.username as string),
				})

				if (!user?.passwordHash) {
					return null
				}

				const isValid = await bcrypt.compare(
					credentials.password as string,
					user.passwordHash,
				)

				if (!isValid) {
					return null
				}

				return {
					id: String(user.id),
					name: user.name,
					email: user.username,
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
})
