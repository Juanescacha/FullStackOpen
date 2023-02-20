import {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
	useRef,
} from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"

import blogService from "./services/blogs"
import usersService from "./services/users"
import loginService from "./services/login"
import "./app.css"

import PropTypes from "prop-types"

//redux
import { useDispatch, useSelector } from "react-redux"
import { setNotificationTimeout } from "./reducers/notificationReducer"
import { setBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import { setUsers } from "./reducers/usersReducer"

//react router
import { Link, useParams } from "react-router-dom"

export const BlogView = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const blog = blogs.find(blog => blog.id === id)
	const [updateBlogs, setUpdateBlogs] = useState(false)

	const handleLike = async () => {
		const blogObj = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		}
		try {
			await blogService.addLike(blogObj, blog.id)
			setUpdateBlogs(!updateBlogs)
			dispatch(
				setNotificationTimeout(
					"Successfully liked blog",
					"success",
					3000
				)
			)
		} catch (error) {
			dispatch(setNotificationTimeout("Liked not added", "error", 3000))
			console.error("error liking a blog", error)
		}
	}

	useEffect(() => {
		blogService.getAll().then(blogs => {
			dispatch(setBlogs(blogs))
			console.log("blogs", blogs)
		})
	}, [updateBlogs])

	if (!blog) {
		return null
	}

	const handleComment = async event => {
		event.preventDefault()
		const comment = event.target[0].value
		event.target[0].value = ""
		try {
			await blogService.addComment(comment, blog.id)
			setUpdateBlogs(!updateBlogs)
			dispatch(
				setNotificationTimeout(
					"Successfully added comment",
					"success",
					3000
				)
			)
		} catch (error) {
			dispatch(setNotificationTimeout("Comment not added", "error", 3000))
			console.error("error adding a comment", error)
		}
	}

	return (
		<>
			<Base />
			<br />
			{blog.title} {blog.author}
			<br />
			{blog.url}
			<br />
			likes {blog.likes} <button onClick={handleLike}>like</button>
			<br />
			{blog.author}
			<br />
			<h3>comments</h3>
			<form onSubmit={handleComment}>
				<input type="text" />
				<button type="submit">add comment</button>
			</form>
			<ul>
				{blog.comments.map(comment => (
					<li key={Math.random() * 10000}>{comment}</li>
				))}
			</ul>
		</>
	)
}
export const Users = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)

	useEffect(() => {
		usersService.getAll().then(users => {
			dispatch(setUsers(users))
			console.log("users", users)
		})
	}, [])
	return (
		<>
			<Base />
			<br />
			<h1>Users</h1>
			{users.map(user => (
				<div key={user.id}>
					<Link to={`/users/${user.id}`}>{user.name}</Link> -{" "}
					{user.blogs.length}
				</div>
			))}
		</>
	)
}

export const User = () => {
	const { id } = useParams()
	console.log(id)
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)
	const user = users.find(user => user.id === id)

	useEffect(() => {
		usersService.getAll().then(users => {
			dispatch(setUsers(users))
			console.log("users", users)
		})
	}, [])

	if (!user) {
		return null
	}

	return (
		<>
			<Base />
			<br />
			<h1>{user.name}</h1>
			<h3>Added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</>
	)
}

export const Base = () => {
	const dispatch = useDispatch()

	const user = useSelector(state => state.user)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const [updateBlogs, setUpdateBlogs] = useState(false)
	const blogFormRef = useRef()

	useEffect(() => {
		const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
		if (loggedUser) {
			dispatch(setUser(loggedUser))
			blogService.setToken(loggedUser.token)
			console.log("loggedUser", loggedUser)
		}
	}, [])

	const toggle = () => {
		blogFormRef.current.toggleVisibility()
		setUpdateBlogs(!updateBlogs)
	}

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser")
		dispatch(setUser(null))
		dispatch(
			setNotificationTimeout("Successfully logged out", "success", 3000)
		)
	}

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const newUser = await loginService.login({ username, password })
			dispatch(setUser(newUser))
			window.localStorage.setItem("loggedUser", JSON.stringify(newUser))
			setUsername("")
			setPassword("")
			blogService.setToken(newUser.token)
			dispatch(
				setNotificationTimeout(
					"Successfully logged in",
					"success",
					3000
				)
			)
		} catch (exception) {
			console.error("Wrong credentials", exception)
			dispatch(setNotificationTimeout("Wrong Credentials", "error", 3000))
		}
	}

	if (user === null) {
		return (
			<div>
				<h1>Blogs</h1>
				<Notification />
				<Toggable id="login" buttonLabel="login">
					<h2>Log in</h2>
					<form onSubmit={handleLogin}>
						<div>
							username{" "}
							<input
								id="username"
								type="text"
								name="Username"
								value={username}
								onChange={({ target }) =>
									setUsername(target.value)
								}
							/>
						</div>
						<div>
							password{" "}
							<input
								id="password"
								type="password"
								name="Password"
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
							/>
						</div>
						<button id="login-button" type="submit">
							login
						</button>
					</form>
				</Toggable>
			</div>
		)
	}

	return (
		<div>
			<div style={{ backgroundColor: "lightgray", padding: 10 }}>
				<Link to="/"> blogs </Link>
				<Link to="/users"> users </Link>
				{user.name} - logged in{" "}
				<button type="button" onClick={handleLogout}>
					logout
				</button>
			</div>
			<h1>Blogs</h1>
			<Notification />
			<Toggable
				id="create"
				buttonLabel="Create new blog"
				ref={blogFormRef}
			>
				<BlogForm toggle={toggle} />
			</Toggable>
		</div>
	)
}

