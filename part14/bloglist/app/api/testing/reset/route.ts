import { db } from "@/db"
import { blogs, readingList, users } from "@/db/schema"

export async function DELETE() {
	if (process.env.NODE_ENV === "production") {
		return Response.json({
			error: "This endpoint is not available in production",
			status: 403,
		})
	}

	await db.delete(users)
	await db.delete(blogs)
	await db.delete(readingList)

	return Response.json({ message: "Database reset successfully" })
}
