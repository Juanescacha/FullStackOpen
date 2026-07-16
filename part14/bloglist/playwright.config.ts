import { defineConfig } from "@playwright/test"

export default defineConfig({
	use: {
		baseURL: "http://localhost:3000", // <-- esto es lo que falta
	},
	webServer: {
		command: "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
})