const Toggable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? "none" : "" }
	const showWhenVisible = { display: visible ? "" : "none" }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<br />
				<button id={props.id} onClick={toggleVisibility}>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button id="cancel" onClick={toggleVisibility}>
					cancel
				</button>
			</div>
		</div>
	)
})

Toggable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

Toggable.displayName = "Toggable"

const App = () => {
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	// const [blogs, setBlogs] = useState([])
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	// const [user, setUser] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [updateBlogs, setUpdateBlogs] = useState(false)

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const newUser = await loginService.login({ username, password })
			dispatch(setUser(newUser))
			window.localStorage.setItem("loggedUser", JSON.stringify(newUser))
			setUsername("")
			setPassword("")
			blogService.setToken(newUser.token)
			dispatch(
				setNotificationTimeout(
					"Successfully logged in",
					"success",
					3000
				)
			)
		} catch (exception) {
			console.error("Wrong credentials", exception)
			dispatch(setNotificationTimeout("Wrong Credentials", "error", 3000))
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser")
		dispatch(setUser(null))
		dispatch(
			setNotificationTimeout("Successfully logged out", "success", 3000)
		)
	}

	const updateLike = async (blog, id) => {
		try {
			await blogService.addLike(blog, id)
			setUpdateBlogs(!updateBlogs)
			dispatch(
				setNotificationTimeout(
					"Successfully liked blog",
					"success",
					3000
				)
			)
		} catch (error) {
			dispatch(setNotificationTimeout("Liked not added", "error", 3000))
			console.error("error liking a blog", error)
		}
	}

	const removeBlog = async id => {
		try {
			await blogService.remove(id)
			setUpdateBlogs(!updateBlogs)
			dispatch(
				setNotificationTimeout(
					"Blog successfully removed",
					"success",
					3000
				)
			)
		} catch (error) {
			console.error("error deleting a blog", error)
			dispatch(
				setNotificationTimeout(
					"Error removing the Blog, you cannot remove a Blog that its not yours",
					"error",
					3000
				)
			)
		}
	}

	const toggle = () => {
		blogFormRef.current.toggleVisibility()
		setUpdateBlogs(!updateBlogs)
	}

	useEffect(() => {
		blogService.getAll().then(blogs => {
			blogs.sort((a, b) => b.likes - a.likes)
			dispatch(setBlogs(blogs))
		})
	}, [updateBlogs])

	useEffect(() => {
		const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
		if (loggedUser) {
			dispatch(setUser(loggedUser))
			blogService.setToken(loggedUser.token)
		}
	}, [dispatch])

	if (user === null) {
		return (
			<div>
				<h1>Blogs</h1>
				<Notification />
				<Toggable id="login" buttonLabel="login">
					<h2>Log in</h2>
					<form onSubmit={handleLogin}>
						<div>
							username{" "}
							<input
								id="username"
								type="text"
								name="Username"
								value={username}
								onChange={({ target }) =>
									setUsername(target.value)
								}
							/>
						</div>
						<div>
							password{" "}
							<input
								id="password"
								type="password"
								name="Password"
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
							/>
						</div>
						<button id="login-button" type="submit">
							login
						</button>
					</form>
				</Toggable>
			</div>
		)
	}

	return (
		<div>
			<div style={{ backgroundColor: "lightgray", padding: 10 }}>
				<Link to="/"> blogs </Link>
				<Link to="/users"> users </Link>
				{user.name} - logged in{" "}
				<button type="button" onClick={handleLogout}>
					logout
				</button>
			</div>
			<h1>Blog app</h1>
			<Notification />
			<Toggable
				id="create"
				buttonLabel="Create new blog"
				ref={blogFormRef}
			>
				<BlogForm toggle={toggle} />
			</Toggable>
			<br />
			{blogs.map(blog => (
				<Link key={blog.id} to={`/blogs/${blog.id}`}>
					<Blog
						key={blog.id}
						blog={blog}
						updateLike={updateLike}
						removeBlog={removeBlog}
						user={user}
					/>
				</Link>
			))}
		</div>
	)
}

export default App
