import { eq } from "drizzle-orm"
import { db } from "@/db"
import { readingList } from "@/db/schema"

export const getReadingLists = async (userId: string) => {
	return db.query.readingList.findMany({
		where: eq(readingList.userId, Number(userId)),
		with: { blog: true },
	})
}
