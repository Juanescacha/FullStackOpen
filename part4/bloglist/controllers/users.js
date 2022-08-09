const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({ error: "Username must be unique" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
