const _ = require("lodash")

const dummy = blogs => {
  if (blogs) {
    return 1
  }
}

const totalLikes = blogs => {
  const sumLikes = (sum, blog) => sum + blog.likes
  return blogs.reduce(sumLikes, 0)
}

const favoriteBlog = blogs => {
  const mayor = (counter, blog) => {
    return blog.likes > counter.likes ? blog : counter
  }
  return blogs.reduce(mayor, { likes: 0 })
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return { author: "", blogs: 0 }

  const groupedBlogs = _.groupBy(blogs, "author")
  const blogsAuthor = _.mapValues(groupedBlogs, "length")
  const toArray = Object.entries(blogsAuthor)
  const mayorPair = toArray.reduce((a, b) => (a[1] > b[1] ? a : b))

  return { author: mayorPair[0], blogs: mayorPair[1] }
}

const mostLikes = blogs => {
  if (blogs.length === 0) return { author: "", likes: 0 }

  const likes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

  const blogsAgrupados = _.groupBy(blogs, "author")
  const blogsLikes = _.mapValues(blogsAgrupados, likes)
  const objToArreglo = Object.entries(blogsLikes)
  const mayorPair = objToArreglo.reduce((a, b) => (a[1] > b[1] ? a : b))

  return { author: mayorPair[0], likes: mayorPair[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
