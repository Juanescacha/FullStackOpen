import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function POST(request: Request) {
	if (process.env.NODE_ENV === "production") {
		return Response.json({
			error: "This endpoint is not available in production",
			status: 403,
		})
	}

	const { username, name, password } = await request.json()

	if (!username || !name || !password) {
		return Response.json(
			{ error: "Missing username, name or password" },
			{ status: 400 },
		)
	}

	const user = await db.query.users.findFirst({
		where: eq(users.username, username),
	})

	if (user && user.username === username)
		return Response.json(
			{
				error: "Username already exists",
				username,
				name,
				password,
			},
			{ status: 400 },
		)

	const passwordHash = await bcrypt.hash(password, 10)

	await db.insert(users).values({ username, name, passwordHash })

	return Response.json({ status: 200, message: "Successfully saved" })
}
