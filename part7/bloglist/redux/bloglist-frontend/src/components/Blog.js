import { useState } from "react"

const Blog = ({ blog /* updateLike, removeBlog, user  */ }) => {
	const [visible /* setVisible */] = useState(false)

	// const showWhenVisible = { display: visible ? "" : "none" }
	const hideWhenVisible = { display: visible ? "none" : "" }

	// const toggleVisibility = () => {
	// 	setVisible(!visible)
	// }

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	/* const handleLike = () => {
		const blogObj = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		}
		updateLike(blogObj, blog.id)
	} */

	/* const handleRemove = () => {
		if (
			window.confirm("Are you sure you want to remove this blog?") ===
			true
		) {
			removeBlog(blog.id)
		}
	} */

	// const showDelete = blog.user.id === user.id ? true : false

	return (
		<>
			<div style={blogStyle} className="blog">
				<div style={hideWhenVisible}>
					{blog.title} {blog.author}
				</div>
				{/* <div style={showWhenVisible} className="hidden">
					{blog.title} {blog.author}
					<button onClick={toggleVisibility}>hide</button>
					<br />
					{blog.url}
					<br />
					likes {blog.likes}{" "}
					<button onClick={handleLike}>like</button>
					<br />
					{blog.author}
					<br />
					{showDelete && (
						<button onClick={handleRemove}>remove</button>
					)}
				</div> */}
			</div>
		</>
	)
}

export default Blog
