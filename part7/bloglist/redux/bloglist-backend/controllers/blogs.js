const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body

	if (!body.title || !body.url) {
		return response.status(400).json({ error: "Title or URL Missing" })
	}

	const user = request.user

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
	const id = request.params.id
	const user = request.user
	const blog = await Blog.findById(id)

	if (!blog) {
		return response
			.status(400)
			.json({ error: `Blog by ID ${id} does not exist` })
	}

	if (!blog.user) {
		return response
			.status(404)
			.json({ error: `Blog by ID ${id} does not have owner user` })
	}

	if (blog.user.toString() === user._id.toString()) {
		await Blog.findByIdAndDelete(id)
		user.blogs = user.blogs.filter(
			blogID => blogID.toString() !== blog._id.toString()
		)
		await user.save()
		response.status(204).end()
	} else {
		return response
			.status(401)
			.json({ error: "Unauthorized access to the blog" })
	}
})

blogsRouter.put("/:id", async (request, response) => {
	const { title, author, url, likes } = request.body
	const id = request.params.id
	const blog = await Blog.findById(id)
	const user = blog.user

	const result = await Blog.findOneAndReplace(
		{ _id: id },
		{ user, likes, url, author, title }
	)

	const blogModificado = await Blog.findById(id)
	response.json(blogModificado)

	if (result.n) {
		return response
			.status(400)
			.json({ error: `Blog by ID ${id} does not exist` })
	}
})

blogsRouter.put("/:id/comments", async (request, response) => {
	const { comment } = request.body
	const id = request.params.id

	if (!comment) {
		return response.status(400).json({ error: "Comment missing" })
	}

	const result = await Blog.findOneAndUpdate(
		{ _id: id },
		{ $push: { comments: comment } },
		{ new: true }
	)

	if (!result) {
		return response
			.status(400)
			.json({ error: `Blog by ID ${id} does not exist` })
	}
	return response.status(200).json(result)
})

module.exports = blogsRouter
