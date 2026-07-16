import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// biome-ignore lint/style/noNonNullAssertion: we are sure the variable is set
export const db = drizzle(process.env.DATABASE_URL!, { schema })
