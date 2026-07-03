import * as dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

export default defineConfig({
	schema: "./db/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: We are sure that the environment variable is set
		url: process.env.DATABASE_URL!,
	},
})
