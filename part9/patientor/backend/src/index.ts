import express from "express"
import cors from "cors"

import diagnoseRouter from "./routes/diagnoses"

const app = express()
const corsMiddleware = cors()

app.use(express.json())
app.use(corsMiddleware)

const PORT = 3001

app.get("/api/ping", (_req, res) => {
	console.log("someone pinged here")
	res.send("pong")
})

app.use("/api/diagnoses", diagnoseRouter)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
