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
  const groupedBlogs = _.groupBy(blogs, "author")
  const blogsAuthor = _.mapValues(groupedBlogs, "length")
  const toArray = Object.entries(blogsAuthor)
  const mayorPair = toArray.reduce((a, b) => (a[1] > b[1] ? a : b))

  return { author: mayorPair[0], blogs: mayorPair[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
