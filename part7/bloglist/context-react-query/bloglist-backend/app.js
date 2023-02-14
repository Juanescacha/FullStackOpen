const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const middleware = require("./utils/middleware")
const loginRouter = require("./controllers/login")
const testingRouter = require("./controllers/testing")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch(error => {
		logger.error("error connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(express.static("build"))
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
	app.use("/api/testing", testingRouter)
}

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)

module.exports = app
