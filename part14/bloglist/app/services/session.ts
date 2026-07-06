import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getCurrentUser = async () => {
	const session = await auth()
	if (!session?.user?.email) {
		return null
	}

	return db.query.users.findFirst({
		where: eq(users.username, session.user.email),
	})
}
