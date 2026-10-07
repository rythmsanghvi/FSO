const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("Please provide the password")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebookuser:${password}@cluster0.r9tdbdn.mongodb.net/phonebook?appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", phonebookSchema)

if (process.argv.length == 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook:")
    result.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}
