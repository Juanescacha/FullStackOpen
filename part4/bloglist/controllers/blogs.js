const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(404).json({ error: "token missing or invalid" })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "Title or URL Missing" })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(404).json({ error: "token missing or invalid" })
  }

  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    return response
      .status(401)
      .json({ error: "Unauthorized access to the blog" })
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body

  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  )

  response.json(result)
})

module.exports = blogsRouter
