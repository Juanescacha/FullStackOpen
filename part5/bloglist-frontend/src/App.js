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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [updateBlogs, setUpdateBlogs] = useState(false)
  const [message, setMessage] = useState(["", true])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      setMessage(["Successfully logged in", true])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
    } catch (exception) {
      console.error("Wrong credentials", exception)
      setMessage(["Wrong Credentials", false])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
    setMessage(["Successfully logged out", true])
    setTimeout(() => {
      setMessage(["", true])
    }, 3000)
  }

  const createBlog = async blog => {
    try {
      await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setUpdateBlogs(!updateBlogs)
      setMessage(["Successfully created blog", true])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
    } catch (error) {
      setMessage(["blog not created", false])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
      console.error("please enther valid data and fill all fields", error)
    }
  }

  const updateLike = async (blog, id) => {
    try {
      await blogService.addLike(blog, id)
      setUpdateBlogs(!updateBlogs)
      setMessage(["Successfully liked blog", true])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
    } catch (error) {
      setMessage(["like not added", false])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
      console.error("error liking a blog", error)
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setUpdateBlogs(!updateBlogs)
      setMessage(["Blog successfully removed", true])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
    } catch (error) {
      console.error("error deleting a blog", error)
      setMessage([
        "Error Removing Blog, you cannot remove a Blog that its not yours",
        false,
      ])
      setTimeout(() => {
        setMessage(["", true])
      }, 3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [updateBlogs])

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
        <Toggable buttonLabel="login">
          <h2>Log in</h2>
          <form onSubmit={handleLogin}>
            <div>
              username{" "}
              <input
                type="text"
                name="Username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password{" "}
              <input
                type="password"
                name="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </Toggable>
      </div>
    )
  }

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
      <Toggable buttonLabel="Create new blog" ref={blogFormRef}>
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
