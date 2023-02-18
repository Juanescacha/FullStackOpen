import {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
	useRef,
} from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"

import blogService from "./services/blogs"
import loginService from "./services/login"
import "./app.css"

import PropTypes from "prop-types"

import {
	useNotificationValue,
	useNotificationDispatch,
} from "./NotificationContext"

import { useQuery, useMutation, useQueryClient } from "react-query"

const Notification = ({ message }) => {
	if (message[0] === "") {
		return null
	}

	const type = message[1] ? "success" : "error"
	return <div className={type}>{message[0]}</div>
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

	const queryClient = useQueryClient()

	const blogVoteMutation = useMutation(blogService.addLike, {
		onSuccess: () => {
			queryClient.invalidateQueries("blogs")
		},
	})
	const newBlogMutation = useMutation(blogService.create, {
		onSuccess: () => {
			queryClient.invalidateQueries("blogs")
		},
	})

	const removeBlogMutation = useMutation(blogService.remove, {
		onSuccess: () => {
			queryClient.invalidateQueries("blogs")
		},
	})

	// const [blogs, setBlogs] = useState([])

	const [user, setUser] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [updateBlogs, setUpdateBlogs] = useState(false)
	// const [message, setMessage] = useState(["", true])
	const message = useNotificationValue()
	const setMessage = useNotificationDispatch()

	const { isLoading, isError, data } = useQuery("blogs", blogService.getAll, {
		refetchOnWindowFocus: false,
	})

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginService.login({ username, password })
			setUser(user)
			window.localStorage.setItem("loggedUser", JSON.stringify(user))
			setUsername("")
			setPassword("")
			blogService.setToken(user.token)
			setMessage({
				type: "SHOW",
				data: ["Successfully logged in", true],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
		} catch (exception) {
			console.error("Wrong credentials", exception)
			setMessage({
				type: "SHOW",
				data: ["Wrong credentials", false],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser")
		setUser(null)
		setMessage({
			type: "SHOW",
			data: ["Successfully logged out", true],
		})
		setTimeout(() => {
			setMessage({
				type: "HIDE",
			})
		}, 3000)
	}

	const createBlog = async blog => {
		try {
			// await blogService.create(blog)
			newBlogMutation.mutate(blog)
			blogFormRef.current.toggleVisibility()
			setUpdateBlogs(!updateBlogs)
			setMessage({
				type: "SHOW",
				data: ["Successfully created blog", true],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
		} catch (error) {
			setMessage({
				type: "SHOW",
				data: ["Error creating blog", false],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
			console.error("please enther valid data and fill all fields", error)
		}
	}

	const updateLike = async blog => {
		try {
			// await blogService.addLike(blog, id)
			blogVoteMutation.mutate(blog)
			setUpdateBlogs(!updateBlogs)
			setMessage({
				type: "SHOW",
				data: ["like added", true],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
		} catch (error) {
			setMessage({
				type: "SHOW",
				data: ["Error adding like", false],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
			console.error("error liking a blog", error)
		}
	}

	const removeBlog = async id => {
		try {
			// await blogService.remove(id)
			removeBlogMutation.mutate(id)
			setUpdateBlogs(!updateBlogs)
			setMessage({
				type: "SHOW",
				data: ["Blog removed", true],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
		} catch (error) {
			console.error("error deleting a blog", error)
			setMessage({
				type: "SHOW",
				data: [
					"Error Deleting Blog, you cannot delete a Blog that its not yours",
					false,
				],
			})
			setTimeout(() => {
				setMessage({
					type: "HIDE",
				})
			}, 3000)
		}
	}

	useEffect(() => {
		const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
		if (loggedUser) {
			setUser(loggedUser)
			blogService.setToken(loggedUser.token)
		}
	}, [])

	if (user === null) {
		return (
			<div>
				<h1>Blogs</h1>
				<Notification message={message} />
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

	if (isLoading)
		return (
			<div>
				<h1>Blogs</h1>
				<Notification message={message} />
				<div>
					{user.name} - logged in{" "}
					<button type="button" onClick={handleLogout}>
						logout
					</button>
				</div>
				<Toggable
					id="create"
					buttonLabel="Create new blog"
					ref={blogFormRef}
				>
					<BlogForm createBlog={createBlog} />
				</Toggable>
				<br />
				loading data...
			</div>
		)
	if (isError)
		return (
			<div>
				<h1>Blogs</h1>
				<Notification message={message} />
				<div>
					{user.name} - logged in{" "}
					<button type="button" onClick={handleLogout}>
						logout
					</button>
				</div>
				<Toggable
					id="create"
					buttonLabel="Create new blog"
					ref={blogFormRef}
				>
					<BlogForm createBlog={createBlog} />
				</Toggable>
				<br />
				blog service not avaialable due to problems in the server
			</div>
		)

	const blogs = data.sort((a, b) => b.likes - a.likes)

	return (
		<div>
			<h1>Blogs</h1>
			<Notification message={message} />
			<div>
				{user.name} - logged in{" "}
				<button type="button" onClick={handleLogout}>
					logout
				</button>
			</div>
			<Toggable
				id="create"
				buttonLabel="Create new blog"
				ref={blogFormRef}
			>
				<BlogForm createBlog={createBlog} />
			</Toggable>
			<br />
			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					updateLike={updateLike}
					removeBlog={removeBlog}
					user={user}
				/>
			))}
		</div>
	)
}

export default App
