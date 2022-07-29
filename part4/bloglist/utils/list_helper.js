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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
