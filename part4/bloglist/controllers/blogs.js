const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

// GET request

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

// POST request

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "Title or URL Missing" })
  }

  const user = await User.findById(body.userId)

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

// DELETE:id request

blogsRouter.delete("/:id", async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(result).end()
})

// PUT:id request

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
