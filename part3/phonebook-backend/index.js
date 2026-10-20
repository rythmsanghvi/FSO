require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const app = express()

const Person = module.require("./models/people")

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformed id" })
  }

  next(error)
}

app.use(express.static("dist"))
app.use(express.json())
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms :body`),
)

morgan.token("body", (request, response) => {
  return request.body && Object.keys(request.body).length
    ? JSON.stringify(request.body)
    : " "
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.send(people)
  })
})

app.get("/info", (request, response) => {
  console.log(
    Person.find({}).then((people) => {
      people.length
    }),
  )

  Person.countDocuments({}).then((count) => {
    const date = Date()
    response.send(`<div>
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
    </div>`)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.status(200).send(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ error: "Missing name" })
  }

  if (!body.number) {
    return response.status(400).json({ error: "Missing number" })
  }

  const person = new Person({ name: body.name, number: body.number })

  person.save().then((person) => {
    console.log(`${person.name} saved to phonebook`)
  })

  response.json(person)
})

app.put("api/persons/:id", (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
