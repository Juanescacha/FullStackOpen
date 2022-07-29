const dummy = blogs => {
  if (blogs) {
    return 1
  }
}

const totalLikes = blogs => {
  const sumLikes = (sum, blog) => sum + blog.likes
  return blogs.reduce(sumLikes, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
