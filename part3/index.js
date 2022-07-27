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

// GET info

app.get("/info", (request, response) => {
  /* response.send(
    `phonebook has info for ${persons.length} people <br> ${new Date()}`
  ) */

  Person.find({})
    .then(persons => {
      response.send(
        `phonebook has info for ${persons.length} people <br> ${new Date()}`
      )
    })
    .catch(error => next(error))
})

// GET persons

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

// GET person

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// DELETE person

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// POST person

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  // Revisa que el objeto no tenga informacion vacia

  if (body.name === undefined || body.name === "") {
    return response.status(400).json({
      error: "name missing",
    })
  }

  if (body.number === undefined || body.number === "") {
    return response.status(400).json({
      error: "number missing",
    })
  }

  /* if (persons.filter(person => person.name === body.name).length > 0) {return response.status(400).json({      error: "name must be unique",})} */

  // New Object to Db

  const person = new Person({
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// PUT person

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// Error Handling Middleware

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.use(errorHandler)

// App listening at port for HTTP requests

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
