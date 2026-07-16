import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function GET(request: Request) {
	const authHeader = request.headers.get("authorization")
	if (!authHeader?.startsWith("Bearer ")) {
		return Response.json({ error: "Unauthorized" }, { status: 401 })
	}

	const token = authHeader.slice(7)
	const user = await db.query.users.findFirst({
		where: eq(users.token, token),
		with: { blogs: true },
	})

	if (!user) {
		return Response.json({ error: "Unauthorized" }, { status: 401 })
	}

	const { passwordHash, token: data, ...safeUser } = user
	return Response.json(safeUser)
}
