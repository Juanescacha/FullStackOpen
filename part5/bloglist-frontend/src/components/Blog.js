import { useState } from "react"

const Blog = ({ blog, updateLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateLike(blogObj, blog.id)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  return (
    <>
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.author}
          <br />
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </>
  )
}

export default Blog
