const blogs = [
	{
		id: 1,
		title: "Blog 1",
		author: "Sergio Ramos",
		url: "https://google.com",
		likes: 10,
	},
	{
		id: 2,
		title: "Blog 2",
		author: "Julius Caesar",
		url: "https://facebook.com",
		likes: 20,
	},
	{
		id: 3,
		title: "Blog 3",
		author: "Jimmy Neutron",
		url: "https://youtube.com",
		likes: 30,
	},
	{
		id: 4,
		title: "Blog 4",
		author: "Albert Einstein",
		url: "https://yahoo.com",
		likes: 10,
	},
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

export const getBlogById = (id: number) => {
	return blogs.find((blog) => blog.id === id)
}
