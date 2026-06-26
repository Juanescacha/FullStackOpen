const blogs = [
	{ id: 1, title: "Blog 1", author: "Sergio Ramos", url: "#", likes: 10 },
	{ id: 2, title: "Blog 2", author: "Julius Caesar", url: "#", likes: 20 },
	{ id: 3, title: "Blog 3", author: "Jimmy Neutron", url: "#", likes: 30 },
	{ id: 4, title: "Blog 4", author: "Albert Einstein", url: "#", likes: 10 },
]

let nextId = 5

export const getBlogs = () => {
	return blogs
}

export const addBlog = (blog: {
	title: string
	author: string
	url: string
}) => {
	blogs.push({ ...blog, id: nextId++, likes: 0 })
}
