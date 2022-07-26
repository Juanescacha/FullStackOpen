require("dotenv").config()
const { request, response } = require("express")
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

app.use(express.static("build"))

app.use(cors())

app.use(express.json())
morgan.token("post", function (req) {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  } else {
    return " "
  }
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
)

app.get("/info", (request, response) => {
  response.send(
    `phonebook has info for ${persons.length} people <br> ${new Date()}`
  )
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  Person.deleteOne({id = request.params.id}).then(res => {
    response.status(204).end()
  })
})

app.post("/api/persons", (request, response) => {
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
