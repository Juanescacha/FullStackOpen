import { useState } from "react"

const NoteForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = event => {
    event.preventDefault()
    const blog = { title, author, url }
    createBlog(blog)

    setAuthor("")
    setTitle("")
    setUrl("")
  }

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        title:{" "}
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author:{" "}
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:{" "}
        <input
          type="URL"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default NoteForm
