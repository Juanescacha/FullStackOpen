const blogs = [
	{
		id: 1,
		title: "Había una vez un rio",
		author: "Sergio Ramos",
		url: "https://google.com",
		likes: 10,
	},
	{
		id: 2,
		title: "Batman vs Superman",
		author: "Julius Caesar",
		url: "https://facebook.com",
		likes: 20,
	},
	{
		id: 3,
		title: "Destinado a la Guerra",
		author: "Jimmy Neutron",
		url: "https://youtube.com",
		likes: 30,
	},
	{
		id: 4,
		title: "Mil Maneras de Morir",
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

export const addLikeById = (id: number) => {
	const blog = blogs.find((blog) => blog.id === id)
	if (blog) blog.likes += 1
}
