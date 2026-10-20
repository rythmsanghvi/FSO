require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const app = express()

const Person = module.require("./models/people")

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

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ error: "Missing name" })
  }

  if (!body.number) {
    return response.status(400).json({ error: "Missing number" })
  }

  // if (
  //   persons.find(
  //     (person) =>
  //       person.name.trim().toLowerCase() === body.name.trim().toLowerCase(),
  //   )
  // ) {
  //   return response.status(400).json({ error: "name must be unique" })
  // }

  const person = new Person({ name: body.name, number: body.number })

  person.save().then((person) => {
    console.log(`${person.name} saved to phonebook`)
  })

  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
