import { useState } from "react"

import { useDispatch } from "react-redux"
import { setNotificationTimeout } from "../reducers/notificationReducer"
import blogService from "../services/blogs"
// import { addBlog } from "../reducers/blogReducer"

const BlogForm = ({ toggle }) => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const createBlog = async event => {
		event.preventDefault()
		const blog = { title, author, url }
		toggle()
		try {
			await blogService.create(blog)
			// setUpdateBlogs(!updateBlogs)
			dispatch(
				setNotificationTimeout(
					"Successfully created blog",
					"success",
					3000
				)
			)
		} catch (error) {
			dispatch(setNotificationTimeout("Blog not created", "error", 3000))
			console.error("please enther valid data and fill all fields", error)
		}

		setAuthor("")
		setTitle("")
		setUrl("")
	}

	return (
		<>
			<h1>create new</h1>
			<form onSubmit={createBlog}>
				title:{" "}
				<input
					id="title"
					type="text"
					name="title"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<br />
				author:{" "}
				<input
					id="author"
					type="text"
					name="author"
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
				<br />
				url:{" "}
				<input
					id="url"
					type="URL"
					name="url"
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/>
				<br />
				<button
					id="create-button"
					type="submit"
					className="mx-10 mt-10 h-12 w-60 rounded-lg bg-sky-500 px-6 font-semibold text-white shadow-inner hover:bg-sky-400 hover:shadow-none focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
				>
					create
				</button>
			</form>
		</>
	)
}

export default BlogForm
