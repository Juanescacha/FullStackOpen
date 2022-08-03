const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const helper = require("./test.helper")

const api = supertest(app)

beforeAll(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const blogPromises = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromises)
})
describe("GET requests", () => {
  test("GET /api/blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(response.body.length).toBe(6)
  }, 100000)
})

describe("POST requests", () => {
  test("POST /api/blogs", async () => {
    const blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 9,
    }

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogs = await helper.getblogsinDB()

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  }, 100000)

  test("verify if likes property is missing for making it default 0", async () => {
    const blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    }

    const response = await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  test("missing title and url from sent object to POST request, backends responds with 400 Bad Request", async () => {
    const blog = {
      author: "Robert Downey Jr",
    }

    await api.post("/api/blogs").send(blog).expect(400)
  })
})

describe("ID property is named id", () => {
  test("very that the id property is named id", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0].__id).toBe(undefined)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
